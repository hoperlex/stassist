/**
 * Регрессионный тест на находку [znaki-zodiaka-404]: маршрут `/znaki-zodiaka/{znak}` раньше не
 * существовал вовсе (404 на промт Ф5 + SEO-план). Тест проверяет: невалидный знак → render(404);
 * серверный вызов идёт по АБСОЛЮТНОМУ URL (serverApiGet, тот же принцип, что находка
 * [seo-planety-empty-ssr] в planety/@slug); честный empty-state при недоступности API.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { data } from './+data.js';

function fakePageContext(znak: string) {
  return { routeParams: { znak } } as unknown as Parameters<typeof data>[0];
}

describe('pages/znaki-zodiaka/@znak +data', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('неизвестный знак → render(404) (бросает)', async () => {
    global.fetch = vi.fn() as unknown as typeof fetch;
    await expect(data(fakePageContext('not-a-sign'))).rejects.toThrow();
  });

  it('успешный ответ API — вызывает АБСОЛЮТНЫЙ URL, text заполнен, noindex:false', async () => {
    let calledUrl = '';
    global.fetch = vi.fn(async (url: string) => {
      calledUrl = url;
      return new Response(
        JSON.stringify({ items: [{ key: 'sign:aries:overview', tradition: 'western', text: 'Овен — знак стихии огонь.', quality: 'reviewed', version: 1 }] }),
        { status: 200 },
      );
    }) as unknown as typeof fetch;

    const result = await data(fakePageContext('oven'));

    expect(calledUrl.startsWith('http')).toBe(true);
    expect(calledUrl).toContain('/api/v1/calc/interpretation');
    expect(calledUrl).toContain('sign%3Aaries%3Aoverview');
    expect(result.enSlug).toBe('aries');
    expect(result.text).toEqual({ text: 'Овен — знак стихии огонь.', quality: 'reviewed' });
    expect(result.seo.noindex).toBe(false);
  });

  it('API/сеть недоступны — честный empty-state (text:null, noindex:true), а НЕ падение страницы', async () => {
    global.fetch = vi.fn(async () => {
      throw new Error('network down');
    }) as unknown as typeof fetch;

    const result = await data(fakePageContext('ryby'));

    expect(result.text).toBeNull();
    expect(result.seo.noindex).toBe(true);
  });
});
