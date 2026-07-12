import { describe, expect, it } from 'vitest';
import { parseConfig } from '@stassist/shared';
import { buildApp } from '../app.js';

const testConfig = () =>
  parseConfig({ NODE_ENV: 'test', COOKIE_SECRET: 'x'.repeat(32), CORS_ALLOWLIST: 'https://stassist.ru' } as NodeJS.ProcessEnv);

describe('GET /api/v1/plans — публичный каталог тарифов, без БД', () => {
  it('возвращает 3 плана без авторизации и без БД', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/plans' });
    expect(res.statusCode).toBe(200);
    const body = res.json() as { items: Array<{ code: string }> };
    expect(body.items.map((p) => p.code).sort()).toEqual(['free', 'premium_m', 'premium_y']);
    await app.close();
  });
});

describe('GET /api/v1/quiz/questions — публичный каталог вопросов, без БД', () => {
  it('возвращает 5-7 вопросов без авторизации', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/quiz/questions' });
    expect(res.statusCode).toBe(200);
    const body = res.json() as { questions: unknown[] };
    expect(body.questions.length).toBeGreaterThanOrEqual(5);
    expect(body.questions.length).toBeLessThanOrEqual(7);
    await app.close();
  });
});

describe('POST /api/v1/quiz/answers — требует авторизации', () => {
  it('без авторизации — 401', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'POST', url: '/api/v1/quiz/answers', payload: { answers: { sphere: 'love' } } });
    expect(res.statusCode).toBe(401);
    await app.close();
  });
});

describe('GET /api/v1/subscriptions/me — требует авторизации', () => {
  it('без авторизации — 401', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/subscriptions/me' });
    expect(res.statusCode).toBe(401);
    await app.close();
  });
});

describe('POST /api/v1/subscriptions — требует авторизации', () => {
  it('без авторизации — 401', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'POST', url: '/api/v1/subscriptions', payload: { planCode: 'premium_m' } });
    expect(res.statusCode).toBe(401);
    await app.close();
  });
});

describe('GET /api/v1/payments — требует авторизации', () => {
  it('без авторизации — 401', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/payments' });
    expect(res.statusCode).toBe(401);
    await app.close();
  });
});

describe('POST /api/v1/payments/:id/refund — требует роль admin', () => {
  it('без авторизации — 401', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'POST', url: '/api/v1/payments/00000000-0000-0000-0000-000000000000/refund', payload: {} });
    expect(res.statusCode).toBe(401);
    await app.close();
  });
});

describe('POST /api/v1/paywall/expose — soft-auth, работает без токена через anonId', () => {
  it('без anonId и без токена — 400', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'POST', url: '/api/v1/paywall/expose', payload: {} });
    expect(res.statusCode).toBe(400);
    await app.close();
  });

  it('с anonId — 200, содержит непустой копирайт и один из 2 A/B-вариантов', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'POST', url: '/api/v1/paywall/expose', payload: { anonId: 'anon-test-1' } });
    expect(res.statusCode).toBe(200);
    const body = res.json() as { variant: string; headlineRu: string; bullets: string[] };
    expect(['control', 'trial_first']).toContain(body.variant);
    expect(body.headlineRu.length).toBeGreaterThan(5);
    expect(body.bullets.length).toBeGreaterThan(0);
    await app.close();
  });
});

describe('POST /api/v1/promo-codes/validate — публичный, без БД честно отвечает not_found', () => {
  it('без БД — valid:false, reason:not_found (не падает)', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({ method: 'POST', url: '/api/v1/promo-codes/validate', payload: { code: 'ANY' } });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ valid: false, reason: 'not_found' });
    await app.close();
  });
});

describe('POST /api/v1/webhooks/yookassa — публичный, без БД → 503 (degraded, не 500)', () => {
  it('без БД отвечает 503, не крашится', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/webhooks/yookassa',
      payload: { type: 'notification', event: 'payment.succeeded', object: { id: 'p-1', status: 'succeeded' } },
    });
    expect(res.statusCode).toBe(503);
    await app.close();
  });

  it('без подписи (YOOKASSA_WEBHOOK_SECRET не задан) — не требует подписи, отвечает 503 (БД недоступна), не 401', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/webhooks/yookassa',
      payload: { type: 'notification', event: 'payment.succeeded', object: { id: 'p-1', status: 'succeeded' } },
    });
    expect(res.statusCode).not.toBe(401);
    await app.close();
  });

  it('с настроенным секретом и неверной подписью — 401 (закрывает промт: «подделка подписи → 401»)', async () => {
    const config = parseConfig({
      NODE_ENV: 'test',
      COOKIE_SECRET: 'x'.repeat(32),
      CORS_ALLOWLIST: 'https://stassist.ru',
      PAYMENTS: 'yookassa',
      YOOKASSA_SHOP_ID: 'shop',
      YOOKASSA_SECRET_KEY: 'secret',
      YOOKASSA_WEBHOOK_SECRET: 'webhook-secret',
    } as NodeJS.ProcessEnv);
    const app = await buildApp({ config });
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/webhooks/yookassa',
      headers: { 'x-stassist-webhook-signature': 'deadbeef'.repeat(8) },
      payload: { type: 'notification', event: 'payment.succeeded', object: { id: 'p-1', status: 'succeeded' } },
    });
    expect(res.statusCode).toBe(401);
    await app.close();
  });
});
