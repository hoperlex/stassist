import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Page } from './+Page.js';
import type { KamniPoZnakuData } from './+data.js';

describe('pages/kamni-po-znaku/@znak', () => {
  it('рендерит список камней для знака', () => {
    const data: KamniPoZnakuData = {
      seo: { title: 't', description: 'd', canonicalPath: '/kamni-po-znaku/ryby' },
      znakSlug: 'ryby',
      znakName: 'Рыбы',
      stones: [
        {
          slug: 'ametist',
          name: 'Аметист',
          propertiesMd: 'p',
          colors: ['фиолетовый'],
          zodiacSigns: ['pisces'],
          planets: [],
          decades: [],
          arcana: [],
          chakras: [],
          purposes: ['harmony'],
          suitableMd: null,
          unsuitableMd: null,
          status: 'draft',
        },
      ],
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data }} />);
    expect(html).toContain('Рыбы');
    expect(html).toContain('Аметист');
  });
});
