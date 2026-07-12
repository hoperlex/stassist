import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Page } from './+Page.js';
import type { WikiArticlePageData } from './+data.js';

describe('pages/wiki/@razdel/@slug (статья вики)', () => {
  it('рендерит заголовок/текст и бейдж «черновик» при status=draft', () => {
    const data: WikiArticlePageData = {
      seo: { title: 't', description: 'd', canonicalPath: '/wiki/planets/mars' },
      article: {
        id: '00000000-0000-0000-0000-000000000001',
        slug: 'mars',
        section: 'planets',
        title: 'Марс в астрологии',
        bodyMd: 'Марс отвечает за энергию и действие.',
        status: 'draft',
        editorId: null,
        version: 1,
        seo: null,
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: '2026-01-01T00:00:00Z',
      },
      section: 'planets',
      slug: 'mars',
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data }} />);
    expect(html).toContain('Марс в астрологии');
    expect(html).toContain('Черновик');
    expect(html).toContain('Марс отвечает за энергию');
  });

  it('честный empty-state для несуществующей статьи', () => {
    const data: WikiArticlePageData = { seo: { title: 't', description: 'd', canonicalPath: '/wiki/planets/x' }, article: null, section: 'planets', slug: 'x' };
    const html = renderToStaticMarkup(<Page pageContext={{ data }} />);
    expect(html).toContain('Статья не найдена');
  });
});
