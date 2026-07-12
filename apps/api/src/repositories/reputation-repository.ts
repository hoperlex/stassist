/**
 * reputation — очки/бейджи (req.2 промта Ф7). `addPoints` — upsert атомарный
 * (INSERT..ON CONFLICT DO UPDATE), пересчитывает бейджи через `badgesForScore` (чистая функция,
 * @stassist/shared) при каждом начислении.
 */
import { eq, sql } from 'drizzle-orm';
import { reputation, type Db } from '@stassist/db';
import { badgesForScore } from '@stassist/shared';

export type ReputationRow = typeof reputation.$inferSelect;

export async function getReputation(db: Db, userId: string): Promise<ReputationRow | null> {
  const rows = await db.select().from(reputation).where(eq(reputation.userId, userId)).limit(1);
  return rows[0] ?? null;
}

export async function addPoints(db: Db, userId: string, points: number): Promise<ReputationRow> {
  const existing = await getReputation(db, userId);
  const newScore = (existing?.score ?? 0) + points;
  const badges = badgesForScore(newScore);

  if (!existing) {
    const [row] = await db.insert(reputation).values({ userId, score: newScore, badges }).returning();
    if (!row) throw new Error('addPoints: INSERT не вернул строку');
    return row;
  }
  const [row] = await db
    .update(reputation)
    .set({ score: sql`${reputation.score} + ${points}`, badges, updatedAt: new Date() })
    .where(eq(reputation.userId, userId))
    .returning();
  if (!row) throw new Error('addPoints: UPDATE не вернул строку');
  return row;
}
