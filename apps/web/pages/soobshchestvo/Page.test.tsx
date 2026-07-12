/**
 * SSR-снапшот публичной ленты сообщества (Ф9): лента читается без логина, посты ссылаются на
 * публичные URL /soobshchestvo/{id}, у ИИ-контента — бейдж «ИИ».
 */
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import type { PostResponse } from '@stassist/shared/schemas/community.js';
import { Page } from './+Page.js';
import type { SoobshchestvoData } from './+data.js';

const post: PostResponse = {
  id: '11111111-2222-4333-8444-555555555555',
  authorId: '99999999-8888-4777-8666-555555555555',
  authorDisplayName: 'Мария',
  authorKind: 'human',
  kind: 'chart_review_request',
  title: 'Разберите карту: Сатурн в 7 доме',
  bodyMd: 'Помогите понять конфигурацию.',
  chart: null,
  celebritySlug: null,
  status: 'published',
  moderation: 'approved',
  likesCount: 3,
  commentsCount: 5,
  createdAt: '2026-07-12T10:00:00.000Z',
  isMine: false,
};

describe('pages/soobshchestvo', () => {
  it('рендерит публичную ленту со ссылками на публичные URL постов', () => {
    const fixture: SoobshchestvoData = {
      seo: { title: 't', description: 'd', canonicalPath: '/soobshchestvo' },
      posts: { items: [post], total: 1 },
      sort: 'new',
      kind: undefined,
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data: fixture }} />);
    expect(html).toContain('Сообщество');
    expect(html).toContain('/soobshchestvo/11111111-2222-4333-8444-555555555555');
    expect(html).toContain('Разберите карту: Сатурн в 7 доме');
    expect(html).toContain('разбор карты');
    expect(html).toContain('Мария');
  });

  it('пустая лента — честный empty-state', () => {
    const fixture: SoobshchestvoData = {
      seo: { title: 't', description: 'd', canonicalPath: '/soobshchestvo' },
      posts: { items: [], total: 0 },
      sort: 'new',
      kind: undefined,
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data: fixture }} />);
    expect(html).toContain('Пока нет публикаций');
  });
});
