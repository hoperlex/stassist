import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ZODIAC_SIGNS } from '@stassist/shared';
import { Page } from './+Page.js';
import type { SovmestimostIndexData } from './+data.js';

const fixtureData: SovmestimostIndexData = {
  seo: { title: 't', description: 'd', canonicalPath: '/sovmestimost' },
  signs: ZODIAC_SIGNS,
  pairs: [{ slug: 'oven-i-telec', nameA: 'Овен', nameB: 'Телец' }],
};

describe('pages/sovmestimost (индекс)', () => {
  it('рендерит перелинковку на пары без JS (SSR)', () => {
    const html = renderToStaticMarkup(<Page pageContext={{ data: fixtureData }} />);
    expect(html).toContain('Совместимость знаков зодиака');
    expect(html).toContain('/sovmestimost/oven-i-telec');
    expect(html).toContain('Овен и Телец');
  });
});
