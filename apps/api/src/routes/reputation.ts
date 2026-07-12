/**
 * /api/v1/reputation — очки/бейджи коммьюнити (req.2 промта Ф7). Публичное чтение по userId
 * (профиль автора в ленте), `/mine` — требует авторизации.
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { reputationResponseSchema, type Config } from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { getDb } from '../db.js';
import { getReputation } from '../repositories/reputation-repository.js';

export interface ReputationRoutesOptions {
  config: Config;
}

function emptyReputation(userId: string): { userId: string; score: number; badges: string[] } {
  return { userId, score: 0, badges: ['novice'] };
}

export const reputationRoutes: FastifyPluginAsyncZod<ReputationRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);

  app.get('/mine', { preHandler: requireAuth, schema: { response: { 200: reputationResponseSchema } } }, async (req, reply) => {
    const db = getDb(config);
    const userId = req.authUser!.id;
    const row = db ? await getReputation(db, userId) : null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- jsonb на границе БД
    return reply.send(row ? { userId: row.userId, score: row.score, badges: row.badges as any } : emptyReputation(userId));
  });

  app.get(
    '/:userId',
    { schema: { params: z.object({ userId: z.string().uuid() }), response: { 200: reputationResponseSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      const row = db ? await getReputation(db, req.params.userId) : null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- jsonb на границе БД
      return reply.send(row ? { userId: row.userId, score: row.score, badges: row.badges as any } : emptyReputation(req.params.userId));
    },
  );
};
