/**
 * Ленивая генерация «при заходе» (requirement 4 промта Ф5, §6 конвенций реализации «правило
 * непустоты»): если строки `horoscopes` на запрошенный ключ ещё нет (worker ещё не прогнал cron,
 * либо это первый визит на редкую комбинацию), apps/api генерирует её синхронно прямо в HTTP-
 * запросе — тем же путём, что и cron (`@stassist/llm` generate-batch.ts: детерминированный
 * шаблон по умолчанию / реальный провайдер, если настроен), и КЭШИРУЕТ (upsert) на будущее.
 *
 * Батч-экономия (12 знаков за вызов) сохраняется и здесь: первый посетитель «примирует» ВЕСЬ
 * период×тему для всех 12 знаков разом, а не только запрошенный — следующие 11 страниц уже не
 * потребуют повторной генерации.
 */
import type { Db } from '@stassist/db';
import {
  addDays,
  endOfMonth,
  EASTERN_ANIMAL_SLUGS,
  isoWeekStart,
  LUNAR_DAY_COUNT,
  startOfMonth,
  toDateKeyDay,
  toDateKeyMonth,
  toDateKeyWeek,
  ZODIAC_SIGN_EN_SLUGS,
  type HoroscopePeriod,
  type HoroscopeProfessionSlug,
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
} from '@stassist/llm';
import { computeFourPillars } from '@stassist/astro-core';
import { findAstroCalendarDay, findAstroCalendarRange } from '../repositories/astro-calendar-repository.js';
import {
  findHoroscopeByKey,
  findLunarDayHoroscope,
  findRecentZachins,
  upsertHoroscope,
  type HoroscopeRow,
} from '../repositories/horoscopes-repository.js';
import { computeNotableAspectsToday, mapAstroCalendarRowToDaySkyFact, type DaySkyFact } from './astro-day-facts.js';

const FALLBACK_DAY_FACT: Omit<DaySkyFact, 'date'> = {
  moonSignIndex: 0,
  lunarDay: 1,
  phaseName: 'new',
  isVoidOfCourse: false,
  retrogradeBodies: [],
  signIngresses: [],
};

async function loadDaySkyFact(db: Db, dateKey: string): Promise<DaySkyFact> {
  const row = await findAstroCalendarDay(db, dateKey);
  if (row) return mapAstroCalendarRowToDaySkyFact(row);
  return { date: dateKey, ...FALLBACK_DAY_FACT };
}

async function findRecentZachinsForSigns(
  db: Db,
  signs: readonly string[],
  period: HoroscopePeriod,
  topic: HoroscopeTopic,
  humor: boolean,
): Promise<Record<string, string[]>> {
  const out: Record<string, string[]> = {};
  for (const sign of signs) out[sign] = await findRecentZachins(db, 'zodiac', sign, period, topic, humor);
  return out;
}

/** Текущий ключ даты для период day/tomorrow/week/month/year, относительно `now` (сервер решает
 *  сам — клиент запрашивает «сегодняшний/этой недели» гороскоп, а не произвольную дату). */
export function currentDateKeyFor(period: HoroscopePeriod, now: Date): string {
  switch (period) {
    case 'day':
      return toDateKeyDay(now);
    case 'tomorrow':
      return toDateKeyDay(addDays(now, 1));
    case 'week':
      return toDateKeyWeek(now);
    case 'month':
      return toDateKeyMonth(now);
    case 'year':
      return String(now.getUTCFullYear());
  }
}

async function buildZodiacEventsFor(db: Db, period: HoroscopePeriod, dateKey: string, now: Date) {
  if (period === 'day' || period === 'tomorrow') {
    const targetDate = period === 'day' ? now : addDays(now, 1);
    const fact = await loadDaySkyFact(db, toDateKeyDay(targetDate));
    const notableAspects = computeNotableAspectsToday(toDateKeyDay(targetDate));
    return buildDayAstroEvents(period, fact, notableAspects);
  }
  if (period === 'week') {
    const weekStart = isoWeekStart(now);
    const rows = await findAstroCalendarRange(db, toDateKeyDay(weekStart), toDateKeyDay(addDays(weekStart, 6)));
    return buildRangeAstroEvents('week', dateKey, rows.map(mapAstroCalendarRowToDaySkyFact));
  }
  if (period === 'month') {
    const rows = await findAstroCalendarRange(db, toDateKeyDay(startOfMonth(now)), toDateKeyDay(endOfMonth(now)));
    return buildRangeAstroEvents('month', dateKey, rows.map(mapAstroCalendarRowToDaySkyFact));
  }
  // year
  const jan1Row = await findAstroCalendarDay(db, `${now.getUTCFullYear()}-01-01`);
  const retrogradeAtStart = jan1Row ? mapAstroCalendarRowToDaySkyFact(jan1Row).retrogradeBodies : [];
  return buildYearAstroEvents(dateKey, retrogradeAtStart);
}

/**
 * Отдаёт строку по ключу, генерируя ВЕСЬ батч (12 знаков), если её ещё нет. `now` по умолчанию —
 * реальное «сейчас» (день/неделя/месяц/год = ТЕКУЩИЕ), но для period='year' вызывающий код
 * (routes/horoscopes.ts) может передать СИНТЕТИЧЕСКОЕ `now` внутри нужного года — так
 * `/goroskop/{yyyy}/{znak}` с явным годом в URL корректно резолвится в ИМЕННО этот год, а не
 * в текущий (см. requirement 3 промта Ф5 «годовые /goroskop/{yyyy}/{znak}»).
 */
