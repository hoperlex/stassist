import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Page } from './+Page.js';
import type { SovmestimostPairData } from './+data.js';

const seo = { title: 't', description: 'd', canonicalPath: '/sovmestimost/oven-i-telec' };

describe('pages/sovmestimost/@pair', () => {
  it('без bodyMd показывает честный empty-state (не выдуманный текст)', () => {
    const fixture: SovmestimostPairData = {
      seo, signA: 'oven', signB: 'telec', nameA: 'Овен', nameB: 'Телец', bodyMd: null,
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data: fixture }} />);
    expect(html).toContain('Совместимость Овен и Телец');
    expect(html).toContain('наполняются');
  });

  it('с bodyMd показывает реальный текст пары (без JS, SSR)', () => {
    const fixture: SovmestimostPairData = {
      seo, signA: 'oven', signB: 'telec', nameA: 'Овен', nameB: 'Телец', bodyMd: 'Текст разбора пары.',
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data: fixture }} />);
    expect(html).toContain('Текст разбора пары.');
  });
});
