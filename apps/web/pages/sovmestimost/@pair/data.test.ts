import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { data } from './+data.js';

function fakePageContext(pair: string) {
  return { routeParams: { pair } } as unknown as Parameters<typeof data>[0];
}

describe('pages/sovmestimost/@pair +data', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn(async () =>
      new Response(JSON.stringify({ signA: 'oven', signB: 'telec', bodyMd: null }), { status: 200 }),
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('канонический слаг (a<=b) — возвращает данные без редиректа', async () => {
    const result = await data(fakePageContext('oven-i-telec'));
    expect(result.signA).toBe('oven');
    expect(result.signB).toBe('telec');
    expect(result.bodyMd).toBeNull();
    expect(result.seo.canonicalPath).toBe('/sovmestimost/oven-i-telec');
  });

  it('зеркальный слаг (b-i-a) — бросает редирект на канонический URL (301)', async () => {
    await expect(data(fakePageContext('telec-i-oven'))).rejects.toThrow();
  });

  it('неизвестный знак — редирект на /sovmestimost (302)', async () => {
    await expect(data(fakePageContext('oven-i-marsianin'))).rejects.toThrow();
  });

  it('если API недоступен — bodyMd=null, страница НЕ падает (честный empty-state)', async () => {
    global.fetch = vi.fn(async () => {
      throw new Error('network down');
    }) as unknown as typeof fetch;
    const result = await data(fakePageContext('oven-i-telec'));
    expect(result.bodyMd).toBeNull();
  });
});
