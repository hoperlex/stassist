/**
 * /api/v1/reactions — реакции на посты/комментарии (req.2 промта Ф7). Обновляет денормализованный
 * `posts.likesCount`, когда entity='post' и kind='like' (см. routes/posts.ts `sort=popular`).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { apiErrorSchema, reactionSummaryResponseSchema, reactionToggleRequestSchema, type Config } from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { getDb } from '../db.js';
import { incrementLikesCount } from '../repositories/posts-repository.js';
import { getMyReactions, getReactionCounts, toggleReaction } from '../repositories/reactions-repository.js';

export interface ReactionsRoutesOptions {
  config: Config;
}

const entityParamsSchema = z.object({ entity: z.enum(['post', 'comment']), entityId: z.string().uuid() });

export const reactionsRoutes: FastifyPluginAsyncZod<ReactionsRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);

  app.post(
    '/',
    { preHandler: requireAuth, schema: { body: reactionToggleRequestSchema, response: { 200: reactionSummaryResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.status(404).send({ error: { message: 'БД не сконфигурирована', requestId: req.id } });
      const userId = req.authUser!.id;

      const result = await toggleReaction(db, { userId, entity: req.body.entity, entityId: req.body.entityId, kind: req.body.kind });
      if (req.body.entity === 'post' && req.body.kind === 'like') {
        if (result.action === 'created') await incrementLikesCount(db, req.body.entityId, 1);
        if (result.action === 'removed') await incrementLikesCount(db, req.body.entityId, -1);
      }

      const [counts, mine] = await Promise.all([
        getReactionCounts(db, req.body.entity, req.body.entityId),
        getMyReactions(db, userId, req.body.entity, req.body.entityId),
      ]);
      return reply.send({ counts, mine });
    },
  );

  app.get(
    '/',
    { schema: { querystring: entityParamsSchema, response: { 200: reactionSummaryResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.send({ counts: {}, mine: [] });
      const counts = await getReactionCounts(db, req.query.entity, req.query.entityId);
      return reply.send({ counts, mine: [] });
    },
  );
};
