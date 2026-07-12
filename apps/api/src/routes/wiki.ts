/**
 * /api/v1/wiki-articles — публичное чтение (SSR `/wiki/{razdel}/{slug}`, req.3 промта Ф7) + поиск
 * pg_trgm (req.4) + правка редактором (роль editor/admin, req.2 «редакционная очередь… версии»).
 * Публичное чтение деградирует до пустого списка/`null` без БД — честный empty-state (200), тот
 * же принцип, что stones.ts/interpretation.ts (SSR-страницам нельзя отдавать 500/503 краулеру).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  apiErrorSchema,
  wikiArticleListQuerySchema,
  wikiArticleListResponseSchema,
  wikiArticleRevisionListResponseSchema,
  wikiArticleResponseSchema,
  wikiArticleUpdateRequestSchema,
  type Config,
  type WikiArticleResponse,
} from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { buildRequireRole } from '../auth/require-role.js';
import { getDb } from '../db.js';
import {
  getArticleById,
  getArticleBySlug,
  listArticles,
  listRevisions,
  searchArticles,
  updateArticle,
  type WikiArticleRow,
} from '../repositories/wiki-articles-repository.js';

export interface WikiRoutesOptions {
  config: Config;
}

const slugParamsSchema = z.object({ slug: z.string().min(1) });

function toResponse(row: WikiArticleRow): WikiArticleResponse {
  return {
    id: row.id,
    slug: row.slug,
    section: row.section,
    title: row.title,
    bodyMd: row.bodyMd,
    status: row.status,
    editorId: row.editorId,
    version: row.version,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- jsonb на границе БД
    seo: (row.seo as any) ?? null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export const wikiRoutes: FastifyPluginAsyncZod<WikiRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);
  const requireEditor = buildRequireRole(['editor', 'admin']);

  app.get(
    '/',
    { schema: { querystring: wikiArticleListQuerySchema, response: { 200: wikiArticleListResponseSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.send({ items: [], total: 0 });
      const rows = req.query.q
        ? await searchArticles(db, { q: req.query.q, section: req.query.section, limit: req.query.limit })
        : await listArticles(db, { section: req.query.section, limit: req.query.limit });
      return reply.send({ items: rows.map((r) => toResponse(r)), total: rows.length });
    },
  );

  app.get(
    '/:slug',
    { schema: { params: slugParamsSchema, response: { 200: wikiArticleResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      const row = db ? await getArticleBySlug(db, req.params.slug) : null;
      if (!row) return reply.status(404).send({ error: { message: 'Статья не найдена', requestId: req.id } });
      return reply.send(toResponse(row));
    },
  );

  app.patch(
    '/:slug',
    {
      preHandler: [requireAuth, requireEditor],
      schema: { params: slugParamsSchema, body: wikiArticleUpdateRequestSchema, response: { 200: wikiArticleResponseSchema, 404: apiErrorSchema } },
    },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.status(404).send({ error: { message: 'БД не сконфигурирована', requestId: req.id } });
      const updated = await updateArticle(db, req.params.slug, req.authUser!.id, req.body);
      if (!updated) return reply.status(404).send({ error: { message: 'Статья не найдена', requestId: req.id } });
      return reply.send(toResponse(updated));
    },
  );

  app.get(
    '/:slug/revisions',
    { preHandler: [requireAuth, requireEditor], schema: { params: slugParamsSchema, response: { 200: wikiArticleRevisionListResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      const article = db ? await getArticleBySlug(db, req.params.slug) : null;
      if (!db || !article) return reply.status(404).send({ error: { message: 'Статья не найдена', requestId: req.id } });
      const rows = await listRevisions(db, article.id);
      return reply.send({
        items: rows.map((r) => ({
          id: r.id,
          articleId: r.articleId,
          version: r.version,
          title: r.title,
          bodyMd: r.bodyMd,
          editorId: r.editorId,
          createdAt: r.createdAt.toISOString(),
        })),
      });
    },
  );

  // Используется /planety (получение статьи планеты/знака по id для перелинковки, если нужно).
  app.get(
    '/by-id/:id',
    { schema: { params: z.object({ id: z.string().uuid() }), response: { 200: wikiArticleResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      const row = db ? await getArticleById(db, req.params.id) : null;
      if (!row) return reply.status(404).send({ error: { message: 'Статья не найдена', requestId: req.id } });
      return reply.send(toResponse(row));
    },
  );
};
