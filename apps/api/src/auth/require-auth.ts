/**
 * preHandler: проверяет access JWT из `Authorization: Bearer <token>`, кладёт `req.authUser`.
 * Используется на всех кабинетных эндпоинтах (birth-profiles/consents/geocode/calc-presets/
 * account) — в отличие от /auth/refresh и /auth/logout, которые работают через httpOnly cookie
 * + CSRF (см. csrf.ts), а не Bearer-токен (см. findings f2.md [security-scope]).
 */
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Config } from '@stassist/shared';
import { AccessTokenError, verifyAccessToken } from './jwt.js';

export interface AuthedUser {
  id: string;
  role: string;
}

declare module 'fastify' {
  interface FastifyRequest {
    authUser?: AuthedUser;
  }
}

function unauthorized(reply: FastifyReply, requestId: string, message: string): FastifyReply {
  return reply.status(401).send({ error: { message, requestId } });
}

export function buildRequireAuth(config: Config) {
  return async function requireAuth(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      unauthorized(reply, req.id, 'Требуется авторизация');
      return;
    }
    const token = header.slice('Bearer '.length);
    try {
      const claims = await verifyAccessToken(token, config.auth.jwtPublicKeyPem);
      req.authUser = { id: claims.sub, role: claims.role };
    } catch (err) {
      if (err instanceof AccessTokenError) {
        unauthorized(reply, req.id, 'Недействительный или истёкший токен');
        return;
      }
      throw err;
    }
  };
}
