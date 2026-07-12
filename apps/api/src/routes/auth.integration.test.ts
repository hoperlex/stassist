/**
 * Полный цикл auth: регистрация → верификация e-mail → логин → ротация refresh → reuse
 * detection → logout. + CSRF-отказ без токена. Требует DATABASE_URL с применёнными миграциями
 * (`pnpm db:migrate`) — авто-skip без него (см. §1 конвенций реализации).
 */
import { describe, expect, it, afterAll } from 'vitest';
import { buildApp } from '../app.js';
import { closeDb } from '../db.js';
import { buildTestConfig, randomTestEmail, readLastMailTokenFor } from '../test-helpers/integration.js';

describe.skipIf(!process.env.DATABASE_URL)('auth: полный цикл (integration)', () => {
  afterAll(async () => {
    await closeDb();
  });

  it('регистрация → verify-email → login → refresh (ротация) → reuse detection → logout', async () => {
    const config = buildTestConfig();
    const app = await buildApp({ config });
    const email = randomTestEmail();
    const password = 'correct-horse-1';

    // 1. Регистрация
    const registerRes = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: { email, password },
    });
    expect(registerRes.statusCode).toBe(200);

    // 2. Верификация e-mail (токен — из письма ConsoleMailer)
    const token = await readLastMailTokenFor(email);
    const verifyRes = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/verify-email',
      payload: { token },
    });
    expect(verifyRes.statusCode).toBe(200);

    // 3. Логин
    const loginRes = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/login',
      payload: { email, password },
    });
    expect(loginRes.statusCode).toBe(200);
    const loginBody = loginRes.json() as { accessToken: string; user: { emailVerified: boolean } };
    expect(loginBody.user.emailVerified).toBe(true);

    const refreshCookie = loginRes.cookies.find((c) => c.name === 'refresh_token')!;
    const csrfCookie = loginRes.cookies.find((c) => c.name === 'csrf_token')!;
    expect(refreshCookie).toBeDefined();
    expect(csrfCookie).toBeDefined();

    // 4a. /refresh БЕЗ CSRF-заголовка — отказ 403
    const refreshNoCsrf = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/refresh',
      cookies: { refresh_token: refreshCookie.value, csrf_token: csrfCookie.value },
    });
    expect(refreshNoCsrf.statusCode).toBe(403);

    // 4b. /refresh С CSRF — успешная ротация
    const refreshRes = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/refresh',
      cookies: { refresh_token: refreshCookie.value, csrf_token: csrfCookie.value },
      headers: { 'x-csrf-token': csrfCookie.value },
    });
    expect(refreshRes.statusCode).toBe(200);
    const rotatedCookie = refreshRes.cookies.find((c) => c.name === 'refresh_token')!;
    expect(rotatedCookie.value).not.toBe(refreshCookie.value);

    // 5. REUSE DETECTION: повторное предъявление СТАРОГО (уже погашенного) refresh-токена
    const reuseRes = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/refresh',
      cookies: { refresh_token: refreshCookie.value, csrf_token: csrfCookie.value },
      headers: { 'x-csrf-token': csrfCookie.value },
    });
    expect(reuseRes.statusCode).toBe(401);

    // 6. Семья отозвана целиком — даже "живой" (ротированный) токен теперь недействителен
    const rotatedNowInvalid = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/refresh',
      cookies: { refresh_token: rotatedCookie.value, csrf_token: csrfCookie.value },
      headers: { 'x-csrf-token': csrfCookie.value },
    });
    expect(rotatedNowInvalid.statusCode).toBe(401);

    await app.close();
  });

  it('logout без CSRF-заголовка отклоняется (403)', async () => {
    const config = buildTestConfig();
    const app = await buildApp({ config });
    const email = randomTestEmail();
    const loginRes = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: { email, password: 'correct-horse-2' },
    });
    expect(loginRes.statusCode).toBe(200);
    const login2 = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/login',
      payload: { email, password: 'correct-horse-2' },
    });
    const refreshCookie = login2.cookies.find((c) => c.name === 'refresh_token')!;
    const logoutRes = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/logout',
      cookies: { refresh_token: refreshCookie.value },
    });
    expect(logoutRes.statusCode).toBe(403);
    await app.close();
  });

  it('логин с неверным паролем и с несуществующим e-mail даёт ОДИНАКОВОЕ сообщение (anti-enumeration)', async () => {
    const config = buildTestConfig();
    const app = await buildApp({ config });
    const email = randomTestEmail();
    await app.inject({ method: 'POST', url: '/api/v1/auth/register', payload: { email, password: 'right-password-1' } });

    const wrongPassword = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/login',
      payload: { email, password: 'wrong-password-1' },
    });
    const unknownEmail = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/login',
      payload: { email: randomTestEmail(), password: 'whatever-1' },
    });
    expect(wrongPassword.statusCode).toBe(401);
    expect(unknownEmail.statusCode).toBe(401);
    // requestId закономерно разный на разных запросах (см. REQUEST_ID_HEADER) — сравниваем
    // только "смысловую" часть ответа, которая и обязана быть неотличима (anti-enumeration).
    expect(wrongPassword.json().error.message).toEqual(unknownEmail.json().error.message);
    await app.close();
  });
});
