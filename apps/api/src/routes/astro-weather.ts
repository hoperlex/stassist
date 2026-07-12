/**
 * /api/v1/calc/astro-weather/today — виджет «астропогода сегодня» (requirement 3 промта Ф5: «на
 * всех страницах гороскопов»). Источник — ТОЛЬКО `astro_calendar` (см. находку [полнота]
 * «дублирование astro_calendar и Ф5», единый источник для «неба дня»), БЕЗ авторизации.
 * Деградирует до `computed:false` без БД/непосчитанного дня — честный empty-state.
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { astroWeatherTodayResponseSchema, toDateKeyDay, type Config } from '@stassist/shared';
import { getDb } from '../db.js';
import { findAstroCalendarDay } from '../repositories/astro-calendar-repository.js';
import { mapAstroCalendarRowToDaySkyFact } from '../horoscope/astro-day-facts.js';

export interface AstroWeatherRoutesOptions {
  config: Config;
}

export const astroWeatherRoutes: FastifyPluginAsyncZod<AstroWeatherRoutesOptions> = async (app, opts) => {
  const { config } = opts;

  app.get('/today', { schema: { response: { 200: astroWeatherTodayResponseSchema } } }, async (_req, reply) => {
    const dateKey = toDateKeyDay(new Date());
    const db = getDb(config);
    const row = db ? await findAstroCalendarDay(db, dateKey) : null;
    if (!row) {
      return reply.send({ date: dateKey, moonSignIndex: null, lunarDay: null, phaseName: null, isVoidOfCourse: false, retrogradeBodies: [], computed: false });
    }
    const fact = mapAstroCalendarRowToDaySkyFact(row);
    return reply.send({
      date: fact.date,
      moonSignIndex: fact.moonSignIndex,
      lunarDay: fact.lunarDay,
      phaseName: fact.phaseName,
      isVoidOfCourse: fact.isVoidOfCourse,
      retrogradeBodies: fact.retrogradeBodies,
      computed: true,
    });
  });
};
