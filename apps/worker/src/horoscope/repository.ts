/**
 * Репозиторий `horoscopes` для worker-пайплайна (см. requirement 1 промта Ф5: идемпотентность,
 * антидубляж, автомодерация). Дублирует небольшой набор запросов с будущим apps/api-репозиторием
 * (см. apps/api/src/repositories/horoscopes-repository.ts) — тот же прецедент, что
 * `apps/worker/src/llm/drizzle-chunk-repository.ts` vs `apps/api/src/repositories/
 * interpretation-chunks-repository.ts` (разные приложения, каждое со своим тонким слоем доступа
 * к БД поверх общей Drizzle-схемы `@stassist/db`).
 */
import { and, asc, desc, eq, gte, lte } from 'drizzle-orm';
import { astroCalendar, horoscopes, type Db } from '@stassist/db';
import type { HoroscopePeriod, HoroscopeScope, HoroscopeStatus, HoroscopeTopic } from '@stassist/shared';
import { extractZachin, type HoroscopeAstroEvents } from '@stassist/llm';
import type { AstroCalendarRow } from './astro-day-facts.js';

/** Строка `astro_calendar` за конкретную дату (может отсутствовать — worker ещё не досчитал,
 *  см. requirement 6 промта Ф5 и находку [полнота] «дублирование astro_calendar и Ф5»). */
export async function findAstroCalendarDay(db: Db, dateIso: string): Promise<AstroCalendarRow | null> {
  const rows = await db.select().from(astroCalendar).where(eq(astroCalendar.date, dateIso)).limit(1);
  return rows[0] ?? null;
}

export async function findAstroCalendarRange(db: Db, fromIso: string, toIso: string): Promise<AstroCalendarRow[]> {
  return db
    .select()
    .from(astroCalendar)
    .where(and(gte(astroCalendar.date, fromIso), lte(astroCalendar.date, toIso)))
    .orderBy(asc(astroCalendar.date));
}

export type HoroscopeRow = typeof horoscopes.$inferSelect;

export interface HoroscopeUniqueKey {
  scope: HoroscopeScope;
  sign: string;
  period: HoroscopePeriod;
  topic: HoroscopeTopic;
  dateKey: string;
  humor: boolean;
}

export async function findHoroscopeByKey(db: Db, key: HoroscopeUniqueKey): Promise<HoroscopeRow | null> {
  const rows = await db
    .select()
    .from(horoscopes)
    .where(
      and(
        eq(horoscopes.scope, key.scope),
        eq(horoscopes.sign, key.sign),
        eq(horoscopes.period, key.period),
        eq(horoscopes.topic, key.topic),
        eq(horoscopes.dateKey, key.dateKey),
        eq(horoscopes.humor, key.humor),
      ),
    )
    .limit(1);
  return rows[0] ?? null;
}

/** scope='lunar_day' — evergreen (см. doc-комментарий packages/db/src/schema/horoscopes.ts):
 *  идемпотентность игнорирует `dateKey`, проверяем только «есть ли ВООБЩЕ строка на этот день». */
export async function findLunarDayHoroscope(db: Db, dayNumber: string): Promise<HoroscopeRow | null> {
  const rows = await db
    .select()
    .from(horoscopes)
    .where(and(eq(horoscopes.scope, 'lunar_day'), eq(horoscopes.sign, dayNumber), eq(horoscopes.humor, false)))
    .limit(1);
  return rows[0] ?? null;
}

export interface UpsertHoroscopeInput extends HoroscopeUniqueKey {
  bodyMd: string;
  astroEvents: HoroscopeAstroEvents;
  status: HoroscopeStatus;
}

export interface UpsertResult {
  written: boolean;
  row: HoroscopeRow;
}

/**
 * Идемпотентный upsert (требование 1 промта: «идемпотентность: uniq-ключ; перегенерация только
 * с флагом force»). Без `force` и при существующей строке — НЕ дёргает запись повторно (кроме
 * простого чтения), чтобы повторный прогон cron не создавал дублей и не тратил LLM впустую (см.
 * раздел «Верификация» промта: «повторный запуск cron не создаёт дублей и не дёргает LLM»).
 */
