import { and, eq, lte, sql } from 'drizzle-orm';
import { subscriptions, type Db } from '@stassist/db';
import type { SubscriptionStatus } from '@stassist/shared';

export type SubscriptionRow = typeof subscriptions.$inferSelect;

/** trial/active, чей currentPeriodEnd уже прошёл — кандидаты на продление (списание) либо expired
 *  (если cancelAtPeriodEnd). См. apps/api/src/repositories/subscriptions-repository.ts (продублировано). */
export async function findDueForRenewalOrExpiry(db: Db, now: Date, limit = 100): Promise<SubscriptionRow[]> {
  return db
    .select()
    .from(subscriptions)
    .where(and(sql`${subscriptions.status} IN ('trial','active')`, lte(subscriptions.currentPeriodEnd, now)))
    .limit(limit);
}

/** past_due, у которых грейс (currentPeriodEnd + N дней) уже истёк — переводятся в expired. */
export async function findPastDueBeyondGrace(db: Db, graceCutoff: Date, limit = 100): Promise<SubscriptionRow[]> {
  return db
    .select()
    .from(subscriptions)
    .where(and(eq(subscriptions.status, 'past_due'), lte(subscriptions.currentPeriodEnd, graceCutoff)))
    .limit(limit);
}

export async function updateSubscriptionStatus(db: Db, id: string, status: SubscriptionStatus, currentPeriodEnd?: Date): Promise<void> {
  await db
    .update(subscriptions)
    .set({ status, ...(currentPeriodEnd ? { currentPeriodEnd } : {}), updatedAt: new Date() })
    .where(eq(subscriptions.id, id));
}
