/**
 * /api/v1/posts — лента коммьюнити + комментарии (M8, req.1-2 промта Ф7).
 *
 * Модерация (req.5): премодерация первых 3 постов новичка + автоклассификатор (см.
 * `decideInitialPostModeration` в @stassist/shared, `classifyUgcText` в @stassist/llm) — оба
 * сигнала объединяются здесь ПЕРЕД записью в БД (чистая функция решения не знает о БД, роут её
 * только вызывает — легко unit-тестируется отдельно, см. moderation-decision.test.ts).
 *
 * Приватность анонимной карты (req.1): `chart_review_request` копирует ТОЛЬКО обезличенный срез
 * (`anonymizeChartData`, см. calc.ts) в НОВУЮ строку `charts` (`birthProfileId=null`) — оригинал
 * (с профилем/ПД) не трогается и не раскрывается через этот пост.
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import type { Db } from '@stassist/db';
import { z } from 'zod';
import {
  anonymizeChartData,
  apiErrorSchema,
  commentCreateRequestSchema,
  commentListResponseSchema,
  commentResponseSchema,
  decideInitialPostModeration,
  postCreateRequestSchema,
  postListQuerySchema,
  postListResponseSchema,
  postResponseSchema,
  USEFUL_COMMENT_REPUTATION_POINTS,
  type CommentResponse,
  type Config,
  type PdCipherKeyring,
  type PostResponse,
} from '@stassist/shared';
import { classifyUgcText } from '@stassist/llm';
import { buildRequireAuth } from '../auth/require-auth.js';
import { getPdKeyring } from '../auth/pd-keyring.js';
import { getDb } from '../db.js';
import { checksumOf } from '../charts/natal-chart-service.js';
import { getBirthProfile } from '../repositories/birth-profiles-repository.js';
import { findNatalChartByProfile, getChartById, insertAnonymizedChart } from '../repositories/charts-repository.js';
import { getCelebrityById } from '../repositories/celebrities-repository.js';
import {
  getAuthorDisplayNames,
  getCommentById,
  insertComment,
  listCommentsForPost,
  markCommentUseful,
  type CommentRow,
} from '../repositories/comments-repository.js';
import { addPoints } from '../repositories/reputation-repository.js';
import { insertNotification } from '../repositories/notifications-repository.js';
import {
  countApprovedPosts,
  getAuthorDisplayName,
  getPostById,
  incrementCommentsCount,
  insertPost,
  listPosts,
  softDeletePost,
  type PostRow,
} from '../repositories/posts-repository.js';

export interface PostsRoutesOptions {
  config: Config;
}

const idParamsSchema = z.object({ id: z.string().uuid() });

async function toPostResponse(
  db: Db,
  row: PostRow,
  viewerId: string | undefined,
  keyring: PdCipherKeyring,
): Promise<PostResponse> {
  const [authorDisplayName, chartRow, celebrity] = await Promise.all([
    getAuthorDisplayName(db, row.authorId),
    row.chartId ? getChartById(db, row.chartId, keyring) : Promise.resolve(null),
    row.celebrityId ? getCelebrityById(db, row.celebrityId) : Promise.resolve(null),
  ]);
  return {
    id: row.id,
    authorId: row.authorId,
    authorDisplayName,
    authorKind: row.authorKind,
    kind: row.kind,
    title: row.title,
    bodyMd: row.bodyMd,
    chart: chartRow?.data ?? null,
    celebritySlug: celebrity?.slug ?? null,
    status: row.status,
    moderation: row.moderation,
    likesCount: row.likesCount,
    commentsCount: row.commentsCount,
    createdAt: row.createdAt.toISOString(),
    isMine: viewerId === row.authorId,
  };
}

function toCommentResponse(row: CommentRow, names: Map<string, string | null>, viewerId: string | undefined): CommentResponse {
  return {
    id: row.id,
    postId: row.postId,
    authorId: row.authorId,
    authorDisplayName: names.get(row.authorId) ?? null,
    authorKind: row.authorKind,
    parentId: row.parentId,
    bodyMd: row.bodyMd,
    status: row.status,
    moderation: row.moderation,
    markedUsefulAt: row.markedUsefulAt ? row.markedUsefulAt.toISOString() : null,
    createdAt: row.createdAt.toISOString(),
    isMine: viewerId === row.authorId,
  };
}

/** Публично видны ТОЛЬКО опубликованные и одобренные посты/комментарии — либо собственные (автор
 *  видит свои pending/rejected, чтобы понимать статус модерации своей публикации). */
