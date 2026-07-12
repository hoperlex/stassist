/**
 * SSR-данные публичной страницы поста `/soobshchestvo/{id}` (Ф9): пост + комментарии публичны
 * (GET /posts/:id отдаёт только approved+published анониму). 404 — пост не найден/скрыт.
 */
import { render } from 'vike/abort';
import type { PageContextServer } from 'vike/types';
import type { CommentResponse, PostResponse } from '@stassist/shared';
import { loadConfig } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../../lib/seo.js';
import { ServerApiError, serverApiGet } from '../../../lib/server-api.js';

export interface PostPageData {
  seo: PageSeo;
  post: PostResponse;
  comments: CommentResponse[];
}

export async function data(pageContext: PageContextServer): Promise<PostPageData> {
  const id = pageContext.routeParams.id ?? '';
  let post: PostResponse;
  try {
    post = await serverApiGet<PostResponse>(`/posts/${id}`);
  } catch (err) {
    if (err instanceof ServerApiError && err.status === 404) throw render(404);
    throw err;
  }

  let comments: CommentResponse[] = [];
  try {
    const res = await serverApiGet<{ items: CommentResponse[] }>(`/posts/${id}/comments`);
    comments = res.items;
  } catch {
    comments = [];
  }

  const appUrl = loadConfig().appUrl;
  const description = post.bodyMd.slice(0, 160).replace(/\s+/g, ' ').trim();
  return {
    seo: {
      title: `${post.title} — Сообщество Зодиакума`,
      description,
      canonicalPath: `/soobshchestvo/${post.id}`,
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Сообщество', path: '/soobshchestvo' },
          { name: post.title, path: `/soobshchestvo/${post.id}` },
        ]),
      ],
    },
    post,
    comments,
  };
}
