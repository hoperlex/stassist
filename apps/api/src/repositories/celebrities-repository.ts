/**
 * celebrities — чтение (публичное, галерея `/karta/{celebrity}`) + импорт (роль admin, CSV — см.
 * routes/celebrities.ts, `celebrityCsvRowSchema` в @stassist/shared).
 */
import { and, eq, ilike, or } from 'drizzle-orm';
import { celebrities, type Db } from '@stassist/db';
import type { CelebrityBirthData, CelebrityCsvRow } from '@stassist/shared';

export type CelebrityRow = typeof celebrities.$inferSelect;

export async function listCelebrities(db: Db, params: { category?: string; q?: string; limit: number }): Promise<CelebrityRow[]> {
  const conditions = [
    params.category ? eq(celebrities.category, params.category) : undefined,
    params.q ? ilike(celebrities.name, `%${params.q}%`) : undefined,
  ].filter((c): c is NonNullable<typeof c> => c !== undefined);

  return db
    .select()
    .from(celebrities)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(celebrities.name)
    .limit(params.limit);
}

export async function getCelebrityBySlug(db: Db, slug: string): Promise<CelebrityRow | null> {
  const rows = await db.select().from(celebrities).where(eq(celebrities.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getCelebrityById(db: Db, id: string): Promise<CelebrityRow | null> {
  const rows = await db.select().from(celebrities).where(eq(celebrities.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function findCelebritiesBySlugOrName(db: Db, slugOrName: string): Promise<CelebrityRow | null> {
  const rows = await db
    .select()
    .from(celebrities)
    .where(or(eq(celebrities.slug, slugOrName), eq(celebrities.name, slugOrName)))
    .limit(1);
  return rows[0] ?? null;
}

function rowToBirthData(row: CelebrityCsvRow): CelebrityBirthData {
  return {
    date: row.date ?? null,
    time: row.time ?? null,
    timeUnknown: row.timeUnknown,
    placeName: row.placeName ?? null,
    lat: row.lat ?? null,
    lon: row.lon ?? null,
    tzId: row.tzId ?? null,
    rodden: row.rodden,
    source: row.source ?? null,
    verified: row.verified,
    note: row.note ?? null,
  };
}

/** Идемпотентный upsert по `slug` — используется CSV-импортом (`POST /celebrities/import`,
 *  роль admin) и напрямую `tools/gen-celebrities.ts`-семейством скриптов при необходимости. */
export async function upsertCelebrity(db: Db, row: CelebrityCsvRow): Promise<{ inserted: boolean }> {
  const existing = await db.select({ id: celebrities.id }).from(celebrities).where(eq(celebrities.slug, row.slug)).limit(1);
  const birthData = rowToBirthData(row);
  if (existing[0]) {
    await db
      .update(celebrities)
      .set({ name: row.name, category: row.category ?? null, wikiUrl: row.wikiUrl ?? null, birthData, updatedAt: new Date() })
      .where(eq(celebrities.id, existing[0].id));
    return { inserted: false };
  }
  await db.insert(celebrities).values({ name: row.name, slug: row.slug, category: row.category ?? null, wikiUrl: row.wikiUrl ?? null, birthData });
  return { inserted: true };
}
