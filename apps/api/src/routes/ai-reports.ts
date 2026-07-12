/**
 * /api/v1/ai-reports — ИИ-разборы (см. docs/roadmap/prompts/f4-llm-конвейер.md req.4-5,
 * находки [внутренняя-полнота-модель-исполнения]/[корректность-кэша]/[самодостаточность-
 * тарификация] в _work/build/findings/f4.md).
 *
 * Модель исполнения: `kind='big3'` (бесплатный, лёгкий) исполняется СИНХРОННО прямо в этом
 * роуте — сразу возвращает готовый отчёт. Остальные типы — асинхронно: строка пишется со
 * status='queued', периодический pg-boss cron в apps/worker подхватывает её (см.
 * apps/worker/src/llm/generate-report-job.ts) — клиент опрашивает `GET /:id` (polling; SSE —
 * задел под будущую фазу, не в MVP-скоупе Ф4).
 *
 * cache_key (см. packages/llm/src/cache/cache-key.ts): повторный запрос того же разбора для той
 * же карты/пресета/версии промта/ядра НЕ платит — отдаёт уже готовый `status='done'` отчёт.
 *
 * Тарификация (находка [самодостаточность-тарификация]): big3 — бесплатно; остальные —
 * premium с пейвол-заглушкой (флаг ниже) до полноценного биллинга Ф8.
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  aiReportCreateRequestSchema,
  aiReportResponseSchema,
  apiErrorSchema,
  isFreeReportKind,
  type ChartData,
  type Config,
} from '@stassist/shared';
import { buildCacheKey, generateReport, reportKindConfig, PROMPT_VERSION } from '@stassist/llm';
import { buildRequireAuth } from '../auth/require-auth.js';
import { getPdKeyring } from '../auth/pd-keyring.js';
import { getPorts, requireDbOr503 } from '../route-context.js';
import { getBirthProfile } from '../repositories/birth-profiles-repository.js';
import { findNatalChartByProfile } from '../repositories/charts-repository.js';
import {
  findAiReportForUser,
  findDoneReportByCacheKey,
  insertDoneAiReport,
  insertQueuedAiReport,
  rowToResponse,
} from '../repositories/ai-reports-repository.js';
import { DrizzleChunkRepository } from '../llm/drizzle-chunk-repository.js';

export interface AiReportsRoutesOptions {
  config: Config;
}

const idParamsSchema = z.object({ id: z.string().uuid() });

/** Ф8 заменит на реальную проверку активной подписки — пока явная пейвол-заглушка за флагом
 *  (см. находку [самодостаточность-тарификация] в _work/build/findings/f4.md). */
const PREMIUM_REPORTS_ENABLED = false;

export const aiReportsRoutes: FastifyPluginAsyncZod<AiReportsRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);
  app.addHook('preHandler', requireAuth);

  app.post(
    '/',
    {
      schema: {
        body: aiReportCreateRequestSchema,
        response: {
          200: aiReportResponseSchema,
          202: aiReportResponseSchema,
          402: apiErrorSchema,
          404: apiErrorSchema,
        },
      },
    },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const userId = req.authUser!.id;
      const { birthProfileId, kind, sphere, question } = req.body;

      if (!isFreeReportKind(kind) && !PREMIUM_REPORTS_ENABLED) {
        return reply.status(402).send({
          error: {
            message: 'Этот тип разбора доступен по подписке — премиум-тарифы появятся в ближайшем обновлении.',
            code: 'premium_required',
            requestId: req.id,
          },
        });
      }

      const keyring = getPdKeyring(config);
      const profile = await getBirthProfile(db, userId, birthProfileId, keyring);
      if (!profile) {
        return reply.status(404).send({ error: { message: 'Профиль рождения не найден', requestId: req.id } });
      }
      const chart = await findNatalChartByProfile(db, profile.id);
      if (!chart) {
        return reply
          .status(404)
          .send({ error: { message: 'Натальная карта профиля ещё не рассчитана', requestId: req.id } });
      }

      const cacheKey = buildCacheKey({
        birthProfileId,
        kind,
        promptVersion: PROMPT_VERSION,
        presetId: chart.presetId,
        coreVersion: chart.coreVersion,
        sphere,
        question,
      });

      const cached = await findDoneReportByCacheKey(db, cacheKey);
      if (cached) return reply.status(200).send(rowToResponse(cached));

      const input = { sphere, question };
      const kindConfig = reportKindConfig(kind);

      if (!kindConfig.allowSynchronous) {
        const queued = await insertQueuedAiReport(db, {
          userId,
          birthProfileId,
          chartId: chart.id,
          kind,
          input,
          promptVersion: PROMPT_VERSION,
          cacheKey,
        });
        return reply.status(202).send(rowToResponse(queued));
      }

      // big3 — синхронно (лёгкий, бесплатный разбор, см. reportKindConfig в @stassist/llm).
      const ports = getPorts(config, db);
      const chunkRepository = new DrizzleChunkRepository(db);
      const result = await generateReport({
        chartData: chart.data as ChartData,
        kind,
        sphere,
        question,
        llm: ports.llm,
        chunkRepository,
      });
      const done = await insertDoneAiReport(db, {
        userId,
        birthProfileId,
        chartId: chart.id,
        kind,
        input,
        promptVersion: PROMPT_VERSION,
        cacheKey,
        result,
      });
      return reply.status(200).send(rowToResponse(done));
    },
  );

  app.get(
    '/:id',
    { schema: { params: idParamsSchema, response: { 200: aiReportResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const row = await findAiReportForUser(db, req.authUser!.id, req.params.id);
      if (!row) {
        return reply.status(404).send({ error: { message: 'Отчёт не найден', requestId: req.id } });
      }
      return reply.send(rowToResponse(row));
    },
  );
};
