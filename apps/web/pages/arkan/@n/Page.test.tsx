import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Page } from './+Page.js';
import type { ArkanPageData } from './+data.js';

describe('pages/arkan/@n (алиас на статью вики раздела arcana)', () => {
  it('рендерит статью и навигацию prev/next', () => {
    const data: ArkanPageData = {
      seo: { title: 't', description: 'd', canonicalPath: '/wiki/arcana/arkan-3' },
      n: 3,
      article: {
        id: '00000000-0000-0000-0000-000000000002',
        slug: 'arkan-3',
        section: 'arcana',
        title: 'Аркан 3 — Императрица (Матрица судьбы)',
        bodyMd: 'Аркан 3 раскрывает тему изобилия.',
        status: 'draft',
        editorId: null,
        version: 1,
        seo: null,
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: '2026-01-01T00:00:00Z',
      },
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data }} />);
    expect(html).toContain('Императрица');
    expect(html).toContain('Аркан 2');
    expect(html).toContain('Аркан 4');
  });

  it('честный empty-state, если статья не засеяна', () => {
    const data: ArkanPageData = { seo: { title: 't', description: 'd', canonicalPath: '/wiki/arcana/arkan-1' }, n: 1, article: null };
    const html = renderToStaticMarkup(<Page pageContext={{ data }} />);
    expect(html).toContain('Статья готовится');
  });
});
