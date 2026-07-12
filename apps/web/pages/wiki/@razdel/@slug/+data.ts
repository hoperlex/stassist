import type { PageContextServer } from 'vike/types';
import { loadConfig, WIKI_SECTIONS, WIKI_SECTION_NAME_RU, type WikiArticleResponse, type WikiArticleSection } from '@stassist/shared';
import { articleJsonLd, breadcrumbJsonLd, type PageSeo } from '../../../../lib/seo.js';
import { serverApiGet } from '../../../../lib/server-api.js';

export interface WikiArticlePageData {
  seo: PageSeo;
  article: WikiArticleResponse | null;
  section: string;
  slug: string;
}

/** `/wiki/{razdel}/{slug}` — статья (req.3 промта Ф7): SSR + хлебные крошки + JSON-LD Article. На
 *  SSR идут статьи ЛЮБОГО статуса (draft/reviewed/published) с бейджем «черновик» (см. §6
 *  конвенций реализации, «правило непустоты») — НЕ найдена/API недоступен → честный `noindex`
 *  empty-state (не 500, тот же принцип, что kamni/@kamen/+data.ts). */
export async function data(pageContext: PageContextServer): Promise<WikiArticlePageData> {
  const section = pageContext.routeParams.razdel ?? '';
  const slug = pageContext.routeParams.slug ?? '';
  const appUrl = loadConfig().appUrl;

  let article: WikiArticleResponse | null = null;
  try {
    article = await serverApiGet<WikiArticleResponse>(`/wiki-articles/${encodeURIComponent(slug)}`);
    if (article.section !== section) article = null; // раздел в URL должен совпадать с реальным
  } catch {
    article = null;
  }

  const sectionNameRu = WIKI_SECTIONS.includes(section as WikiArticleSection) ? WIKI_SECTION_NAME_RU[section as WikiArticleSection] : section;

  if (!article) {
    return {
      seo: { title: 'Статья не найдена | Зодиакум', description: 'Такой статьи нет в базе знаний.', canonicalPath: `/wiki/${section}/${slug}`, noindex: true },
      article: null,
      section,
      slug,
    };
  }

  const path = `/wiki/${section}/${slug}`;
  const description = (article.bodyMd ?? '').replace(/[#*`]/g, '').slice(0, 155);
  return {
    seo: {
      title: `${article.title} | Зодиакум`,
      description: description || article.title,
      canonicalPath: path,
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'База знаний', path: '/wiki' },
          { name: sectionNameRu, path: `/wiki/${section}` },
          { name: article.title, path },
        ]),
        articleJsonLd(appUrl, { headline: article.title, description: description || article.title, path, datePublished: article.updatedAt }),
      ],
    },
    article,
    section,
    slug,
  };
}
