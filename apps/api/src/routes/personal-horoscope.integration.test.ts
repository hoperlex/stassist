/**
 * /api/v1/personal-horoscope — генерация лениво при заходе + кэш на день (requirement 4 промта
 * Ф5). Требует DATABASE_URL — авто-skip.
 *
 * ПРЕДПОСЫЛКА: миграции применены, calc_presets засеяны (см. birth-profiles.integration.test.ts).
 */
import { afterAll, describe, expect, it } from 'vitest';
import { buildApp } from '../app.js';
import { closeDb } from '../db.js';
import { buildTestConfig, randomTestEmail } from '../test-helpers/integration.js';
import type { PersonalHoroscopeResponse } from '@stassist/shared';

describe.skipIf(!process.env.DATABASE_URL)('personal-horoscope: ленивая генерация + кэш (integration)', () => {
  afterAll(async () => {
    await closeDb();
  });

  async function setupProfile(app: Awaited<ReturnType<typeof buildApp>>) {
    const email = randomTestEmail();
    const password = 'correct-horse-3';
    await app.inject({ method: 'POST', url: '/api/v1/auth/register', payload: { email, password } });
    const loginRes = await app.inject({ method: 'POST', url: '/api/v1/auth/login', payload: { email, password } });
    const { accessToken } = loginRes.json() as { accessToken: string };

    await app.inject({
      method: 'POST',
      url: '/api/v1/consents',
      headers: { authorization: `Bearer ${accessToken}` },
      payload: { kind: 'pd_processing' },
    });
    const createRes = await app.inject({
      method: 'POST',
      url: '/api/v1/birth-profiles',
      headers: { authorization: `Bearer ${accessToken}` },
      payload: {
        label: 'Я',
        birthDate: '1990-05-17',
        birthTime: '14:30',
        timeUnknown: false,
        place: { placeName: 'Москва, Россия', lat: 55.7558, lon: 37.6173, tzId: 'Europe/Moscow' },
      },
    });
    const profile = createRes.json() as { id: string };
    return { accessToken, birthProfileId: profile.id };
  }

  it('без авторизации — 401', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/personal-horoscope?birthProfileId=00000000-0000-0000-0000-000000000000' });
    expect(res.statusCode).toBe(401);
    await app.close();
  });

  it('краткая версия бесплатна и всегда доступна; полная — заблокирована пейволом (unlocked=false)', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    const { accessToken, birthProfileId } = await setupProfile(app);

    const res = await app.inject({
      method: 'GET',
      url: `/api/v1/personal-horoscope?birthProfileId=${birthProfileId}&period=day`,
      headers: { authorization: `Bearer ${accessToken}` },
    });
    expect(res.statusCode).toBe(200);
    const body = res.json() as PersonalHoroscopeResponse;
    expect(body.summaryMd.length).toBeGreaterThan(10);
    expect(body.unlocked).toBe(false);
    expect(body.fullMd).toBeNull();
    expect(body.computed).toBe(true);

    await app.close();
  });

  it('повторный запрос в тот же день — кэш-хит (та же краткая версия)', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    const { accessToken, birthProfileId } = await setupProfile(app);

    const url = `/api/v1/personal-horoscope?birthProfileId=${birthProfileId}&period=day`;
    const first = await app.inject({ method: 'GET', url, headers: { authorization: `Bearer ${accessToken}` } });
    const second = await app.inject({ method: 'GET', url, headers: { authorization: `Bearer ${accessToken}` } });
    expect((first.json() as PersonalHoroscopeResponse).summaryMd).toBe((second.json() as PersonalHoroscopeResponse).summaryMd);

    await app.close();
  });

  it('чужой профиль — 404 (не палим существование)', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    const { birthProfileId } = await setupProfile(app);
    const { accessToken: otherToken } = await setupProfile(app);

    const res = await app.inject({
      method: 'GET',
      url: `/api/v1/personal-horoscope?birthProfileId=${birthProfileId}`,
      headers: { authorization: `Bearer ${otherToken}` },
    });
    expect(res.statusCode).toBe(404);

    await app.close();
  });
});
