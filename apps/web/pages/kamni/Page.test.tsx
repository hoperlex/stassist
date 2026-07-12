import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import type { StoneResponse } from '@stassist/shared';
import { Page } from './+Page.js';
import type { KamniIndexData } from './+data.js';

const sampleStone: StoneResponse = {
  slug: 'ametist',
  name: 'Аметист',
  propertiesMd: 'Аметист — разновидность кварца фиолетового цвета.',
  colors: ['фиолетовый'],
  zodiacSigns: ['pisces'],
  planets: ['jupiter'],
  decades: [],
  arcana: [9],
  chakras: ['health_crown'],
  purposes: ['harmony'],
  suitableMd: null,
  unsuitableMd: null,
  status: 'draft',
};

describe('pages/kamni (каталог)', () => {
  it('рендерит карточки камней и дисклеймер без JS (SSR)', () => {
    const data: KamniIndexData = {
      seo: { title: 't', description: 'd', canonicalPath: '/kamni' },
      stones: [sampleStone],
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data }} />);
    expect(html).toContain('Аметист');
    expect(html).toContain('Информационно-развлекательный характер');
  });

  it('честный empty-state, если каталог пуст', () => {
    const data: KamniIndexData = { seo: { title: 't', description: 'd', canonicalPath: '/kamni' }, stones: [] };
    const html = renderToStaticMarkup(<Page pageContext={{ data }} />);
    expect(html).toContain('Каталог наполняется');
  });
});
