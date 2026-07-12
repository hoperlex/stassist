import { eq } from 'drizzle-orm';
import { charts, type Db } from '@stassist/db';

export type ChartRow = typeof charts.$inferSelect;

export async function findChartById(db: Db, id: string): Promise<ChartRow | null> {
  const rows = await db.select().from(charts).where(eq(charts.id, id)).limit(1);
  return rows[0] ?? null;
}
