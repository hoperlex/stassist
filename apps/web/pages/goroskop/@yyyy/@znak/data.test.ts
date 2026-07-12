import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { data } from './+data.js';

function fakePageContext(yyyy: string, znak: string) {
  return { routeParams: { yyyy, znak } } as unknown as Parameters<typeof data>[0];
}

describe('pages/goroskop/@yyyy/@znak +data', () => {
  const originalFetch = global.fetch;
  let lastUrl = '';

  beforeEach(() => {
    lastUrl = '';
    global.fetch = vi.fn(async (url: string | URL) => {
      lastUrl = String(url);
      return new Response(
        JSON.stringify({
          scope: 'zodiac', sign: 'aries', period: 'year', topic: 'general', dateKey: '2027',
          bodyMd: 'Годовой текст', humor: false, status: 'published', publishedAt: null, computed: true,
        }),
        { status: 200 },
      );
    }) as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('передаёт ГОД ИЗ URL в запрос к API (см. doc-комментарий apps/api/src/routes/horoscopes.ts)', async () => {
    const result = await data(fakePageContext('2027', 'oven'));
    expect(result.period).toBe('year');
    expect(lastUrl).toContain('year=2027');
    expect(result.h1).toContain('2027');
    expect(result.seo.canonicalPath).toBe('/goroskop/2027/oven');
  });

  it('невалидный год — 404', async () => {
    await expect(data(fakePageContext('20xx', 'oven'))).rejects.toThrow();
  });

  it('неизвестный знак — 404', async () => {
    await expect(data(fakePageContext('2027', 'marsianin'))).rejects.toThrow();
  });
});
