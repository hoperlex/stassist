/**
 * Порт доступа к корпусу (`interpretation_chunks`) — `packages/llm` НЕ зависит от `@stassist/db`
 * (§2 конвенций реализации: слой абстракции провайдеров/портов, реальный Drizzle-адаптер живёт в
 * apps/api и apps/worker, которые уже зависят от @stassist/db). Юнит-тесты ретривера используют
 * `InMemoryChunkRepository` — без БД.
 */
import type { InterpretationQuality, InterpretationTradition } from '@stassist/shared';

export interface StoredChunk {
  key: string;
  tradition: InterpretationTradition;
  text: string;
  quality: InterpretationQuality;
  version: number;
}

export interface ChunkRepository {
  /** Точный ретрив по ключам (см. §8 промта Ф4: обязан работать без эмбеддингов). Возвращает
   *  только найденные — вызывающий код (retriever.ts) сам решает, что делать с недостающими. */
  getByKeys(keys: string[]): Promise<StoredChunk[]>;
  /** Семантический (опциональный) поиск по вектору эмбеддинга вопроса — pgvector cosine distance.
   *  Может не поддерживаться (напр. в юнит-тестах) — тогда просто верните []. */
  semanticSearch(embedding: number[], limit: number): Promise<StoredChunk[]>;
}

export class InMemoryChunkRepository implements ChunkRepository {
  private readonly byKey = new Map<string, StoredChunk>();

  constructor(chunks: StoredChunk[] = []) {
    for (const c of chunks) this.byKey.set(c.key, c);
  }

  add(chunk: StoredChunk): void {
    this.byKey.set(chunk.key, chunk);
  }

  async getByKeys(keys: string[]): Promise<StoredChunk[]> {
    const out: StoredChunk[] = [];
    for (const k of keys) {
      const found = this.byKey.get(k);
      if (found) out.push(found);
    }
    return out;
  }

  async semanticSearch(_embedding: number[], _limit: number): Promise<StoredChunk[]> {
    return [];
  }
}
