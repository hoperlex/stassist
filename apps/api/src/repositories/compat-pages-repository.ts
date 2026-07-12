import { and, eq } from 'drizzle-orm';
import { compatPages, type Db } from '@stassist/db';

export type CompatPageRow = typeof compatPages.$inferSelect;

/** `signA`/`signB` уже ожидаются в каноническом порядке (см. canonicalCompatPairSlug). */
export async function findCompatPage(db: Db, signA: string, signB: string): Promise<CompatPageRow | null> {
  const rows = await db
    .select()
    .from(compatPages)
    .where(and(eq(compatPages.signA, signA), eq(compatPages.signB, signB)))
    .limit(1);
  return rows[0] ?? null;
}
