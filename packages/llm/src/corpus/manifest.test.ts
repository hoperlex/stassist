import { describe, expect, it } from 'vitest';
import { buildCorpus } from './build-corpus.js';
import { buildEditorialManifest, MAX_EDITORIAL_BATCH, type EditorialChunkEntry } from './manifest.js';

describe('buildEditorialManifest — детерминированный перечень для редактуры (блок A)', () => {
  const manifest = buildEditorialManifest();
  const corpus = buildCorpus();

  it('детерминирован: повторный вызов даёт побайтово тот же результат', () => {
    expect(buildEditorialManifest()).toEqual(manifest);
  });

  it('множество ключей манифеста ТОЧНО совпадает с buildCorpus().chunks (нет дрейфа)', () => {
    const manifestKeys = new Set(manifest.map((e) => e.key));
    const corpusKeys = new Set(corpus.chunks.map((c) => c.key));
    expect(manifestKeys.size).toBe(manifest.length); // нет дублей ключей в манифесте
    expect(manifest).toHaveLength(corpus.chunks.length);
    expect([...corpusKeys].every((k) => manifestKeys.has(k))).toBe(true);
    expect([...manifestKeys].every((k) => corpusKeys.has(k))).toBe(true);
  });

  it('tradition каждого ключа совпадает с buildCorpus', () => {
    const traditionByKey = new Map(corpus.chunks.map((c) => [c.key, c.tradition]));
    for (const e of manifest) expect(e.tradition).toBe(traditionByKey.get(e.key));
  });

  it('у каждой записи непустой бриф, валидная категория и lengthBand', () => {
    for (const e of manifest) {
      expect(e.brief.length).toBeGreaterThan(20);
      expect(e.category).toBeTruthy();
      expect(e.lengthBand[0]).toBeGreaterThan(0);
      expect(e.lengthBand[1]).toBeGreaterThan(e.lengthBand[0]);
    }
  });

  it('ни один editor-батч не превышает MAX_EDITORIAL_BATCH', () => {
    const byBatch = new Map<string, EditorialChunkEntry[]>();
    for (const e of manifest) {
      const b = byBatch.get(e.batchId) ?? [];
      b.push(e);
      byBatch.set(e.batchId, b);
    }
    for (const [, entries] of byBatch) expect(entries.length).toBeLessThanOrEqual(MAX_EDITORIAL_BATCH);
  });

  it('внутри одного батча — ровно одна категория (дедуп-критик работает по категории)', () => {
    const catByBatch = new Map<string, Set<string>>();
    for (const e of manifest) {
      const s = catByBatch.get(e.batchId) ?? new Set<string>();
      s.add(e.category);
      catByBatch.set(e.batchId, s);
    }
    for (const [, cats] of catByBatch) expect(cats.size).toBe(1);
  });

  it('распределение по категориям соответствует объёму корпуса (1601 чанк)', () => {
    const byCategory = manifest.reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + 1;
      return acc;
    }, {});
    expect(byCategory.arcanum).toBe(660);
    expect(byCategory.aspect_between).toBe(425); // 45 пар×5 + 4 точки×10×5; 11 обзоров аспектов — отдельно
    expect(byCategory.overview_aspect).toBe(11);
    expect(byCategory.planet_in_sign).toBe(120);
    expect(byCategory.planet_in_house).toBe(120);
    expect(byCategory.numerology).toBe(88);
    expect(byCategory.point_in_sign).toBe(60);
    expect(byCategory.point_in_house).toBe(60);
    expect(byCategory.asc_in_sign).toBe(12);
    expect(manifest).toHaveLength(1601);
  });
});
