import { describe, expect, it } from 'vitest';
import { FixtureGeocoder, NominatimGeocoder, normalizeGeocodeQuery } from './geocoder.js';

describe('FixtureGeocoder', () => {
  it('находит известный город без учёта регистра', async () => {
    const geocoder = new FixtureGeocoder();
    const result = await geocoder.geocode('Москва');
    expect(result).toMatchObject({ tzId: 'Europe/Moscow' });
  });

  it('находит город по частичному совпадению', async () => {
    const geocoder = new FixtureGeocoder();
    const result = await geocoder.geocode('г. Новосибирск');
    expect(result?.tzId).toBe('Asia/Novosibirsk');
  });

  it('возвращает null для неизвестного места', async () => {
    const geocoder = new FixtureGeocoder();
    expect(await geocoder.geocode('Атлантида')).toBeNull();
  });

  it('suggest() возвращает пустой список для пустого запроса', async () => {
    const geocoder = new FixtureGeocoder();
    expect(await geocoder.suggest('   ')).toEqual([]);
  });

  it('suggest() ограничивается limit', async () => {
    const geocoder = new FixtureGeocoder();
    const results = await geocoder.suggest('о', 2);
    expect(results.length).toBeLessThanOrEqual(2);
  });
});

describe('normalizeGeocodeQuery', () => {
  it('обрезает пробелы и приводит к нижнему регистру (тот же ключ, что geocode_cache.query_norm)', () => {
    expect(normalizeGeocodeQuery('  Москва  ')).toBe('москва');
  });
});

describe('NominatimGeocoder', () => {
  const sampleResponse = [{ display_name: 'Москва, Россия', lat: '55.7558', lon: '37.6173' }];

  it('вычисляет tzId офлайн через tz-lookup из lat/lon (Nominatim tz не отдаёт)', async () => {
    const geocoder = new NominatimGeocoder({
      baseUrl: 'https://nominatim.example.com',
      userAgent: 'stassist-test/1.0 (contact: test@example.com)',
      minIntervalMs: 0,
      fetchImpl: async () =>
        new Response(JSON.stringify(sampleResponse), { status: 200 }) as unknown as Response,
    });
    const result = await geocoder.geocode('Москва');
    expect(result).toMatchObject({ lat: 55.7558, lon: 37.6173, tzId: 'Europe/Moscow' });
  });

  it('шлёт identifying User-Agent (обязателен по usage policy Nominatim)', async () => {
    let capturedHeaders: HeadersInit | undefined;
    const geocoder = new NominatimGeocoder({
      baseUrl: 'https://nominatim.example.com',
      userAgent: 'stassist-test/1.0 (contact: test@example.com)',
      minIntervalMs: 0,
      fetchImpl: async (_url, init) => {
        capturedHeaders = init?.headers;
        return new Response(JSON.stringify(sampleResponse), { status: 200 }) as unknown as Response;
      },
    });
    await geocoder.geocode('Москва');
    expect((capturedHeaders as Record<string, string>)['User-Agent']).toContain('stassist-test');
  });

  it('соблюдает минимальный интервал между запросами (client-side rate-limit)', async () => {
    const geocoder = new NominatimGeocoder({
      baseUrl: 'https://nominatim.example.com',
      userAgent: 'stassist-test/1.0',
      minIntervalMs: 40,
      fetchImpl: async () =>
        new Response(JSON.stringify(sampleResponse), { status: 200 }) as unknown as Response,
    });
    const start = Date.now();
    await geocoder.geocode('Москва');
    await geocoder.geocode('Москва');
    expect(Date.now() - start).toBeGreaterThanOrEqual(35);
  });

  it('бросает при не-2xx ответе', async () => {
    const geocoder = new NominatimGeocoder({
      baseUrl: 'https://nominatim.example.com',
      userAgent: 'stassist-test/1.0',
      minIntervalMs: 0,
      fetchImpl: async () => new Response('', { status: 503 }) as unknown as Response,
    });
    await expect(geocoder.geocode('Москва')).rejects.toThrow(/503/);
  });
});
