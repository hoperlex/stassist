/**
 * Sitemap для калькуляторов + 78 пар совместимости (см. docs/architecture/23-seo-стратегия.md §3:
 * «Sitemap-индексы по кластерам… канонизация (зеркала совместимости)» — зеркальные пары НЕ
 * попадают в sitemap, только канонические). ЧИСТАЯ функция — список URL передаётся явно, без
 * обращения к БД (лунный календарь на несколько ближайших месяцев формируется вызывающим кодом).
 */
import {
  allCanonicalCompatPairs,
  EASTERN_ANIMAL_RU_SLUGS,
  EASTERN_ANIMAL_SLUGS,
  HOROSCOPE_PERIOD_SLUGS_RU,
  HOROSCOPE_PROFESSION_SLUGS,
  HOROSCOPE_TOPIC_SLUGS_RU,
  LUNAR_DAY_NUMBERS,
  ZODIAC_SIGNS,
  type HoroscopePeriod,
  type HoroscopeTopic,
} from '@stassist/shared';

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
  // Ф5: хабы гороскопной программатики (см. docs/architecture/23-seo-стратегия.md §2).
  { path: '/goroskop', changefreq: 'daily' },
  { path: '/shutochnyj-goroskop', changefreq: 'weekly' },
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

const ALL_PERIODS: HoroscopePeriod[] = ['day', 'tomorrow', 'week', 'month', 'year'];
const ALL_TOPICS: HoroscopeTopic[] = ['general', 'love', 'money', 'career', 'health'];

/**
 * Полное произведение 12 знаков × 5 периодов × 5 тем = 300 URL (см. doc-комментарий
 * packages/shared/src/schemas/horoscope.ts «ровно DoD «300 текстов»»). Годовые страницы
 * (`period='year'`) sitemap не включает год в URL текущего года отдельно — они уже входят в этот
 * список через `zodiacHoroscopePath`; ГОДОВЫЕ страницы С ЯВНЫМ годом (`/goroskop/{yyyy}/{znak}`)
 * добавляются отдельно ниже (`yearlyGoroskopUrls`) для текущего и, с октября, следующего года.
 */
export function zodiacHoroscopeUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  for (const sign of ZODIAC_SIGNS) {
    for (const period of ALL_PERIODS) {
      for (const topic of ALL_TOPICS) {
        if (period === 'year') continue; // см. yearlyGoroskopUrls — отдельный шаблон с годом в URL
        const changefreq = period === 'day' || period === 'tomorrow' ? 'daily' : 'weekly';
        urls.push({ path: zodiacHoroscopeSitemapPath(sign.slug, period, topic), changefreq });
      }
    }
  }
  return urls;
}

function zodiacHoroscopeSitemapPath(znakRuSlug: string, period: HoroscopePeriod, topic: HoroscopeTopic): string {
  if (period === 'day' && topic === 'general') return `/goroskop/${znakRuSlug}`;
  if (topic === 'general') return `/goroskop/${znakRuSlug}/${HOROSCOPE_PERIOD_SLUGS_RU[period as Exclude<HoroscopePeriod, 'day'>]}`;
  if (period === 'day') return `/goroskop/${znakRuSlug}/${HOROSCOPE_TOPIC_SLUGS_RU[topic as Exclude<HoroscopeTopic, 'general'>]}`;
  return `/goroskop/${znakRuSlug}/${HOROSCOPE_PERIOD_SLUGS_RU[period as Exclude<HoroscopePeriod, 'day'>]}/${HOROSCOPE_TOPIC_SLUGS_RU[topic as Exclude<HoroscopeTopic, 'general'>]}`;
}

/** Годовые (западный + восточный, doc 23 §2 «24/год») — текущий год всегда, следующий с октября
 *  (тот же каденс, что apps/worker/src/horoscope/jobs.ts `runYearlyZodiacJob`/`runEasternYearlyJob`). */
export function yearlyGoroskopUrls(now: Date = new Date()): SitemapUrl[] {
  const years = [now.getUTCFullYear()];
  if (now.getUTCMonth() >= 9) years.push(now.getUTCFullYear() + 1);

  const urls: SitemapUrl[] = [];
  for (const year of years) {
    for (const sign of ZODIAC_SIGNS) urls.push({ path: `/goroskop/${year}/${sign.slug}`, changefreq: 'monthly' });
    urls.push({ path: `/vostochnyj-goroskop/${year}`, changefreq: 'monthly' });
    for (const animal of EASTERN_ANIMAL_SLUGS) urls.push({ path: `/vostochnyj-goroskop/${year}/${EASTERN_ANIMAL_RU_SLUGS[animal]}`, changefreq: 'monthly' });
  }
  return urls;
}

export function lunarDayUrls(): SitemapUrl[] {
  return LUNAR_DAY_NUMBERS.map((n) => ({ path: `/lunnyj-den/${n}`, changefreq: 'monthly' }));
}

export function humorHoroscopeUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = ZODIAC_SIGNS.map((sign) => ({ path: `/shutochnyj-goroskop/${sign.slug}`, changefreq: 'daily' }));
  for (const slug of HOROSCOPE_PROFESSION_SLUGS) urls.push({ path: `/shutochnyj-goroskop/professiya/${slug}`, changefreq: 'daily' });
  return urls;
}

// -------------------------------------------------------------------------------------------
// Ф6: кластер камней (см. docs/architecture/23-seo-стратегия.md §2 «/kamni/{kamen} + /kamni-po-
// znaku/{znak}, 60–80 на старте»). `/kamni-po-znaku/{znak}` — 12 фиксированных URL (ЧИСТАЯ
// функция, как остальной модуль). `/kamni/{slug}` — по РЕАЛЬНЫМ слагам из БД (динамический
// контент редакции, не вычисляется формулой) — см. `stoneUrls()`, вызывается ОТДЕЛЬНО
// (apps/web/server/index.ts запрашивает список слагов через `/api/v1/stones`, т.к. `web` не
// трогает БД напрямую, только REST, см. docs/architecture/21-техническая-архитектура.md §2).
// -------------------------------------------------------------------------------------------

export function kamniPoZnakuUrls(): SitemapUrl[] {
  return ZODIAC_SIGNS.map((sign) => ({ path: `/kamni-po-znaku/${sign.slug}`, changefreq: 'monthly' }));
}

/** `slugs` — реальные слаги камней из БД (см. заголовок раздела); ЧИСТАЯ функция — сеть/БД не
 *  трогает сама, только форматирует URL. */
export function stoneUrls(slugs: readonly string[]): SitemapUrl[] {
  return [{ path: '/kamni', changefreq: 'weekly' }, ...slugs.map((slug) => ({ path: `/kamni/${slug}`, changefreq: 'monthly' as const }))];
}

export function buildAllSitemapUrls(now: Date = new Date()): SitemapUrl[] {
  return [
    ...STATIC_CALCULATOR_URLS,
    ...compatPairUrls(),
    ...lunarCalendarMonthUrls(now, 3),
    ...zodiacHoroscopeUrls(),
    ...yearlyGoroskopUrls(now),
    ...lunarDayUrls(),
    ...humorHoroscopeUrls(),
    ...kamniPoZnakuUrls(),
  ];
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
