import { describe, expect, it } from 'vitest';
import { parseConfig } from '@stassist/shared';
import { buildApp } from '../app.js';

const testConfig = () =>
  parseConfig({ NODE_ENV: 'test', COOKIE_SECRET: 'x'.repeat(32), CORS_ALLOWLIST: 'https://stassist.ru' } as NodeJS.ProcessEnv);

describe('POST /api/v1/ai-reports', () => {
  it('без авторизации — 401', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/ai-reports',
      payload: { birthProfileId: '00000000-0000-0000-0000-000000000000', kind: 'big3' },
    });
    expect(res.statusCode).toBe(401);
    await app.close();
  });
});

describe('GET /api/v1/ai-reports/:id', () => {
  it('без авторизации — 401', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/ai-reports/00000000-0000-0000-0000-000000000000' });
    expect(res.statusCode).toBe(401);
    await app.close();
  });
});
