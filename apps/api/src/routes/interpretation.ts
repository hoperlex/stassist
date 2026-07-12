/**
 * /api/v1/calc/interpretation?keys=a,b,c — публичное (без авторизации) пакетное чтение чанков
 * корпуса Ф4 по ключам (см. packages/shared/src/schemas/ai-report.ts
 * `interpretationChunksBatchResponseSchema`). Используется публичными калькуляторами Ф3
 * (matrica-sudby/chislo-puti/kvadrat-pifagora/natalnaya-karta) вместо `ContentPendingNotice`
 * (находка [порядок-зависимостей-контента] в _work/build/findings/f4.md). Деградирует до
 * `items: []` без БД — честный empty-state, как compat-pages.ts, а не 500.
 *
 * Отдаёт И draft, И reviewed чанки (§6 конвенций реализации, «правило непустоты» — иначе
 * публичные калькуляторы пустуют до ручной вычитки ~1600 чанков) — клиент сам решает, показывать
 * ли бейдж «черновик» по полю `quality`.
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { interpretationChunksBatchResponseSchema, type Config } from '@stassist/shared';
import { getDb } from '../db.js';
import { findInterpretationChunksByKeys } from '../repositories/interpretation-chunks-repository.js';

export interface InterpretationRoutesOptions {
  config: Config;
}

const MAX_KEYS = 60;

const querySchema = z.object({ keys: z.string().min(1) });

export const interpretationRoutes: FastifyPluginAsyncZod<InterpretationRoutesOptions> = async (app, opts) => {
  const { config } = opts;

  app.get(
    '/',
    { schema: { querystring: querySchema, response: { 200: interpretationChunksBatchResponseSchema } } },
    async (req, reply) => {
      const keys = [...new Set(req.query.keys.split(',').map((k) => k.trim()).filter(Boolean))].slice(0, MAX_KEYS);
      const db = getDb(config);
      const rows = db ? await findInterpretationChunksByKeys(db, keys) : [];
      return reply.send({
        items: rows.map((row) => ({ key: row.key, tradition: row.tradition, text: row.text, quality: row.quality, version: row.version })),
      });
    },
  );
};
