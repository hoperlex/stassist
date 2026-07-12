/**
 * Поиск «благоприятных окон» (элективная астрология) — прозрачный ДЕТЕРМИНИРОВАННЫЙ скоринг
 * транзитов к натальной карте на заданном интервале дат (см. промт Ф8 req.4, находку
 * [полнота/зависимости] в _work/build/findings/f8.md: «критерии... НЕ выдумывать молча...
 * задокументировать правила»). Чистая функция (без I/O) — часть `packages/astro-core`, как и
 * требует та же находка («детерминированная функция... в astro-core»).
 *
 * ПРАВИЛА (задокументированы явно, НЕ «на глаз»):
 *
 * 1. Интервал `[fromUtc, toUtc)` сэмплируется с шагом `sampleStepHours` (по умолчанию 12ч — 2
 *    точки/сутки: 00/12 UTC; заказ с `depth='deep'`, см. промт Ф8 req.4 «глубина», использует 6ч
 *    — 4 точки/сутки). Интервал ограничен `MAX_SCAN_DAYS` (120 суток) — защита от неограниченного
 *    времени расчёта (каждая точка — root-finding void-of-course по 9 телам, недёшево).
 * 2. В каждой точке считаются ТОЧНЫЕ (не транзит-к-транзиту) аспекты между ТРАНЗИТНЫМИ
 *    Солнце..Плутон+Луна и НАТАЛЬНЫМИ Солнце..Плутон+Луна — набор `major_minor`, орбисы —
 *    `DEFAULT_ORB_BY_ASPECT`/`DEFAULT_ORB_BY_BODY` (aspects/presets.ts), ТЕ ЖЕ, что весь
 *    остальной проект (никакой отдельной «элективной» эвристики орбисов).
 * 3. Валентность аспекта (гармония/напряжение) — фиксированная таблица `ASPECT_VALENCE`: trine=+3,
 *    sextile=+2, quintile/biquintile=+1, conjunction=0 (НЕЙТРАЛЬНО — природа соединения зависит
 *    от конкретных планет, MVP сознательно не оценивает её, чтобы не выдумывать правило),
 *    semisextile/quincunx=-1, semisquare/sesquiquadrate=-1, square=-3, opposition=-3.
 * 4. Вес пары тел — `BODY_SIGNIFICANCE` (та же таблица значимости, что персональный гороскоп Ф5,
 *    см. `packages/llm/src/horoscope/personal.ts` `BODY_WEIGHT` — продублирована здесь
 *    намеренно: `astro-core` не зависит от `@stassist/llm`, см. слоение пакетов в doc 21 §1).
 * 5. Очковый вклад точки = Σ по всем найденным аспектам (валентность × (весНатал + весТранзит)).
 * 6. Void-of-course Луна (`findMoonVoidOfCourse`) — если момент сэмпла попадает в void-интервал,
 *    точка помечается `voidMoon=true` и получает штраф `VOID_MOON_PENALTY` (классическое
 *    элективное правило «не начинать дела, пока Луна без курса»).
 * 7. Ретроградный Меркурий — точка ВСЕГДА помечается `mercuryRetrograde` (флаг), но штраф
 *    `MERCURY_RETRO_PENALTY` применяется, только если вызывающий код передал
 *    `weighRetrogradeMercury: true` (актуально для вопросов о договорах/переговорах/поездках —
 *    для остальных типов вопросов ретро-Меркурий одинаково значимым не считаем, не выдумываем
 *    универсальный штраф).
 * 8. Точки группируются в непрерывные «окна» — соседние по времени сэмплы с итоговым
 *    score > `minScoreThreshold` (по умолчанию 0), окно описывается start/end/peakScore/
 *    avgScore/topAspects (≤3 по |вклад|)/flags (voidMoon/mercuryRetrograde — если встретились
 *    хотя бы в одной точке окна).
 * 9. Результат — окна, отсортированные по `peakScore` по убыванию.
 */
import type { AspectAngleName, Bodies } from '@stassist/shared';
import { sunApparentPosition } from '../ephemeris/sun-vsop87.js';
import { bodyGeocentricPosition, PLANET_BODIES } from '../ephemeris/planets.js';
import { resolveTime } from '../time/julian-day.js';
import { ttToAstroTime, type LongitudeProviderTT } from '../rootfinding/longitude-search.js';
import { findMoonVoidOfCourse } from '../rootfinding/void-of-course.js';
import { detectSynastryAspects } from '../aspects/synastry.js';
import type { AspectableBody } from '../aspects/index.js';

