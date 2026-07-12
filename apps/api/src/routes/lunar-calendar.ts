/**
 * /api/v1/calc/lunar-calendar/:yyyyMm — публичный лунный календарь (предрасчёт worker'а, см.
 * apps/worker/src/astro-calendar). БЕЗ авторизации. Деградирует до 200 с `computed=false` и
 * пустым `days`, если БД не сконфигурирована ИЛИ worker ещё не насчитал этот месяц — страница
 * обязана показать честный empty-state «наполняется», а не 500/503 (см. §6 конвенций реализации,
 * «правило непустоты» — здесь это же правило применяется к API-контракту, не только к вёрстке).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { CALENDAR_REFERENCE_LOCATION, lunarCalendarMonthResponseSchema, type Config } from '@stassist/shared';
import { getDb } from '../db.js';
import { findAstroCalendarMonth } from '../repositories/astro-calendar-repository.js';
import { mapAstroCalendarRowToDay } from '../lunar-calendar/map-row-to-day.js';

export interface LunarCalendarRoutesOptions {
  config: Config;
}

const paramsSchema = z.object({ yyyyMm: z.string().regex(/^\d{4}-\d{2}$/) });

export const lunarCalendarRoutes: FastifyPluginAsyncZod<LunarCalendarRoutesOptions> = async (app, opts) => {
  const { config } = opts;

  app.get(
    '/:yyyyMm',
    { schema: { params: paramsSchema, response: { 200: lunarCalendarMonthResponseSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) {
        return reply.send({
          yyyyMm: req.params.yyyyMm,
          referenceLocation: CALENDAR_REFERENCE_LOCATION,
          days: [],
          computed: false,
        });
      }
      const rows = await findAstroCalendarMonth(db, req.params.yyyyMm);
      return reply.send({
        yyyyMm: req.params.yyyyMm,
        referenceLocation: CALENDAR_REFERENCE_LOCATION,
        days: rows.map(mapAstroCalendarRowToDay),
        computed: rows.length > 0,
      });
    },
  );
};
