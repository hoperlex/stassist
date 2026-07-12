/**
 * /api/v1/promo-codes — валидация промокода (req.1 промта Ф8, `promo_codes`). Публичный роут (не
 * требует авторизации — промокод можно проверить до входа на странице тарифов).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { promoCodeValidateRequestSchema, promoCodeValidateResponseSchema, type Config } from '@stassist/shared';
import { getDb } from '../db.js';
import { findPromoCodeByCode } from '../repositories/promo-codes-repository.js';

export interface PromoCodesRoutesOptions {
  config: Config;
}

export const promoCodesRoutes: FastifyPluginAsyncZod<PromoCodesRoutesOptions> = async (app, opts) => {
  const { config } = opts;

  app.post(
    '/validate',
    { schema: { body: promoCodeValidateRequestSchema, response: { 200: promoCodeValidateResponseSchema } } },
    async (req, reply) => {
      const db = getDb(config);
      if (!db) return reply.send({ valid: false, reason: 'not_found' });

      const promo = await findPromoCodeByCode(db, req.body.code);
      if (!promo) return reply.send({ valid: false, reason: 'not_found' });
      if (promo.validUntil && promo.validUntil.getTime() < Date.now()) {
        return reply.send({ valid: false, reason: 'expired' });
      }
      if (promo.maxUses != null && promo.usedCount >= promo.maxUses) {
        return reply.send({ valid: false, reason: 'exhausted' });
      }
      return reply.send({ valid: true, kind: promo.kind, value: promo.value });
    },
  );
};
