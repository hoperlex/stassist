/**
 * Регрессионный тест на находку [seo-planety-empty-ssr]: SSR-хук `data()` раньше дёргал
 * КЛИЕНТСКИЙ `lib/api-client.ts` (относительный URL `/api/v1/...`) — в Node это падает
 * (`Failed to parse URL`), ошибка молча глоталась в `catch{return{}}`, и все 240 страниц
 * `/planety/{планета}-v-{знак|дом}` отдавались пустыми с `noindex:true`. Тест проверяет, что
 * теперь используется `serverApiGet` (АБСОЛЮТНЫЙ `config.apiUrl`), т.е. `global.fetch` реально
 * вызывается с полным `http(s)://` URL, а не с относительным путём.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { data } from './+data.js';

function fakePageContext(routeParams: Record<string, string>, urlPathname: string) {
  return { routeParams, urlPathname } as unknown as Parameters<typeof data>[0];
}

describe('pages/planety/@slug +data', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('неизвестная планета → render(404) (бросает)', async () => {
    global.fetch = vi.fn() as unknown as typeof fetch;
    await expect(
      data(fakePageContext({ kind: 'sign', planetEn: 'not-a-planet', signEn: 'aries' }, '/planety/x-v-ovne')),
    ).rejects.toThrow();
  });

  it('неизвестный знак → render(404) (бросает)', async () => {
    global.fetch = vi.fn() as unknown as typeof fetch;
    await expect(
      data(fakePageContext({ kind: 'sign', planetEn: 'mars', signEn: 'not-a-sign' }, '/planety/mars-v-x')),
    ).rejects.toThrow();
  });

  it('успешный ответ API — вызывает АБСОЛЮТНЫЙ URL (не относительный /api/v1/...)', async () => {
    let calledUrl = '';
    global.fetch = vi.fn(async (url: string) => {
      calledUrl = url;
      return new Response(
        JSON.stringify({ items: [{ key: 'planet_in_sign:mars:scorpio', tradition: 'western', text: 'Марс в Скорпионе даёт напор.', quality: 'reviewed', version: 1 }] }),
        { status: 200 },
      );
    }) as unknown as typeof fetch;

    const result = await data(fakePageContext({ kind: 'sign', planetEn: 'mars', signEn: 'scorpio' }, '/planety/mars-v-skorpione'));

    expect(calledUrl.startsWith('http')).toBe(true);
    expect(calledUrl).toContain('/api/v1/calc/interpretation');
    expect(calledUrl).toContain('planet_in_sign%3Amars%3Ascorpio');
    expect(result.text).toEqual({ text: 'Марс в Скорпионе даёт напор.', quality: 'reviewed' });
    expect(result.seo.noindex).toBe(false);
  });

  it('API/сеть недоступны — честный empty-state (text:null, noindex:true), а НЕ падение страницы', async () => {
    global.fetch = vi.fn(async () => {
      throw new Error('Failed to parse URL from /api/v1/calc/interpretation?keys=...');
    }) as unknown as typeof fetch;

    const result = await data(fakePageContext({ kind: 'house', planetEn: 'mars', house: '7' }, '/planety/mars-v-7-dome'));

    expect(result.text).toBeNull();
    expect(result.seo.noindex).toBe(true);
  });

  it('чанк для дома ещё не засеян (items:[]) — text:null, noindex:true', async () => {
    global.fetch = vi.fn(async () => new Response(JSON.stringify({ items: [] }), { status: 200 })) as unknown as typeof fetch;

    const result = await data(fakePageContext({ kind: 'house', planetEn: 'venus', house: '3' }, '/planety/venera-v-3-dome'));

    expect(result.text).toBeNull();
    expect(result.seo.noindex).toBe(true);
  });
});
