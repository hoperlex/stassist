/**
 * /api/v1/stones — витрина камней (req.4 промта Ф6), ПУБЛИЧНЫЙ read-only роут (без авторизации,
 * тот же характер, что compat-pages.ts/interpretation.ts — анонимные SSR-страницы `/kamni/*`
 * читают отсюда, см. apps/web/pages/kamni). Деградирует до `items: []`/404 без БД — честный
 * empty-state (200), а НЕ 503: это публичные SEO-страницы, которым нельзя отдавать ошибку
 * краулеру (см. doc-комментарий interpretation.ts/compat-pages.ts — тот же принцип).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { apiErrorSchema, stoneListQuerySchema, stoneListResponseSchema, stoneResponseSchema, type Config, type StoneResponse } from '@stassist/shared';
import { getDb } from '../db.js';
import { getStoneBySlug, listStones, type StoneRow } from '../repositories/stones-repository.js';

export interface StonesRoutesOptions {
  config: Config;
}

const slugParamsSchema = z.object({ slug: z.string().min(1) });

function toResponse(row: StoneRow): StoneResponse {
  return {
    slug: row.slug,
    name: row.name,
    propertiesMd: row.propertiesMd,
    colors: row.colors,
    // Узкие enum-типы (ZodiacSignEnSlug/StonePlanetSlug/StonePurpose) сужаются кастом — сама
    // колонка `text[]` в БД не может нести литеральный union-тип; наполнение гарантируется
    // `tools/gen-stones.ts`/валидацией на запись, не на этом read-пути.
    zodiacSigns: row.zodiacSigns as StoneResponse['zodiacSigns'],
    planets: row.planets as StoneResponse['planets'],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- jsonb из БД не типизирован на границе
    decades: row.decades as any,
    arcana: row.arcana,
    chakras: row.chakras,
    purposes: row.purposes as StoneResponse['purposes'],
    suitableMd: row.suitableMd,
    unsuitableMd: row.unsuitableMd,
    status: row.status,
  };
}

export const stonesRoutes: FastifyPluginAsyncZod<StonesRoutesOptions> = async (app, opts) => {
  const { config } = opts;

  app.get(
    '/',
    { schema: { querystring: stoneListQuerySchema, response: { 200: stoneListResponseSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      const rows = db ? await listStones(db, req.query) : [];
      return reply.send({ items: rows.map(toResponse) });
    },
  );

  app.get(
    '/:slug',
    { schema: { params: slugParamsSchema, response: { 200: stoneResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      const row = db ? await getStoneBySlug(db, req.params.slug) : null;
      if (!row) return reply.status(404).send({ error: { message: 'Камень не найден', requestId: req.id } });
      return reply.send(toResponse(row));
    },
  );
};
