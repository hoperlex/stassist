/**
 * Оркестрация гороскопного пайплайна (см. worker.ts HOROSCOPE_QUEUE/HOROSCOPE_CRON). Один
 * cron-тик вызывает `runHoroscopePipeline`, который решает, ЧТО генерировать сегодня (требование
 * 2 промта Ф5 «месячные/годовые — реже», находка [неоднозначность] в _work/build/findings/f5.md):
 *
 *  - день+завтра — КАЖДЫЙ прогон (12 знаков × 5 тем × 2 = 120 текстов/сутки, ~идемпотентно после
 *    первого прогона дня — не дёргает LLM повторно, см. requirement 1 «идемпотентность»);
 *  - неделя — только если MSK-день недели = понедельник (12×5=60);
 *  - месяц — только если MSK-число месяца = 1 (12×5=60);
 *  - год (западный+восточный) — идемпотентный чек текущего года КАЖДЫЙ прогон (дёшево — как
 *    только год создан, дальнейшие прогоны не пишут), плюс следующий год с октября (см. doc 23
 *    §2 «публикация к октябрю»);
 *  - лунные дни (30, evergreen) и шуточный контур — идемпотентный чек каждый прогон.
 *
 * День+неделя+месяц+год × 12 знаков × 5 тем = ИМЕННО 300 (см. doc-комментарий packages/shared/
 * src/schemas/horoscope.ts) — после первичного наполнения (backfill/несколько первых прогонов
 * cron) в БД присутствует полная матрица 300 строк scope='zodiac'; неизменённые периоды не
 * перегенерируются (кэш через уникальный ключ).
 */
import type { Logger } from 'pino';
import type { Db } from '@stassist/db';
import {
  EASTERN_ANIMAL_SLUGS,
  HOROSCOPE_PROFESSION_SLUGS,
  LUNAR_DAY_COUNT,
  ZODIAC_SIGN_EN_SLUGS,
  type HoroscopePeriod,
  type HoroscopeTopic,
  type LlmProvider,
} from '@stassist/shared';
import {
  buildDayAstroEvents,
  buildEasternYearAstroEvents,
  buildLunarDayAstroEvents,
  buildRangeAstroEvents,
  buildYearAstroEvents,
  generateEasternHoroscopeBatch,
  generateHumorProfessionHoroscope,
  generateHumorZodiacBatch,
  generateLunarDayHoroscope,
  generateZodiacHoroscopeBatch,
  type HoroscopeAstroEvents,
} from '@stassist/llm';
import { computeFourPillars } from '@stassist/astro-core';
import { computeNotableAspectsToday, mapAstroCalendarRowToDaySkyFact, type DaySkyFact } from './astro-day-facts.js';
import { horoscopeCacheTag, invalidatePageCacheByTag } from './page-cache.js';
import {
  countExistingSignsForKey,
  countPublishedHoroscopesForDate,
  findAstroCalendarDay,
  findAstroCalendarRange,
  findLunarDayHoroscope,
  findRecentZachinsForSigns,
  upsertHoroscope,
} from './repository.js';
import { addDays, endOfMonth, isoWeekStart, mskNow, startOfMonth, toDateKeyDay, toDateKeyMonth, toDateKeyWeek } from './date-keys.js';

export { mskNow };

const HOROSCOPE_TOPICS: readonly HoroscopeTopic[] = ['general', 'love', 'money', 'career', 'health'];

export interface HoroscopeJobDeps {
  db: Db;
  llm: LlmProvider;
  logger: Logger;
}

const FALLBACK_DAY_FACT: Omit<DaySkyFact, 'date'> = {
  moonSignIndex: 0,
  lunarDay: 1,
  phaseName: 'new',
  isVoidOfCourse: false,
  retrogradeBodies: [],
  signIngresses: [],
};

async function loadDaySkyFact(db: Db, logger: Logger, dateKey: string): Promise<DaySkyFact> {
  const row = await findAstroCalendarDay(db, dateKey);
  if (row) return mapAstroCalendarRowToDaySkyFact(row);
  logger.warn(
    { dateKey },
    'horoscope: astro_calendar ещё не содержит эту дату — использую нейтральный fallback (см. doc-комментарий astro-day-facts.ts)',
  );
  return { date: dateKey, ...FALLBACK_DAY_FACT };
}

