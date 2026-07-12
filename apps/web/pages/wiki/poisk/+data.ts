import type { PageContextServer } from 'vike/types';
import { loadConfig, type WikiArticleListResponse } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../../lib/seo.js';
import { serverApiGet } from '../../../lib/server-api.js';

export interface WikiSearchData {
  seo: PageSeo;
  q: string;
  results: WikiArticleListResponse['items'];
}

/** `/wiki/poisk?q=...` — внутренний поиск по вики (req.4 промта Ф7, pg_trgm). */
export async function data(pageContext: PageContextServer): Promise<WikiSearchData> {
  const q = pageContext.urlParsed.search.q ?? '';
  const appUrl = loadConfig().appUrl;

  let results: WikiArticleListResponse['items'] = [];
  if (q.trim().length >= 2) {
    try {
      const res = await serverApiGet<WikiArticleListResponse>(`/wiki-articles?q=${encodeURIComponent(q)}&limit=30`);
      results = res.items;
    } catch {
      results = [];
    }
  }

  return {
    seo: {
      title: q ? `Поиск «${q}» — база знаний | Зодиакум` : 'Поиск по базе знаний | Зодиакум',
      description: 'Внутренний поиск по статьям базы знаний портала Зодиакум.',
      canonicalPath: '/wiki/poisk',
      noindex: true, // страница результатов поиска — не индексируем (стандартная SEO-практика)
      jsonLd: [breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'База знаний', path: '/wiki' }, { name: 'Поиск', path: '/wiki/poisk' }])],
    },
    q,
    results,
  };
}
