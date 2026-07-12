import type { PageContextServer } from 'vike/types';
import { loadConfig, type CelebrityResponse, type PostListResponse } from '@stassist/shared';
import { articleJsonLd, breadcrumbJsonLd, type PageSeo } from '../../../lib/seo.js';
import { serverApiGet } from '../../../lib/server-api.js';

export interface CelebrityPageData {
  seo: PageSeo;
  celebrity: CelebrityResponse | null;
  posts: PostListResponse['items'];
}

/**
 * `/karta/{celebrity}` — галерея знаменитостей (req.4 промта Ф7 M8). §8 конвенций реализации:
 * агент не выдумывает данные рождения — карточка честно показывает `hasEnoughDataToCompute` и НЕ
 * рисует несуществующую карту, если координат/времени нет (см. tools/gen-celebrities.ts).
 */
export async function data(pageContext: PageContextServer): Promise<CelebrityPageData> {
  const slug = pageContext.routeParams.celebrity ?? '';
  const appUrl = loadConfig().appUrl;

  let celebrity: CelebrityResponse | null = null;
  try {
    celebrity = await serverApiGet<CelebrityResponse>(`/celebrities/${encodeURIComponent(slug)}`);
  } catch {
    celebrity = null;
  }

  let posts: PostListResponse['items'] = [];
  if (celebrity) {
    try {
      const res = await serverApiGet<PostListResponse>(`/posts?kind=gallery&celebritySlug=${encodeURIComponent(slug)}&limit=20`);
      posts = res.items;
    } catch {
      posts = [];
    }
  }

  if (!celebrity) {
    return {
      seo: { title: 'Знаменитость не найдена | Stassist', description: 'Такой карточки нет в галерее.', canonicalPath: `/karta/${slug}`, noindex: true },
      celebrity: null,
      posts: [],
    };
  }

  const path = `/karta/${celebrity.slug}`;
  const title = `Натальная карта ${celebrity.name} | Stassist`;
  const description = `Дата рождения, знак зодиака и обсуждение натальной карты: ${celebrity.name}.`;

  return {
    seo: {
      title,
      description,
      canonicalPath: path,
      jsonLd: [
        breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'Галерея карт', path: '/wiki' }, { name: celebrity.name, path }]),
        articleJsonLd(appUrl, { headline: title, description, path, datePublished: null }),
      ],
    },
    celebrity,
    posts,
  };
}