export const MAX_SCAN_DAYS = 120;
export const DEFAULT_SAMPLE_STEP_HOURS = 12;
export const VOID_MOON_PENALTY = -6;
export const MERCURY_RETRO_PENALTY = -4;

/** Правило 3 — см. заголовок файла. */
export const ASPECT_VALENCE: Record<AspectAngleName, number> = {
  trine: 3,
  sextile: 2,
  quintile: 1,
  biquintile: 1,
  conjunction: 0,
  semisextile: -1,
  quincunx: -1,
  semisquare: -1,
  sesquiquadrate: -1,
  square: -3,
  opposition: -3,
};

/** Правило 4 — намеренный дубль `BODY_WEIGHT` из `packages/llm/src/horoscope/personal.ts` (см.
 *  заголовок файла: `astro-core` не зависит от `@stassist/llm`). */
export const BODY_SIGNIFICANCE: Record<string, number> = {
  sun: 5, moon: 5, mercury: 2, venus: 3, mars: 3,
  jupiter: 2, saturn: 2, uranus: 1, neptune: 1, pluto: 1,
};

export interface TransitPositionAt {
  key: string;
  longitudeDeg: number;
  speedLongDegPerDay: number;
}

/** Транзитные позиции Солнце..Плутон+Луна в момент `utc` — та же формула, что персональный
 *  гороскоп Ф5 (см. правило 4 выше про намеренный дубль). */
export function transitPositionsAt(utc: Date): TransitPositionAt[] {
  const { astroTime } = resolveTime(utc);
  const sun = sunApparentPosition(astroTime);
  const moon = bodyGeocentricPosition('moon', astroTime);
  const planets = PLANET_BODIES.map((body) => ({ key: body, ...bodyGeocentricPosition(body, astroTime) }));
  return [
    { key: 'sun', longitudeDeg: sun.longitudeDeg, speedLongDegPerDay: sun.speedLongDegPerDay },
    { key: 'moon', longitudeDeg: moon.longitudeDeg, speedLongDegPerDay: moon.speedLongDegPerDay },
    ...planets.map((p) => ({ key: p.key, longitudeDeg: p.longitudeDeg, speedLongDegPerDay: p.speedLongDegPerDay })),
  ];
}

export interface ElectiveAspectContribution {
  natalBody: string;
  transitBody: string;
  angleName: AspectAngleName;
  orbDeg: number;
  contribution: number;
}

export interface ElectiveSampleScore {
  atUtc: string;
  score: number;
  voidMoon: boolean;
  mercuryRetrograde: boolean;
  aspects: ElectiveAspectContribution[];
}

