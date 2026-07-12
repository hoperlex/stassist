import { and, asc, eq, gte, lte } from 'drizzle-orm';
import { astroCalendar, type Db } from '@stassist/db';

export type AstroCalendarRow = typeof astroCalendar.$inferSelect;

/** Строки предрасчёта за месяц `yyyyMm` ('YYYY-MM'), отсортированные по дате. */
export async function findAstroCalendarMonth(db: Db, yyyyMm: string): Promise<AstroCalendarRow[]> {
  const from = `${yyyyMm}-01`;
  const [y, m] = yyyyMm.split('-').map(Number) as [number, number];
  const lastDay = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const to = `${yyyyMm}-${String(lastDay).padStart(2, '0')}`;
  return db
    .select()
    .from(astroCalendar)
    .where(and(gte(astroCalendar.date, from), lte(astroCalendar.date, to)))
    .orderBy(asc(astroCalendar.date));
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
