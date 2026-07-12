import type { PageContextServer } from 'vike/types';
import { render } from 'vike/abort';
import { loadConfig, type WikiArticleResponse } from '@stassist/shared';
import { articleJsonLd, breadcrumbJsonLd, type PageSeo } from '../../../lib/seo.js';
import { serverApiGet } from '../../../lib/server-api.js';

export interface ArkanPageData {
  seo: PageSeo;
  n: number;
  article: WikiArticleResponse | null;
}

/**
 * `/arkan/{1..22}` — standalone-кластер арканов Матрицы судьбы (doc 23 §2 «/arkan/{1..22}»,
 * закрывает MINOR-находку f7.md [страница-без-владельца]). РЕШЕНИЕ (см. doc-комментарий
 * apps/web/lib/sitemap.ts): страница — АЛИАС на статью вики `/wiki/arcana/arkan-{n}` (тот же
 * контент, свой URL для короткого запоминающегося кластера), `canonicalPath` указывает на
 * каноническую вики-страницу — избегаем дублей контента для SEO.
 */
export async function data(pageContext: PageContextServer): Promise<ArkanPageData> {
  const n = Number(pageContext.routeParams.n ?? '');
  if (!Number.isInteger(n) || n < 1 || n > 22) throw render(404);

  const appUrl = loadConfig().appUrl;
  let article: WikiArticleResponse | null = null;
  try {
    article = await serverApiGet<WikiArticleResponse>(`/wiki-articles/arkan-${n}`);
  } catch {
    article = null;
  }

  const canonicalPath = `/wiki/arcana/arkan-${n}`;
  const title = article ? `${article.title} | Stassist` : `Аркан ${n} | Stassist`;
  const description = article?.bodyMd ? article.bodyMd.replace(/[#*`]/g, '').slice(0, 155) : `Аркан ${n} Матрицы судьбы.`;

  return {
    seo: {
      title,
      description,
      canonicalPath,
      noindex: !article,
      jsonLd: article
        ? [
            breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'Матрица судьбы', path: '/matrica-sudby' }, { name: `Аркан ${n}`, path: `/arkan/${n}` }]),
            articleJsonLd(appUrl, { headline: title, description, path: canonicalPath, datePublished: article.updatedAt }),
          ]
        : [],
    },
    n,
    article,
  };
}
