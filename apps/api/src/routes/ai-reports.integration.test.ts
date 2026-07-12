/**
 * ai_reports: big3 генерируется синхронно (StubLlmProvider по умолчанию), повторный запрос той
 * же карты — кэш-хит (тот же id, без нового вызова LLM), premium-типы — пейвол-заглушка 402
 * (см. находки [корректность-кэша]/[самодостаточность-тарификация] в _work/build/findings/f4.md).
 * Требует DATABASE_URL — авто-skip.
 *
 * ПРЕДПОСЫЛКА: миграции ПРИМЕНЕНЫ (`pnpm db:migrate`), calc_presets и корпус Ф4 засеяны
 * (`pnpm data:seed-calc-presets && pnpm data:corpus && pnpm db:seed`).
 */
import { describe, expect, it, afterAll } from 'vitest';
import { buildApp } from '../app.js';
import { closeDb } from '../db.js';
import { buildTestConfig, randomTestEmail } from '../test-helpers/integration.js';

describe.skipIf(!process.env.DATABASE_URL)('ai-reports: big3 синхронно + кэш + пейвол (integration)', () => {
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

  it('big3 — синхронно, StubLlmProvider даёт непустой контент', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    const { accessToken, birthProfileId } = await setupProfile(app);

    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/ai-reports',
      headers: { authorization: `Bearer ${accessToken}` },
      payload: { birthProfileId, kind: 'big3' },
    });
    expect(res.statusCode).toBe(200);
    const report = res.json() as { id: string; status: string; contentMd: string | null };
    expect(report.status).toBe('done');
    expect(report.contentMd).toBeTruthy();

    // Повторный запрос — кэш-хит: тот же id, без новой генерации.
    const again = await app.inject({
      method: 'POST',
      url: '/api/v1/ai-reports',
      headers: { authorization: `Bearer ${accessToken}` },
      payload: { birthProfileId, kind: 'big3' },
    });
    expect(again.statusCode).toBe(200);
    expect((again.json() as { id: string }).id).toBe(report.id);

    await app.close();
  });

  it('natal_full — премиум-заглушка 402 (до биллинга Ф8)', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    const { accessToken, birthProfileId } = await setupProfile(app);

    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/ai-reports',
      headers: { authorization: `Bearer ${accessToken}` },
      payload: { birthProfileId, kind: 'natal_full', sphere: 'personality' },
    });
    expect(res.statusCode).toBe(402);

    await app.close();
  });
});
