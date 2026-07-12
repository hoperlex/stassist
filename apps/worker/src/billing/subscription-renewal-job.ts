/**
 * Продление/грейс/истечение подписок (req.2 промта Ф8: рекуррентная подписка «сохранённый метод»,
 * `past_due` грейс 3 дня, отмена→закрытие в конце периода — см. doc-комментарий
 * `subscriptionStatusEnum` в packages/db/src/schema/enums.ts). Cron ежедневно (см. worker.ts).
 *
 * Оркестрация НЕ юнит-тестируется (I/O: БД + PaymentProvider) — чистая арифметика дат
 * (`addPlanPeriod`) уже покрыта `packages/shared/src/schemas/billing.test.ts`.
 */
import type { Logger } from 'pino';
import type { Db } from '@stassist/db';
import { addPlanPeriod, PLAN_CATALOG, SUBSCRIPTION_PAST_DUE_GRACE_DAYS, type PaymentProvider } from '@stassist/shared';
import { findDueForRenewalOrExpiry, findPastDueBeyondGrace, updateSubscriptionStatus } from './subscriptions-repository.js';
import { insertPaymentIdempotent } from './payments-repository.js';

export interface SubscriptionRenewalJobDeps {
  db: Db;
  payments: PaymentProvider;
  logger: Logger;
}

export interface SubscriptionRenewalSummary {
  renewed: number;
  pastDue: number;
  expired: number;
}

export async function runSubscriptionRenewalSweep(deps: SubscriptionRenewalJobDeps): Promise<SubscriptionRenewalSummary> {
  const { db, payments, logger } = deps;
  const now = new Date();
  let renewed = 0;
  let pastDue = 0;
  let expired = 0;

  const due = await findDueForRenewalOrExpiry(db, now);
  for (const sub of due) {
    // «Отмена в один клик» — доступ был активен до конца периода, период закончился → expired.
    if (sub.cancelAtPeriodEnd) {
      await updateSubscriptionStatus(db, sub.id, 'expired');
      expired += 1;
      continue;
    }
    if (!sub.providerSubId) {
      // Нет сохранённого способа оплаты (напр. первый платёж был без save_payment_method) —
      // списать нечем, честно уходим в грейс, а не молча продлеваем.
      await updateSubscriptionStatus(db, sub.id, 'past_due');
      pastDue += 1;
      continue;
    }

    const plan = PLAN_CATALOG[sub.planCode];
    const idempotencyKey = `sub_renew_${sub.id}_${sub.currentPeriodEnd.toISOString()}`;
    try {
      const result = await payments.createPayment({
        amountKop: plan.priceKop,
        description: `Продление подписки «${plan.titleRu}» — Stassist`,
        idempotencyKey,
        paymentMethodId: sub.providerSubId,
      });
      await insertPaymentIdempotent(db, {
        userId: sub.userId,
        subscriptionId: sub.id,
        provider: sub.provider,
        providerPaymentId: result.id,
        amountKop: plan.priceKop,
        status: result.status,
        idempotencyKey,
      });
      if (result.status === 'succeeded') {
        await updateSubscriptionStatus(db, sub.id, 'active', addPlanPeriod(sub.currentPeriodEnd, plan.period));
        renewed += 1;
      } else {
        await updateSubscriptionStatus(db, sub.id, 'past_due');
        pastDue += 1;
      }
    } catch (err) {
      logger.error({ err, subscriptionId: sub.id }, 'subscription-renewal: списание не удалось');
      await updateSubscriptionStatus(db, sub.id, 'past_due');
      pastDue += 1;
    }
  }

  const graceCutoff = new Date(now.getTime() - SUBSCRIPTION_PAST_DUE_GRACE_DAYS * 24 * 60 * 60 * 1000);
  const beyondGrace = await findPastDueBeyondGrace(db, graceCutoff);
  for (const sub of beyondGrace) {
    await updateSubscriptionStatus(db, sub.id, 'expired');
    expired += 1;
  }

  return { renewed, pastDue, expired };
}
