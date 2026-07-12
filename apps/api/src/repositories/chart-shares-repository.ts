import { eq } from 'drizzle-orm';
import { chartShares, type Db } from '@stassist/db';
import type { ChartShareCreateRequest } from '@stassist/shared';

export type ChartShareRow = typeof chartShares.$inferSelect;

export async function findChartShareBySlug(db: Db, slug: string): Promise<ChartShareRow | null> {
  const rows = await db.select().from(chartShares).where(eq(chartShares.slug, slug)).limit(1);
  return rows[0] ?? null;
}

/** Идемпотентно: при совпадении слага (тот же обезличенный результат) — просто возвращает строку. */
export async function upsertChartShare(
  db: Db,
  slug: string,
  input: ChartShareCreateRequest,
): Promise<ChartShareRow> {
  const [row] = await db
    .insert(chartShares)
    .values({
      slug,
      kind: input.kind,
      positions: input.positions,
      positionsB: input.positionsB ?? null,
      caption: input.caption ?? null,
      theme: input.theme,
    })
    .onConflictDoNothing({ target: chartShares.slug })
    .returning();
  if (row) return row;
  const existing = await findChartShareBySlug(db, slug);
  if (!existing) throw new Error('upsertChartShare: строка не найдена ни после INSERT, ни после конфликта');
  return existing;
}
