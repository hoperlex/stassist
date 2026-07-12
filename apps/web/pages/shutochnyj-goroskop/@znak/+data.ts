import type { PageContextServer } from 'vike/types';
import { render } from 'vike/abort';
import { loadConfig, signBySlug, zodiacEnSlugByIndex } from '@stassist/shared';
import { articleJsonLd, breadcrumbJsonLd, type PageSeo } from '../../../lib/seo.js';
import { fetchHumorZodiacHoroscope } from '../../../lib/horoscope-content.js';

export interface ShutochnyjZnakData {
  seo: PageSeo;
  nameRu: string;
  znakRuSlug: string;
  bodyMd: string | null;
  computed: boolean;
}

/** `/shutochnyj-goroskop/{znak}` — антигороскоп знака (requirement 5 промта Ф5). */
export async function data(pageContext: PageContextServer): Promise<ShutochnyjZnakData> {
  const znakRuSlug = pageContext.routeParams.znak ?? '';
  const sign = signBySlug(znakRuSlug);
  if (!sign) throw render(404);

  const signEn = zodiacEnSlugByIndex(sign.signIndex);
  const appUrl = loadConfig().appUrl;
  const result = await fetchHumorZodiacHoroscope(signEn);
  const title = `Антигороскоп для ${sign.nameRuGenitive} — шуточный гороскоп | Stassist`;
  const description = `Шуточный (ироничный) гороскоп для ${sign.nameRuGenitive} на сегодня — не воспринимайте всерьёз.`;
  const path = `/shutochnyj-goroskop/${znakRuSlug}`;
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
          { name: sign.nameRu, path },
        ]),
        articleJsonLd(appUrl, { headline: title, description, path, datePublished: result?.publishedAt ?? null }),
      ],
    },
    nameRu: sign.nameRu,
    znakRuSlug,
    bodyMd: result?.bodyMd ?? null,
    computed,
  };
}
