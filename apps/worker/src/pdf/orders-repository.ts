import { eq } from 'drizzle-orm';
import { orders, type Db } from '@stassist/db';

export type OrderRow = typeof orders.$inferSelect;

/** Заказы, готовые к генерации PDF (демо-оплата уже подтверждена синхронно в apps/api, см.
 *  `apps/api/src/routes/orders.ts` `DEMO_PAYMENTS_AUTO_CONFIRM`) — тот же паттерн poll-по-статусу,
 *  что `findQueuedAiReports`/`findPendingChartShares`. */
export async function findPaidOrders(db: Db, limit = 5): Promise<OrderRow[]> {
  return db.select().from(orders).where(eq(orders.status, 'paid')).limit(limit);
}

export async function markOrderAiDone(db: Db, id: string, reportId: string): Promise<void> {
  await db.update(orders).set({ status: 'ai_done', reportId, updatedAt: new Date() }).where(eq(orders.id, id));
}

export async function markOrderDelivered(db: Db, id: string): Promise<void> {
  await db.update(orders).set({ status: 'delivered', updatedAt: new Date() }).where(eq(orders.id, id));
}

/** `orders_status` не содержит отдельного 'failed' (см. doc 22 §3) — используем 'cancelled' +
 *  `errorMessage` для диагностики (не показывается пользователю as-is, тот же паттерн, что
 *  `ai_reports.errorMessage`). */
export async function markOrderCancelled(db: Db, id: string, errorMessage: string): Promise<void> {
  await db
    .update(orders)
    .set({ status: 'cancelled', errorMessage: errorMessage.slice(0, 2000), updatedAt: new Date() })
    .where(eq(orders.id, id));
}
