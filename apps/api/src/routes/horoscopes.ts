/**
 * /api/v1/horoscopes/* — публичное чтение программатики Ф5 (см. docs/roadmap/prompts/
 * f5-гороскопы-и-программатика.md requirement 3-4). БЕЗ авторизации. Деградирует до
 * `computed:false, bodyMd:null` без БД (честный empty-state, тот же принцип, что
 * routes/lunar-calendar.ts) — генерация «на лету» (requirement 4, apps/api/src/horoscope/
 * lazy-generate.ts) требует БД по построению (некуда писать кэш).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  EASTERN_ANIMAL_SLUGS,
  HOROSCOPE_PROFESSION_SLUGS,
  horoscopePeriodSchema,
  horoscopeResponseSchema,
  horoscopeTopicSchema,
  ZODIAC_SIGN_EN_SLUGS,
  type Config,
  type HoroscopeResponse,
} from '@stassist/shared';
import { getDb } from '../db.js';
import { getPorts } from '../route-context.js';
import type { HoroscopeRow } from '../repositories/horoscopes-repository.js';
import { ensureEasternHoroscope, ensureHumorProfessionHoroscope, ensureHumorZodiacHoroscope, ensureLunarDayHoroscope, ensureZodiacHoroscope } from '../horoscope/lazy-generate.js';

export interface HoroscopeRoutesOptions {
  config: Config;
}

const EMPTY_RESPONSE = (overrides: Partial<HoroscopeResponse>): HoroscopeResponse => ({
  scope: 'zodiac',
  sign: '',
  period: 'day',
  topic: 'general',
  dateKey: '',
  bodyMd: null,
  humor: false,
  status: null,
  publishedAt: null,
  computed: false,
  ...overrides,
});

function toResponse(row: HoroscopeRow): HoroscopeResponse {
  return {
    scope: row.scope,
    sign: row.sign,
    period: row.period,
    topic: row.topic,
    dateKey: row.dateKey,
    bodyMd: row.bodyMd,
    humor: row.humor,
    status: row.status,
    publishedAt: row.publishedAt ? row.publishedAt.toISOString() : null,
    computed: row.status === 'published',
  };
}

const zodiacSignParamsSchema = z.object({
  signEn: z.enum(ZODIAC_SIGN_EN_SLUGS),
  period: horoscopePeriodSchema,
  topic: horoscopeTopicSchema,
});
/** `year` — ТОЛЬКО для period='year' (см. doc-комментарий apps/web/pages/goroskop/@yyyy/@znak/
 *  +data.ts): страница `/goroskop/{yyyy}/{znak}` явно указывает год в URL, а не «текущий». */
const zodiacSignQuerySchema = z.object({ year: z.coerce.number().int().min(2000).max(2200).optional() });
const easternParamsSchema = z.object({ yyyy: z.coerce.number().int().min(2000).max(2200), animalEn: z.enum(EASTERN_ANIMAL_SLUGS) });
const lunarDayParamsSchema = z.object({ n: z.coerce.number().int().min(1).max(30) });
const humorZodiacParamsSchema = z.object({ signEn: z.enum(ZODIAC_SIGN_EN_SLUGS) });
const humorProfessionParamsSchema = z.object({ slug: z.enum(HOROSCOPE_PROFESSION_SLUGS) });

export const horoscopesRoutes: FastifyPluginAsyncZod<HoroscopeRoutesOptions> = async (app, opts) => {
  const { config } = opts;

  app.get(
    '/zodiac/:signEn/:period/:topic',
    { schema: { params: zodiacSignParamsSchema, querystring: zodiacSignQuerySchema, response: { 200: horoscopeResponseSchema } } },
    async (req, reply) => {
      const { signEn, period, topic } = req.params;
      const db = getDb(config);
      if (!db) return reply.send(EMPTY_RESPONSE({ scope: 'zodiac', sign: signEn, period, topic }));
      const ports = getPorts(config, db);
      // Год фиксируем СЕРЕДИНОЙ года (15 июня) — вне окна неопределённости астрономических
      // границ у Личунь/переходов на стыке лет (см. doc-комментарий ensureZodiacHoroscope).
      const now = period === 'year' && req.query.year ? new Date(Date.UTC(req.query.year, 5, 15)) : new Date();
      const row = await ensureZodiacHoroscope(db, ports.llm, period, topic, signEn, now);
      return reply.send(row ? toResponse(row) : EMPTY_RESPONSE({ scope: 'zodiac', sign: signEn, period, topic }));
    },
  );

  app.get(
    '/eastern/:yyyy/:animalEn',
    { schema: { params: easternParamsSchema, response: { 200: horoscopeResponseSchema } } },
    async (req, reply) => {
      const { yyyy, animalEn } = req.params;
      const db = getDb(config);
      if (!db) return reply.send(EMPTY_RESPONSE({ scope: 'eastern', sign: animalEn, period: 'year', dateKey: String(yyyy) }));
      const ports = getPorts(config, db);
      const row = await ensureEasternHoroscope(db, ports.llm, yyyy, animalEn);
      return reply.send(row ? toResponse(row) : EMPTY_RESPONSE({ scope: 'eastern', sign: animalEn, period: 'year', dateKey: String(yyyy) }));
    },
  );

  app.get(
    '/lunar-day/:n',
    { schema: { params: lunarDayParamsSchema, response: { 200: horoscopeResponseSchema } } },
    async (req, reply) => {
      const { n } = req.params;
      const db = getDb(config);
      if (!db) return reply.send(EMPTY_RESPONSE({ scope: 'lunar_day', sign: String(n) }));
      const row = await ensureLunarDayHoroscope(db, n);
      return reply.send(toResponse(row));
    },
  );

  app.get(
    '/humor/zodiac/:signEn',
    { schema: { params: humorZodiacParamsSchema, response: { 200: horoscopeResponseSchema } } },
    async (req, reply) => {
      const { signEn } = req.params;
      const db = getDb(config);
      if (!db) return reply.send(EMPTY_RESPONSE({ scope: 'zodiac', sign: signEn, humor: true }));
      const ports = getPorts(config, db);
      const row = await ensureHumorZodiacHoroscope(db, ports.llm, signEn);
      return reply.send(row ? toResponse(row) : EMPTY_RESPONSE({ scope: 'zodiac', sign: signEn, humor: true }));
    },
  );

  app.get(
    '/humor/profession/:slug',
    { schema: { params: humorProfessionParamsSchema, response: { 200: horoscopeResponseSchema } } },
    async (req, reply) => {
      const { slug } = req.params;
      const db = getDb(config);
      if (!db) return reply.send(EMPTY_RESPONSE({ scope: 'profession', sign: slug, humor: true }));
      const row = await ensureHumorProfessionHoroscope(db, slug);
      return reply.send(toResponse(row));
    },
  );
};
