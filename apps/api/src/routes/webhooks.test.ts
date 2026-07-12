/**
 * Находка [webhook-fail-open]: подпись вебхука ЮKassa проверялась ТОЛЬКО если задан
 * `YOOKASSA_WEBHOOK_SECRET` — при незаданном секрете ЛЮБОЙ неаутентифицированный POST
 * применялся как настоящий платёж. Фикс — fail-closed в production: без секрета вебхук
 * отклоняется 401, не доходя до обработки эффекта. Тесты не трогают БД — все проверяемые ветки
 * (fail-closed 401 и подпись) срабатывают ДО `requireDbOr503`.
 */
import { describe, expect, it } from 'vitest';
import { parseConfig, signWebhookPayload, WEBHOOK_SIGNATURE_HEADER } from '@stassist/shared';
import { buildApp } from '../app.js';

const PROD_JWT_PRIVATE_KEY =
  '-----BEGIN PRIVATE KEY-----\nMC4CAQAwBQYDK2VwBCIEIG+ygyrHzZ+qvEM/hM1B3aGgEKB4cNbj7Jfu2KZvOHo1\n-----END PRIVATE KEY-----\n';
const PROD_JWT_PUBLIC_KEY =
  '-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEAhKjcQ7KxxKo8Zyy0Y8qYO9Q1pXKoI6G38CkT1sGE5+0=\n-----END PUBLIC KEY-----\n';
const PROD_PD_ENCRYPTION_KEY = 'WCUeOeq26PCRHZrRgXCjJygtiyegGlJp/6BR/XCllmc=';

const prodConfig = (extra: NodeJS.ProcessEnv = {} as NodeJS.ProcessEnv) =>
  parseConfig({
    NODE_ENV: 'production',
    COOKIE_SECRET: 'x'.repeat(32),
    CORS_ALLOWLIST: 'https://stassist.ru',
    JWT_PRIVATE_KEY: PROD_JWT_PRIVATE_KEY,
    JWT_PUBLIC_KEY: PROD_JWT_PUBLIC_KEY,
    PD_ENCRYPTION_KEY: PROD_PD_ENCRYPTION_KEY,
    DATABASE_URL: 'postgres://u:p@localhost:5432/stassist',
    ...extra,
  } as NodeJS.ProcessEnv);

const testConfig = () =>
  parseConfig({ NODE_ENV: 'test', COOKIE_SECRET: 'x'.repeat(32), CORS_ALLOWLIST: 'https://stassist.ru' } as NodeJS.ProcessEnv);

describe('POST /api/v1/webhooks/yookassa — находка [webhook-fail-open]', () => {
  it('production, YOOKASSA_WEBHOOK_SECRET НЕ задан → 401 fail-closed (эффект НЕ применяется)', async () => {
    const app = await buildApp({ config: prodConfig() });
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/webhooks/yookassa',
      payload: { type: 'notification', event: 'payment.succeeded', object: { id: 'pay-1', status: 'succeeded' } },
    });
    expect(res.statusCode).toBe(401);
    await app.close();
  });

  it('production, секрет задан, подпись НЕВЕРНАЯ → 401 «Неверная подпись»', async () => {
    const app = await buildApp({ config: prodConfig({ YOOKASSA_WEBHOOK_SECRET: 'whsec_test' } as NodeJS.ProcessEnv) });
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/webhooks/yookassa',
      payload: '{}',
      headers: { 'content-type': 'application/json', [WEBHOOK_SIGNATURE_HEADER]: 'not-the-real-signature' },
    });
    expect(res.statusCode).toBe(401);
    expect(res.json()).toMatchObject({ error: { message: expect.stringContaining('одпись') } });
    await app.close();
  });

  it('production, секрет задан, подпись ВЕРНАЯ → проходит проверку подписи (не 401 fail-closed, доходит до валидации тела)', async () => {
    const secret = 'whsec_test';
    const app = await buildApp({ config: prodConfig({ YOOKASSA_WEBHOOK_SECRET: secret } as NodeJS.ProcessEnv) });
    // Тело намеренно НЕ проходит yookassaWebhookEventSchema (нет type/event/object) — так тест
    // не касается БД: если подпись принята, следующий шаг — 400 по схеме, а НЕ 401.
    const rawBody = '{}';
    const signature = signWebhookPayload(rawBody, secret);
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/webhooks/yookassa',
      payload: rawBody,
      headers: { 'content-type': 'application/json', [WEBHOOK_SIGNATURE_HEADER]: signature },
    });
    expect(res.statusCode).toBe(400);
    await app.close();
  });

  it('НЕ production (test/dev), секрет не задан → старое поведение сохранено (не fail-closed, доходит до валидации тела)', async () => {
    const app = await buildApp({ config: testConfig() });
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/webhooks/yookassa',
      payload: '{}',
      headers: { 'content-type': 'application/json' },
    });
    expect(res.statusCode).toBe(400);
    await app.close();
  });
});
