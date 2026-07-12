import { describe, expect, it } from 'vitest';
import { FixtureGeocoder } from './geocoder.js';

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
});