async function runZodiacBatchForAllTopics(
  deps: HoroscopeJobDeps,
  period: HoroscopePeriod,
  dateKey: string,
  events: HoroscopeAstroEvents,
  force: boolean,
): Promise<number> {
  let written = 0;
  for (const topic of HOROSCOPE_TOPICS) {
    // Идемпотентность ДОЛЖНА останавливать вызов LLM, не только запись (см. doc-комментарий
    // repository.ts `countExistingSignsForKey`) — если все 12 знаков уже есть, батч НЕ вызываем.
    if (!force) {
      const existing = await countExistingSignsForKey(deps.db, 'zodiac', period, topic, dateKey, false);
      if (existing >= ZODIAC_SIGN_EN_SLUGS.length) continue;
    }
    const recentZachins = await findRecentZachinsForSigns(deps.db, 'zodiac', ZODIAC_SIGN_EN_SLUGS, period, topic, false);
    const items = await generateZodiacHoroscopeBatch({ period, topic, events, recentZachinsBySign: recentZachins, llm: deps.llm });
    for (const item of items) {
      const result = await upsertHoroscope(
        deps.db,
        {
          scope: 'zodiac',
          sign: item.sign,
          period,
          topic,
          dateKey,
          humor: false,
          bodyMd: item.bodyMd,
          astroEvents: events,
          status: item.flagged ? 'moderation' : 'published',
        },
        force,
      );
      if (result.written) written += 1;
    }
  }
  if (written > 0) await invalidatePageCacheByTag(deps.db, horoscopeCacheTag(dateKey));
  return written;
}

/** День+завтра (см. doc-комментарий файла) — ежедневный обязательный прогон. */
export async function runDailyZodiacJob(deps: HoroscopeJobDeps, mskInstant: Date, force = false): Promise<{ written: number }> {
  const todayKey = toDateKeyDay(mskInstant);
  const tomorrowKey = toDateKeyDay(addDays(mskInstant, 1));
  let written = 0;

  for (const { period, dateKey } of [
    { period: 'day' as const, dateKey: todayKey },
    { period: 'tomorrow' as const, dateKey: tomorrowKey },
  ]) {
    const fact = await loadDaySkyFact(deps.db, deps.logger, dateKey);
    const notableAspects = computeNotableAspectsToday(dateKey);
    const events = buildDayAstroEvents(period, fact, notableAspects);
    written += await runZodiacBatchForAllTopics(deps, period, dateKey, events, force);
  }
  return { written };
}

export async function runWeeklyZodiacJob(deps: HoroscopeJobDeps, mskInstant: Date, force = false): Promise<{ written: number }> {
  const weekStart = isoWeekStart(mskInstant);
  const weekEnd = addDays(weekStart, 6);
  const dateKey = toDateKeyWeek(mskInstant);
  const rows = await findAstroCalendarRange(deps.db, toDateKeyDay(weekStart), toDateKeyDay(weekEnd));
  const facts = rows.map(mapAstroCalendarRowToDaySkyFact);
  const events = buildRangeAstroEvents('week', dateKey, facts);
  const written = await runZodiacBatchForAllTopics(deps, 'week', dateKey, events, force);
  return { written };
}

export async function runMonthlyZodiacJob(deps: HoroscopeJobDeps, mskInstant: Date, force = false): Promise<{ written: number }> {
  const monthStart = startOfMonth(mskInstant);
  const monthEnd = endOfMonth(mskInstant);
  const dateKey = toDateKeyMonth(mskInstant);
  const rows = await findAstroCalendarRange(deps.db, toDateKeyDay(monthStart), toDateKeyDay(monthEnd));
  const facts = rows.map(mapAstroCalendarRowToDaySkyFact);
  const events = buildRangeAstroEvents('month', dateKey, facts);
  const written = await runZodiacBatchForAllTopics(deps, 'month', dateKey, events, force);
  return { written };
}

async function runYearlyZodiacForYear(deps: HoroscopeJobDeps, year: number, force: boolean): Promise<number> {
  const dateKey = String(year);
  const jan1 = toDateKeyDay(new Date(Date.UTC(year, 0, 1)));
  const jan1Row = await findAstroCalendarDay(deps.db, jan1);
  const retrogradeAtStart = jan1Row ? mapAstroCalendarRowToDaySkyFact(jan1Row).retrogradeBodies : [];
  const events = buildYearAstroEvents(dateKey, retrogradeAtStart);
  return runZodiacBatchForAllTopics(deps, 'year', dateKey, events, force);
}

/** Западный годовой (requirement 3 промта Ф5 «/goroskop/{yyyy}/{znak}») — текущий год всегда
 *  (идемпотентно), следующий — с октября (см. doc 23 §2 «публикация к октябрю»). */
