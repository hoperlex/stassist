/**
 * /api/v1/calc/geocode/suggest — то же самое, что /api/v1/geocode/suggest (Geocoder-порт +
 * geocode_cache при наличии БД, см. geocoding/cached-geocoder.ts), НО без авторизации: публичные
 * анонимные калькуляторы (натал/совместимость, см. docs/roadmap/prompts/
 * f3-калькуляторы-и-карта.md) переиспользуют сервис геокодинга Ф2 для формы «место рождения» —
 * findings f3.md [internal-completeness] «не оговорено геокодирование места для анонимных
 * калькуляторов». Место — не ПД (см. там же); дата/время рождения по-прежнему не логируются/не
 * персистятся этим роутом.
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { geocodeSuggestQuerySchema, geocodeSuggestResponseSchema, type Config } from '@stassist/shared';
import { getDb } from '../db.js';
import { getPorts } from '../route-context.js';

export interface PublicGeocodeRoutesOptions {
  config: Config;
}

const GEOCODE_RATE_LIMIT = { max: 30, timeWindow: '1 minute' } as const;

export const publicGeocodeRoutes: FastifyPluginAsyncZod<PublicGeocodeRoutesOptions> = async (app, opts) => {
  const { config } = opts;

  app.get(
    '/suggest',
    {
      schema: { querystring: geocodeSuggestQuerySchema, response: { 200: geocodeSuggestResponseSchema } },
      config: { rateLimit: GEOCODE_RATE_LIMIT },
    },
    async (req, reply) => {
      const db = getDb(config);
      const { geocoder } = getPorts(config, db);
      const results = await geocoder.suggest(req.query.q, 5);
      return reply.send(results);
    },
  );
};
