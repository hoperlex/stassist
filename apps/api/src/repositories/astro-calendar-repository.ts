import { and, asc, eq, gte, lte } from 'drizzle-orm';
import { astroCalendar, type Db } from '@stassist/db';
import type { AstroCalendarWindowDay } from '@stassist/astro-core';

export type AstroCalendarRow = typeof astroCalendar.$inferSelect;

/** Последний день месяца `yyyyMm` ('YYYY-MM'), 1..31. Используется и здесь, и в
 *  `apps/api/src/lunar-calendar/lazy-generate.ts` (находка [lunnyj-kalendar-empty]). */
export function daysInMonth(yyyyMm: string): number {
  const [y, m] = yyyyMm.split('-').map(Number) as [number, number];
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

/** Строки предрасчёта за месяц `yyyyMm` ('YYYY-MM'), отсортированные по дате. */
export async function findAstroCalendarMonth(db: Db, yyyyMm: string): Promise<AstroCalendarRow[]> {
  const from = `${yyyyMm}-01`;
  const to = `${yyyyMm}-${String(daysInMonth(yyyyMm)).padStart(2, '0')}`;
  return db
    .select()
    .from(astroCalendar)
    .where(and(gte(astroCalendar.date, from), lte(astroCalendar.date, to)))
    .orderBy(asc(astroCalendar.date));
}

/**
 * Idempotent upsert по `date` — та же логика, что `apps/worker/src/astro-calendar/
 * upsert-window.ts` (worker'у НЕДОСТУПЕН этот модуль, apps/api тоже не зависит от apps/worker —
 * см. прецедент `apps/worker/src/llm/drizzle-chunk-repository.ts`, поэтому логика продублирована,
 * а не переиспользована буквально). Используется ленивой генерацией «при заходе» (находка
 * [lunnyj-kalendar-empty], см. `apps/api/src/lunar-calendar/lazy-generate.ts`).
 */
export async function upsertAstroCalendarDays(db: Db, days: readonly AstroCalendarWindowDay[]): Promise<void> {
  for (const day of days) {
    const moonSignIntervals = [{ signIndex: day.moonSignIndex }];
    const lunarDays = [{ lunarDay: day.lunarDay }];
    const voids = day.isVoidOfCourse ? [{ fromIso: day.voidFromIso, toIso: day.voidToIso }] : [];
    const phases = { phaseName: day.phaseName, phaseAngleDeg: day.phaseAngleDeg };

    await db
      .insert(astroCalendar)
      .values({
        date: day.date,
        moonSignIntervals,
        lunarDays,
        voids,
        phases,
        retrogrades: day.retrogradeBodies,
        ingresses: day.signIngresses,
        computed: true,
      })
      .onConflictDoUpdate({
        target: astroCalendar.date,
        set: {
          moonSignIntervals,
          lunarDays,
          voids,
          phases,
          retrogrades: day.retrogradeBodies,
          ingresses: day.signIngresses,
          computed: true,
          updatedAt: new Date(),
        },
      });
  }
}

/** Строка за одну дату (см. Ф5 apps/api/src/horoscope/lazy-generate.ts — ленивая генерация
 *  гороскопов читает то же самое предрасчитанное небо, что и worker, см. requirement 4 промта). */
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