export async function runYearlyZodiacJob(deps: HoroscopeJobDeps, mskInstant: Date, force = false): Promise<{ written: number }> {
  const year = mskInstant.getUTCFullYear();
  let written = await runYearlyZodiacForYear(deps, year, force);
  if (mskInstant.getUTCMonth() >= 9) {
    // getUTCMonth() 0-based: 9 = октябрь
    written += await runYearlyZodiacForYear(deps, year + 1, force);
  }
  return { written };
}

/** Стихия года по стволу Ба-цзы (см. packages/shared/src/schemas/horoscope.ts
 *  `easternElementIndexFromStemIndex`) — опорная дата 15 июня (середина года, за пределами
 *  окна неопределённости Личунь ~4 февраля, см. предупреждение в @stassist/astro-core bazi). */
function easternYearAnimalAndElement(year: number): { animalIndex: number; elementIndex: number } {
  const pillar = computeFourPillars(year, 6, 15, 12).year;
  return { animalIndex: pillar.branchIndex, elementIndex: Math.floor((((pillar.stemIndex % 10) + 10) % 10) / 2) };
}

async function runEasternYearlyForYear(deps: HoroscopeJobDeps, year: number, force: boolean): Promise<number> {
  const dateKey = String(year);
  if (!force) {
    const existing = await countExistingSignsForKey(deps.db, 'eastern', 'year', 'general', dateKey, false);
    if (existing >= EASTERN_ANIMAL_SLUGS.length) return 0;
  }
  const { animalIndex, elementIndex } = easternYearAnimalAndElement(year);
  const sharedEvents = buildEasternYearAstroEvents(dateKey, animalIndex, elementIndex, 0);
  const items = await generateEasternHoroscopeBatch({ events: sharedEvents, llm: deps.llm });

  let written = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i]!;
    const subjectAnimalIndex = EASTERN_ANIMAL_SLUGS.indexOf(item.sign as (typeof EASTERN_ANIMAL_SLUGS)[number]);
    const perSubjectEvents = buildEasternYearAstroEvents(dateKey, animalIndex, elementIndex, subjectAnimalIndex);
    const result = await upsertHoroscope(
      deps.db,
      {
        scope: 'eastern',
        sign: item.sign,
        period: 'year',
        topic: 'general',
        dateKey,
        humor: false,
        bodyMd: item.bodyMd,
        astroEvents: perSubjectEvents,
        status: item.flagged ? 'moderation' : 'published',
      },
      force,
    );
    if (result.written) written += 1;
  }
  if (written > 0) await invalidatePageCacheByTag(deps.db, horoscopeCacheTag(dateKey));
  return written;
}

/** Восточный годовой (requirement 3 промта Ф5: хаб + 12 страниц `/vostochnyj-goroskop/{yyyy}/
 *  {zhivotnoe}`, doc 23 §2 «24/год» = 12 западных знаков + 12 восточных животных). */
export async function runEasternYearlyJob(deps: HoroscopeJobDeps, mskInstant: Date, force = false): Promise<{ written: number }> {
  const year = mskInstant.getUTCFullYear();
  let written = await runEasternYearlyForYear(deps, year, force);
  if (mskInstant.getUTCMonth() >= 9) {
    written += await runEasternYearlyForYear(deps, year + 1, force);
  }
  return { written };
}

/** Лунные дни (1..30, evergreen) — идемпотентность игнорирует `dateKey` (см. doc-комментарий
 *  packages/db/src/schema/horoscopes.ts и apps/worker/src/horoscope/repository.ts
 *  `findLunarDayHoroscope`). */
export async function runLunarDayJob(deps: HoroscopeJobDeps, mskInstant: Date, force = false): Promise<{ written: number }> {
  const dateKey = toDateKeyDay(mskInstant);
  let written = 0;
  for (let n = 1; n <= LUNAR_DAY_COUNT; n++) {
    if (!force) {
      const existing = await findLunarDayHoroscope(deps.db, String(n));
      if (existing) continue;
    }
    const item = generateLunarDayHoroscope(n);
    const result = await upsertHoroscope(
      deps.db,
      {
        scope: 'lunar_day',
        sign: item.sign,
        period: 'day',
        topic: 'general',
        dateKey,
        humor: false,
        bodyMd: item.bodyMd,
        astroEvents: buildLunarDayAstroEvents(dateKey, n),
        status: item.flagged ? 'moderation' : 'published',
      },
      force,
    );
    if (result.written) written += 1;
  }
  return { written };
}

/** Шуточный контур (M2, requirement 5 промта Ф5): антигороскоп (12 знаков) + профессиональные
 *  (2-3, см. HOROSCOPE_PROFESSION_SLUGS) — period='day' (см. doc-комментарий templates.ts:
 *  сознательное сужение скоупа юмор-контура до дневного периода). */
