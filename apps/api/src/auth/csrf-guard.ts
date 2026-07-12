import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Config } from '@stassist/shared';
import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME, verifyCsrfDoubleSubmit } from './csrf.js';

/**
 * preHandler для cookie-аутентифицированных state-changing эндпоинтов (`/auth/refresh`,
 * `/auth/logout`) — ОБЯЗАТЕЛЕН на обоих, не только на SSR-формах (findings f2.md
 * [security-scope]).
 */
export function buildCsrfGuard(config: Config) {
  return async function csrfGuard(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const cookieValue = req.cookies[CSRF_COOKIE_NAME];
    const headerValue = req.headers[CSRF_HEADER_NAME] as string | undefined;
    if (!verifyCsrfDoubleSubmit(cookieValue, headerValue, config.cookieSecret)) {
      await reply.status(403).send({ error: { message: 'CSRF-проверка не пройдена', requestId: req.id } });
    }
  };
}
