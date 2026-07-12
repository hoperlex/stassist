/**
 * /api/v1/notifications — уведомления кабинета (первый потребитель — `order_ready`, см.
 * находку [verification-gap] в _work/build/findings/f6.md). Требует авторизации.
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { apiErrorSchema, notificationListResponseSchema, type Config } from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { requireDbOr503 } from '../route-context.js';
import { listNotificationsForUser, markNotificationRead } from '../repositories/notifications-repository.js';

export interface NotificationsRoutesOptions {
  config: Config;
}

const idParamsSchema = z.object({ id: z.string().uuid() });

export const notificationsRoutes: FastifyPluginAsyncZod<NotificationsRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);
  app.addHook('preHandler', requireAuth);

  app.get('/', { schema: { response: { 200: notificationListResponseSchema } } }, async (req, reply) => {
    const db = requireDbOr503(config, reply, req.id);
    if (!db) return;
    const rows = await listNotificationsForUser(db, req.authUser!.id);
    return reply.send({
      items: rows.map((r) => ({
        id: r.id,
        kind: r.kind,
        text: r.text,
        payload: r.payload as Record<string, unknown>,
        readAt: r.readAt ? r.readAt.toISOString() : null,
        createdAt: r.createdAt.toISOString(),
      })),
    });
  });

  app.patch(
    '/:id/read',
    { schema: { params: idParamsSchema, response: { 204: z.void(), 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const ok = await markNotificationRead(db, req.authUser!.id, req.params.id);
      if (!ok) return reply.status(404).send({ error: { message: 'Уведомление не найдено', requestId: req.id } });
      return reply.status(204).send();
    },
  );
};
