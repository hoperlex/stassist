import { describe, expect, it } from 'vitest';
import { StubEmbeddingProvider } from './embedding-provider.js';

describe('StubEmbeddingProvider', () => {
  it('возвращает вектор фиксированной размерности 1024', async () => {
    const provider = new StubEmbeddingProvider();
    const vector = await provider.embed('текст для эмбеддинга');
    expect(vector).toHaveLength(1024);
    expect(vector.every((v) => v >= -1 && v <= 1)).toBe(true);
  });

  it('детерминирован для одинакового текста', async () => {
    const provider = new StubEmbeddingProvider();
    const a = await provider.embed('одинаковый текст');
    const b = await provider.embed('одинаковый текст');
    expect(a).toEqual(b);
  });
});
