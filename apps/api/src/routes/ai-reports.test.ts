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

  it('находка [llm-endpoint-no-rate-limit]: выделенный per-route лимит (10/мин) срабатывает раньше общего 100/мин', async () => {
    const app = await buildApp({ config: testConfig() });
    const payload = { birthProfileId: '00000000-0000-0000-0000-000000000000', kind: 'big3' };
    // Rate-limit хук — onRequest, срабатывает РАНЬШЕ preHandler-проверки авторизации (401), т.е.
    // считает попытки независимо от того, есть ли валидный токен — так и должно быть: иначе
    // атакующий без токена вообще не ограничивался бы.
    const statuses: number[] = [];
    for (let i = 0; i < 11; i += 1) {
      const res = await app.inject({ method: 'POST', url: '/api/v1/ai-reports', payload });
      statuses.push(res.statusCode);
    }
    expect(statuses.slice(0, 10)).toEqual(Array(10).fill(401));
    expect(statuses[10]).toBe(429);
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
