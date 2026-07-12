import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Page } from './+Page.js';
import type { LunnyjKalendarMonthData } from './+data.js';

const seo = { title: 't', description: 'd', canonicalPath: '/lunnyj-kalendar/2026-08' };
const referenceLocation = { name: 'Москва', lat: 55.7558, lon: 37.6173, tzId: 'Europe/Moscow' };

describe('pages/lunnyj-kalendar/@month', () => {
  it('без данных показывает честный empty-state «наполняется»', () => {
    const fixture: LunnyjKalendarMonthData = {
      seo, yyyyMm: '2026-08', days: [], referenceLocation, computed: false,
      prevYyyyMm: '2026-07', nextYyyyMm: '2026-09',
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data: fixture }} />);
    expect(html).toContain('наполняется');
  });

  it('с данными рендерит таблицу дней (SSR, без JS)', () => {
    const fixture: LunnyjKalendarMonthData = {
      seo, yyyyMm: '2026-08', referenceLocation, computed: true,
      prevYyyyMm: '2026-07', nextYyyyMm: '2026-09',
      days: [
        { date: '2026-08-01', lunarDay: 1, moonSignIndex: 0, phaseName: 'new', phaseAngleDeg: 0, isVoidOfCourse: false, voidFromIso: null, voidToIso: null, retrogradeBodies: [], signIngresses: [] },
      ],
    };
    const html = renderToStaticMarkup(<Page pageContext={{ data: fixture }} />);
    expect(html).toContain('2026-08-01');
    expect(html).toContain('Овен');
  });
});
