/**
 * orders — заказы `kind='custom_forecast'` (Ф8, req.4). Переиспользует generic-функции
 * `markOrderAiDone`/`markOrderDelivered`/`markOrderCancelled` из `../pdf/orders-repository.js`
 * (не зависят от `kind`) — здесь только выборка ЭТОГО типа заказов (см. doc-комментарий
 * `findPaidOrders` в pdf/orders-repository.ts: фильтр по `kind` обязателен, иначе оба job'а
 * конкурируют за одни и те же строки `status='paid'`).
 */
import { and, eq } from 'drizzle-orm';
import { orders, type Db } from '@stassist/db';

export type OrderRow = typeof orders.$inferSelect;

export async function findPaidCustomForecastOrders(db: Db, limit = 5): Promise<OrderRow[]> {
  return db
    .select()
    .from(orders)
    .where(and(eq(orders.status, 'paid'), eq(orders.kind, 'custom_forecast')))
    .limit(limit);
}

export { markOrderAiDone, markOrderCancelled, markOrderDelivered } from '../pdf/orders-repository.js';
