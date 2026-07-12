/**
 * /api/v1/reports-ugc — жалобы пользователей на посты/комментарии (req.5 промта Ф7). Отдельно от
 * routes/moderation.ts (там — просмотр/разрешение очереди модератором); здесь — только подача
 * жалобы рядовым пользователем.
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { apiErrorSchema, reportUgcCreateRequestSchema, reportUgcResponseSchema, type Config } from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { getDb } from '../db.js';
import { insertReport } from '../repositories/reports-ugc-repository.js';

export interface ReportsUgcRoutesOptions {
  config: Config;
}

export const reportsUgcRoutes: FastifyPluginAsyncZod<ReportsUgcRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);

  app.post(
    '/',
    { preHandler: requireAuth, schema: { body: reportUgcCreateRequestSchema, response: { 200: reportUgcResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.status(404).send({ error: { message: 'БД не сконфигурирована', requestId: req.id } });
      const row = await insertReport(db, { reporterId: req.authUser!.id, ...req.body });
      return reply.send({
        id: row.id,
        reporterId: row.reporterId,
        entity: row.entity,
        entityId: row.entityId,
        reason: row.reason,
        status: row.status,
        createdAt: row.createdAt.toISOString(),
      });
    },
  );
};
