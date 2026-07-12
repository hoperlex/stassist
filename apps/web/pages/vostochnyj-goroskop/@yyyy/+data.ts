import type { PageContextServer } from 'vike/types';
import { render } from 'vike/abort';
import { EASTERN_ANIMAL_NAME_RU, EASTERN_ANIMAL_RU_SLUGS, EASTERN_ANIMAL_SLUGS, loadConfig } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../../lib/seo.js';

export interface VostochnyjGoroskopYearHubData {
  seo: PageSeo;
  yyyy: string;
  animals: Array<{ slug: string; ruSlug: string; nameRu: string }>;
}

const YEAR_RE = /^\d{4}$/;

export async function data(pageContext: PageContextServer): Promise<VostochnyjGoroskopYearHubData> {
  const yyyy = pageContext.routeParams.yyyy ?? '';
  if (!YEAR_RE.test(yyyy)) throw render(404);

  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: `Восточный гороскоп на ${yyyy} год — по 12 животным | Зодиакум`,
      description: `Восточный (китайский) гороскоп на ${yyyy} год для всех 12 животных: чего ждать в год под управлением текущего животного и стихии.`,
      canonicalPath: `/vostochnyj-goroskop/${yyyy}`,
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Восточный гороскоп', path: '/vostochnyj-goroskop' },
          { name: yyyy, path: `/vostochnyj-goroskop/${yyyy}` },
        ]),
      ],
    },
    yyyy,
    animals: EASTERN_ANIMAL_SLUGS.map((slug) => ({ slug, ruSlug: EASTERN_ANIMAL_RU_SLUGS[slug], nameRu: EASTERN_ANIMAL_NAME_RU[slug] })),
  };
}
