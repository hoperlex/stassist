import type { FastifyPluginAsync } from 'fastify';
import { healthResponseSchema, readyResponseSchema, type Config } from '@stassist/shared';
import { pingDb } from '../db.js';

export interface HealthRoutesOptions {
  config: Config;
}

/**
 * GET /healthz — liveness: процесс жив, отвечает 200 всегда (даже в degraded-режиме,
 * когда БД/инфра не сконфигурированы — это осознанное решение, см. §3 конвенций).
 * GET /readyz  — readiness: 200 только если БД реально отвечает на ping, иначе 503.
 */
export const healthRoutes: FastifyPluginAsync<HealthRoutesOptions> = async (app, opts) => {
  // Health/ready-эндпоинты опрашивают оркестраторы/балансировщики часто и регулярно —
  // они не должны попадать под общий rate-limit (иначе живой процесс может «ложно» казаться
  // недоступным при частых пробах).
  app.get('/healthz', { config: { rateLimit: false } }, async (_req, reply) => {
    const body = healthResponseSchema.parse({ status: 'ok' });
    return reply.status(200).send(body);
  });

  app.get('/readyz', { config: { rateLimit: false } }, async (_req, reply) => {
    const dbOk = await pingDb(opts.config);
    const body = readyResponseSchema.parse({
      status: dbOk ? 'ok' : 'unavailable',
      checks: { db: dbOk },
    });
    return reply.status(dbOk ? 200 : 503).send(body);
  });
};
