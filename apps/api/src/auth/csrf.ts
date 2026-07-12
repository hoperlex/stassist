/**
 * CSRF (double-submit cookie + HMAC): применяется ко ВСЕМ cookie-аутентифицированным
 * state-changing эндпоинтам — не только SSR-формам, но и SPA `/auth/refresh`/`/auth/logout`
 * (находка f2.md [security-scope]: формулировка «(SSR-формы)» в промте не должна сужать защиту).
 *
 * Схема: сервер кладёт `csrf_token` в НЕ-httpOnly cookie (доступна JS) при логине; клиент читает
 * её и обязан продублировать в заголовке `x-csrf-token`; сервер сверяет HMAC-подпись (не просто
 * сравнение строк — иначе клиент мог бы подсунуть любую пару без знания секрета) через
 * `COOKIE_SECRET`. Атакующий сайт не может прочитать cookie другого домена (Same-Origin Policy),
 * поэтому не может продублировать её значение в заголовке — классический double-submit.
 */
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const CSRF_COOKIE_NAME = 'csrf_token';
export const CSRF_HEADER_NAME = 'x-csrf-token';

export function generateCsrfToken(secret: string): string {
  const nonce = randomBytes(16).toString('hex');
  const sig = createHmac('sha256', secret).update(nonce).digest('hex');
  return `${nonce}.${sig}`;
}

export function verifyCsrfToken(token: string | undefined, secret: string): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [nonce, sig] = parts as [string, string];
  const expected = createHmac('sha256', secret).update(nonce).digest('hex');
  const a = Buffer.from(sig, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Double-submit: cookie и заголовок обязаны совпадать буквально И оба должны быть валидны. */
export function verifyCsrfDoubleSubmit(
  cookieValue: string | undefined,
  headerValue: string | undefined,
  secret: string,
): boolean {
  if (!cookieValue || !headerValue || cookieValue !== headerValue) return false;
  return verifyCsrfToken(cookieValue, secret);
}
