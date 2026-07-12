/**
 * Персональный гороскоп (кабинет, см. требование 4 промта Ф5, находку [полнота] «хранилище+ключ
 * кэша персонального гороскопа» в _work/build/findings/f5.md). Транзиты к наталу → приоритизация
 * (орбис + значимость планет) → текст (краткий бесплатно / полный по подписке).
 *
 * Хранилище: `ai_reports` (переиспользуем таблицу, НЕ `horoscopes` — это не программатика, а
 * персональный разбор конкретного профиля, тот же домен, что и остальные `ai_reports.kind`, см.
 * doc-комментарий `packages/db/src/schema/enums.ts` `aiReportKindEnum`). `cache_key` строится
 * ЭТИМ модулем (см. `buildPersonalHoroscopeCacheKey`), НЕ общей формулой
 * `packages/llm/src/cache/cache-key.ts` (та заточена под `sphere`/`partnerBirthProfileId`,
 * персональному гороскопу нужны `period`+`dateKey` — суточная инвалидация: новый день → новый
 * ключ → кэш не отдаёт вчерашний прогноз).
 */
import { createHash } from 'node:crypto';
import {
  bodyGeocentricPosition,
  detectSynastryAspects,
  PLANET_BODIES,
  resolveTime,
  sunApparentPosition,
  type AspectableBody,
} from '@stassist/astro-core';
import type { Aspect, Bodies, LlmProvider } from '@stassist/shared';
import { aspectBetweenKey } from '../facts/keys.js';
import { aspectNameRu, objectNameRu } from '../facts/ru-names.js';
import { buildPrompt } from '../prompt/build-prompt.js';
import { postprocessReport } from '../postprocess/postprocess.js';
import type { ChunkRepository } from '../rag/chunk-repository.js';
import { retrieveForFacts } from '../rag/retriever.js';

export interface TransitBodyPosition {
  key: string;
  longitudeDeg: number;
  speedLongDegPerDay: number;
}

/** Транзитные позиции Солнца..Плутон на момент `nowUtc` (без домов — персональный гороскоп
 *  MVP работает по планета-к-планете, см. заголовок файла). */
export function computeTransitBodyPositions(nowUtc: Date): TransitBodyPosition[] {
  const { astroTime } = resolveTime(nowUtc);
  const sun = sunApparentPosition(astroTime);
  const moon = bodyGeocentricPosition('moon', astroTime);
  const planets = PLANET_BODIES.map((body) => ({ key: body, ...bodyGeocentricPosition(body, astroTime) }));
  return [
    { key: 'sun', longitudeDeg: sun.longitudeDeg, speedLongDegPerDay: sun.speedLongDegPerDay },
    { key: 'moon', longitudeDeg: moon.longitudeDeg, speedLongDegPerDay: moon.speedLongDegPerDay },
    ...planets.map((p) => ({ key: p.key, longitudeDeg: p.longitudeDeg, speedLongDegPerDay: p.speedLongDegPerDay })),
  ];
}

/** Значимость тела для приоритизации (см. требование 4 промта Ф5 «значимость планет») —
 *  светила/личные планеты весомее медленных, у которых транзитные аспекты и так редки и долгие. */
const BODY_WEIGHT: Record<string, number> = {
  sun: 5, moon: 5, mercury: 2, venus: 3, mars: 3,
  jupiter: 2, saturn: 2, uranus: 1, neptune: 1, pluto: 1,
};

export interface PrioritizedTransit {
  natalBody: string;
  transitBody: string;
  angleName: string;
  orbDeg: number;
  applying: boolean;
  weight: number;
}

export function computeTransitToNatalAspects(natalBodies: Partial<Bodies>, transitPositions: readonly TransitBodyPosition[]): Aspect[] {
  const natalAspectable: AspectableBody[] = Object.entries(natalBodies)
    .filter((entry): entry is [string, NonNullable<(typeof entry)[1]>] => entry[1] !== undefined)
    .map(([key, pos]) => ({ key, longitudeDeg: pos.longitudeDeg, speedLongDegPerDay: 0 }));
  const transitAspectable: AspectableBody[] = transitPositions.map((p) => ({
    key: p.key,
    longitudeDeg: p.longitudeDeg,
    speedLongDegPerDay: p.speedLongDegPerDay,
  }));
  return detectSynastryAspects(natalAspectable, transitAspectable, { aspectSet: 'major_minor' });
}

/** Сортировка: точнее орбис → выше приоритет; при равенстве — весомее пара тел. Топ-N (по
 *  умолчанию 5) — единственное, что попадает в текст (см. требование 4 промта «приоритизация»). */
