/**
 * /api/v1/horoscopes/*, /api/v1/calc/astro-weather/today — ленивая генерация «при заходе»
 * (requirement 4 промта Ф5), идемпотентность (второй запрос не создаёт новую строку и отдаёт тот
 * же текст). Требует DATABASE_URL — авто-skip.
 */
import { afterAll, describe, expect, it } from 'vitest';
import { Pool } from 'pg';
import { buildApp } from '../app.js';
import { closeDb } from '../db.js';
import { buildTestConfig } from '../test-helpers/integration.js';
import type { HoroscopeResponse, AstroWeatherTodayResponse } from '@stassist/shared';

describe.skipIf(!process.env.DATABASE_URL)('horoscopes: ленивая генерация + идемпотентность (integration)', () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  afterAll(async () => {
    await pool.query(
      `DELETE FROM horoscopes WHERE (scope='zodiac' AND sign='aries' AND period='day' AND topic='general' AND humor=false)
         OR (scope='zodiac' AND period='week' AND topic='love' AND humor=false)
         OR (scope='eastern' AND date_key='2031')
         OR (scope='lunar_day' AND sign='7')
         OR (scope='zodiac' AND sign='gemini' AND humor=true)
         OR (scope='profession' AND sign='razrabotchik' AND humor=true)`,
    );
    await pool.end();
    await closeDb();
  });

  it('GET /horoscopes/zodiac/:sign/:period/:topic — генерирует при первом заходе, кэширует', async () => {
    const app = await buildApp({ config: buildTestConfig() });

    const first = await app.inject({ method: 'GET', url: '/api/v1/horoscopes/zodiac/aries/day/general' });
    expect(first.statusCode).toBe(200);
    const body1 = first.json() as HoroscopeResponse;
    expect(body1.computed).toBe(true);
    expect(body1.bodyMd).toBeTruthy();
    expect(body1.humor).toBe(false);

    const second = await app.inject({ method: 'GET', url: '/api/v1/horoscopes/zodiac/aries/day/general' });
    const body2 = second.json() as HoroscopeResponse;
    expect(body2.bodyMd).toBe(body1.bodyMd); // кэш-хит, не перегенерировано

    const countRes = await pool.query(
      `SELECT count(*)::int AS c FROM horoscopes WHERE scope='zodiac' AND sign='aries' AND period='day' AND topic='general' AND humor=false`,
    );
    expect(countRes.rows[0].c).toBe(1); // без дублей

    await app.close();
  });

  it('GET /horoscopes/zodiac/:sign/:period/:topic — один вызов заодно наполняет остальные 11 знаков (батч-экономия)', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    await app.inject({ method: 'GET', url: '/api/v1/horoscopes/zodiac/leo/week/love' });

    const countRes = await pool.query(
      `SELECT count(*)::int AS c FROM horoscopes WHERE scope='zodiac' AND period='week' AND topic='love' AND humor=false`,
    );
    expect(countRes.rows[0].c).toBe(12);

    await app.close();
  });

  it('GET /horoscopes/eastern/:yyyy/:animal — генерирует восточный годовой', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/horoscopes/eastern/2031/rat' });
    expect(res.statusCode).toBe(200);
    const body = res.json() as HoroscopeResponse;
    expect(body.computed).toBe(true);
    expect(body.scope).toBe('eastern');
    await app.close();
  });

  it('GET /horoscopes/lunar-day/:n — evergreen, повторный запрос не меняет текст', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    const a = await app.inject({ method: 'GET', url: '/api/v1/horoscopes/lunar-day/7' });
    const b = await app.inject({ method: 'GET', url: '/api/v1/horoscopes/lunar-day/7' });
    expect((a.json() as HoroscopeResponse).bodyMd).toBe((b.json() as HoroscopeResponse).bodyMd);
    await app.close();
  });

  it('GET /horoscopes/humor/zodiac/:sign и /humor/profession/:slug — humor=true', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    const zodiac = await app.inject({ method: 'GET', url: '/api/v1/horoscopes/humor/zodiac/gemini' });
    expect((zodiac.json() as HoroscopeResponse).humor).toBe(true);

    const profession = await app.inject({ method: 'GET', url: '/api/v1/horoscopes/humor/profession/razrabotchik' });
    expect(profession.statusCode).toBe(200);
    expect((profession.json() as HoroscopeResponse).humor).toBe(true);
    await app.close();
  });

  it('GET /calc/astro-weather/today — отдаёт форму ответа, честно помечает computed', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/calc/astro-weather/today' });
    expect(res.statusCode).toBe(200);
    const body = res.json() as AstroWeatherTodayResponse;
    expect(typeof body.computed).toBe('boolean');
    await app.close();
  });
});
