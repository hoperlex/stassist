import type { PageContextServer } from 'vike/types';
import { render } from 'vike/abort';
import { EASTERN_ANIMAL_NAME_RU, easternAnimalByRuSlug, loadConfig } from '@stassist/shared';
import { articleJsonLd, breadcrumbJsonLd, type PageSeo } from '../../../../lib/seo.js';
import { fetchEasternHoroscope } from '../../../../lib/horoscope-content.js';

export interface VostochnyjGoroskopAnimalData {
  seo: PageSeo;
  yyyy: string;
  nameRu: string;
  bodyMd: string | null;
  computed: boolean;
}

const YEAR_RE = /^\d{4}$/;

export async function data(pageContext: PageContextServer): Promise<VostochnyjGoroskopAnimalData> {
  const { yyyy, zhivotnoe } = pageContext.routeParams as { yyyy?: string; zhivotnoe?: string };
  if (!yyyy || !YEAR_RE.test(yyyy) || !zhivotnoe) throw render(404);
  const animal = easternAnimalByRuSlug(zhivotnoe);
  if (!animal) throw render(404);

  const nameRu = EASTERN_ANIMAL_NAME_RU[animal];
  const appUrl = loadConfig().appUrl;
  const result = await fetchEasternHoroscope(yyyy, animal);
  const path = `/vostochnyj-goroskop/${yyyy}/${zhivotnoe}`;
  const title = `${yyyy}: гороскоп для ${nameRu} по восточному календарю | Зодиакум`;
  const description = `Восточный гороскоп на ${yyyy} год для знака «${nameRu}»: чего ожидать в год под управлением текущего животного и стихии.`;
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
          { name: 'Восточный гороскоп', path: '/vostochnyj-goroskop' },
          { name: yyyy, path: `/vostochnyj-goroskop/${yyyy}` },
          { name: nameRu, path },
        ]),
        articleJsonLd(appUrl, { headline: title, description, path, datePublished: result?.publishedAt ?? null }),
      ],
    },
    yyyy,
    nameRu,
    bodyMd: result?.bodyMd ?? null,
    computed,
  };
}
