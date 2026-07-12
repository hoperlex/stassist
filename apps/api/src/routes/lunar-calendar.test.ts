import { describe, expect, it } from 'vitest';
import { parseConfig } from '@stassist/shared';
import { buildApp } from '../app.js';

const testConfig = () =>
  parseConfig({
    NODE_ENV: 'test',
    COOKIE_SECRET: 'x'.repeat(32),
    CORS_ALLOWLIST: 'https://stassist.ru',
  } as NodeJS.ProcessEnv);

describe('GET /api/v1/calc/lunar-calendar/:yyyyMm', () => {
  it('без БД деградирует до 200 с computed=false и пустыми days (честный empty-state)', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/calc/lunar-calendar/2026-08' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.computed).toBe(false);
    expect(body.days).toEqual([]);
    expect(body.referenceLocation.name).toBe('Москва');
    await app.close();
  });

  it('отвергает некорректный формат месяца', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/calc/lunar-calendar/2026-8' });
    expect(res.statusCode).toBe(400);
    await app.close();
  });
});
