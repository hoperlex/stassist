/**
 * Оркестрация генерации гороскопов — единственная точка входа для apps/worker (cron) и apps/api
 * (ленивая генерация). Решение по выбору движка (см. находку [llm-cron-pipeline] в
 * _work/build/findings/f5.md и docs/roadmap/31-конвенции-реализации.md §2/§4):
 *
 *  - `LLM_PROVIDER!=stub` (реальный провайдер настроен) → батч-промт (build-prompt.ts) →
 *    `llm.generate()` → JSON-парсинг структурированного ответа. Это боевой путь.
 *  - `LLM_PROVIDER=stub` (дефолт локально/в CI) → ДЕТЕРМИНИРОВАННЫЙ шаблонный генератор
 *    (templates.ts), А НЕ буквальный `StubLlmProvider.generate()`. Причина — тот же прецедент,
 *    что и `packages/llm/src/corpus/build-corpus.ts` (см. её doc-комментарий): дженерик-заглушка
 *    `StubLlmProvider` («реальный анализ появится после подключения провайдера») не является
 *    доменным астрологическим контентом и не попадает в целевые диапазоны длины (600-900/
 *    1500-2500 симв.) — для массового наполнения портала (300+ гороскопов) это НЕ дало бы
 *    «портал не пустой» по духу §2/§4 конвенций. Различаем по `llm.name === 'stub'`
 *    (у `StubLlmProvider` это единственное имя, см. packages/shared/src/ports/llm-provider.ts) —
 *    тот же признак, что уже использует apps/worker/src/worker.ts для выбора цепочки провайдеров.
 *
 * Автомодерация (требование 1 промта Ф5): `detectForbidden`/`buildSoftRefusalText` из
 * `postprocess/forbidden-filters.ts` (переиспользованы, не продублированы, см. находку
 * [самодостаточность] в f5.md «переиспользовать фильтры Ф4»). Флагнутый текст получает
 * status='moderation' (решает вызывающий код по `flagged`), не 'published'.
 */
import {
  EASTERN_ANIMAL_NAME_RU,
  EASTERN_ANIMAL_SLUGS,
  HOROSCOPE_PROFESSION_NAME_RU,
  ZODIAC_SIGN_EN_SLUGS,
  type EasternAnimalSlug,
  type HoroscopePeriod,
  type HoroscopeProfessionSlug,
  type HoroscopeTopic,
  type LlmProvider,
  type ZodiacSignEnSlug,
} from '@stassist/shared';
import { signRuInfoByEnSlug } from '../facts/ru-names.js';
import { buildSoftRefusalText, detectForbidden } from '../postprocess/forbidden-filters.js';
import { buildHoroscopeBatchPrompt, type HoroscopeBatchSubject } from './build-prompt.js';
import type { HoroscopeAstroEvents } from './astro-events.js';
import {
  buildEasternYearText,
  buildHumorAntiHoroscopeText,
  buildHumorProfessionText,
  buildLunarDayText,
  buildZodiacHoroscopeText,
} from './templates.js';
import { EASTERN_ANIMAL_TRAIT_RU } from './phrase-banks.js';

export interface HoroscopeGenItem {
  sign: string;
  bodyMd: string;
  flagged: boolean;
  flagReasons: string[];
}

function moderate(rawText: string): { bodyMd: string; flagged: boolean; flagReasons: string[] } {
  const forbidden = detectForbidden(rawText);
  if (forbidden.length === 0) return { bodyMd: rawText, flagged: false, flagReasons: [] };
  return {
    bodyMd: buildSoftRefusalText(forbidden),
    flagged: true,
    flagReasons: forbidden.map((f) => `forbidden:${f.category}`),
  };
}

function isStubProvider(llm: LlmProvider): boolean {
  return llm.name === 'stub';
}

/** JSON-ответ реального провайдера может быть обёрнут в markdown-код-блок — сносим обёртку перед парсингом. */
function stripCodeFence(text: string): string {
  const trimmed = text.trim();
  const match = /^```(?:json)?\s*([\s\S]*?)\s*```$/.exec(trimmed);
  return match ? match[1]!.trim() : trimmed;
}

async function generateViaLlmBatch(
  llm: LlmProvider,
  subjects: readonly HoroscopeBatchSubject[],
  period: HoroscopePeriod,
  topic: HoroscopeTopic,
  humor: boolean,
  events: HoroscopeAstroEvents,
  recentZachinsBySubject: Readonly<Record<string, readonly string[]>>,
): Promise<HoroscopeGenItem[]> {
  const { system, prompt } = buildHoroscopeBatchPrompt({ period, topic, humor, subjects, events, recentZachinsBySubject });
  const result = await llm.generate({ system, prompt, maxTokens: 4000 });

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(stripCodeFence(result.text)) as Record<string, unknown>;
  } catch {
    // Не смогли распарсить ответ реального провайдера — весь батч уходит на модерацию, а не
    // публикуется (см. doc-комментарий выше «Автомодерация»). Не подменяем шаблоном молча —
    // это скрыло бы реальную проблему с провайдером/промтом.
    return subjects.map((s) => ({
      sign: s.slug,
      bodyMd: 'Генерация временно недоступна — текст ожидает повторной обработки.',
      flagged: true,
      flagReasons: ['llm-json-parse-error'],
    }));
  }

  return subjects.map((s) => {
    const value = parsed[s.slug];
    if (typeof value !== 'string' || value.trim().length === 0) {
      return { sign: s.slug, bodyMd: 'Генерация временно недоступна — текст ожидает повторной обработки.', flagged: true, flagReasons: ['llm-missing-subject'] };
    }
    return { sign: s.slug, ...moderate(value) };
  });
}

