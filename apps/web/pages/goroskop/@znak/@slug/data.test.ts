import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { data } from './+data.js';

function fakePageContext(znak: string, slug: string) {
  return { routeParams: { znak, slug } } as unknown as Parameters<typeof data>[0];
}

describe('pages/goroskop/@znak/@slug +data', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn(async () =>
      new Response(
        JSON.stringify({
          scope: 'zodiac', sign: 'aries', period: 'week', topic: 'general', dateKey: '2026-W29',
          bodyMd: 'Текст гороскопа', humor: false, status: 'published', publishedAt: '2026-07-13T00:00:00Z', computed: true,
        }),
        { status: 200 },
      ),
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('period-слаг резолвится в (period, topic=general)', async () => {
    const result = await data(fakePageContext('oven', 'nedelya'));
    expect(result.period).toBe('week');
    expect(result.topic).toBe('general');
    expect(result.bodyMd).toBe('Текст гороскопа');
    expect(result.seo.canonicalPath).toBe('/goroskop/oven/nedelya');
    expect(result.seo.noindex).toBeFalsy(); // реальный контент — страница индексируется
  });

  it('topic-слаг резолвится в (period=day, topic)', async () => {
    const result = await data(fakePageContext('oven', 'lyubov'));
    expect(result.period).toBe('day');
    expect(result.topic).toBe('love');
  });

  it('неизвестный слаг — 404', async () => {
    await expect(data(fakePageContext('oven', 'unknown-slug'))).rejects.toThrow();
  });

  it('неизвестный знак — 404', async () => {
    await expect(data(fakePageContext('marsianin', 'nedelya'))).rejects.toThrow();
  });

  it('API недоступен — честный empty-state (не падает)', async () => {
    global.fetch = vi.fn(async () => {
      throw new Error('network down');
    }) as unknown as typeof fetch;
    const result = await data(fakePageContext('oven', 'nedelya'));
    expect(result.bodyMd).toBeNull();
    expect(result.computed).toBe(false);
    expect(result.seo.noindex).toBe(true); // страница без реального контента не должна индексироваться
  });
});
