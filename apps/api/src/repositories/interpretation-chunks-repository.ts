import { inArray } from 'drizzle-orm';
import { interpretationChunks, type Db } from '@stassist/db';

export type InterpretationChunkRow = typeof interpretationChunks.$inferSelect;

export async function findInterpretationChunksByKeys(db: Db, keys: string[]): Promise<InterpretationChunkRow[]> {
  if (keys.length === 0) return [];
  return db.select().from(interpretationChunks).where(inArray(interpretationChunks.key, keys));
}
