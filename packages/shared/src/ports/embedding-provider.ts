/**
 * Порт провайдера эмбеддингов (для pgvector RAG, док. 22 §6: interpretation_chunks.embedding
 * vector(1024)). Реальный адаптер — Ф4 (`packages/llm`); стаб — детерминированный вектор
 * фиксированной размерности, вычисленный хэшированием текста (без сети).
 */
import { createHash } from 'node:crypto';

export interface EmbeddingProvider {
  readonly name: string;
  readonly dimensions: number;
  embed(text: string): Promise<number[]>;
}

const DIMENSIONS = 1024;

export class StubEmbeddingProvider implements EmbeddingProvider {
  readonly name = 'stub';
  readonly dimensions = DIMENSIONS;

  async embed(text: string): Promise<number[]> {
    const vector = new Array<number>(this.dimensions);
    let seed = createHash('sha256').update(text).digest();
    for (let i = 0; i < this.dimensions; i += 1) {
      if (i > 0 && i % seed.length === 0) {
        seed = createHash('sha256').update(seed).digest();
      }
      const byte = seed[i % seed.length] ?? 0;
      // Нормируем в [-1, 1], детерминированно относительно text.
      vector[i] = (byte / 255) * 2 - 1;
    }
    return vector;
  }
}