export async function runHumorJob(deps: HoroscopeJobDeps, mskInstant: Date, force = false): Promise<{ written: number }> {
  const dateKey = toDateKeyDay(mskInstant);
  const fact = await loadDaySkyFact(deps.db, deps.logger, dateKey);
  const events = buildDayAstroEvents('day', fact);
  let written = 0;

  const existingHumorSigns = force ? 0 : await countExistingSignsForKey(deps.db, 'zodiac', 'day', 'general', dateKey, true);
  const zodiacItems =
    existingHumorSigns >= ZODIAC_SIGN_EN_SLUGS.length
      ? []
      : await generateHumorZodiacBatch({
          events,
          recentZachinsBySign: await findRecentZachinsForSigns(deps.db, 'zodiac', ZODIAC_SIGN_EN_SLUGS, 'day', 'general', true),
          llm: deps.llm,
        });
  for (const item of zodiacItems) {
    const result = await upsertHoroscope(
      deps.db,
      { scope: 'zodiac', sign: item.sign, period: 'day', topic: 'general', dateKey, humor: true, bodyMd: item.bodyMd, astroEvents: events, status: item.flagged ? 'moderation' : 'published' },
      force,
    );
    if (result.written) written += 1;
  }

  for (const professionSlug of HOROSCOPE_PROFESSION_SLUGS) {
    const item = generateHumorProfessionHoroscope(professionSlug, { ...events, scope: 'profession' });
    const result = await upsertHoroscope(
      deps.db,
      { scope: 'profession', sign: item.sign, period: 'day', topic: 'general', dateKey, humor: true, bodyMd: item.bodyMd, astroEvents: { ...events, scope: 'profession' }, status: item.flagged ? 'moderation' : 'published' },
      force,
    );
    if (result.written) written += 1;
  }
  return { written };
}

export interface HoroscopePipelineSummary {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
  eastern: number;
  lunarDay: number;
  humor: number;
  total: number;
}

/** Единственная точка входа для worker.ts (см. doc-комментарий файла). */
export async function runHoroscopePipeline(deps: HoroscopeJobDeps, now: Date = new Date(), force = false): Promise<HoroscopePipelineSummary> {
  const msk = mskNow(now);

  const daily = (await runDailyZodiacJob(deps, msk, force)).written;
  const weekly = msk.getUTCDay() === 1 ? (await runWeeklyZodiacJob(deps, msk, force)).written : 0;
  const monthly = msk.getUTCDate() === 1 ? (await runMonthlyZodiacJob(deps, msk, force)).written : 0;
  const yearly = (await runYearlyZodiacJob(deps, msk, force)).written;
  const eastern = (await runEasternYearlyJob(deps, msk, force)).written;
  const lunarDay = (await runLunarDayJob(deps, msk, force)).written;
  const humor = (await runHumorJob(deps, msk, force)).written;

  const total = daily + weekly + monthly + yearly + eastern + lunarDay + humor;
  deps.logger.info({ daily, weekly, monthly, yearly, eastern, lunarDay, humor, total }, 'horoscope-pipeline: прогон завершён');
  return { daily, weekly, monthly, yearly, eastern, lunarDay, humor, total };
}

/** Алерт «дневной комплект не готов к 01:00 МСК» (requirement 7 промта Ф5). Ожидаемый объём —
 *  12 знаков × 5 тем = 60 (period='day', scope='zodiac', status='published'). */
export async function checkDailyHoroscopeReadiness(deps: HoroscopeJobDeps, now: Date = new Date()): Promise<{ ready: boolean; publishedCount: number; expectedCount: number }> {
  const msk = mskNow(now);
  const dateKey = toDateKeyDay(msk);
  const expectedCount = ZODIAC_SIGN_EN_SLUGS.length * HOROSCOPE_TOPICS.length;
  const publishedCount = await countPublishedHoroscopesForDate(deps.db, 'zodiac', 'day', dateKey);
  const ready = publishedCount >= expectedCount;
  if (!ready) {
    // machine-readable поле alert=true — grep-паттерн для внешней алертной системы (Sentry/
    // GlitchTip интеграция — вне MVP-скоупа, см. doc 21 §9 и отчёт фазы «требует ручного шага»).
    deps.logger.error(
      { alert: true, dateKey, publishedCount, expectedCount },
      'horoscope-alert: дневной комплект программатики НЕ готов к проверке 01:00 МСК — протухшая программатика бьёт по SEO',
    );
  }
  return { ready, publishedCount, expectedCount };
}
