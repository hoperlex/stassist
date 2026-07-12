import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Page } from './+Page.js';
import type { KamenPageData } from './+data.js';

describe('pages/kamni/@kamen (карточка камня)', () => {
  it('рендерит свойства, соответствия и кросс-ссылку на матрицу судьбы', () => {
    const data: KamenPageData = {
      seo: { title: 't', description: 'd', canonicalPath: '/kamni/ametist' },
      stone: {
        slug: 'ametist',
        name: 'Аметист',
        propertiesMd: 'Аметист — разновидность кварца фиолетового цвета.',
        colors: ['фиолетовый'],
        zodiacSigns: ['pisces'],
        planets: ['jupiter'],
        decades: [],
        arcana: [9, 10],
        chakras: ['health_crown'],
        purposes: ['harmony'],
        suitableMd: 'для медитации',
        unsuitableMd: null,
        status: 'draft',
      },
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data }} />);
    expect(html).toContain('Аметист');
    expect(html).toContain('Требует проверки редакцией');
    expect(html).toContain('/matrica-sudby');
  });

  it('честный empty-state для несуществующего камня', () => {
    const data: KamenPageData = { seo: { title: 't', description: 'd', canonicalPath: '/kamni/x' }, stone: null };
    const html = renderToStaticMarkup(<Page pageContext={{ data }} />);
    expect(html).toContain('Камень не найден');
  });
});
