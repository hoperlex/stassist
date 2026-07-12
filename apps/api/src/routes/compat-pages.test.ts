import { describe, expect, it } from 'vitest';
import { parseConfig } from '@stassist/shared';
import { buildApp } from '../app.js';

const testConfig = () =>
  parseConfig({
    NODE_ENV: 'test',
    COOKIE_SECRET: 'x'.repeat(32),
    CORS_ALLOWLIST: 'https://stassist.ru',
  } as NodeJS.ProcessEnv);

describe('GET /api/v1/calc/compat-pages/:signA/:signB', () => {
  it('канонизирует порядок пары и без БД отдаёт bodyMd=null (честный empty-state)', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/calc/compat-pages/telec/oven' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.signA).toBe('oven');
    expect(body.signB).toBe('telec');
    expect(body.bodyMd).toBeNull();
    await app.close();
  });

  it('404 на неизвестный знак', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/calc/compat-pages/oven/marsianin' });
    expect(res.statusCode).toBe(404);
    await app.close();
  });
});
