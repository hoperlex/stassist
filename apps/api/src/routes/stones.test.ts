import { describe, expect, it } from 'vitest';
import { parseConfig } from '@stassist/shared';
import { buildApp } from '../app.js';

const testConfig = () =>
  parseConfig({ NODE_ENV: 'test', COOKIE_SECRET: 'x'.repeat(32), CORS_ALLOWLIST: 'https://stassist.ru' } as NodeJS.ProcessEnv);

describe('GET /api/v1/stones', () => {
  it('без БД отдаёт items=[] (честный empty-state публичной SEO-страницы, не 500/503)', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/stones' });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ items: [] });
    await app.close();
  });

  it('фильтр по знаку/назначению принимается без 400 (валидация querystring)', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/stones?sign=aries&purpose=money' });
    expect(res.statusCode).toBe(200);
    await app.close();
  });

  it('неизвестное значение фильтра — 400', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/stones?sign=not-a-sign' });
    expect(res.statusCode).toBe(400);
    await app.close();
  });
});

describe('GET /api/v1/stones/:slug', () => {
  it('без БД — 404 (честный empty-state, а не 500)', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/stones/ametist' });
    expect(res.statusCode).toBe(404);
    await app.close();
  });
});
