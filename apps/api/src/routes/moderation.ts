/**
 * /api/v1/moderation — очередь модератора (req.5 промта Ф7: «премодерация первых 3 постов
 * новичка; автоклассификатор → очередь модератора; интерфейс: лента, жалобы, действия»). Роль
 * moderator/admin.
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  apiErrorSchema,
  moderationActionRequestSchema,
  moderationQueueResponseSchema,
  reportUgcResponseSchema,
  type Config,
  type ModerationQueueItem,
} from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { buildRequireRole } from '../auth/require-role.js';
import { getDb } from '../db.js';
import { getAuthorDisplayNames, listPendingComments, setCommentModeration, type CommentRow } from '../repositories/comments-repository.js';
import { getAuthorDisplayName, listPendingPosts, setPostModeration, type PostRow } from '../repositories/posts-repository.js';
import { countPendingReportsFor, listPendingReports, resolveReport } from '../repositories/reports-ugc-repository.js';
import { insertNotification } from '../repositories/notifications-repository.js';

export interface ModerationRoutesOptions {
  config: Config;
}

const idParamsSchema = z.object({ id: z.string().uuid() });
const MODERATION_REJECT_TEXT_RU =
  'Ваша публикация не прошла модерацию (нарушение правил сообщества — см. /pravila-soobshchestva) и скрыта.';

export const moderationRoutes: FastifyPluginAsyncZod<ModerationRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);
  const requireModerator = buildRequireRole(['moderator', 'admin']);
  app.addHook('preHandler', requireAuth);
  app.addHook('preHandler', requireModerator);

  app.get('/queue', { schema: { response: { 200: moderationQueueResponseSchema } } }, async (_req, reply) => {
    const db = getDb(config);
    if (!db) return reply.send({ items: [] });

    const [pendingPosts, pendingComments] = await Promise.all([listPendingPosts(db, 100), listPendingComments(db, 100)]);

    const postItems: ModerationQueueItem[] = await Promise.all(
      pendingPosts.map(async (p: PostRow) => ({
        entity: 'post' as const,
        entityId: p.id,
        postId: p.id,
        authorId: p.authorId,
        authorDisplayName: await getAuthorDisplayName(db, p.authorId),
        title: p.title,
        bodyMd: p.bodyMd,
        moderation: p.moderation,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- jsonb на границе БД
        autoFlags: (p.autoFlags as any) ?? [],
        reportsCount: await countPendingReportsFor(db, 'post', p.id),
        createdAt: p.createdAt.toISOString(),
      })),
    );

    const commentNames = await getAuthorDisplayNames(db, pendingComments.map((c: CommentRow) => c.authorId));
    const commentItems: ModerationQueueItem[] = await Promise.all(
      pendingComments.map(async (c: CommentRow) => ({
        entity: 'comment' as const,
        entityId: c.id,
        postId: c.postId,
        authorId: c.authorId,
        authorDisplayName: commentNames.get(c.authorId) ?? null,
        title: null,
        bodyMd: c.bodyMd,
        moderation: c.moderation,
        autoFlags: [],
        reportsCount: await countPendingReportsFor(db, 'comment', c.id),
        createdAt: c.createdAt.toISOString(),
      })),
    );

    const items = [...postItems, ...commentItems].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    return reply.send({ items });
  });

  app.patch(
    '/posts/:id',
    { schema: { params: idParamsSchema, body: moderationActionRequestSchema, response: { 200: z.object({ ok: z.boolean() }), 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.status(404).send({ error: { message: 'БД не сконфигурирована', requestId: req.id } });
      const status = req.body.action === 'approve' ? 'approved' : 'rejected';
      const row = await setPostModeration(db, req.params.id, status, status === 'rejected');
      if (!row) return reply.status(404).send({ error: { message: 'Пост не найден', requestId: req.id } });
      if (status === 'rejected') {
        await insertNotification(db, { userId: row.authorId, kind: 'moderation', text: MODERATION_REJECT_TEXT_RU, payload: { postId: row.id, reason: req.body.reason ?? null } });
      }
      return reply.send({ ok: true });
    },
  );

  app.patch(
    '/comments/:id',
    { schema: { params: idParamsSchema, body: moderationActionRequestSchema, response: { 200: z.object({ ok: z.boolean() }), 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.status(404).send({ error: { message: 'БД не сконфигурирована', requestId: req.id } });
      const status = req.body.action === 'approve' ? 'approved' : 'rejected';
      const row = await setCommentModeration(db, req.params.id, status);
      if (!row) return reply.status(404).send({ error: { message: 'Комментарий не найден', requestId: req.id } });
      if (status === 'rejected') {
        await insertNotification(db, { userId: row.authorId, kind: 'moderation', text: MODERATION_REJECT_TEXT_RU, payload: { commentId: row.id, reason: req.body.reason ?? null } });
      }
      return reply.send({ ok: true });
    },
  );

  app.get('/reports', { schema: { response: { 200: z.object({ items: z.array(reportUgcResponseSchema) }) } } }, async (_req, reply) => {
    const db = getDb(config);
    if (!db) return reply.send({ items: [] });
    const rows = await listPendingReports(db);
    return reply.send({
      items: rows.map((r) => ({ id: r.id, reporterId: r.reporterId, entity: r.entity, entityId: r.entityId, reason: r.reason, status: r.status, createdAt: r.createdAt.toISOString() })),
    });
  });

  app.patch(
    '/reports/:id',
    { schema: { params: idParamsSchema, body: z.object({ status: z.enum(['resolved', 'dismissed']) }), response: { 200: z.object({ ok: z.boolean() }), 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.status(404).send({ error: { message: 'БД не сконфигурирована', requestId: req.id } });
      const row = await resolveReport(db, req.params.id, req.authUser!.id, req.body.status);
      if (!row) return reply.status(404).send({ error: { message: 'Жалоба не найдена', requestId: req.id } });
      return reply.send({ ok: true });
    },
  );
};
