/**
 * /api/v1/calc/* — анонимные расчётные эндпоинты (см. docs/roadmap/prompts/
 * f3-калькуляторы-и-карта.md требование 4): расчёт «на лету», БЕЗ авторизации и БЕЗ сохранения
 * данных рождения — ни в БД (эти роуты ничего не пишут), ни в логи (Fastify-сериализатор в
 * apps/api/src/logging.ts не включает `req.body` в лог вообще — см. verification-заметку там).
 * Rate-limit — жёстче общего (см. §4 промта), т.к. натал/синастрия — CPU-тяжёлые (эфемериды).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { computeChart, detectSynastryAspects, type AspectableBody } from '@stassist/astro-core';
import { isValidCalendarDate, lifePathNumber, matrixOfDestiny, psychoMatrix } from '@stassist/numerology-core';
import {
  chartDataSchema,
  chartInputSchema,
  synastryCalcRequestSchema,
  synastryCalcResponseSchema,
} from '@stassist/shared';

const CALC_RATE_LIMIT = { max: 20, timeWindow: '1 minute' } as const;

/** День/месяц/год без `fullName` (нужен только для чисел по имени, здесь не используется) — не
 *  переиспользуем `numerologyBirthDataSchema` напрямую: это `ZodEffects` (после `.refine()`),
 *  у которого нет `.omit()` (метод есть только у `ZodObject`). */
const numerologyBirthOnlySchema = z
  .object({
    day: z.number().int().min(1).max(31),
    month: z.number().int().min(1).max(12),
    year: z.number().int().min(1).max(9999),
  })
  .refine((d) => isValidCalendarDate(d.day, d.month, d.year), {
    message: 'Некорректная календарная дата',
    path: ['day'],
  });

function toAspectableBodies(data: z.infer<typeof chartDataSchema>): AspectableBody[] {
  const out: AspectableBody[] = [];
  for (const [key, pos] of Object.entries(data.bodies)) {
    if (pos) out.push({ key, longitudeDeg: pos.longitudeDeg, speedLongDegPerDay: pos.speedLongDegPerDay });
  }
  for (const [key, pos] of Object.entries(data.points)) {
    if (pos) out.push({ key, longitudeDeg: pos.longitudeDeg, speedLongDegPerDay: pos.speedLongDegPerDay });
  }
  return out;
}

/** Не требует конфигурации/БД — расчёт «на лету» без побочных эффектов, см. заголовок файла. */
export const calcRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/natal',
    {
      schema: { body: chartInputSchema, response: { 200: chartDataSchema } },
      config: { rateLimit: CALC_RATE_LIMIT },
    },
    async (req, reply) => reply.send(computeChart(req.body)),
  );

  app.post(
    '/synastry',
    {
      schema: { body: synastryCalcRequestSchema, response: { 200: synastryCalcResponseSchema } },
      config: { rateLimit: CALC_RATE_LIMIT },
    },
    async (req, reply) => {
      const a = computeChart(req.body.a);
      const b = computeChart(req.body.b);
      const crossAspects = detectSynastryAspects(toAspectableBodies(a), toAspectableBodies(b), {
        aspectSet: 'major_minor',
      });
      return reply.send({ a, b, crossAspects });
    },
  );

  app.post(
    '/numerology/life-path',
    {
      schema: { body: numerologyBirthOnlySchema },
      config: { rateLimit: CALC_RATE_LIMIT },
    },
    async (req, reply) => reply.send(lifePathNumber(req.body)),
  );

  app.post(
    '/numerology/psycho-matrix',
    {
      schema: { body: numerologyBirthOnlySchema },
      config: { rateLimit: CALC_RATE_LIMIT },
    },
    async (req, reply) => reply.send(psychoMatrix(req.body)),
  );

  app.post(
    '/numerology/matrix-of-destiny',
    {
      schema: { body: numerologyBirthOnlySchema },
      config: { rateLimit: CALC_RATE_LIMIT },
    },
    async (req, reply) => reply.send(matrixOfDestiny(req.body)),
  );
};
