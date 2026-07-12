/**
 * /api/v1/auth/* — регистрация, e-mail-верификация, логин, ротация refresh (+ reuse detection),
 * logout, password reset. См. docs/architecture/21-техническая-архитектура.md §5.
 *
 * Rate-limit: заметно жёстче общего лимита (config.ts app.ts выставляет 100/мин глобально) —
 * здесь 10/мин на большинство эндпоинтов (грубая защита от подбора/спама писем), 30/мин на
 * /refresh (легитимный SPA-трафик обновляет токен чаще при параллельных вкладках).
 */
import type { FastifyPluginAsync, RawServerDefault } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { randomUUID } from 'node:crypto';
import {
  emailVerifyRequestSchema,
  loginRequestSchema,
  passwordResetConfirmSchema,
  passwordResetRequestSchema,
  registerRequestSchema,
  type Config,
} from '@stassist/shared';
import { hashPassword, verifyPassword } from '../auth/password.js';
import { getDummyPasswordHash } from '../auth/dummy-hash.js';
import { signAccessToken } from '../auth/jwt.js';
import { generateOpaqueToken, hashOpaqueToken } from '../auth/tokens.js';
import { issueFirstRefreshToken, rotateRefreshToken, RefreshTokenInvalidError } from '../auth/refresh-rotation.js';
import { setAuthCookies, clearAuthCookies, REFRESH_COOKIE_NAME } from '../auth/cookies.js';
import { buildCsrfGuard } from '../auth/csrf-guard.js';
import { PgRefreshTokenRepository } from '../repositories/refresh-tokens-repository.pg.js';
import { findUserByEmail, findUserById, insertUser, markEmailVerified, updatePasswordHash } from '../repositories/users-repository.js';
import { insertEmailVerification, consumeEmailVerification } from '../repositories/email-verifications-repository.js';
import { insertPasswordReset, consumePasswordReset } from '../repositories/password-resets-repository.js';
import { writeAuditLog } from '../repositories/audit-log-repository.js';
import { buildAlreadyRegisteredMail, buildEmailVerificationMail, buildPasswordResetMail } from '../mail/templates.js';
import { requireDbOr503, getPorts } from '../route-context.js';

export interface AuthRoutesOptions {
  config: Config;
}

const AUTH_RATE_LIMIT = { max: 10, timeWindow: '1 minute' } as const;
const REFRESH_RATE_LIMIT = { max: 30, timeWindow: '1 minute' } as const;

