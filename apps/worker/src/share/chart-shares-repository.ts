import { eq, isNull } from 'drizzle-orm';
import { chartShares, type Db } from '@stassist/db';

export type ChartShareRow = typeof chartShares.$inferSelect;

export async function findPendingChartShares(db: Db, limit = 20): Promise<ChartShareRow[]> {
  return db.select().from(chartShares).where(isNull(chartShares.ogImageKey)).limit(limit);
}

export async function markOgImageGenerated(db: Db, id: string, ogImageKey: string): Promise<void> {
  await db.update(chartShares).set({ ogImageKey, updatedAt: new Date() }).where(eq(chartShares.id, id));
}
