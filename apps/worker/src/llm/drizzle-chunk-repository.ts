/**
 * Реальный (Drizzle/Postgres) адаптер порта `ChunkRepository` из `@stassist/llm` (см. doc-
 * комментарий в packages/llm/src/rag/chunk-repository.ts — пакет llm сам не зависит от БД).
 * Точный ретрив — по `interpretation_chunks.key IN (...)`. Семантический — pgvector cosine
 * (`<=>` оператор) через сырое `sql` (drizzle не имеет типизированного helper'а под
 * кастомный `vector`-тип из коробки); при `EMBED_PROVIDER=stub`/отсутствии эмбеддингов в
 * корпусе просто вернёт [] — ретрив по ключу и так не зависит от этого (§8 промта Ф4).
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
