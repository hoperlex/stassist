/**
 * /api/v1/plans — публичный каталог тарифов (страница «Тарифы», пейвол). Источник — статичный
 * `PLAN_CATALOG` (см. packages/shared/src/schemas/billing.ts) — БЕЗ БД, работает даже в
 * degraded-режиме (правило непустоты §6 конвенций реализации: страница тарифов не должна зависеть
 * от живой БД).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { PLAN_CATALOG, planCodeSchema, planPeriodSchema } from '@stassist/shared';

const planCatalogEntrySchema = z.object({
  code: planCodeSchema,
  titleRu: z.string(),
  priceKop: z.number().int(),
  period: planPeriodSchema,
  trialDays: z.number().int(),
  features: z.array(z.string()),
});

export const plansRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get('/', { schema: { response: { 200: z.object({ items: z.array(planCatalogEntrySchema) }) } } }, async (_req, reply) => {
    return reply.send({ items: Object.values(PLAN_CATALOG) });
  });
};
