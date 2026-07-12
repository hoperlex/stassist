import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Page } from './+Page.js';
import type { CelebrityPageData } from './+data.js';

describe('pages/karta/@celebrity (галерея знаменитостей)', () => {
  it('честно показывает hasEnoughDataToCompute=false вместо выдуманной карты', () => {
    const data: CelebrityPageData = {
      seo: { title: 't', description: 'd', canonicalPath: '/karta/albert-eynshteyn' },
      celebrity: {
        id: '00000000-0000-0000-0000-000000000003',
        name: 'Альберт Эйнштейн',
        slug: 'albert-eynshteyn',
        birthData: { date: '1879-03-14', time: null, timeUnknown: true, placeName: 'Ульм, Германия', lat: null, lon: null, tzId: null, rodden: 'unknown', source: 'src', verified: false, note: null },
        category: 'наука',
        wikiUrl: null,
        hasEnoughDataToCompute: false,
      },
      posts: [],
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data }} />);
    expect(html).toContain('Альберт Эйнштейн');
    expect(html).toContain('Требует проверки заказчиком');
    expect(html).toContain('Карта пока не рассчитывается');
    expect(html).toContain('Пока нет обсуждений');
  });

  it('честный empty-state для несуществующей знаменитости', () => {
    const data: CelebrityPageData = { seo: { title: 't', description: 'd', canonicalPath: '/karta/x' }, celebrity: null, posts: [] };
    const html = renderToStaticMarkup(<Page pageContext={{ data }} />);
    expect(html).toContain('Знаменитость не найдена');
  });
});
