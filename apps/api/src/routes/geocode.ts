/**
 * /api/v1/geocode/suggest — обёртка над Geocoder-портом (+ кэш geocode_cache при наличии БД, см.
 * geocoding/cached-geocoder.ts) для автодополнения места в форме профиля рождения (AntD
 * AutoComplete). Требует авторизации (используется только в кабинете).
 */
import type { FastifyPluginAsync, RawServerDefault } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { geocodeSuggestQuerySchema, geocodeSuggestResponseSchema, type Config } from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { getDb } from '../db.js';
import { getPorts } from '../route-context.js';

export interface GeocodeRoutesOptions {
  config: Config;
}

const GEOCODE_RATE_LIMIT = { max: 30, timeWindow: '1 minute' } as const;

export const geocodeRoutes: FastifyPluginAsync<GeocodeRoutesOptions, RawServerDefault, ZodTypeProvider> = async (
  app,
  opts,
) => {
  const { config } = opts;
  app.addHook('preHandler', buildRequireAuth(config));

  app.get(
    '/suggest',
    {
      schema: { querystring: geocodeSuggestQuerySchema, response: { 200: geocodeSuggestResponseSchema } },
      config: { rateLimit: GEOCODE_RATE_LIMIT },
    },
    async (req, reply) => {
      // Геокодер (в т.ч. стаб FixtureGeocoder) работает и без БД — кэш просто не подключается.
      const db = getDb(config);
      const { geocoder } = getPorts(config, db);
      const results = await geocoder.suggest(req.query.q, 5);
      return reply.send(results);
    },
  );
};
