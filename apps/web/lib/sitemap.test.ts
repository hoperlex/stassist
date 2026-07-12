import { describe, expect, it } from 'vitest';
import {
  buildAllSitemapUrls,
  buildSitemapXml,
  compatPairUrls,
  humorHoroscopeUrls,
  kamniPoZnakuUrls,
  lunarCalendarMonthUrls,
  lunarDayUrls,
  stoneUrls,
  yearlyGoroskopUrls,
  zodiacHoroscopeUrls,
} from './sitemap.js';

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

describe('zodiacHoroscopeUrls (Ф5)', () => {
  it('ровно 12×20=240 URL (5 периодов минус year, ×5 тем) без дублей', () => {
    const urls = zodiacHoroscopeUrls();
    expect(urls).toHaveLength(240);
    expect(new Set(urls.map((u) => u.path)).size).toBe(240);
    expect(urls.some((u) => u.path === '/goroskop/oven')).toBe(true);
    expect(urls.some((u) => u.path === '/goroskop/oven/nedelya')).toBe(true);
    expect(urls.some((u) => u.path === '/goroskop/oven/lyubov')).toBe(true);
    expect(urls.some((u) => u.path === '/goroskop/oven/nedelya/lyubov')).toBe(true);
  });
});

describe('yearlyGoroskopUrls (Ф5)', () => {
  it('до октября — только текущий год: 12 западных + хаб + 12 восточных = 25', () => {
    const urls = yearlyGoroskopUrls(new Date(Date.UTC(2026, 4, 1))); // май
    expect(urls).toHaveLength(25);
    expect(urls.some((u) => u.path === '/goroskop/2026/oven')).toBe(true);
    expect(urls.some((u) => u.path === '/vostochnyj-goroskop/2026')).toBe(true);
    expect(urls.some((u) => u.path === '/vostochnyj-goroskop/2026/krysa')).toBe(true);
  });

  it('с октября — текущий + следующий год: 50 URL', () => {
    const urls = yearlyGoroskopUrls(new Date(Date.UTC(2026, 9, 5))); // октябрь
    expect(urls).toHaveLength(50);
    expect(urls.some((u) => u.path === '/goroskop/2027/oven')).toBe(true);
  });
});

describe('lunarDayUrls / humorHoroscopeUrls (Ф5)', () => {
  it('30 лунных дней', () => {
    expect(lunarDayUrls()).toHaveLength(30);
  });

  it('12 антигороскопов + профессии', () => {
    const urls = humorHoroscopeUrls();
    expect(urls.some((u) => u.path === '/shutochnyj-goroskop/oven')).toBe(true);
    expect(urls.some((u) => u.path === '/shutochnyj-goroskop/professiya/razrabotchik')).toBe(true);
  });
});

describe('kamniPoZnakuUrls / stoneUrls (Ф6)', () => {
  it('12 URL /kamni-po-znaku/{znak}, без дублей', () => {
    const urls = kamniPoZnakuUrls();
    expect(urls).toHaveLength(12);
    expect(new Set(urls.map((u) => u.path)).size).toBe(12);
    expect(urls.some((u) => u.path === '/kamni-po-znaku/oven')).toBe(true);
  });

  it('stoneUrls строит /kamni + /kamni/{slug} по переданным слагам', () => {
    const urls = stoneUrls(['ametist', 'rubin']);
    expect(urls.map((u) => u.path)).toEqual(['/kamni', '/kamni/ametist', '/kamni/rubin']);
  });
});

describe('buildAllSitemapUrls', () => {
  it('объединяет статические калькуляторы, 78 пар, лунный календарь и всю программатику Ф5 без дублей', () => {
    const urls = buildAllSitemapUrls(new Date(Date.UTC(2026, 0, 1)));
    const paths = urls.map((u) => u.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain('/natalnaya-karta');
    expect(paths).toContain('/lunnyj-kalendar/2026-01');
    expect(paths).toContain('/goroskop');
    expect(paths).toContain('/goroskop/oven');
    expect(paths).toContain('/goroskop/2026/oven');
    expect(paths).toContain('/vostochnyj-goroskop/2026/krysa');
    expect(paths).toContain('/lunnyj-den/1');
    expect(paths).toContain('/shutochnyj-goroskop/oven');
  });
});
