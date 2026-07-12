import { describe, expect, it } from 'vitest';
import {
  arkanUrls,
  buildAllSitemapUrls,
  buildSitemapIndexXml,
  buildSitemapXml,
  calculatorsClusterUrls,
  celebrityUrls,
  compatPairUrls,
  goroskopyClusterUrls,
  humorHoroscopeUrls,
  kamniClusterUrls,
  kamniPoZnakuUrls,
  lunarCalendarMonthUrls,
  lunarDayUrls,
  planetInSignAndHouseUrls,
  planetyHubUrl,
  SITEMAP_CLUSTER_PATHS,
  stoneUrls,
  wikiArticleUrls,
  wikiClusterUrls,
  wikiSectionUrls,
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

  it('включает Ф7: хаб вики + 10 разделов + 240 URL «планета в знаке/доме» + 22 аркана', () => {
    const urls = buildAllSitemapUrls(new Date(Date.UTC(2026, 0, 1)));
    const paths = urls.map((u) => u.path);
    expect(paths).toContain('/wiki');
    expect(paths).toContain('/wiki/planets');
    expect(paths).toContain('/planety');
    expect(paths).toContain('/arkan/1');
    expect(paths).toContain('/arkan/22');
  });
});

describe('planetInSignAndHouseUrls (Ф7, doc 23 §2 «10×24=240»)', () => {
  it('ровно 240 URL без дублей: 10 планет × (12 знаков + 12 домов)', () => {
    const urls = planetInSignAndHouseUrls();
    expect(urls).toHaveLength(240);
    expect(new Set(urls.map((u) => u.path)).size).toBe(240);
    expect(urls.some((u) => u.path === '/planety/mars-v-lve')).toBe(true);
    expect(urls.some((u) => u.path === '/planety/mars-v-7-dome')).toBe(true);
  });
});

describe('wikiSectionUrls / wikiArticleUrls / planetyHubUrl / arkanUrls / celebrityUrls (Ф7)', () => {
  it('10 разделов вики', () => {
    expect(wikiSectionUrls()).toHaveLength(10);
    expect(wikiSectionUrls().some((u) => u.path === '/wiki/glossary')).toBe(true);
  });

  it('wikiArticleUrls строит /wiki/{section}/{slug} по переданным записям', () => {
    const urls = wikiArticleUrls([{ section: 'planets', slug: 'mars' }]);
    expect(urls).toEqual([{ path: '/wiki/planets/mars', changefreq: 'monthly' }]);
  });

  it('planetyHubUrl — /planety', () => {
    expect(planetyHubUrl().path).toBe('/planety');
  });

  it('arkanUrls — ровно 22 URL /arkan/{1..22}', () => {
    const urls = arkanUrls();
    expect(urls).toHaveLength(22);
    expect(urls[0]!.path).toBe('/arkan/1');
    expect(urls[21]!.path).toBe('/arkan/22');
  });

  it('celebrityUrls строит /karta/{slug} по переданным слагам', () => {
    expect(celebrityUrls(['albert-eynshteyn'])).toEqual([{ path: '/karta/albert-eynshteyn', changefreq: 'monthly' }]);
  });
});

describe('Ф8: sitemap-индексы по кластерам (doc 23 §3, промт Ф8 req.6)', () => {
  it('buildSitemapIndexXml строит валидный <sitemapindex> с абсолютными URL', () => {
    const xml = buildSitemapIndexXml('https://stassist.ru', Object.values(SITEMAP_CLUSTER_PATHS));
    expect(xml).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('<loc>https://stassist.ru/sitemaps/goroskopy.xml</loc>');
    expect(xml).toContain('<loc>https://stassist.ru/sitemaps/wiki.xml</loc>');
  });

  it('4 кластера покрывают ВЕСЬ buildAllSitemapUrls (без потерь) плюс честный хаб /kamni', () => {
    const now = new Date(Date.UTC(2026, 0, 1));
    const allPaths = new Set(buildAllSitemapUrls(now).map((u) => u.path));
    const clusteredPaths = new Set([
      ...calculatorsClusterUrls(now),
      ...goroskopyClusterUrls(now),
      ...kamniClusterUrls([]),
      ...wikiClusterUrls([], []),
    ].map((u) => u.path));
    for (const path of allPaths) expect(clusteredPaths.has(path)).toBe(true);
    // Кластерная версия честнее: включает хаб /kamni (stoneUrls всегда его добавляет), которого
    // не было в старом плоском buildAllSitemapUrls — единственная разница, не потеря.
    expect([...clusteredPaths].filter((p) => !allPaths.has(p))).toEqual(['/kamni']);
  });

  it('каждый кластер непустой (статическая часть)', () => {
    expect(calculatorsClusterUrls().length).toBeGreaterThan(0);
    expect(goroskopyClusterUrls().length).toBeGreaterThan(0);
    expect(kamniClusterUrls([]).length).toBeGreaterThan(0);
    expect(wikiClusterUrls([], []).length).toBeGreaterThan(0);
  });
});
