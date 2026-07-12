import { describe, expect, it } from 'vitest';
import { InMemoryChunkRepository, type StoredChunk } from './chunk-repository.js';
import { retrieveForFacts, retrieveSemantic } from './retriever.js';

function stored(key: string): StoredChunk {
  return { key, tradition: 'western', text: `текст для ${key}`, quality: 'draft', version: 1 };
}

describe('retrieveForFacts', () => {
  it('точный ретрив находит чанк по ключу без эмбеддингов (§8 промта Ф4)', async () => {
    const repo = new InMemoryChunkRepository([stored('planet_in_sign:mars:leo')]);
    const result = await retrieveForFacts(['planet_in_sign:mars:leo'], repo);
    expect(result.chunks).toHaveLength(1);
    expect(result.usedKeys[0]).toMatchObject({ requestedKey: 'planet_in_sign:mars:leo', resolvedKey: 'planet_in_sign:mars:leo', fallback: false });
    expect(result.missingKeys).toEqual([]);
  });

  it('откатывается на aspect:<angle>:overview, если точного aspect-чанка нет', async () => {
    const repo = new InMemoryChunkRepository([stored('aspect:square:overview')]);
    const result = await retrieveForFacts(['aspect:south_node:square:chiron'], repo);
    expect(result.chunks).toHaveLength(1);
    expect(result.chunks[0]!.key).toBe('aspect:square:overview');
    expect(result.usedKeys[0]).toMatchObject({ fallback: true, resolvedKey: 'aspect:square:overview' });
    expect(result.missingKeys).toEqual([]);
  });

  it('не выдумывает: ключ без чанка и без отката попадает в missingKeys, а не в chunks', async () => {
    const repo = new InMemoryChunkRepository([]);
    const result = await retrieveForFacts(['planet_in_sign:mars:leo'], repo);
    expect(result.chunks).toEqual([]);
    expect(result.missingKeys).toEqual(['planet_in_sign:mars:leo']);
  });

  it('не дублирует один и тот же чанк в chunks[], если на него ссылаются несколько ключей', async () => {
    const repo = new InMemoryChunkRepository([stored('aspect:square:overview')]);
    const result = await retrieveForFacts(['aspect:a:square:b', 'aspect:c:square:d'], repo);
    expect(result.chunks).toHaveLength(1);
    expect(result.usedKeys).toHaveLength(2);
  });

  it('кэш повторного запроса того же набора ключей не требует LLM (сам ретривер не вызывает провайдера)', async () => {
    const repo = new InMemoryChunkRepository([stored('sign:aries:overview')]);
    const a = await retrieveForFacts(['sign:aries:overview'], repo);
    const b = await retrieveForFacts(['sign:aries:overview'], repo);
    expect(a).toEqual(b);
  });
});

describe('retrieveSemantic', () => {
  it('возвращает [] когда репозиторий не поддерживает семантику (in-memory)', async () => {
    const repo = new InMemoryChunkRepository([stored('sign:aries:overview')]);
    const result = await retrieveSemantic([0.1, 0.2], repo, 3);
    expect(result).toEqual([]);
  });
});
