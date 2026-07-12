/**
 * /api/v1/email-optouts — отписка от рассылок в один клик (req.8 промта Ф8). Публичный роут (без
 * авторизации — ссылка отписки в письме открывается без входа в кабинет).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import type { Config } from '@stassist/shared';
import { getDb } from '../db.js';
import { insertEmailOptout } from '../repositories/email-optouts-repository.js';

export interface EmailOptoutsRoutesOptions {
  config: Config;
}

const emailOptoutRequestSchema = z.object({
  email: z.string().email(),
  scope: z.enum(['all', 'digest', 'marketing']).default('all'),
});

export const emailOptoutsRoutes: FastifyPluginAsyncZod<EmailOptoutsRoutesOptions> = async (app, opts) => {
  const { config } = opts;

  app.post('/', { schema: { body: emailOptoutRequestSchema } }, async (req, reply) => {
    const db = getDb(config);
    if (db) await insertEmailOptout(db, req.body.email, req.body.scope);
    // Всегда 200 (даже без БД/для несуществующего email) — не раскрываем существование адреса,
    // тот же принцип anti-enumeration, что auth-роуты (см. docs/architecture/21 §5).
    return reply.send({ message: 'Вы отписаны от рассылки.' });
  });
};
