/**
 * /api/v1/subscriptions — подписка «Премиум» (req.2 промта Ф8). Демо-оплата (тот же паттерн, что
 * apps/api/src/routes/orders.ts `DEMO_PAYMENTS_AUTO_CONFIRM`): `FakePaymentProvider`
 * (`PAYMENTS=stub`, дефолт локально) подтверждает мгновенно; реальная ЮKassa — за тем же
 * `PaymentProvider`-портом (`PAYMENTS=yookassa`), без изменений в этом роуте.
 *
 * УПРОЩЕНИЕ (честно, не скрыто): первый платёж подписки ВСЕГДА проводится через
 * `createPayment({ savePaymentMethod: true, amountKop: цена_после_промокода })` — даже когда
 * план даёт триал. Реальная схема «7 дней без списания, потом первое списание» требует у ЮKassa
 * либо привязки карты без списания (верификационный холд), либо переноса первого списания на
 * конец триала — это настраивается в личном кабинете мерчанта при онбординге (см.
 * `_report/build/launch-checklist.md` «требует ручного шага: настройка триала у ЮKassa»); с
 * `FakePaymentProvider` разницы не видно (стаб всегда «успешно»), поэтому эта фаза строит
 * бизнес-логику подписки полностью, а нюанс биллинг-провайдера — задача онбординга.
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  addDays,
  addPlanPeriod,
  apiErrorSchema,
  applyPromoCodeToPrice,
  isPremiumAccessActive,
  PLAN_CATALOG,
  subscriptionCreateRequestSchema,
  subscriptionMeResponseSchema,
  subscriptionResponseSchema,
  type Config,
  type PaymentProviderName,
  type SubscriptionResponse,
} from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { getPorts, requireDbOr503 } from '../route-context.js';
import { findPromoCodeByCode, incrementPromoCodeUsage } from '../repositories/promo-codes-repository.js';
import { insertPaymentIdempotent } from '../repositories/payments-repository.js';
import {
  getCurrentSubscriptionForUser,
  insertSubscription,
  setCancelAtPeriodEnd,
  setProviderSubId,
  type SubscriptionRow,
} from '../repositories/subscriptions-repository.js';
import { writeAuditLog } from '../repositories/audit-log-repository.js';

export interface SubscriptionsRoutesOptions {
  config: Config;
}

function toDto(row: SubscriptionRow): SubscriptionResponse {
  return {
    id: row.id,
    planCode: row.planCode,
    status: row.status,
    startedAt: row.startedAt.toISOString(),
    currentPeriodEnd: row.currentPeriodEnd.toISOString(),
    cancelAtPeriodEnd: row.cancelAtPeriodEnd,
    provider: row.provider,
  };
}

export const subscriptionsRoutes: FastifyPluginAsyncZod<SubscriptionsRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);
  app.addHook('preHandler', requireAuth);

  app.get('/me', { schema: { response: { 200: subscriptionMeResponseSchema } } }, async (req, reply) => {
    const db = requireDbOr503(config, reply, req.id);
    if (!db) return;
    const row = await getCurrentSubscriptionForUser(db, req.authUser!.id);
    return reply.send({ subscription: row ? toDto(row) : null });
  });

  app.post(
    '/',
    { schema: { body: subscriptionCreateRequestSchema, response: { 201: subscriptionResponseSchema, 400: apiErrorSchema, 409: apiErrorSchema } } },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const userId = req.authUser!.id;

      const existing = await getCurrentSubscriptionForUser(db, userId);
      if (existing && isPremiumAccessActive(existing.status)) {
        return reply.status(409).send({ error: { message: 'У вас уже есть активная подписка', requestId: req.id } });
      }

      const plan = PLAN_CATALOG[req.body.planCode];
      let { priceKop, trialDays } = { priceKop: plan.priceKop, trialDays: plan.trialDays };

      let appliedPromoId: string | null = null;
      if (req.body.promoCode) {
        const promo = await findPromoCodeByCode(db, req.body.promoCode);
        const promoUsable = promo && (!promo.validUntil || promo.validUntil.getTime() >= Date.now()) && (promo.maxUses == null || promo.usedCount < promo.maxUses);
        if (!promoUsable) {
          return reply.status(400).send({ error: { message: 'Промокод недействителен', requestId: req.id } });
        }
        const applied = applyPromoCodeToPrice(priceKop, trialDays, { kind: promo.kind, value: promo.value });
        priceKop = applied.priceKop;
        trialDays = applied.trialDays;
        appliedPromoId = promo.id;
      }

      const now = new Date();
      const status = trialDays > 0 ? 'trial' : 'active';
      const currentPeriodEnd = trialDays > 0 ? addDays(now, trialDays) : addPlanPeriod(now, plan.period);
      const provider: PaymentProviderName = config.payments.driver === 'yookassa' ? 'yookassa' : 'stub';

      let subscription = await insertSubscription(db, {
        userId,
        planCode: plan.code,
        status,
        currentPeriodEnd,
        provider,
      });

      const ports = getPorts(config, db);
      const paymentResult = await ports.payments.createPayment({
        amountKop: priceKop,
        description: `Подписка «${plan.titleRu}» — Зодиакум`,
        idempotencyKey: `sub_setup_${subscription.id}`,
        savePaymentMethod: true,
        metadata: { subscriptionId: subscription.id, userId },
      });

      await insertPaymentIdempotent(db, {
        userId,
        subscriptionId: subscription.id,
        provider,
        providerPaymentId: paymentResult.id,
        amountKop: priceKop,
        status: paymentResult.status,
        idempotencyKey: `sub_setup_${subscription.id}`,
        raw: { paymentMethodId: paymentResult.paymentMethodId ?? null },
      });

      if (paymentResult.paymentMethodId) {
        const updated = await setProviderSubId(db, subscription.id, paymentResult.paymentMethodId);
        subscription = updated ?? subscription;
      }

      if (appliedPromoId) await incrementPromoCodeUsage(db, appliedPromoId);

      await writeAuditLog(db, {
        actorId: userId,
        action: 'subscription.created',
        entity: 'subscription',
        entityId: subscription.id,
        payload: { planCode: plan.code, status, priceKop },
        requestId: req.id,
      });

      return reply.status(201).send(toDto(subscription));
    },
  );

  app.post(
    '/:id/cancel',
    { schema: { params: z.object({ id: z.string().uuid() }), response: { 200: subscriptionResponseSchema, 404: apiErrorSchema } } },
    async (req, reply) => {
      const db = requireDbOr503(config, reply, req.id);
      if (!db) return;
      const existing = await getCurrentSubscriptionForUser(db, req.authUser!.id);
      if (!existing || existing.id !== req.params.id) {
        return reply.status(404).send({ error: { message: 'Подписка не найдена', requestId: req.id } });
      }
      const updated = await setCancelAtPeriodEnd(db, existing.id, true);
      await writeAuditLog(db, {
        actorId: req.authUser!.id,
        action: 'subscription.cancel_requested',
        entity: 'subscription',
        entityId: existing.id,
        requestId: req.id,
      });
      return reply.send(toDto(updated ?? existing));
    },
  );
};
