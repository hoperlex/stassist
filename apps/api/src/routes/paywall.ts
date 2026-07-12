/**
 * /api/v1/paywall — экран подписки после квиза + A/B-каркас `experiments`/`experiment_events`
 * (req.3 промта Ф8, doc 22 §7б, `experiments.code='paywall_v1'`). Экспозиция может произойти ДО
 * регистрации (см. doc-комментарий packages/db/src/schema/experiment-events.ts) — авторизация
 * НЕ обязательна (используем `authUser`, если Bearer-токен передан, иначе `anonId` из тела).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import type { FastifyRequest } from 'fastify';
import {
  apiErrorSchema,
  assignPaywallVariant,
  buildPaywallContent,
  PAYWALL_EXPERIMENT_CODE,
  paywallContentResponseSchema,
  paywallExposeRequestSchema,
  experimentConvertRequestSchema,
  quizSphereFromAnswers,
  QUIZ_CODE,
  type Config,
} from '@stassist/shared';
import { AccessTokenError, verifyAccessToken } from '../auth/jwt.js';
import { getDb } from '../db.js';
import { findLatestQuizAnswers } from '../repositories/quiz-answers-repository.js';
import { insertExperimentEvent } from '../repositories/experiment-events-repository.js';

export interface PaywallRoutesOptions {
  config: Config;
}

/** Не требует авторизации, но подхватывает её, если Bearer-токен присутствует и валиден
 *  (soft-auth — тот же случай, что «экспозиция до регистрации» в doc-комментарии файла). */
function buildSoftAuth(config: Config) {
  return async function softAuth(req: FastifyRequest): Promise<void> {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) return;
    try {
      const claims = await verifyAccessToken(header.slice('Bearer '.length), config.auth.jwtPublicKeyPem);
      req.authUser = { id: claims.sub, role: claims.role };
    } catch (err) {
      if (!(err instanceof AccessTokenError)) throw err;
      // невалидный токен на soft-auth эндпоинте — просто игнорируем, не 401.
    }
  };
}

export const paywallRoutes: FastifyPluginAsyncZod<PaywallRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const softAuth = buildSoftAuth(config);

  app.post(
    '/expose',
    {
      preHandler: softAuth,
      schema: {
        body: paywallExposeRequestSchema,
        response: { 200: paywallContentResponseSchema, 400: apiErrorSchema },
      },
    },
    async (req, reply) => {
      const userId = req.authUser?.id ?? null;
      const anonId = req.body.anonId ?? null;
      if (!userId && !anonId) {
        return reply.status(400).send({ error: { message: 'Требуется userId (авторизация) или anonId', requestId: req.id } });
      }
      const seed = userId ?? anonId!;
      const variant = assignPaywallVariant(seed);

      let sphere = req.body.sphere ?? null;
      const db = getDb(config);
      if (!sphere && userId && db) {
        const quiz = await findLatestQuizAnswers(db, userId, QUIZ_CODE);
        sphere = quizSphereFromAnswers(quiz?.answers as Record<string, string> | undefined);
      }

      const content = buildPaywallContent(variant, sphere);
      if (db) {
        await insertExperimentEvent(db, {
          userId,
          anonId,
          experimentCode: PAYWALL_EXPERIMENT_CODE,
          variant,
          event: 'exposed',
          meta: sphere ? { sphere } : {},
        });
      }
      return reply.send(content);
    },
  );

  app.post(
    '/convert',
    { preHandler: softAuth, schema: { body: experimentConvertRequestSchema } },
    async (req, reply) => {
      const db = getDb(config);
      if (db) {
        await insertExperimentEvent(db, {
          userId: req.authUser?.id ?? null,
          anonId: req.body.anonId ?? null,
          experimentCode: PAYWALL_EXPERIMENT_CODE,
          variant: req.body.variant,
          event: 'converted',
          meta: (req.body.meta as Record<string, unknown>) ?? {},
        });
      }
      return reply.send({ ok: true });
    },
  );
};
