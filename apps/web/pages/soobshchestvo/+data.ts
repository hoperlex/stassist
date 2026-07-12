/**
 * SSR-данные публичной ленты сообщества (Ф9, решение заказчика: чтение — без логина, SEO-актив;
 * посты анонимизированы by design — `anonymizeChartData`). Фильтры — query-параметры (SSR
 * рендерит отфильтрованную ленту, ссылки индексируются с canonical на корень раздела).
 */
import type { PageContextServer } from 'vike/types';
import {
  postListQuerySchema,
  type PostListResponse,
  type PostSort,
  type UserPostKind,
} from '@stassist/shared';
import { loadConfig } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';
import { serverApiGet } from '../../lib/server-api.js';

export interface SoobshchestvoData {
  seo: PageSeo;
  posts: PostListResponse;
  sort: PostSort;
  kind: UserPostKind | undefined;
}

export async function data(pageContext: PageContextServer): Promise<SoobshchestvoData> {
  const search = pageContext.urlParsed.search;
  const parsed = postListQuerySchema.safeParse({
    sort: search['sort'],
    kind: search['kind'],
  });
  const sort: PostSort = parsed.success ? parsed.data.sort : 'new';
  const kind = parsed.success ? (parsed.data.kind as UserPostKind | undefined) : undefined;

  const qs = new URLSearchParams({ sort, ...(kind ? { kind } : {}) });
  let posts: PostListResponse;
  try {
    posts = await serverApiGet<PostListResponse>(`/posts?${qs.toString()}`);
  } catch {
    posts = { items: [], total: 0 };
  }

  const appUrl = loadConfig().appUrl;
  return {
    seo: {
      title: 'Сообщество — Зодиакум',
      description:
        'Сообщество Зодиакума: разборы натальных карт (анонимно, без персональных данных), обсуждения и галерея карт знаменитостей.',
      canonicalPath: '/soobshchestvo',
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Сообщество', path: '/soobshchestvo' },
        ]),
      ],
    },
    posts,
    sort,
    kind,
  };
}