export async function ensureZodiacHoroscope(
  db: Db,
  llm: LlmProvider,
  period: HoroscopePeriod,
  topic: HoroscopeTopic,
  signEn: string,
  now: Date = new Date(),
): Promise<HoroscopeRow | null> {
  const dateKey = currentDateKeyFor(period, now);
  const existing = await findHoroscopeByKey(db, { scope: 'zodiac', sign: signEn, period, topic, dateKey, humor: false });
  if (existing) return existing;

  const events = await buildZodiacEventsFor(db, period, dateKey, now);
  const recentZachins = await findRecentZachinsForSigns(db, ZODIAC_SIGN_EN_SLUGS, period, topic, false);
  const items = await generateZodiacHoroscopeBatch({ period, topic, events, recentZachinsBySign: recentZachins, llm });

  let requested: HoroscopeRow | null = null;
  for (const item of items) {
    const row = await upsertHoroscope(db, {
      scope: 'zodiac',
      sign: item.sign,
      period,
      topic,
      dateKey,
      humor: false,
      bodyMd: item.bodyMd,
      astroEvents: events,
      status: item.flagged ? 'moderation' : 'published',
    });
    if (item.sign === signEn) requested = row;
  }
  return requested;
}

function easternYearAnimalAndElement(year: number): { animalIndex: number; elementIndex: number } {
  const pillar = computeFourPillars(year, 6, 15, 12).year;
  return { animalIndex: pillar.branchIndex, elementIndex: Math.floor((((pillar.stemIndex % 10) + 10) % 10) / 2) };
}

export async function ensureEasternHoroscope(db: Db, llm: LlmProvider, year: number, animalEn: string): Promise<HoroscopeRow | null> {
  const dateKey = String(year);
  const existing = await findHoroscopeByKey(db, { scope: 'eastern', sign: animalEn, period: 'year', topic: 'general', dateKey, humor: false });
  if (existing) return existing;

  const { animalIndex, elementIndex } = easternYearAnimalAndElement(year);
  const sharedEvents = buildEasternYearAstroEvents(dateKey, animalIndex, elementIndex, 0);
  const items = await generateEasternHoroscopeBatch({ events: sharedEvents, llm });

  let requested: HoroscopeRow | null = null;
  for (const item of items) {
    const subjectAnimalIndex = EASTERN_ANIMAL_SLUGS.indexOf(item.sign as (typeof EASTERN_ANIMAL_SLUGS)[number]);
    const perSubjectEvents = buildEasternYearAstroEvents(dateKey, animalIndex, elementIndex, subjectAnimalIndex);
    const row = await upsertHoroscope(db, {
      scope: 'eastern',
      sign: item.sign,
      period: 'year',
      topic: 'general',
      dateKey,
      humor: false,
      bodyMd: item.bodyMd,
      astroEvents: perSubjectEvents,
      status: item.flagged ? 'moderation' : 'published',
    });
    if (item.sign === animalEn) requested = row;
  }
  return requested;
}

export async function ensureLunarDayHoroscope(db: Db, n: number, now: Date = new Date()): Promise<HoroscopeRow> {
  if (!Number.isInteger(n) || n < 1 || n > LUNAR_DAY_COUNT) throw new Error(`ensureLunarDayHoroscope: некорректный номер дня ${n}`);
  const existing = await findLunarDayHoroscope(db, String(n));
  if (existing) return existing;

  const item = generateLunarDayHoroscope(n);
  const dateKey = toDateKeyDay(now);
  return upsertHoroscope(db, {
    scope: 'lunar_day',
    sign: item.sign,
    period: 'day',
    topic: 'general',
    dateKey,
    humor: false,
    bodyMd: item.bodyMd,
    astroEvents: buildLunarDayAstroEvents(dateKey, n),
    status: item.flagged ? 'moderation' : 'published',
  });
}

export async function ensureHumorZodiacHoroscope(db: Db, llm: LlmProvider, signEn: string, now: Date = new Date()): Promise<HoroscopeRow | null> {
  const dateKey = toDateKeyDay(now);
  const existing = await findHoroscopeByKey(db, { scope: 'zodiac', sign: signEn, period: 'day', topic: 'general', dateKey, humor: true });
  if (existing) return existing;

  const fact = await loadDaySkyFact(db, dateKey);
  const events = buildDayAstroEvents('day', fact);
  const recentZachins = await findRecentZachinsForSigns(db, ZODIAC_SIGN_EN_SLUGS, 'day', 'general', true);
  const items = await generateHumorZodiacBatch({ events, recentZachinsBySign: recentZachins, llm });

  let requested: HoroscopeRow | null = null;
  for (const item of items) {
    const row = await upsertHoroscope(db, {
      scope: 'zodiac',
      sign: item.sign,
      period: 'day',
      topic: 'general',
      dateKey,
      humor: true,
      bodyMd: item.bodyMd,
      astroEvents: events,
      status: item.flagged ? 'moderation' : 'published',
    });
    if (item.sign === signEn) requested = row;
  }
  return requested;
}

export async function ensureHumorProfessionHoroscope(db: Db, professionSlug: HoroscopeProfessionSlug, now: Date = new Date()): Promise<HoroscopeRow> {
  const dateKey = toDateKeyDay(now);
  const existing = await findHoroscopeByKey(db, { scope: 'profession', sign: professionSlug, period: 'day', topic: 'general', dateKey, humor: true });
  if (existing) return existing;

  const fact = await loadDaySkyFact(db, dateKey);
  const events = { ...buildDayAstroEvents('day', fact), scope: 'profession' as const };
  const item = generateHumorProfessionHoroscope(professionSlug, events);
  return upsertHoroscope(db, {
    scope: 'profession',
    sign: item.sign,
    period: 'day',
    topic: 'general',
    dateKey,
    humor: true,
    bodyMd: item.bodyMd,
    astroEvents: events,
    status: item.flagged ? 'moderation' : 'published',
  });
}
