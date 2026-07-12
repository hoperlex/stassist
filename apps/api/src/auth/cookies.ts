/**
 * httpOnly refresh-cookie + non-httpOnly CSRF-cookie — общие настройки, чтобы не разъезжались
 * между /auth/login, /auth/refresh, /auth/logout.
 */
import type { FastifyReply } from 'fastify';
import type { Config } from '@stassist/shared';
import { generateCsrfToken, CSRF_COOKIE_NAME } from './csrf.js';

export const REFRESH_COOKIE_NAME = 'refresh_token';

export function setAuthCookies(
  reply: FastifyReply,
  config: Config,
  refreshTokenPlaintext: string,
): string {
  const secure = config.isProduction;
  reply.setCookie(REFRESH_COOKIE_NAME, refreshTokenPlaintext, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: config.auth.refreshTtlSeconds,
  });
  const csrfToken = generateCsrfToken(config.cookieSecret);
  reply.setCookie(CSRF_COOKIE_NAME, csrfToken, {
    httpOnly: false, // должен быть читаем JS, чтобы продублировать в заголовке (double-submit)
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: config.auth.refreshTtlSeconds,
  });
  return csrfToken;
}

export function clearAuthCookies(reply: FastifyReply, config: Config): void {
  const secure = config.isProduction;
  reply.clearCookie(REFRESH_COOKIE_NAME, { path: '/', secure, sameSite: 'lax' });
  reply.clearCookie(CSRF_COOKIE_NAME, { path: '/', secure, sameSite: 'lax' });
}
