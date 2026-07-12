/**
 * Тот же адаптер, что apps/worker/src/llm/drizzle-chunk-repository.ts (см. doc-комментарий там —
 * `@stassist/llm` намеренно не зависит от `@stassist/db`, каждое приложение — свой composition
 * root — собирает адаптер само; см. также route-context.ts про паттерн наложения реальных портов
 * поверх createPorts()). Используется для синхронной генерации `kind='big3'` прямо в API-роуте.
 */
import { inArray, sql } from 'drizzle-orm';
import { interpretationChunks, type Db } from '@stassist/db';
import type { ChunkRepository, StoredChunk } from '@stassist/llm';

function toStoredChunk(row: typeof interpretationChunks.$inferSelect): StoredChunk {
  return { key: row.key, tradition: row.tradition, text: row.text, quality: row.quality, version: row.version };
}

export class DrizzleChunkRepository implements ChunkRepository {
  constructor(private readonly db: Db) {}

  async getByKeys(keys: string[]): Promise<StoredChunk[]> {
    if (keys.length === 0) return [];
    const rows = await this.db.select().from(interpretationChunks).where(inArray(interpretationChunks.key, keys));
    return rows.map(toStoredChunk);
  }

  async semanticSearch(embedding: number[], limit: number): Promise<StoredChunk[]> {
    if (embedding.length === 0) return [];
    const vectorLiteral = `[${embedding.join(',')}]`;
    const rows = await this.db
      .select()
      .from(interpretationChunks)
      .where(sql`${interpretationChunks.embedding} IS NOT NULL`)
      .orderBy(sql`${interpretationChunks.embedding} <=> ${vectorLiteral}::vector`)
      .limit(limit);
    return rows.map(toStoredChunk);
  }
}