// ---------------------------------------------------------------------------------------------
// scope='zodiac' — 12 знаков за вызов (см. требование 2 промта Ф5).
// ---------------------------------------------------------------------------------------------

export interface GenerateZodiacBatchInput {
  period: HoroscopePeriod;
  topic: HoroscopeTopic;
  events: HoroscopeAstroEvents;
  /** Зачины последних 7 выпусков по каждому знаку (см. antidup.ts). */
  recentZachinsBySign: Readonly<Partial<Record<ZodiacSignEnSlug, readonly string[]>>>;
  llm: LlmProvider;
}

export async function generateZodiacHoroscopeBatch(input: GenerateZodiacBatchInput): Promise<HoroscopeGenItem[]> {
  if (!isStubProvider(input.llm)) {
    const subjects: HoroscopeBatchSubject[] = ZODIAC_SIGN_EN_SLUGS.map((slug) => ({
      slug,
      nameRu: signRuInfoByEnSlug(slug).nameRu,
    }));
    return generateViaLlmBatch(input.llm, subjects, input.period, input.topic, false, input.events, input.recentZachinsBySign);
  }
  return ZODIAC_SIGN_EN_SLUGS.map((sign) => {
    const raw = buildZodiacHoroscopeText(sign, input.period, input.topic, input.events, input.recentZachinsBySign[sign] ?? []);
    return { sign, ...moderate(raw) };
  });
}

// ---------------------------------------------------------------------------------------------
// scope='eastern' — 12 животных года за вызов.
// ---------------------------------------------------------------------------------------------

export interface GenerateEasternBatchInput {
  events: HoroscopeAstroEvents;
  llm: LlmProvider;
}

export async function generateEasternHoroscopeBatch(input: GenerateEasternBatchInput): Promise<HoroscopeGenItem[]> {
  if (!isStubProvider(input.llm)) {
    const subjects: HoroscopeBatchSubject[] = EASTERN_ANIMAL_SLUGS.map((slug) => ({ slug, nameRu: EASTERN_ANIMAL_NAME_RU[slug] }));
    return generateViaLlmBatch(input.llm, subjects, 'year', 'general', false, input.events, {});
  }
  return EASTERN_ANIMAL_SLUGS.map((animal) => {
    const raw = buildEasternYearText(animal, EASTERN_ANIMAL_NAME_RU[animal], input.events);
    return { sign: animal, ...moderate(raw) };
  });
}

// ---------------------------------------------------------------------------------------------
// scope='lunar_day' — evergreen, генерируется по одному (не батчем — 30 разных тем, не 12
// однородных субъектов, батч-экономия LLM тут не так важна, см. требование 2 промта Ф5 «12
// знаков за вызов» специфицирует именно зодиакальный кластер).
// ---------------------------------------------------------------------------------------------

export function generateLunarDayHoroscope(n: number): HoroscopeGenItem {
  const raw = buildLunarDayText(n);
  return { sign: String(n), ...moderate(raw) };
}

// ---------------------------------------------------------------------------------------------
// Шуточный контур (M2, humor=true) — см. requirement 5 промта Ф5.
// ---------------------------------------------------------------------------------------------

export interface GenerateHumorZodiacInput {
  events: HoroscopeAstroEvents;
  recentZachinsBySign: Readonly<Partial<Record<ZodiacSignEnSlug, readonly string[]>>>;
  llm: LlmProvider;
}

export async function generateHumorZodiacBatch(input: GenerateHumorZodiacInput): Promise<HoroscopeGenItem[]> {
  if (!isStubProvider(input.llm)) {
    const subjects: HoroscopeBatchSubject[] = ZODIAC_SIGN_EN_SLUGS.map((slug) => ({
      slug,
      nameRu: signRuInfoByEnSlug(slug).nameRu,
    }));
    return generateViaLlmBatch(input.llm, subjects, 'day', 'general', true, input.events, input.recentZachinsBySign);
  }
  return ZODIAC_SIGN_EN_SLUGS.map((sign) => {
    const raw = buildHumorAntiHoroscopeText(sign, input.events, input.recentZachinsBySign[sign] ?? []);
    return { sign, ...moderate(raw) };
  });
}

export function generateHumorProfessionHoroscope(
  professionSlug: HoroscopeProfessionSlug,
  events: HoroscopeAstroEvents,
): HoroscopeGenItem {
  const raw = buildHumorProfessionText(professionSlug, HOROSCOPE_PROFESSION_NAME_RU[professionSlug], events);
  return { sign: professionSlug, ...moderate(raw) };
}

export type { EasternAnimalSlug };
export { EASTERN_ANIMAL_TRAIT_RU };
