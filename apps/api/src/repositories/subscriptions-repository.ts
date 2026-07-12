/**
 * subscriptions — подписка «Премиум» (см. packages/db/src/schema/subscriptions.ts).
 */
import { and, desc, eq, lte, sql } from 'drizzle-orm';
import { subscriptions, type Db } from '@stassist/db';
import type { PaymentProviderName, PlanCode, SubscriptionStatus } from '@stassist/shared';

export type SubscriptionRow = typeof subscriptions.$inferSelect;

export interface InsertSubscriptionInput {
  userId: string;
  planCode: PlanCode;
  status: SubscriptionStatus;
  currentPeriodEnd: Date;
  provider: PaymentProviderName;
  providerSubId?: string | null;
}

export async function insertSubscription(db: Db, input: InsertSubscriptionInput): Promise<SubscriptionRow> {
  const [row] = await db
    .insert(subscriptions)
    .values({
      userId: input.userId,
      planCode: input.planCode,
      status: input.status,
      currentPeriodEnd: input.currentPeriodEnd,
      provider: input.provider,
      providerSubId: input.providerSubId ?? null,
    })
    .returning();
  if (!row) throw new Error('insertSubscription: INSERT не вернул строку');
  return row;
}

/** Самая свежая строка подписки пользователя (может быть free-состояние = отсутствие строки). */
export async function getCurrentSubscriptionForUser(db: Db, userId: string): Promise<SubscriptionRow | null> {
  const rows = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .orderBy(desc(subscriptions.createdAt))
    .limit(1);
  return rows[0] ?? null;
}

export async function getSubscriptionById(db: Db, id: string): Promise<SubscriptionRow | null> {
  const rows = await db.select().from(subscriptions).where(eq(subscriptions.id, id)).limit(1);
  return rows[0] ?? null;
}

/** ID сохранённого способа оплаты провайдера (для последующих рекуррентных списаний worker'ом). */
export async function setProviderSubId(db: Db, id: string, providerSubId: string): Promise<SubscriptionRow | null> {
  const [row] = await db.update(subscriptions).set({ providerSubId, updatedAt: new Date() }).where(eq(subscriptions.id, id)).returning();
  return row ?? null;
}

/** «Отмена в один клик» (req.2 промта Ф8) — статус НЕ меняется сразу, только флаг; доступ
 *  сохраняется до currentPeriodEnd (см. doc-комментарий subscriptionStatusEnum). */
export async function setCancelAtPeriodEnd(db: Db, id: string, value: boolean): Promise<SubscriptionRow | null> {
  const [row] = await db
    .update(subscriptions)
    .set({ cancelAtPeriodEnd: value, updatedAt: new Date() })
    .where(eq(subscriptions.id, id))
    .returning();
  return row ?? null;
}

export async function updateSubscriptionStatus(
  db: Db,
  id: string,
  status: SubscriptionStatus,
  currentPeriodEnd?: Date,
): Promise<SubscriptionRow | null> {
  const [row] = await db
    .update(subscriptions)
    .set({ status, ...(currentPeriodEnd ? { currentPeriodEnd } : {}), updatedAt: new Date() })
    .where(eq(subscriptions.id, id))
    .returning();
  return row ?? null;
}

/** Подписки trial/active, у которых currentPeriodEnd уже прошёл — кандидаты на продление (списание)
 *  либо на expired (если cancelAtPeriodEnd). Используется worker'ом (см. apps/worker/src/billing/). */
export async function findDueForRenewalOrExpiry(db: Db, now: Date, limit = 50): Promise<SubscriptionRow[]> {
  return db
    .select()
    .from(subscriptions)
    .where(and(sql`${subscriptions.status} IN ('trial','active')`, lte(subscriptions.currentPeriodEnd, now)))
    .limit(limit);
}

/** past_due, у которых грейс (currentPeriodEnd + N дней) уже истёк — переводятся в expired. */
export async function findPastDueBeyondGrace(db: Db, graceCutoff: Date, limit = 50): Promise<SubscriptionRow[]> {
  return db
    .select()
    .from(subscriptions)
    .where(and(eq(subscriptions.status, 'past_due'), lte(subscriptions.currentPeriodEnd, graceCutoff)))
    .limit(limit);
}
