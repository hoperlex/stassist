/**
 * orders — заказы PDF-продуктов (см. packages/db/src/schema/orders.ts, doc-комментарий там же).
 */
import { and, desc, eq } from 'drizzle-orm';
import { aiReports, orders, type Db } from '@stassist/db';
import type { CustomForecastSubject, OrderKind, OrderSubject } from '@stassist/shared';

export type OrderRow = typeof orders.$inferSelect;

export interface InsertOrderParams {
  userId: string;
  kind: OrderKind;
  /** Ф8: форма зависит от `kind` (pdf_report → OrderSubject, custom_forecast →
   *  CustomForecastSubject) — хранится как jsonb, см. doc-комментарий routes/orders.ts
   *  `parseOrderSubjectByKind`. */
  subject: OrderSubject | CustomForecastSubject;
  priceKop: number;
}

export async function insertOrder(db: Db, params: InsertOrderParams): Promise<OrderRow> {
  const [row] = await db
    .insert(orders)
    .values({ userId: params.userId, kind: params.kind, subject: params.subject, priceKop: params.priceKop })
    .returning();
  if (!row) throw new Error('insertOrder: INSERT не вернул строку');
  return row;
}

export async function markOrderPaid(db: Db, id: string): Promise<OrderRow | null> {
  const [row] = await db.update(orders).set({ status: 'paid', updatedAt: new Date() }).where(eq(orders.id, id)).returning();
  return row ?? null;
}

export async function listOrdersForUser(db: Db, userId: string): Promise<OrderRow[]> {
  return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}

export async function getOrderForUser(db: Db, userId: string, id: string): Promise<OrderRow | null> {
  const rows = await db
    .select()
    .from(orders)
    .where(and(eq(orders.id, id), eq(orders.userId, userId)))
    .limit(1);
  return rows[0] ?? null;
}

/** PDF-ключ готового отчёта (для подписанной ссылки) — null, пока заказ не доставлен. */
export async function getReportPdfKey(db: Db, reportId: string): Promise<string | null> {
  const rows = await db.select({ pdfKey: aiReports.pdfKey }).from(aiReports).where(eq(aiReports.id, reportId)).limit(1);
  return rows[0]?.pdfKey ?? null;
}
