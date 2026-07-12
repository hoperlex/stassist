/**
 * /api/v1/calc/lunar-calendar/:yyyyMm — публичный лунный календарь. БЕЗ авторизации. Заполняется
 * ДВУМЯ путями: суточный cron worker'а (см. apps/worker/src/astro-calendar, окно вперёд от
 * «сегодня») И ленивая генерация «при заходе» прямо здесь (находка [lunnyj-kalendar-empty]:
 * cron-only оставлял свежий деплой пустым до ~суток, а прошлые месяцы/дни — пустыми НАВСЕГДА,
 * см. `../lunar-calendar/lazy-generate.ts`). Деградирует до 200 с `computed=false` и пустым
 * `days`, если БД не сконфигурирована ИЛИ расчёт неожиданно упал (напр. крайний год вне диапазона
 * эфемерид) — страница обязана показать честный empty-state «наполняется», а не 500/503 (см. §6
 * конвенций реализации, «правило непустоты» — здесь это же правило применяется к API-контракту,
 * не только к вёрстке).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { CALENDAR_REFERENCE_LOCATION, lunarCalendarMonthResponseSchema, type Config } from '@stassist/shared';
import { getDb } from '../db.js';
import type { AstroCalendarRow } from '../repositories/astro-calendar-repository.js';
import { mapAstroCalendarRowToDay } from '../lunar-calendar/map-row-to-day.js';
import { ensureAstroCalendarMonth } from '../lunar-calendar/lazy-generate.js';

export interface LunarCalendarRoutesOptions {
  config: Config;
}

const paramsSchema = z.object({ yyyyMm: z.string().regex(/^\d{4}-\d{2}$/) });

/** Расчёт эфемерид детерминирован и не бьёт по кошельку (в отличие от LLM-эндпоинтов), но
 *  считает ~месяц дней синхронно в запросе — жёстче общего лимита, по аналогии с CALC_RATE_LIMIT
 *  в routes/calc.ts, чтобы лишний трафик не грузил CPU повторными пересчётами того же месяца. */
const LUNAR_CALENDAR_RATE_LIMIT = { max: 20, timeWindow: '1 minute' } as const;

export const lunarCalendarRoutes: FastifyPluginAsyncZod<LunarCalendarRoutesOptions> = async (app, opts) => {
  const { config } = opts;

  app.get(
    '/:yyyyMm',
    {
      schema: { params: paramsSchema, response: { 200: lunarCalendarMonthResponseSchema } },
      config: { rateLimit: LUNAR_CALENDAR_RATE_LIMIT },
    },
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
      let rows: AstroCalendarRow[];
      try {
        rows = await ensureAstroCalendarMonth(db, req.params.yyyyMm);
      } catch (err) {
        req.log.error({ err, yyyyMm: req.params.yyyyMm }, 'lunar-calendar: ленивая генерация месяца не удалась');
        rows = [];
      }
      return reply.send({
        yyyyMm: req.params.yyyyMm,
        referenceLocation: CALENDAR_REFERENCE_LOCATION,
        days: rows.map(mapAstroCalendarRowToDay),
        computed: rows.length > 0,
      });
    },
  );
};
