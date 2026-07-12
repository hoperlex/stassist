/**
 * Sitemap для калькуляторов + 78 пар совместимости (см. docs/architecture/23-seo-стратегия.md §3:
 * «Sitemap-индексы по кластерам… канонизация (зеркала совместимости)» — зеркальные пары НЕ
 * попадают в sitemap, только канонические). ЧИСТАЯ функция — список URL передаётся явно, без
 * обращения к БД (лунный календарь на несколько ближайших месяцев формируется вызывающим кодом).
 */
import { allCanonicalCompatPairs } from '@stassist/shared';

export interface SitemapUrl {
  path: string;
  changefreq?: 'daily' | 'weekly' | 'monthly';
}

const STATIC_CALCULATOR_URLS: SitemapUrl[] = [
  { path: '/natalnaya-karta', changefreq: 'monthly' },
  { path: '/matrica-sudby', changefreq: 'monthly' },
  { path: '/sovmestimost', changefreq: 'monthly' },
  { path: '/kvadrat-pifagora', changefreq: 'monthly' },
  { path: '/chislo-puti', changefreq: 'monthly' },
  { path: '/lunnyj-kalendar', changefreq: 'daily' },
];

/** Текущий месяц + N следующих (лунный календарь предрасчитан на 18 мес. вперёд, см. worker). */
export function lunarCalendarMonthUrls(now: Date, monthsAhead: number): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  for (let i = 0; i <= monthsAhead; i++) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i, 1));
    const yyyyMm = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    urls.push({ path: `/lunnyj-kalendar/${yyyyMm}`, changefreq: 'monthly' });
  }
  return urls;
}

export function compatPairUrls(): SitemapUrl[] {
  return allCanonicalCompatPairs().map((p) => ({ path: `/sovmestimost/${p.slug}`, changefreq: 'monthly' }));
}

export function buildAllSitemapUrls(now: Date = new Date()): SitemapUrl[] {
  return [...STATIC_CALCULATOR_URLS, ...compatPairUrls(), ...lunarCalendarMonthUrls(now, 3)];
}

export function buildSitemapXml(appUrl: string, urls: readonly SitemapUrl[]): string {
  const entries = urls
    .map(
      (u) =>
        `<url><loc>${appUrl}${u.path}</loc>${u.changefreq ? `<changefreq>${u.changefreq}</changefreq>` : ''}</url>`,
    )
    .join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;
}
