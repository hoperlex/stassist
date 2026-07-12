/**
 * stones — витрина камней (см. packages/db/src/schema/stones.ts). Фильтры (знак/планета/
 * назначение/цвет/аркан) комбинируются через AND — массивные колонки фильтруются оператором
 * Postgres `= ANY(...)` (значение содержится в массиве), см. req.4 промта Ф6.
 */
import { and, eq, sql } from 'drizzle-orm';
import { stones, type Db } from '@stassist/db';
import type { StoneListQuery } from '@stassist/shared';

export type StoneRow = typeof stones.$inferSelect;

export async function listStones(db: Db, query: StoneListQuery): Promise<StoneRow[]> {
  const conditions = [];
  if (query.sign) conditions.push(sql`${query.sign} = ANY(${stones.zodiacSigns})`);
  if (query.planet) conditions.push(sql`${query.planet} = ANY(${stones.planets})`);
  if (query.purpose) conditions.push(sql`${query.purpose} = ANY(${stones.purposes})`);
  if (query.color) conditions.push(sql`${query.color} = ANY(${stones.colors})`);
  if (query.arcanum) conditions.push(sql`${query.arcanum} = ANY(${stones.arcana})`);

  const rows =
    conditions.length > 0
      ? await db
          .select()
          .from(stones)
          .where(and(...conditions))
          .orderBy(stones.name)
      : await db.select().from(stones).orderBy(stones.name);
  return rows;
}

export async function getStoneBySlug(db: Db, slug: string): Promise<StoneRow | null> {
  const rows = await db.select().from(stones).where(eq(stones.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function listAllStoneSlugs(db: Db): Promise<string[]> {
  const rows = await db.select({ slug: stones.slug }).from(stones);
  return rows.map((r) => r.slug);
}
