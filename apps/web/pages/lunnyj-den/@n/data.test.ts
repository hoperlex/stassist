import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { data } from './+data.js';

function fakePageContext(n: string) {
  return { routeParams: { n } } as unknown as Parameters<typeof data>[0];
}

describe('pages/lunnyj-den/@n +data', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn(async () =>
      new Response(
        JSON.stringify({
          scope: 'lunar_day', sign: '15', period: 'day', topic: 'general', dateKey: '2026-07-13',
          bodyMd: 'Текст лунного дня', humor: false, status: 'published', publishedAt: null, computed: true,
        }),
        { status: 200 },
      ),
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('валидный номер (1..30) — данные загружены', async () => {
    const result = await data(fakePageContext('15'));
    expect(result.n).toBe(15);
    expect(result.bodyMd).toBe('Текст лунного дня');
  });

  it('вне диапазона — 404', async () => {
    await expect(data(fakePageContext('31'))).rejects.toThrow();
    await expect(data(fakePageContext('0'))).rejects.toThrow();
  });

  it('не число — 404', async () => {
    await expect(data(fakePageContext('abc'))).rejects.toThrow();
  });
});
