/**
 * /api/v1/personal-horoscope — персональный гороскоп кабинета (requirement 4 промта Ф5:
 * «транзиты к наталу пользователя → приоритизация → LLM-текст; краткий бесплатно, полный —
 * подписка (пейвол-заглушка до Ф8); генерация лениво при заходе + кэш на день»).
 *
 * Кэш: `ai_reports.kind='personal_horoscope'`, `cache_key` = birthProfileId+period+dateKey+
 * coreVersion+promptVersion (см. packages/llm/src/horoscope/personal.ts
 * `buildPersonalHoroscopeCacheKey`) — суточная (period='day') либо недельная (period='week')
 * инвалидация через `dateKey`, тот же принцип, что @stassist/shared `horoscope-date-keys.ts`
 * использует для программатики.
 *
 * Тарификация: PREMIUM_REPORTS_ENABLED=false (та же заглушка, что apps/api/src/routes/
 * ai-reports.ts, см. находку [самодостаточность-тарификация] в f4.md) — полный текст НЕ
 * генерируется (не тратим токены на контент, который никто не увидит), пока флаг выключен;
 * краткая версия — ВСЕГДА бесплатна и не требует LLM (см. personal.ts
 * `buildPersonalHoroscopeSummary`).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  apiErrorSchema,
  personalHoroscopePeriodSchema,
  personalHoroscopeResponseSchema,
  toDateKeyDay,
  toDateKeyWeek,
  type Config,
  type PersonalHoroscopePeriod,
} from '@stassist/shared';
import { ASTRO_CORE_VERSION } from '@stassist/astro-core';
import {
  buildPersonalHoroscopeCacheKey,
  buildPersonalHoroscopeFull,
  buildPersonalHoroscopeSummary,
  computeTransitBodyPositions,
  computeTransitToNatalAspects,
  prioritizeTransitAspects,
  PROMPT_VERSION,
} from '@stassist/llm';
import type { Bodies, ChartData } from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { getPdKeyring } from '../auth/pd-keyring.js';
import { getPorts, requireDbOr503 } from '../route-context.js';
import { getBirthProfile } from '../repositories/birth-profiles-repository.js';
import { findNatalChartByProfile } from '../repositories/charts-repository.js';
import { findPersonalHoroscopeByCacheKey, insertPersonalHoroscope } from '../repositories/personal-horoscope-repository.js';
import { DrizzleChunkRepository } from '../llm/drizzle-chunk-repository.js';

export interface PersonalHoroscopeRoutesOptions {
  config: Config;
}

/** См. doc-комментарий файла — та же заглушка-паттерн, что PREMIUM_REPORTS_ENABLED в routes/ai-reports.ts. */
const PERSONAL_HOROSCOPE_FULL_ENABLED = false;

/** Находка [llm-endpoint-no-rate-limit]: тот же класс риска, что `AI_REPORT_RATE_LIMIT` в
 *  routes/ai-reports.ts — этот роут МОЖЕТ дойти до `ports.llm.generate` (buildPersonalHoroscopeFull),
 *  как только `PERSONAL_HOROSCOPE_FULL_ENABLED` включат; выделенный лимит — заранее, чтобы не
 *  полагаться только на общий 100/мин. */
const PERSONAL_HOROSCOPE_RATE_LIMIT = { max: 20, timeWindow: '1 minute' } as const;

const querySchema = z.object({
  birthProfileId: z.string().uuid(),
  period: personalHoroscopePeriodSchema.default('day'),
});

function dateKeyFor(period: PersonalHoroscopePeriod, now: Date): string {
  return period === 'day' ? toDateKeyDay(now) : toDateKeyWeek(now);
}

export const personalHoroscopeRoutes: FastifyPluginAsyncZod<PersonalHoroscopeRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);
  app.addHook('preHandler', requireAuth);

  app.get(
    '/',
    {
      schema: { querystring: querySchema, response: { 200: personalHoroscopeResponseSchema, 404: apiErrorSchema } },
      config: { rateLimit: PERSONAL_HOROSCOPE_RATE_LIMIT },
    },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const userId = req.authUser!.id;
      const { birthProfileId, period } = req.query;

      const keyring = getPdKeyring(config);
      const profile = await getBirthProfile(db, userId, birthProfileId, keyring);
      if (!profile) {
        return reply.status(404).send({ error: { message: 'Профиль рождения не найден', requestId: req.id } });
      }
      const chart = await findNatalChartByProfile(db, profile.id, keyring);
      if (!chart) {
        return reply.status(404).send({ error: { message: 'Натальная карта профиля ещё не рассчитана', requestId: req.id } });
      }

      const now = new Date();
      const dateKey = dateKeyFor(period, now);
      const cacheKey = buildPersonalHoroscopeCacheKey({
        birthProfileId,
        period,
        dateKey,
        coreVersion: chart.coreVersion,
        promptVersion: PROMPT_VERSION,
      });

      const cached = await findPersonalHoroscopeByCacheKey(db, cacheKey);
      if (cached) {
        const summaryMd = (cached.input as { summaryMd?: string } | null)?.summaryMd ?? '';
        return reply.send({
          period,
          dateKey,
          summaryMd,
          fullMd: cached.contentMd,
          unlocked: cached.contentMd !== null,
          calcBlock: (cached.calcBlock as Record<string, unknown> | null) ?? null,
          computed: true,
        });
      }

      const chartData = chart.data as ChartData;
      const transits = computeTransitBodyPositions(now);
      const natalBodies: Partial<Bodies> = chartData.bodies;
      const aspects = computeTransitToNatalAspects(natalBodies, transits);
      const prioritized = prioritizeTransitAspects(aspects);
      const summaryMd = buildPersonalHoroscopeSummary(prioritized);

      const ports = getPorts(config, db);
      const chunkRepository = new DrizzleChunkRepository(db);
      const full = PERSONAL_HOROSCOPE_FULL_ENABLED
        ? await buildPersonalHoroscopeFull({ prioritized, period: period === 'week' ? 'week' : 'day', llm: ports.llm, chunkRepository })
        : null;

      const calcBlock = { transitsToNatalTop: prioritized, coreVersion: chart.coreVersion, astroCoreVersion: ASTRO_CORE_VERSION };
      await insertPersonalHoroscope(db, {
        userId,
        birthProfileId,
        cacheKey,
        summaryMd,
        fullMd: full?.fullMd ?? null,
        fullProvider: full?.provider ?? null,
        fullTokensIn: full?.tokensIn ?? null,
        fullTokensOut: full?.tokensOut ?? null,
        flagged: full?.flagged ?? false,
        calcBlock,
        promptVersion: PROMPT_VERSION,
      });

      return reply.send({
        period,
        dateKey,
        summaryMd,
        fullMd: full?.fullMd ?? null,
        unlocked: full !== null,
        calcBlock,
        computed: true,
      });
    },
  );
};
