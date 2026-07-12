import { describe, expect, it } from 'vitest';
import { parseConfig } from '@stassist/shared';
import { buildApp } from '../app.js';

const testConfig = () =>
  parseConfig({ NODE_ENV: 'test', COOKIE_SECRET: 'x'.repeat(32), CORS_ALLOWLIST: 'https://stassist.ru' } as NodeJS.ProcessEnv);

describe('GET /api/v1/notifications', () => {
  it('без авторизации — 401', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/notifications' });
    expect(res.statusCode).toBe(401);
    await app.close();
  });
});

describe('GET /api/v1/personal-cycles', () => {
  it('без авторизации — 401', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/personal-cycles' });
    expect(res.statusCode).toBe(401);
    await app.close();
  });
});
