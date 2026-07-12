import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Page } from './+Page.js';
import type { PlanetInXData } from './+data.js';

describe('pages/planety/@slug (планета в знаке/доме — 240 SSR-страниц)', () => {
  it('рендерит текст чанка (Марс в Льве)', () => {
    const data: PlanetInXData = {
      seo: { title: 't', description: 'd', canonicalPath: '/planety/mars-v-lve' },
      planetNameRu: 'Марс',
      planetRuSlug: 'mars',
      targetLabel: 'в знаке Льва',
      text: { text: 'Марс в знаке Льва проявляет напористость.', quality: 'draft' },
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data }} />);
    expect(html).toContain('Марс');
    expect(html).toContain('в знаке Льва');
    expect(html).toContain('проявляет напористость');
    expect(html).toContain('Черновик');
  });

  it('честный empty-state, если чанк не найден', () => {
    const data: PlanetInXData = {
      seo: { title: 't', description: 'd', canonicalPath: '/planety/mars-v-7-dome', noindex: true },
      planetNameRu: 'Марс',
      planetRuSlug: 'mars',
      targetLabel: 'в 7-м доме',
      text: null,
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data }} />);
    expect(html).toContain('Текст готовится');
  });
});