/** Правила 2-7 — см. заголовок файла. Единственная точка, где считается «очко» момента. */
export function scoreElectiveMoment(
  natalBodies: Partial<Bodies>,
  atUtc: Date,
  opts: { weighRetrogradeMercury?: boolean } = {},
): ElectiveSampleScore {
  const natalAspectable: AspectableBody[] = Object.entries(natalBodies)
    .filter((entry): entry is [string, NonNullable<(typeof entry)[1]>] => entry[1] !== undefined)
    .map(([key, pos]) => ({ key, longitudeDeg: pos.longitudeDeg, speedLongDegPerDay: 0 }));

  const transitPositions = transitPositionsAt(atUtc);
  const transitAspectable: AspectableBody[] = transitPositions.map((p) => ({
    key: p.key,
    longitudeDeg: p.longitudeDeg,
    speedLongDegPerDay: p.speedLongDegPerDay,
  }));

  const rawAspects = detectSynastryAspects(natalAspectable, transitAspectable, { aspectSet: 'major_minor' });

  const aspects: ElectiveAspectContribution[] = rawAspects.map((a) => {
    const natalBody = a.bodyA.replace(/^a:/, '');
    const transitBody = a.bodyB.replace(/^b:/, '');
    const valence = ASPECT_VALENCE[a.angleName];
    const weight = (BODY_SIGNIFICANCE[natalBody] ?? 1) + (BODY_SIGNIFICANCE[transitBody] ?? 1);
    return { natalBody, transitBody, angleName: a.angleName, orbDeg: a.orbDeg, contribution: valence * weight };
  });

  let score = aspects.reduce((sum, a) => sum + a.contribution, 0);

  // Правило 6: void-of-course Луна.
  const moonLongitudeFn: LongitudeProviderTT = (ttDays) => bodyGeocentricPosition('moon', ttToAstroTime(ttDays)).longitudeDeg;
  const otherBodies = new Map<string, LongitudeProviderTT>();
  otherBodies.set('sun', (ttDays) => sunApparentPosition(ttToAstroTime(ttDays)).longitudeDeg);
  for (const body of PLANET_BODIES) {
    otherBodies.set(body, (ttDays) => bodyGeocentricPosition(body, ttToAstroTime(ttDays)).longitudeDeg);
  }
  const { astroTime } = resolveTime(atUtc);
  const voc = findMoonVoidOfCourse(moonLongitudeFn, otherBodies, astroTime.tt);
  const voidMoon = voc !== null && astroTime.tt >= voc.voidStartTT && astroTime.tt <= voc.ingressTT;
  if (voidMoon) score += VOID_MOON_PENALTY;

  // Правило 7: ретроградный Меркурий (флаг всегда, штраф — по опции вызывающего кода).
  const mercuryPos = transitPositions.find((p) => p.key === 'mercury');
  const mercuryRetrograde = (mercuryPos?.speedLongDegPerDay ?? 0) < 0;
  if (mercuryRetrograde && opts.weighRetrogradeMercury) score += MERCURY_RETRO_PENALTY;

  return { atUtc: atUtc.toISOString(), score, voidMoon, mercuryRetrograde, aspects };
}

export interface ElectiveWindow {
  startUtc: string;
  endUtc: string;
  peakScore: number;
  avgScore: number;
  topAspects: ElectiveAspectContribution[];
  voidMoon: boolean;
  mercuryRetrograde: boolean;
}

export interface FindElectiveWindowsOptions {
  sampleStepHours?: number;
  minScoreThreshold?: number;
  weighRetrogradeMercury?: boolean;
}

/** Правила 1, 8-9 — см. заголовок файла. */
export function findElectiveWindows(
  natalBodies: Partial<Bodies>,
  fromUtc: Date,
  toUtc: Date,
  options: FindElectiveWindowsOptions = {},
): ElectiveWindow[] {
  const stepHours = options.sampleStepHours ?? DEFAULT_SAMPLE_STEP_HOURS;
  const threshold = options.minScoreThreshold ?? 0;
  const spanDays = (toUtc.getTime() - fromUtc.getTime()) / (1000 * 60 * 60 * 24);
  if (spanDays <= 0) throw new Error('findElectiveWindows: toUtc должен быть строго позже fromUtc');
  if (spanDays > MAX_SCAN_DAYS) {
    throw new Error(`findElectiveWindows: интервал ${spanDays.toFixed(1)} сут. превышает лимит ${MAX_SCAN_DAYS} сут.`);
  }

  const samples: ElectiveSampleScore[] = [];
  const stepMs = stepHours * 60 * 60 * 1000;
  for (let t = fromUtc.getTime(); t < toUtc.getTime(); t += stepMs) {
    samples.push(scoreElectiveMoment(natalBodies, new Date(t), { weighRetrogradeMercury: options.weighRetrogradeMercury }));
  }

  const windows: ElectiveWindow[] = [];
  let current: ElectiveSampleScore[] = [];
  const flush = (): void => {
    if (current.length === 0) return;
    const scores = current.map((s) => s.score);
    const peakScore = Math.max(...scores);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const allAspects = current.flatMap((s) => s.aspects);
    const topAspects = [...allAspects].sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution)).slice(0, 3);
    windows.push({
      startUtc: current[0]!.atUtc,
      endUtc: current[current.length - 1]!.atUtc,
      peakScore,
      avgScore,
      topAspects,
      voidMoon: current.some((s) => s.voidMoon),
      mercuryRetrograde: current.some((s) => s.mercuryRetrograde),
    });
    current = [];
  };

  for (const sample of samples) {
    if (sample.score > threshold) {
      current.push(sample);
    } else {
      flush();
    }
  }
  flush();

  return windows.sort((a, b) => b.peakScore - a.peakScore);
}
