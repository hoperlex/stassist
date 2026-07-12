/**
 * Общий СЕРВЕРНЫЙ загрузчик данных для страниц `/goroskop/{znak}[...]` (требование 3 промта Ф5) —
 * три уровня маршрутов (today/@slug/@period+@tema) делят эту логику, чтобы не триплицировать
 * SEO/fetch. Используется ТОЛЬКО из `+data.ts` (см. doc-комментарий apps/web/lib/
 * goroskop-nav-links.ts — этот модуль НЕ должен импортироваться клиентскими компонентами:
 * барrель-импорты `@stassist/shared` (`loadConfig`/`signBySlug`) тянут `node:crypto` в
 * клиентский бандл через `packages/shared/src/crypto/pd-cipher.ts`).
 */
import { render } from 'vike/abort';
import { loadConfig, signBySlug, zodiacEnSlugByIndex, type HoroscopePeriod, type HoroscopeTopic, type ZodiacSignInfo } from '@stassist/shared';
import { articleJsonLd, breadcrumbJsonLd, type PageSeo } from './seo.js';
import { fetchZodiacHoroscope } from './horoscope-content.js';
import { zodiacHoroscopeDescription, zodiacHoroscopeH1, zodiacHoroscopePath, zodiacHoroscopeTitle } from './horoscope-seo.js';

export interface GoroskopPageData {
  seo: PageSeo;
  sign: ZodiacSignInfo;
  h1: string;
  period: HoroscopePeriod;
  topic: HoroscopeTopic;
  bodyMd: string | null;
  computed: boolean;
}

export async function buildGoroskopPageData(
  znakRuSlug: string,
  period: HoroscopePeriod,
  topic: HoroscopeTopic,
  year?: number,
): Promise<GoroskopPageData> {
  const sign = signBySlug(znakRuSlug);
  if (!sign) throw render(404);

  const signEn = zodiacEnSlugByIndex(sign.signIndex);
  const appUrl = loadConfig().appUrl;
  const result = await fetchZodiacHoroscope(signEn, period, topic, year);
  const path = year ? `/goroskop/${year}/${znakRuSlug}` : zodiacHoroscopePath(znakRuSlug, period, topic);
  const yearSuffix = year ? ` ${year}` : '';
  const title = year ? `Гороскоп для ${sign.nameRuGenitive} на ${year} год | Зодиакум` : zodiacHoroscopeTitle(sign, period, topic);
  const h1 = year ? `Гороскоп для ${sign.nameRuGenitive} на ${year} год` : zodiacHoroscopeH1(sign, period, topic);
  const description = `${zodiacHoroscopeDescription(sign, period, topic)}${yearSuffix}`;
  const computed = result?.computed ?? false;

  return {
    seo: {
      title,
      description,
      canonicalPath: path,
      // Честный empty-state (см. §6 конвенций реализации «правило непустоты» + находку
      // [seed-контента-на-старте] в f5.md) — редкий случай (БД/генерация недоступны), см.
      // doc-комментарий PageSeo.noindex.
      noindex: !computed,
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Гороскопы', path: '/goroskop' },
          { name: sign.nameRu, path: `/goroskop/${znakRuSlug}` },
        ]),
        articleJsonLd(appUrl, { headline: h1, description, path, datePublished: result?.publishedAt ?? null }),
      ],
    },
    sign,
    h1,
    period,
    topic,
    bodyMd: result?.bodyMd ?? null,
    computed,
  };
}
