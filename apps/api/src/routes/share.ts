/**
 * /api/v1/share/* — анонимный шеринг результата калькулятора (см. docs/architecture/
 * 21-техническая-архитектура.md §6, packages/db/src/schema/chart-shares.ts, findings f3.md
 * [internal-completeness] «Механика OG-шеринга противоречит требованию валидного превью»):
 *  - `POST /` создаёт (идемпотентно, по хэшу содержимого — см. share/slug.ts) обезличенный
 *    снапшот и возвращает постоянный `shareUrl`;
 *  - `GET /:slug` — данные для SSR-страницы `/podelitsya/{slug}` (рисует ChartWheel на сервере);
 *  - `GET /:slug/og.png` — байты PNG (генерирует worker АСИНХРОННО через resvg, см.
 *    apps/worker/src/share/process-pending-shares.ts — НЕ здесь: resvg держим только в worker,
 *    см. док. 21 §6). Пока PNG не готов — 404 с понятным сообщением (крауler получит валидные
 *    og:title/og:description без og:image до следующего тика воркера, см. отчёт фазы).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  apiErrorSchema,
  chartShareCreateRequestSchema,
  chartShareDetailsResponseSchema,
  chartShareResponseSchema,
  type Config,
} from '@stassist/shared';
import { classifyUgcText } from '@stassist/llm';
import { getDb } from '../db.js';
import { getPorts } from '../route-context.js';
import { findChartShareBySlug, upsertChartShare } from '../repositories/chart-shares-repository.js';
import { computeShareSlug } from '../share/slug.js';

export interface ShareRoutesOptions {
  config: Config;
}

const SHARE_RATE_LIMIT = { max: 10, timeWindow: '1 minute' } as const;
const paramsSchema = z.object({ slug: z.string().min(1) });

export const shareRoutes: FastifyPluginAsyncZod<ShareRoutesOptions> = async (app, opts) => {
  const { config } = opts;

  app.post(
    '/',
    {
      schema: {
        body: chartShareCreateRequestSchema,
        response: { 200: chartShareResponseSchema, 400: apiErrorSchema, 503: apiErrorSchema },
      },
      config: { rateLimit: SHARE_RATE_LIMIT },
    },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) {
        return reply
          .status(503)
          .send({ error: { message: 'Шеринг временно недоступен (БД не сконфигурирована)', requestId: req.id } });
      }
      // Ф9: caption — только у transit_day-карточек (см. shareCaptionSchema); публичный текст,
      // поэтому прогоняется через тот же классификатор, что и UGC (эндпоинт публичный, без auth).
      if (req.body.caption !== undefined && req.body.kind !== 'transit_day') {
        return reply
          .status(400)
          .send({ error: { message: 'caption поддерживается только для карточек «Небо дня» (transit_day)', requestId: req.id } });
      }
      if (req.body.caption && classifyUgcText(req.body.caption).flagged) {
        return reply
          .status(400)
          .send({ error: { message: 'Подпись карточки не прошла автомодерацию — переформулируйте текст', requestId: req.id } });
      }
      const slug = computeShareSlug(req.body);
      const row = await upsertChartShare(db, slug, req.body);
      return reply.send({
        slug: row.slug,
        shareUrl: `${config.appUrl}/podelitsya/${row.slug}`,
        ogImageReady: Boolean(row.ogImageKey),
      });
    },
  );

  app.get(
    '/:slug',
    {
      schema: {
        params: paramsSchema,
        response: { 200: chartShareDetailsResponseSchema, 404: apiErrorSchema },
      },
    },
    async (req, reply) => {
      const db = getDb(config);
      const row = db ? await findChartShareBySlug(db, req.params.slug) : null;
      if (!row) {
        return reply.status(404).send({ error: { message: 'Ссылка не найдена', requestId: req.id } });
      }
      return reply.send({
        slug: row.slug,
        kind: row.kind,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- jsonb не типизирован на границе БД
        positions: row.positions as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        positionsB: (row.positionsB as any) ?? null,
        caption: row.caption,
        theme: row.theme === 'dark' ? 'dark' : 'light',
        ogImageReady: Boolean(row.ogImageKey),
      });
    },
  );

  app.get('/:slug/og.png', { schema: { params: paramsSchema } }, async (req, reply) => {
    const db = getDb(config);
    const row = db ? await findChartShareBySlug(db, req.params.slug) : null;
    if (!row?.ogImageKey) {
      return reply.status(404).send({
        error: {
          message: 'OG-картинка ещё не сгенерирована (воркер обрабатывает асинхронно, см. apps/worker/src/share)',
          requestId: req.id,
        },
      });
    }
    const { storage } = getPorts(config, db);
    const bytes = await storage.get(row.ogImageKey);
    if (!bytes) {
      return reply.status(404).send({ error: { message: 'OG-картинка не найдена в хранилище', requestId: req.id } });
    }
    reply.header('content-type', 'image/png');
    reply.header('cache-control', 'public, max-age=31536000, immutable');
    return reply.send(bytes);
  });
};
