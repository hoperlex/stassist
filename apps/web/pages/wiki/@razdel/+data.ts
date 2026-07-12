import type { PageContextServer } from 'vike/types';
import { render } from 'vike/abort';
import { loadConfig, WIKI_SECTIONS, WIKI_SECTION_NAME_RU, type WikiArticleListResponse, type WikiArticleSection } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../../lib/seo.js';
import { serverApiGet } from '../../../lib/server-api.js';

export interface WikiSectionData {
  seo: PageSeo;
  section: WikiArticleSection;
  sectionNameRu: string;
  articles: WikiArticleListResponse['items'];
}

/** `/wiki/{razdel}` — список статей раздела (req.3 промта Ф7). Деградирует до `articles: []` без
 *  БД/API — честный empty-state (см. §6 конвенций реализации, «явный осмысленный empty-state»). */
export async function data(pageContext: PageContextServer): Promise<WikiSectionData> {
  const section = pageContext.routeParams.razdel as WikiArticleSection;
  if (!WIKI_SECTIONS.includes(section)) throw render(404);

  const appUrl = loadConfig().appUrl;
  let articles: WikiArticleListResponse['items'] = [];
  try {
    const res = await serverApiGet<WikiArticleListResponse>(`/wiki-articles?section=${section}&limit=100`);
    articles = res.items;
  } catch {
    articles = [];
  }

  const sectionNameRu = WIKI_SECTION_NAME_RU[section];
  return {
    seo: {
      title: `${sectionNameRu} — база знаний | Зодиакум`,
      description: `${sectionNameRu}: статьи базы знаний портала Зодиакум.`,
      canonicalPath: `/wiki/${section}`,
      noindex: articles.length === 0,
      jsonLd: [breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'База знаний', path: '/wiki' }, { name: sectionNameRu, path: `/wiki/${section}` }])],
    },
    section,
    sectionNameRu,
    articles,
  };
}
