import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import type { ZodiacSignInfo } from '@stassist/shared';
import { Page } from './+Page.js';
import type { ZnakiZodiakaData } from './+data.js';

const OVEN: ZodiacSignInfo = {
  signIndex: 0,
  slug: 'oven',
  nameRu: 'Овен',
  nameRuGenitive: 'Овна',
  slugPrepositional: 'ovne',
  glyph: '♈',
  element: 'fire',
  elementRu: 'огонь',
  quality: 'cardinal',
};

describe('pages/znaki-zodiaka/@znak (находка [znaki-zodiaka-404])', () => {
  it('рендерит описание знака и перелинковку', () => {
    const data: ZnakiZodiakaData = {
      seo: { title: 't', description: 'd', canonicalPath: '/znaki-zodiaka/oven' },
      sign: OVEN,
      enSlug: 'aries',
      text: { text: 'Овен — знак стихии огонь, кардинальный по качеству.', quality: 'reviewed' },
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data }} />);
    expect(html).toContain('Овен');
    expect(html).toContain('огонь');
    expect(html).toContain('кардинальный по качеству');
    expect(html).toContain('/goroskop/oven');
    expect(html).toContain('/kamni-po-znaku/oven');
    expect(html).toContain('/wiki/signs/aries');
  });

  it('честный empty-state, если чанк не найден', () => {
    const data: ZnakiZodiakaData = {
      seo: { title: 't', description: 'd', canonicalPath: '/znaki-zodiaka/oven', noindex: true },
      sign: OVEN,
      enSlug: 'aries',
      text: null,
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data }} />);
    expect(html).toContain('Текст готовится');
  });

  it('показывает бейдж черновика для quality=draft', () => {
    const data: ZnakiZodiakaData = {
      seo: { title: 't', description: 'd', canonicalPath: '/znaki-zodiaka/oven' },
      sign: OVEN,
      enSlug: 'aries',
      text: { text: 'Черновой текст.', quality: 'draft' },
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data }} />);
    expect(html).toContain('Черновик, требует редактуры');
  });
});
