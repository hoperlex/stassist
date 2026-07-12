import type { PageContextServer } from 'vike/types';
import { render } from 'vike/abort';
import { HOROSCOPE_PROFESSION_NAME_RU, isHoroscopeProfessionSlug, loadConfig } from '@stassist/shared';
import { articleJsonLd, breadcrumbJsonLd, type PageSeo } from '../../../../lib/seo.js';
import { fetchHumorProfessionHoroscope } from '../../../../lib/horoscope-content.js';

export interface ShutochnyjProfessiyaData {
  seo: PageSeo;
  nameRu: string;
  bodyMd: string | null;
  computed: boolean;
}

/** `/shutochnyj-goroskop/professiya/{slug}` — гороскоп профессии (requirement 5 промта Ф5:
 *  «2-3 профессиональных: разработчика/бухгалтера», см. HOROSCOPE_PROFESSION_SLUGS). */
export async function data(pageContext: PageContextServer): Promise<ShutochnyjProfessiyaData> {
  const slug = pageContext.routeParams.slug ?? '';
  if (!isHoroscopeProfessionSlug(slug)) throw render(404);

  const nameRu = HOROSCOPE_PROFESSION_NAME_RU[slug];
  const appUrl = loadConfig().appUrl;
  const result = await fetchHumorProfessionHoroscope(slug);
  const title = `Гороскоп ${nameRu} — шуточный | Зодиакум`;
  const description = `Шуточный гороскоп ${nameRu} на сегодня — ирония про рабочие будни, не реальный прогноз.`;
  const path = `/shutochnyj-goroskop/professiya/${slug}`;
  const computed = result?.computed ?? false;

  return {
    seo: {
      title,
      description,
      canonicalPath: path,
      noindex: !computed, // см. doc-комментарий apps/web/lib/seo.ts PageSeo.noindex
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Шуточные гороскопы', path: '/shutochnyj-goroskop' },
          { name: `Гороскоп ${nameRu}`, path },
        ]),
        articleJsonLd(appUrl, { headline: title, description, path, datePublished: result?.publishedAt ?? null }),
      ],
    },
    nameRu,
    bodyMd: result?.bodyMd ?? null,
    computed,
  };
}