function isVisibleToViewer(status: string, moderation: string, authorId: string, viewerId: string | undefined): boolean {
  if (viewerId === authorId) return status !== 'deleted';
  return status === 'published' && moderation === 'approved';
}

export const postsRoutes: FastifyPluginAsyncZod<PostsRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);
  const keyring = getPdKeyring(config);

  app.get(
    '/',
    { schema: { querystring: postListQuerySchema, response: { 200: postListResponseSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.send({ items: [], total: 0 });
      const { items, total } = await listPosts(db, { ...req.query, onlyApproved: true });
      const responses = await Promise.all(items.map((r) => toPostResponse(db, r, undefined, keyring)));
      return reply.send({ items: responses, total });
    },
  );

  app.get(
    '/mine',
    { preHandler: requireAuth, schema: { querystring: postListQuerySchema.omit({ authorId: true }), response: { 200: postListResponseSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.send({ items: [], total: 0 });
      const userId = req.authUser!.id;
      const { items, total } = await listPosts(db, { ...req.query, authorId: userId, onlyApproved: false });
      const responses = await Promise.all(items.map((r) => toPostResponse(db, r, userId, keyring)));
      return reply.send({ items: responses, total });
    },
  );

  app.post(
    '/',
    { preHandler: requireAuth, schema: { body: postCreateRequestSchema, response: { 200: postResponseSchema, 400: apiErrorSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.status(404).send({ error: { message: 'БД не сконфигурирована', requestId: req.id } });
      const userId = req.authUser!.id;

      let chartId: string | null = null;
      if (req.body.kind === 'chart_review_request' && req.body.birthProfileId) {
        const profile = await getBirthProfile(db, userId, req.body.birthProfileId, keyring);
        if (!profile) {
          return reply.status(404).send({ error: { message: 'Профиль рождения не найден', requestId: req.id } });
        }
        const chart = await findNatalChartByProfile(db, profile.id, keyring);
        if (!chart) {
          return reply.status(400).send({ error: { message: 'Натальная карта для этого профиля ещё не рассчитана', requestId: req.id } });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- jsonb на границе БД
        const anon = anonymizeChartData(chart.data as any);
        const anonRow = await insertAnonymizedChart(
          db,
          {
            presetId: chart.presetId,
            kind: chart.kind,
            data: anon,
            coreVersion: chart.coreVersion,
            checksum: checksumOf(anon),
          },
          keyring,
        );
        chartId = anonRow.id;
      }

      const classification = classifyUgcText(`${req.body.title}\n${req.body.bodyMd}`);
      const priorApproved = await countApprovedPosts(db, userId);
      const moderation = decideInitialPostModeration(priorApproved, classification.flagged);

      const post = await insertPost(db, {
        authorId: userId,
        kind: req.body.kind,
        title: req.body.title,
        bodyMd: req.body.bodyMd,
        chartId,
        celebrityId: req.body.celebrityId ?? null,
        moderation,
        autoFlags: classification.reasons,
      });

      return reply.send(await toPostResponse(db, post, userId, keyring));
    },
  );

  app.get(
    '/:id',
    { schema: { params: idParamsSchema, response: { 200: postResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      const row = db ? await getPostById(db, req.params.id) : null;
      const viewerId = await optionalViewerId(req, config);
      if (!row || !isVisibleToViewer(row.status, row.moderation, row.authorId, viewerId)) {
        return reply.status(404).send({ error: { message: 'Пост не найден', requestId: req.id } });
      }
      return reply.send(await toPostResponse(db!, row, viewerId, keyring));
    },
  );

  app.delete(
    '/:id',
    { preHandler: requireAuth, schema: { params: idParamsSchema, response: { 204: z.void(), 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.status(404).send({ error: { message: 'БД не сконфигурирована', requestId: req.id } });
      const ok = await softDeletePost(db, req.params.id, req.authUser!.id);
      if (!ok) return reply.status(404).send({ error: { message: 'Пост не найден', requestId: req.id } });
      return reply.status(204).send();
    },
  );

  app.get(
    '/:id/comments',
    { schema: { params: idParamsSchema, response: { 200: commentListResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      const post = db ? await getPostById(db, req.params.id) : null;
      const viewerId = await optionalViewerId(req, config);
      if (!db || !post || !isVisibleToViewer(post.status, post.moderation, post.authorId, viewerId)) {
        return reply.status(404).send({ error: { message: 'Пост не найден', requestId: req.id } });
      }
      const rows = await listCommentsForPost(db, post.id);
      const visible = rows.filter((c) => isVisibleToViewer(c.status, c.moderation, c.authorId, viewerId));
      const names = await getAuthorDisplayNames(db, visible.map((c) => c.authorId));
      return reply.send({ items: visible.map((c) => toCommentResponse(c, names, viewerId)) });
    },
  );

  app.post(
    '/:id/comments',
    {
      preHandler: requireAuth,
      schema: { params: idParamsSchema, body: commentCreateRequestSchema, response: { 200: commentResponseSchema, 400: apiErrorSchema, 404: apiErrorSchema } },
    },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.status(404).send({ error: { message: 'БД не сконфигурирована', requestId: req.id } });
      const userId = req.authUser!.id;

      const post = await getPostById(db, req.params.id);
      if (!post) return reply.status(404).send({ error: { message: 'Пост не найден', requestId: req.id } });

      let parentComment: CommentRow | null = null;
      if (req.body.parentId) {
        parentComment = await getCommentById(db, req.body.parentId);
        if (!parentComment || parentComment.postId !== post.id) {
          return reply.status(400).send({ error: { message: 'Родительский комментарий не найден', requestId: req.id } });
        }
        // Дерево ограничено 2 уровнями (req.2 промта) — ответ на УЖЕ вложенный комментарий отклоняем.
        if (parentComment.parentId) {
          return reply.status(400).send({ error: { message: 'Комментарии поддерживают только 2 уровня вложенности', requestId: req.id } });
        }
      }

      const classification = classifyUgcText(req.body.bodyMd);
      const comment = await insertComment(db, {
        postId: post.id,
        authorId: userId,
        parentId: req.body.parentId,
        bodyMd: req.body.bodyMd,
        moderation: classification.flagged ? 'pending' : 'approved',
      });
      await incrementCommentsCount(db, post.id, 1);

      const notifyTargetId = parentComment ? parentComment.authorId : post.authorId;
      if (notifyTargetId !== userId) {
        await insertNotification(db, {
          userId: notifyTargetId,
          kind: 'comment_reply',
          text: 'Новый ответ на ваш пост в сообществе.',
          payload: { postId: post.id, commentId: comment.id },
        });
      }

      const names = await getAuthorDisplayNames(db, [userId]);
      return reply.send(toCommentResponse(comment, names, userId));
    },
  );

  /** «Отметить полезным» (req.2 промта) — только автор ПОСТА, только один раз, начисляет репутацию
   *  автору КОММЕНТАРИЯ (не путать с автором поста). */
  app.patch(
    '/:id/comments/:commentId/mark-useful',
    { preHandler: requireAuth, schema: { params: z.object({ id: z.string().uuid(), commentId: z.string().uuid() }), response: { 200: commentResponseSchema, 403: apiErrorSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.status(404).send({ error: { message: 'БД не сконфигурирована', requestId: req.id } });
      const post = await getPostById(db, req.params.id);
      if (!post) return reply.status(404).send({ error: { message: 'Пост не найден', requestId: req.id } });
      if (post.authorId !== req.authUser!.id) {
        return reply.status(403).send({ error: { message: 'Только автор поста может отметить разбор полезным', requestId: req.id } });
      }
      const comment = await getCommentById(db, req.params.commentId);
      if (!comment || comment.postId !== post.id) {
        return reply.status(404).send({ error: { message: 'Комментарий не найден', requestId: req.id } });
      }
      const updated = await markCommentUseful(db, comment.id);
      if (updated) await addPoints(db, comment.authorId, USEFUL_COMMENT_REPUTATION_POINTS);

      const names = await getAuthorDisplayNames(db, [comment.authorId]);
      return reply.send(toCommentResponse(updated ?? comment, names, req.authUser!.id));
    },
  );
};

/** Пытается извлечь id пользователя из Bearer-токена БЕЗ отказа запроса, если токена нет/невалиден
 *  (публичные GET-роуты работают и без авторизации — им нужен viewerId только для того, чтобы
 *  показать автору его же pending-контент). */
async function optionalViewerId(req: { headers: { authorization?: string } }, config: Config): Promise<string | undefined> {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return undefined;
  try {
    const { verifyAccessToken } = await import('../auth/jwt.js');
    const claims = await verifyAccessToken(header.slice('Bearer '.length), config.auth.jwtPublicKeyPem);
    return claims.sub;
  } catch {
    return undefined;
  }
}
