import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { api, ApiError, getAccessToken, setAccessToken } from './api-client.js';

function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
    ...init,
  });
}

describe('api-client', () => {
  beforeEach(() => {
    setAccessToken(null);
    vi.restoreAllMocks();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('добавляет Authorization: Bearer при наличии токена в памяти', async () => {
    setAccessToken('token-123');
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }));
    vi.stubGlobal('fetch', fetchMock);

    await api.get('/calc-presets');

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const headers = init.headers as Headers;
    expect(headers.get('authorization')).toBe('Bearer token-123');
  });

  it('GET без токена — заголовок Authorization отсутствует', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }));
    vi.stubGlobal('fetch', fetchMock);

    await api.get('/calc-presets');

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const headers = init.headers as Headers;
    expect(headers.has('authorization')).toBe(false);
  });

  it('на 401 (не /auth/refresh) один раз пытается обновить токен и повторяет запрос', async () => {
    const fetchMock = vi
      .fn()
      // 1. исходный запрос — 401
      .mockResolvedValueOnce(new Response('', { status: 401 }))
      // 2. /auth/refresh — успех
      .mockResolvedValueOnce(jsonResponse({ accessToken: 'new-token' }))
      // 3. повтор исходного запроса — успех
      .mockResolvedValueOnce(jsonResponse({ data: 42 }));
    vi.stubGlobal('fetch', fetchMock);

    const result = await api.get<{ data: number }>('/birth-profiles');

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(result).toEqual({ data: 42 });
    expect(getAccessToken()).toBe('new-token');
  });

  it('если /auth/refresh тоже проваливается — бросает ApiError с исходным статусом', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response('', { status: 401 }))
      .mockResolvedValueOnce(new Response('', { status: 401 })); // refresh тоже 401
    vi.stubGlobal('fetch', fetchMock);

    await expect(api.get('/birth-profiles')).rejects.toThrow(ApiError);
  });

  it('парсит { error: { message, code } } в ApiError', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({ error: { message: 'Нужно согласие', code: 'consent_required' } }, { status: 403 }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await expect(api.post('/birth-profiles', {})).rejects.toMatchObject({
      status: 403,
      message: 'Нужно согласие',
      code: 'consent_required',
    });
  });

  it('204 No Content возвращает undefined, не бросает при парсинге JSON', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(api.delete('/birth-profiles/x')).resolves.toBeUndefined();
  });

  it('POST сериализует тело в JSON и ставит Content-Type', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }));
    vi.stubGlobal('fetch', fetchMock);

    await api.post('/consents', { kind: 'pd_processing' });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(init.body).toBe(JSON.stringify({ kind: 'pd_processing' }));
    const headers = init.headers as Headers;
    expect(headers.get('content-type')).toBe('application/json');
  });
});