export async function upsertHoroscope(db: Db, input: UpsertHoroscopeInput, force: boolean): Promise<UpsertResult> {
  if (!force) {
    const existing = await findHoroscopeByKey(db, input);
    if (existing) return { written: false, row: existing };
  }

  const [row] = await db
    .insert(horoscopes)
    .values({
      scope: input.scope,
      sign: input.sign,
      period: input.period,
      topic: input.topic,
      dateKey: input.dateKey,
      bodyMd: input.bodyMd,
      humor: input.humor,
      astroEvents: input.astroEvents,
      status: input.status,
      publishedAt: input.status === 'published' ? new Date() : null,
    })
    .onConflictDoUpdate({
      target: [horoscopes.scope, horoscopes.sign, horoscopes.period, horoscopes.topic, horoscopes.dateKey, horoscopes.humor],
      set: {
        bodyMd: input.bodyMd,
        astroEvents: input.astroEvents,
        status: input.status,
        publishedAt: input.status === 'published' ? new Date() : null,
        updatedAt: new Date(),
      },
    })
    .returning();
  if (!row) throw new Error('upsertHoroscope: INSERT/UPDATE не вернул строку');
  return { written: true, row };
}

const RECENT_ZACHINS_LIMIT = 7;

/** Последние 7 зачинов (см. requirement 1 промта: «передавать список зачинов» в антидубляж).
 *  Сортировка по `date_key` DESC — форматы YYYY-MM-DD/YYYY-Www/YYYY-MM/YYYY сортируются
 *  лексикографически корректно по хронологии (см. apps/worker/src/horoscope/date-keys.ts). */
export async function findRecentZachins(
  db: Db,
  scope: HoroscopeScope,
  sign: string,
  period: HoroscopePeriod,
  topic: HoroscopeTopic,
  humor: boolean,
): Promise<string[]> {
  const rows = await db
    .select({ bodyMd: horoscopes.bodyMd })
    .from(horoscopes)
    .where(
      and(
        eq(horoscopes.scope, scope),
        eq(horoscopes.sign, sign),
        eq(horoscopes.period, period),
        eq(horoscopes.topic, topic),
        eq(horoscopes.humor, humor),
      ),
    )
    .orderBy(desc(horoscopes.dateKey))
    .limit(RECENT_ZACHINS_LIMIT);
  return rows.map((r) => extractZachin(r.bodyMd));
}

/** Для алерта «дневной комплект не готов к 01:00 МСК» (требование 7 промта Ф5) — считает ТОЛЬКО
 *  `status='published'` (moderation-очередь = страница ещё не живая, см. requirement 7). */
export async function countPublishedHoroscopesForDate(db: Db, scope: HoroscopeScope, period: HoroscopePeriod, dateKey: string): Promise<number> {
  const rows = await db
    .select({ id: horoscopes.id })
    .from(horoscopes)
    .where(
      and(
        eq(horoscopes.scope, scope),
        eq(horoscopes.period, period),
        eq(horoscopes.dateKey, dateKey),
        eq(horoscopes.humor, false),
        eq(horoscopes.status, 'published'),
      ),
    );
  return rows.length;
}

/**
 * Сколько знаков УЖЕ имеют строку по этому (scope,period,topic,dateKey,humor) — вызывающий код
 * (jobs.ts) обязан свериться с этим ПЕРЕД вызовом батч-генератора: идемпотентность обязана
 * останавливать вызов LLM, а не только запись в БД (см. requirement 1 промта Ф5 «повторный запуск
 * cron не создаёт дублей и не дёргает LLM» — если проверять идемпотентность только на уровне
 * upsert ПОСЛЕ генерации, батч-вызов `llm.generate()` всё равно происходил бы каждый прогон).
 */
export async function countExistingSignsForKey(
  db: Db,
  scope: HoroscopeScope,
  period: HoroscopePeriod,
  topic: HoroscopeTopic,
  dateKey: string,
  humor: boolean,
): Promise<number> {
  const rows = await db
    .select({ id: horoscopes.id })
    .from(horoscopes)
    .where(
      and(
        eq(horoscopes.scope, scope),
        eq(horoscopes.period, period),
        eq(horoscopes.topic, topic),
        eq(horoscopes.dateKey, dateKey),
        eq(horoscopes.humor, humor),
      ),
    );
  return rows.length;
}

/** Зачины последних 7 выпусков для КАЖДОГО из перечисленных знаков (по одному запросу на знак —
 *  объём батча (12 знаков) мал, усложнять до одного оконного SQL-запроса не оправдано на MVP). */
export async function findRecentZachinsForSigns(
  db: Db,
  scope: HoroscopeScope,
  signs: readonly string[],
  period: HoroscopePeriod,
  topic: HoroscopeTopic,
  humor: boolean,
): Promise<Record<string, string[]>> {
  const out: Record<string, string[]> = {};
  for (const sign of signs) {
    out[sign] = await findRecentZachins(db, scope, sign, period, topic, humor);
  }
  return out;
}
