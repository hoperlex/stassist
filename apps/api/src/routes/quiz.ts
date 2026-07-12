/**
 * /api/v1/quiz — квиз-онбординг (req.3 промта Ф8). Вопросы — статичный каталог `QUIZ_QUESTIONS`
 * (публично, без БД); ответы сохраняются авторизованным пользователем.
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  apiErrorSchema,
  QUIZ_CODE,
  QUIZ_QUESTIONS,
  quizAnswersRequestSchema,
  quizAnswersResponseSchema,
  validateQuizAnswers,
  type Config,
} from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { requireDbOr503 } from '../route-context.js';
import { findLatestQuizAnswers, upsertQuizAnswers } from '../repositories/quiz-answers-repository.js';

export interface QuizRoutesOptions {
  config: Config;
}

const questionSchema = z.object({
  code: z.string(),
  textRu: z.string(),
  options: z.array(z.object({ code: z.string(), labelRu: z.string() })),
});

export const quizRoutes: FastifyPluginAsyncZod<QuizRoutesOptions> = async (app, opts) => {
  const { config } = opts;

  app.get('/questions', { schema: { response: { 200: z.object({ quizCode: z.string(), questions: z.array(questionSchema) }) } } }, async (_req, reply) => {
    return reply.send({ quizCode: QUIZ_CODE, questions: QUIZ_QUESTIONS });
  });

  const requireAuth = buildRequireAuth(config);

  app.get(
    '/answers',
    { preHandler: requireAuth, schema: { response: { 200: quizAnswersResponseSchema } } },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const row = await findLatestQuizAnswers(db, req.authUser!.id, QUIZ_CODE);
      return reply.send({
        quizCode: QUIZ_CODE,
        answers: (row?.answers as Record<string, string>) ?? {},
        completedAt: row?.completedAt ? row.completedAt.toISOString() : null,
      });
    },
  );

  app.post(
    '/answers',
    {
      preHandler: requireAuth,
      schema: { body: quizAnswersRequestSchema, response: { 200: quizAnswersResponseSchema, 400: apiErrorSchema } },
    },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const { valid, unknownKeys } = validateQuizAnswers(req.body.answers);
      if (!valid) {
        return reply.status(400).send({
          error: { message: `Неизвестные вопросы/ответы квиза: ${unknownKeys.join(', ')}`, requestId: req.id },
        });
      }
      const row = await upsertQuizAnswers(db, { userId: req.authUser!.id, quizCode: req.body.quizCode, answers: req.body.answers });
      return reply.send({
        quizCode: row.quizCode,
        answers: row.answers as Record<string, string>,
        completedAt: row.completedAt ? row.completedAt.toISOString() : null,
      });
    },
  );
};
