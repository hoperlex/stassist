import { afterEach, describe, expect, it, vi } from 'vitest';
import { data } from './+data.js';

function fakePageContext(month: string) {
  return { routeParams: { month } } as unknown as Parameters<typeof data>[0];
}

describe('pages/lunnyj-kalendar/@month +data', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('невалидный формат месяца → render(404) (бросает)', async () => {
    global.fetch = vi.fn() as unknown as typeof fetch;
    await expect(data(fakePageContext('2026-8'))).rejects.toThrow();
  });

  it('без БД/worker (fetch недоступен) — computed=false, days=[] (честный empty-state)', async () => {
    global.fetch = vi.fn(async () => {
      throw new Error('network down');
    }) as unknown as typeof fetch;
    const result = await data(fakePageContext('2026-08'));
    expect(result.computed).toBe(false);
    expect(result.days).toEqual([]);
    expect(result.prevYyyyMm).toBe('2026-07');
    expect(result.nextYyyyMm).toBe('2026-09');
  });

  it('корректно переходит через границу года (декабрь → январь)', async () => {
    global.fetch = vi.fn(async () => {
      throw new Error('n/a');
    }) as unknown as typeof fetch;
    const result = await data(fakePageContext('2026-12'));
    expect(result.prevYyyyMm).toBe('2026-11');
    expect(result.nextYyyyMm).toBe('2027-01');
  });

  it('успешный ответ API — computed=true, days заполнены', async () => {
    global.fetch = vi.fn(async () =>
      new Response(
        JSON.stringify({
          yyyyMm: '2026-08',
          referenceLocation: { name: 'Москва', lat: 55.7558, lon: 37.6173, tzId: 'Europe/Moscow' },
          days: [{ date: '2026-08-01', lunarDay: 1, moonSignIndex: 0, phaseName: 'new', phaseAngleDeg: 0, isVoidOfCourse: false, voidFromIso: null, voidToIso: null, retrogradeBodies: [], signIngresses: [] }],
          computed: true,
        }),
        { status: 200 },
      ),
    ) as unknown as typeof fetch;
    const result = await data(fakePageContext('2026-08'));
    expect(result.computed).toBe(true);
    expect(result.days).toHaveLength(1);
  });
});
