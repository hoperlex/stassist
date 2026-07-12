/**
 * /api/v1/calc/compat-pages/:signA/:signB — текст пары совместимости (compat_pages, см.
 * docs/roadmap/31-конвенции-реализации.md §5/§6: таблицу создаёт Ф3, `bodyMd` заливает Ф4).
 * БЕЗ авторизации. Канонизирует порядок пары САМ (по `canonicalCompatPairSlug`) — так apps/web
 * может сравнить запрошенный URL с каноническим и выдать 301 без отдельного похода в БД.
 * Деградирует до `bodyMd: null` без БД/строки — честный empty-state, а не 500.
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { apiErrorSchema, canonicalCompatPairSlug, compatPageResponseSchema, type Config } from '@stassist/shared';
import { getDb } from '../db.js';
import { findCompatPage } from '../repositories/compat-pages-repository.js';

export interface CompatPagesRoutesOptions {
  config: Config;
}

const paramsSchema = z.object({ signA: z.string(), signB: z.string() });

export const compatPagesRoutes: FastifyPluginAsyncZod<CompatPagesRoutesOptions> = async (app, opts) => {
  const { config } = opts;

  app.get(
    '/:signA/:signB',
    {
      schema: {
        params: paramsSchema,
        response: { 200: compatPageResponseSchema, 404: apiErrorSchema },
      },
    },
    async (req, reply) => {
      const canon = canonicalCompatPairSlug(req.params.signA, req.params.signB);
      if (!canon) {
        return reply.status(404).send({ error: { message: 'Неизвестный знак зодиака', requestId: req.id } });
      }
      const db = getDb(config);
      const row = db ? await findCompatPage(db, canon.signA, canon.signB) : null;
      return reply.send({ signA: canon.signA, signB: canon.signB, bodyMd: row?.bodyMd ?? null });
    },
  );
};