export const authRoutes: FastifyPluginAsync<AuthRoutesOptions, RawServerDefault, ZodTypeProvider> = async (
  app,
  opts,
) => {
  const { config } = opts;
  const csrfGuard = buildCsrfGuard(config);

  app.post(
    '/register',
    {
      schema: { body: registerRequestSchema },
      config: { rateLimit: AUTH_RATE_LIMIT },
    },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const { email, password, displayName } = req.body;
      const { mailer } = getPorts(config, db);
      const ackMessage = 'Если этот e-mail ещё не зарегистрирован — на него отправлено письмо для подтверждения.';

      const existing = await findUserByEmail(db, email);
      if (existing) {
        // Защита от enumeration: единый ответ, но письмо — «у вас уже есть аккаунт», не верификация.
        await mailer.send(
          buildAlreadyRegisteredMail({ to: email, resetUrl: `${config.appUrl}/reset-password` }),
        );
        return reply.send({ message: ackMessage });
      }

      const passwordHash = await hashPassword(password);
      const user = await insertUser(db, { email, passwordHash, displayName });
      const token = generateOpaqueToken();
      await insertEmailVerification(db, { userId: user.id, tokenHash: hashOpaqueToken(token) });
      await mailer.send(
        buildEmailVerificationMail({
          to: email,
          verifyUrl: `${config.appUrl}/verify-email?token=${token}`,
        }),
      );
      await writeAuditLog(db, {
        actorId: user.id,
        action: 'user.register',
        entity: 'user',
        entityId: user.id,
        requestId: req.id,
      });
      return reply.send({ message: ackMessage });
    },
  );

  app.post(
    '/verify-email',
    {
      schema: { body: emailVerifyRequestSchema },
      config: { rateLimit: AUTH_RATE_LIMIT },
    },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const result = await consumeEmailVerification(db, hashOpaqueToken(req.body.token));
      if (!result) {
        return reply
          .status(400)
          .send({ error: { message: 'Ссылка недействительна или устарела', requestId: req.id } });
      }
      await markEmailVerified(db, result.userId);
      await writeAuditLog(db, {
        actorId: result.userId,
        action: 'user.email_verified',
        entity: 'user',
        entityId: result.userId,
        requestId: req.id,
      });
      return reply.send({ message: 'E-mail подтверждён.' });
    },
  );

  app.post(
    '/login',
    {
      schema: { body: loginRequestSchema },
      config: { rateLimit: AUTH_RATE_LIMIT },
    },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const { email, password } = req.body;
      const invalidCreds = (): void => {
        void reply
          .status(401)
          .send({ error: { message: 'Неверный e-mail или пароль', requestId: req.id } });
      };

      const user = await findUserByEmail(db, email);
      if (!user || user.status !== 'active') {
        // Прогоняем verifyPassword даже без пользователя — иначе ответ «нет такого e-mail»
        // заметно быстрее ответа «неверный пароль» (timing-оракул для enumeration).
        await verifyPassword(password, await getDummyPasswordHash());
        invalidCreds();
        return;
      }

      const ok = await verifyPassword(password, user.passwordHash);
      if (!ok) {
        invalidCreds();
        return;
      }

      const familyId = randomUUID();
      const repo = new PgRefreshTokenRepository(db);
      const { plaintext } = await issueFirstRefreshToken({
        userId: user.id,
        repo,
        ttlSeconds: config.auth.refreshTtlSeconds,
        familyId,
      });
      const accessToken = await signAccessToken({
        userId: user.id,
        role: user.role,
        ttlSeconds: config.auth.accessTtlSeconds,
        privateKeyPem: config.auth.jwtPrivateKeyPem,
      });
      setAuthCookies(reply, config, plaintext);
      await writeAuditLog(db, {
        actorId: user.id,
        action: 'user.login',
        entity: 'user',
        entityId: user.id,
        requestId: req.id,
      });

      return reply.send({
        accessToken,
        expiresIn: config.auth.accessTtlSeconds,
        user: {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
          role: user.role,
          emailVerified: user.emailVerifiedAt !== null,
        },
      });
    },
  );

  app.post(
    '/refresh',
    {
      preHandler: csrfGuard,
      config: { rateLimit: REFRESH_RATE_LIMIT },
    },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const cookieToken = req.cookies[REFRESH_COOKIE_NAME];
      if (!cookieToken) {
        return reply.status(401).send({ error: { message: 'Нет refresh-токена', requestId: req.id } });
      }

      const repo = new PgRefreshTokenRepository(db);
      let outcome;
      try {
        outcome = await rotateRefreshToken({
          presentedTokenPlaintext: cookieToken,
          repo,
          ttlSeconds: config.auth.refreshTtlSeconds,
        });
      } catch (err) {
        if (err instanceof RefreshTokenInvalidError) {
          clearAuthCookies(reply, config);
          return reply.status(401).send({ error: { message: 'Сессия недействительна, войдите заново', requestId: req.id } });
        }
        throw err;
      }

      if (outcome.kind === 'reuse-detected') {
        clearAuthCookies(reply, config);
        await writeAuditLog(db, {
          actorId: outcome.userId,
          action: 'auth.refresh_reuse_detected',
          entity: 'refresh_token_family',
          entityId: outcome.familyId,
          payload: { revokedCount: outcome.revokedCount },
          requestId: req.id,
        });
        return reply.status(401).send({
          error: {
            message: 'Обнаружено повторное использование refresh-токена — все сессии отозваны, войдите заново',
            requestId: req.id,
          },
        });
      }

      const user = await findUserById(db, outcome.userId);
      if (!user || user.status !== 'active') {
        clearAuthCookies(reply, config);
        return reply.status(401).send({ error: { message: 'Учётная запись недоступна', requestId: req.id } });
      }

      const accessToken = await signAccessToken({
        userId: user.id,
        role: user.role,
        ttlSeconds: config.auth.accessTtlSeconds,
        privateKeyPem: config.auth.jwtPrivateKeyPem,
      });
      setAuthCookies(reply, config, outcome.issued.plaintext);

      return reply.send({
        accessToken,
        expiresIn: config.auth.accessTtlSeconds,
        user: {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
          role: user.role,
          emailVerified: user.emailVerifiedAt !== null,
        },
      });
    },
  );

  app.post(
    '/logout',
    {
      preHandler: csrfGuard,
      config: { rateLimit: REFRESH_RATE_LIMIT },
    },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const cookieToken = req.cookies[REFRESH_COOKIE_NAME];
      if (cookieToken) {
        const repo = new PgRefreshTokenRepository(db);
        const existing = await repo.findByHash(hashOpaqueToken(cookieToken));
        if (existing) {
          await repo.revokeFamily(existing.familyId, new Date());
          await writeAuditLog(db, {
            actorId: existing.userId,
            action: 'user.logout',
            entity: 'refresh_token_family',
            entityId: existing.familyId,
            requestId: req.id,
          });
        }
      }
      clearAuthCookies(reply, config);
      return reply.send({ message: 'Вы вышли из системы.' });
    },
  );

  app.post(
    '/password-reset/request',
    {
      schema: { body: passwordResetRequestSchema },
      config: { rateLimit: AUTH_RATE_LIMIT },
    },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const ackMessage = 'Если такой e-mail зарегистрирован — на него отправлено письмо со ссылкой для сброса пароля.';
      const { email } = req.body;
      const { mailer } = getPorts(config, db);

      const user = await findUserByEmail(db, email);
      if (user && user.status === 'active') {
        const token = generateOpaqueToken();
        await insertPasswordReset(db, { userId: user.id, tokenHash: hashOpaqueToken(token) });
        await mailer.send(
          buildPasswordResetMail({ to: email, resetUrl: `${config.appUrl}/reset-password?token=${token}` }),
        );
        await writeAuditLog(db, {
          actorId: user.id,
          action: 'user.password_reset_requested',
          entity: 'user',
          entityId: user.id,
          requestId: req.id,
        });
      }
      return reply.send({ message: ackMessage });
    },
  );

  app.post(
    '/password-reset/confirm',
    {
      schema: { body: passwordResetConfirmSchema },
      config: { rateLimit: AUTH_RATE_LIMIT },
    },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const { token, newPassword, revokeOtherSessions } = req.body;
      const result = await consumePasswordReset(db, hashOpaqueToken(token));
      if (!result) {
        return reply
          .status(400)
          .send({ error: { message: 'Ссылка недействительна или устарела', requestId: req.id } });
      }
      const newHash = await hashPassword(newPassword);
      await updatePasswordHash(db, result.userId, newHash);
      if (revokeOtherSessions) {
        const repo = new PgRefreshTokenRepository(db);
        await repo.revokeAllForUser(result.userId, new Date());
      }
      await writeAuditLog(db, {
        actorId: result.userId,
        action: 'user.password_reset_confirmed',
        entity: 'user',
        entityId: result.userId,
        payload: { revokeOtherSessions },
        requestId: req.id,
      });
      return reply.send({ message: 'Пароль изменён.' });
    },
  );
};
