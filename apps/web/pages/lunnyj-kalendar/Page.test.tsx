import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Page } from './+Page.js';
import type { LunnyjKalendarData } from './+data.js';

const seo = { title: 't', description: 'd', canonicalPath: '/lunnyj-kalendar' };
const referenceLocation = { name: 'Москва', lat: 55.7558, lon: 37.6173, tzId: 'Europe/Moscow' };

describe('pages/lunnyj-kalendar (индекс)', () => {
  it('без предрасчёта на сегодня — честный empty-state', () => {
    const fixture: LunnyjKalendarData = { seo, currentYyyyMm: '2026-08', today: null, referenceLocation, computed: false };
    const html = renderToStaticMarkup(<Page pageContext={{ data: fixture }} />);
    expect(html).toContain('наполняется');
    expect(html).toContain('Москва');
  });

  it('с данными на сегодня — рендерит виджет', () => {
    const fixture: LunnyjKalendarData = {
      seo, currentYyyyMm: '2026-08', referenceLocation, computed: true,
      today: { date: '2026-08-01', lunarDay: 5, moonSignIndex: 3, phaseName: 'full', phaseAngleDeg: 180, isVoidOfCourse: true, voidFromIso: null, voidToIso: null, retrogradeBodies: ['mercury'], signIngresses: [] },
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data: fixture }} />);
    expect(html).toContain('полнолуние');
    expect(html).toContain('Рак');
  });
});
