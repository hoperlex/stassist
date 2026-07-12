/**
 * /api/v1/celebrities — публичное чтение (галерея `/karta/{celebrity}`, req.4 промта Ф7) + импорт
 * CSV (роль admin, req. «механизм импорта админ/CSV», см. §8 конвенций реализации — агент не
 * выдумывает данные, только строит каркас импорта). Публичное чтение деградирует до `items: []`
 * без БД — честный empty-state (тот же принцип, что stones.ts/wiki.ts).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  apiErrorSchema,
  celebrityCsvRowSchema,
  celebrityImportRequestSchema,
  celebrityImportResponseSchema,
  celebrityListQuerySchema,
  celebrityListResponseSchema,
  celebrityResponseSchema,
  type CelebrityResponse,
  type Config,
} from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { buildRequireRole } from '../auth/require-role.js';
import { getDb } from '../db.js';
import { getCelebrityBySlug, listCelebrities, upsertCelebrity, type CelebrityRow } from '../repositories/celebrities-repository.js';

export interface CelebritiesRoutesOptions {
  config: Config;
}

const slugParamsSchema = z.object({ slug: z.string().min(1) });

function toResponse(row: CelebrityRow): CelebrityResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- jsonb на границе БД
  const birthData = (row.birthData as any) ?? null;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    birthData,
    category: row.category,
    wikiUrl: row.wikiUrl,
    hasEnoughDataToCompute: Boolean(birthData?.date && birthData?.lat != null && birthData?.lon != null),
  };
}

/** Простой CSV-парсер (без внешней зависимости) — разбивает по строкам/запятым, первая строка —
 *  заголовок (см. `celebrityCsvRowSchema` для ожидаемых колонок, `tools/data/
 *  celebrities-import-template.csv` для образца). Не поддерживает экранированные запятые внутри
 *  полей (MVP-упрощение, достаточно для простого админ-импорта). */
export function parseCelebritiesCsv(csv: string): Array<Record<string, string>> {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];
  const header = lines[0]!.split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(',');
    const row: Record<string, string> = {};
    header.forEach((key, i) => {
      row[key] = (values[i] ?? '').trim();
    });
    return row;
  });
}

export const celebritiesRoutes: FastifyPluginAsyncZod<CelebritiesRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);
  const requireAdmin = buildRequireRole(['admin']);

  app.get(
    '/',
    { schema: { querystring: celebrityListQuerySchema, response: { 200: celebrityListResponseSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.send({ items: [], total: 0 });
      const rows = await listCelebrities(db, req.query);
      return reply.send({ items: rows.map(toResponse), total: rows.length });
    },
  );

  app.get(
    '/:slug',
    { schema: { params: slugParamsSchema, response: { 200: celebrityResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      const row = db ? await getCelebrityBySlug(db, req.params.slug) : null;
      if (!row) return reply.status(404).send({ error: { message: 'Знаменитость не найдена', requestId: req.id } });
      return reply.send(toResponse(row));
    },
  );

  app.post(
    '/import',
    {
      preHandler: [requireAuth, requireAdmin],
      schema: { body: celebrityImportRequestSchema, response: { 200: celebrityImportResponseSchema, 404: apiErrorSchema } },
    },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.status(404).send({ error: { message: 'БД не сконфигурирована', requestId: req.id } });

      const rawRows = parseCelebritiesCsv(req.body.csv);
      let inserted = 0;
      let updated = 0;
      const errors: Array<{ row: number; message: string }> = [];

      for (let i = 0; i < rawRows.length; i++) {
        const parsed = celebrityCsvRowSchema.safeParse(rawRows[i]);
        if (!parsed.success) {
          errors.push({ row: i + 2, message: parsed.error.issues.map((iss) => iss.message).join('; ') });
          continue;
        }
        const result = await upsertCelebrity(db, parsed.data);
        if (result.inserted) inserted++;
        else updated++;
      }

      return reply.send({ inserted, updated, errors });
    },
  );
};
