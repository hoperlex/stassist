/**
 * Ф7 req.1/2: «Наполни стартовый набор» вики-статей — этот тест проверяет ПОЛНОТУ и непустоту
 * (см. §6 конвенций реализации «правило непустоты») детерминированного генератора, без БД/сети.
 */
import { describe, expect, it } from 'vitest';
import { buildWikiArticleDrafts } from './wiki-content.js';

describe('buildWikiArticleDrafts', () => {
  const drafts = buildWikiArticleDrafts();

  it('покрывает обязательный минимум MVP: знаки(12) + планеты(14) + дома(12) + аспекты(7)', () => {
    const bySection = (section: string) => drafts.filter((d) => d.section === section);
    expect(bySection('signs')).toHaveLength(12);
    expect(bySection('planets')).toHaveLength(14);
    expect(bySection('houses')).toHaveLength(12);
    expect(bySection('aspects')).toHaveLength(7);
  });

  it('наполняет остальные разделы промта (schools/arcana/lunar_days/nakshatras/stones/glossary)', () => {
    const bySection = (section: string) => drafts.filter((d) => d.section === section);
    expect(bySection('schools')).toHaveLength(6);
    expect(bySection('arcana')).toHaveLength(22);
    expect(bySection('lunar_days')).toHaveLength(30);
    expect(bySection('nakshatras')).toHaveLength(27);
    expect(bySection('stones').length).toBeGreaterThan(0);
    expect(bySection('glossary').length).toBeGreaterThanOrEqual(50);
  });

  it('все статьи имеют непустой bodyMd и уникальный slug в пределах раздела', () => {
    for (const d of drafts) {
      expect(d.bodyMd.trim().length).toBeGreaterThan(20);
      expect(d.title.trim().length).toBeGreaterThan(0);
    }
    const bySection = new Map<string, Set<string>>();
    for (const d of drafts) {
      const set = bySection.get(d.section) ?? new Set<string>();
      expect(set.has(d.slug)).toBe(false);
      set.add(d.slug);
      bySection.set(d.section, set);
    }
  });

  it('слаги всех статей глобально уникальны (wiki_articles.slug — unique без учёта раздела)', () => {
    const slugs = drafts.map((d) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('арканы содержат название карты в заголовке (напр. «Аркан 1 — Маг»)', () => {
    const arkan1 = drafts.find((d) => d.slug === 'arkan-1');
    expect(arkan1?.title).toContain('Маг');
  });
});