export function prioritizeTransitAspects(aspects: readonly Aspect[], limit = 5): PrioritizedTransit[] {
  return aspects
    .map((a) => {
      const natalBody = a.bodyA.replace(/^a:/, '');
      const transitBody = a.bodyB.replace(/^b:/, '');
      const weight = (BODY_WEIGHT[natalBody] ?? 1) + (BODY_WEIGHT[transitBody] ?? 1);
      return { natalBody, transitBody, angleName: a.angleName, orbDeg: a.orbDeg, applying: a.applying, weight };
    })
    .sort((x, y) => x.orbDeg - y.orbDeg || y.weight - x.weight)
    .slice(0, limit);
}

export interface PersonalHoroscopeCacheKeyInput {
  birthProfileId: string;
  period: 'day' | 'week';
  dateKey: string;
  coreVersion: string;
  promptVersion: string;
}

/** Суточная (для period='day') / недельная инвалидация через `dateKey` — см. doc-комментарий файла. */
export function buildPersonalHoroscopeCacheKey(input: PersonalHoroscopeCacheKeyInput): string {
  const parts = [input.birthProfileId, 'personal_horoscope', input.period, input.dateKey, input.coreVersion, input.promptVersion];
  return createHash('sha256').update(parts.join('|')).digest('hex');
}

function formatTransitLine(t: PrioritizedTransit): string {
  return `${objectNameRu(t.transitBody)} образует ${aspectNameRu(t.angleName)} к натальному ${objectNameRu(t.natalBody)} (орбис ${t.orbDeg.toFixed(1)}°, ${t.applying ? 'аспект собирается' : 'аспект расходится'})`;
}

/** Краткая (бесплатная) версия — ВСЕГДА детерминированная, без обращения к LLM (см. требование 4
 *  промта: «краткий бесплатно… лениво при заходе + кэш на день» — дешёвая часть не должна ждать
 *  сеть/платить токены). */
export function buildPersonalHoroscopeSummary(prioritized: readonly PrioritizedTransit[]): string {
  if (prioritized.length === 0) {
    return 'Сегодня заметных точных транзитов к вашей натальной карте нет — спокойный, ровный день без выраженных астрологических акцентов.';
  }
  const top = prioritized[0]!;
  return `Главное сегодня: ${formatTransitLine(top)}. Полный разбор со всеми значимыми транзитами — по подписке.`;
}

export interface BuildPersonalHoroscopeFullInput {
  prioritized: readonly PrioritizedTransit[];
  period: 'day' | 'week';
  llm: LlmProvider;
  chunkRepository: ChunkRepository;
}

export interface PersonalHoroscopeFullResult {
  fullMd: string;
  provider: string;
  tokensIn: number;
  tokensOut: number;
  flagged: boolean;
  flagReasons: string[];
}

/** Полная версия — ретрив по ключам `aspect:{natal}:{angle}:{transit}` (тот же корпус Ф4, что и
 *  обычные разборы, см. `@stassist/llm` src/facts/keys.ts) → промт → LLM → пост-обработка
 *  (переиспользует `postprocess/postprocess.ts`, автомодерация как у остальных ai_reports). */
export async function buildPersonalHoroscopeFull(input: BuildPersonalHoroscopeFullInput): Promise<PersonalHoroscopeFullResult> {
  if (input.prioritized.length === 0) {
    return {
      fullMd: 'Сегодня заметных точных транзитов к вашей натальной карте нет — хороший момент для планового, спокойного темпа без резких решений.',
      provider: 'none',
      tokensIn: 0,
      tokensOut: 0,
      flagged: false,
      flagReasons: [],
    };
  }

  const factKeys = input.prioritized.map((t) => aspectBetweenKey(t.natalBody, t.transitBody, t.angleName));
  const retrieval = await retrieveForFacts(factKeys, input.chunkRepository);
  const factsText = `ТРАНЗИТЫ К НАТАЛЬНОЙ КАРТЕ (${input.period === 'day' ? 'на сегодня' : 'на неделю'}), от самого точного к менее точному:\n${input.prioritized.map((t, i) => `${i + 1}. ${formatTransitLine(t)}`).join('\n')}`;

  const { system, prompt } = buildPrompt({
    factsText,
    chunkTexts: retrieval.chunks.map((c) => c.text),
    task:
      `Напиши персональный гороскоп на ${input.period === 'day' ? 'сегодня' : 'эту неделю'} (3-5 абзацев) на основе ` +
      'приведённых транзитов, от наиболее точного (первого) к менее значимым. Не изобретай транзитов, которых нет в списке.',
  });

  const genResult = await input.llm.generate({ system, prompt, maxTokens: 1400 });
  const post = postprocessReport({ text: genResult.text });

  return {
    fullMd: post.contentMd,
    provider: genResult.provider,
    tokensIn: genResult.tokensIn,
    tokensOut: genResult.tokensOut,
    flagged: post.flagged,
    flagReasons: post.flagReasons,
  };
}
