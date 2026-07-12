/**
 * birth_profiles: гейт согласием 152-ФЗ, CRUD, шифрование ПД на месте (проверка сырым SQL —
 * значения в БД НЕ должны содержать исходный текст), и что натальная карта реально считается
 * и сохраняется (charts.kind='natal', meta присутствует). Требует DATABASE_URL — авто-skip.
 *
 * ПРЕДПОСЫЛКА: миграции ПРИМЕНЕНЫ (`pnpm db:migrate`) И системные calc_presets ЗАСЕЯНЫ
 * (`pnpm data:seed-calc-presets && pnpm db:seed`) — иначе создание профиля не найдёт дефолтный
 * пресет 'modern_western' и тест на расчёт карты не пройдёт.
 */
import { describe, expect, it, afterAll } from 'vitest';
import { Pool } from 'pg';
import { buildApp } from '../app.js';
import { closeDb } from '../db.js';
import { buildTestConfig, randomTestEmail } from '../test-helpers/integration.js';

describe.skipIf(!process.env.DATABASE_URL)('birth-profiles: гейт согласием + шифрование + карта (integration)', () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  afterAll(async () => {
    await pool.end();
    await closeDb();
  });

  async function registerAndLogin(app: Awaited<ReturnType<typeof buildApp>>) {
    const email = randomTestEmail();
    const password = 'correct-horse-3';
    await app.inject({ method: 'POST', url: '/api/v1/auth/register', payload: { email, password } });
    const loginRes = await app.inject({ method: 'POST', url: '/api/v1/auth/login', payload: { email, password } });
    const { accessToken, user } = loginRes.json() as { accessToken: string; user: { id: string } };
    return { accessToken, userId: user.id };
  }

  it('создание профиля БЕЗ действующего согласия — 403 consent_required', async () => {
    const config = buildTestConfig();
    const app = await buildApp({ config });
    const { accessToken } = await registerAndLogin(app);

    const res = await app.inject({
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
    expect(res.statusCode).toBe(403);
    expect(res.json()).toMatchObject({ error: { code: 'consent_required' } });
    await app.close();
  });

  it('согласие → создание профиля → ПД нечитаемы в БД напрямую → карта посчитана', async () => {
    const config = buildTestConfig();
    const app = await buildApp({ config });
    const { accessToken } = await registerAndLogin(app);

    const consentRes = await app.inject({
      method: 'POST',
      url: '/api/v1/consents',
      headers: { authorization: `Bearer ${accessToken}` },
      payload: { kind: 'pd_processing' },
    });
    expect(consentRes.statusCode).toBe(200);

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
    expect(createRes.statusCode).toBe(200);
    const profile = createRes.json() as { id: string; birthDate: string; lat: number };
    expect(profile.birthDate).toBe('1990-05-17');
    expect(profile.lat).toBeCloseTo(55.7558);

    // Проверка "вживую": значения 🔒-полей в БД нечитаемы напрямую (см. промт Ф2, «Верификация»).
    const { rows } = await pool.query(
      'SELECT birth_date_enc, place_name_enc, lat_enc FROM birth_profiles WHERE id = $1',
      [profile.id],
    );
    expect(rows[0].birth_date_enc).not.toContain('1990-05-17');
    expect(rows[0].place_name_enc).not.toContain('Москва');
    expect(rows[0].lat_enc).not.toContain('55.7558');
    expect(String(rows[0].birth_date_enc)).toMatch(/^v1:/); // формат pd-cipher.ts

    // Натальная карта посчитана и сохранена.
    const chartRes = await app.inject({
      method: 'GET',
      url: `/api/v1/birth-profiles/${profile.id}/chart`,
      headers: { authorization: `Bearer ${accessToken}` },
    });
    expect(chartRes.statusCode).toBe(200);
    const chart = chartRes.json() as { kind: string; data: { meta: { coreVersion: string } } };
    expect(chart.kind).toBe('natal');
    expect(chart.data.meta.coreVersion).toBeTruthy();

    await app.close();
  });

  it('GET /birth-profiles/:id чужого пользователя → 404 (не 403 — не палим существование)', async () => {
    const config = buildTestConfig();
    const appA = await buildApp({ config });
    const appB = await buildApp({ config });
    const a = await registerAndLogin(appA);
    const b = await registerAndLogin(appB);

    await appA.inject({
      method: 'POST',
      url: '/api/v1/consents',
      headers: { authorization: `Bearer ${a.accessToken}` },
      payload: { kind: 'pd_processing' },
    });
    const created = await appA.inject({
      method: 'POST',
      url: '/api/v1/birth-profiles',
      headers: { authorization: `Bearer ${a.accessToken}` },
      payload: {
        label: 'Я',
        birthDate: '1990-05-17',
        timeUnknown: true,
        place: { placeName: 'Москва, Россия', lat: 55.7558, lon: 37.6173, tzId: 'Europe/Moscow' },
      },
    });
    const profile = created.json() as { id: string };

    const res = await appB.inject({
      method: 'GET',
      url: `/api/v1/birth-profiles/${profile.id}`,
      headers: { authorization: `Bearer ${b.accessToken}` },
    });
    expect(res.statusCode).toBe(404);

    await appA.close();
    await appB.close();
  });
});
