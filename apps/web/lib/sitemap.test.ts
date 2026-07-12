import { describe, expect, it } from 'vitest';
import { buildAllSitemapUrls, buildSitemapXml, compatPairUrls, lunarCalendarMonthUrls } from './sitemap.js';

describe('compatPairUrls', () => {
  it('содержит ровно 78 канонических пар (без зеркал)', () => {
    const urls = compatPairUrls();
    expect(urls).toHaveLength(78);
    expect(new Set(urls.map((u) => u.path)).size).toBe(78);
    expect(urls.some((u) => u.path === '/sovmestimost/oven-i-telec')).toBe(true);
    expect(urls.some((u) => u.path === '/sovmestimost/telec-i-oven')).toBe(false);
  });
});

describe('lunarCalendarMonthUrls', () => {
  it('строит текущий месяц + N следующих, переходя через год', () => {
    const urls = lunarCalendarMonthUrls(new Date(Date.UTC(2026, 11, 15)), 2);
    expect(urls.map((u) => u.path)).toEqual([
      '/lunnyj-kalendar/2026-12',
      '/lunnyj-kalendar/2027-01',
      '/lunnyj-kalendar/2027-02',
    ]);
  });
});

describe('buildSitemapXml', () => {
  it('строит валидный XML с абсолютными URL', () => {
    const xml = buildSitemapXml('https://stassist.ru', [{ path: '/natalnaya-karta' }]);
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<loc>https://stassist.ru/natalnaya-karta</loc>');
  });
});

describe('buildAllSitemapUrls', () => {
  it('объединяет статические калькуляторы, 78 пар и месяцы лунного календаря без дублей', () => {
    const urls = buildAllSitemapUrls(new Date(Date.UTC(2026, 0, 1)));
    const paths = urls.map((u) => u.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain('/natalnaya-karta');
    expect(paths).toContain('/lunnyj-kalendar/2026-01');
  });
});
