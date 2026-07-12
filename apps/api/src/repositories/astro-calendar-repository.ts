import { and, asc, gte, lte } from 'drizzle-orm';
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
