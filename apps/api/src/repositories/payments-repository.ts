/**
 * payments — разовые платежи и списания подписки (см. packages/db/src/schema/payments.ts).
 */
import { desc, eq } from 'drizzle-orm';
import { payments, type Db } from '@stassist/db';
import type { PaymentProviderName, PaymentStatus } from '@stassist/shared';

export type PaymentRow = typeof payments.$inferSelect;

export interface InsertPaymentInput {
  userId: string;
  orderId?: string | null;
  subscriptionId?: string | null;
  provider: PaymentProviderName;
  providerPaymentId: string;
  amountKop: number;
  status: PaymentStatus;
  idempotencyKey: string;
  raw?: Record<string, unknown>;
}

/** Идемпотентно по `idempotency_key` — при гонке (двойной клик оплаты) вторая попытка получает
 *  уже созданную строку, а не дубль платежа (тот же паттерн, что `upsertChartShare`). */
export async function insertPaymentIdempotent(db: Db, input: InsertPaymentInput): Promise<PaymentRow> {
  const [row] = await db
    .insert(payments)
    .values({
      userId: input.userId,
      orderId: input.orderId ?? null,
      subscriptionId: input.subscriptionId ?? null,
      provider: input.provider,
      providerPaymentId: input.providerPaymentId,
      amountKop: input.amountKop,
      status: input.status,
      idempotencyKey: input.idempotencyKey,
      raw: input.raw ?? {},
    })
    .onConflictDoNothing({ target: payments.idempotencyKey })
    .returning();
  if (row) return row;
  const existing = await findPaymentByIdempotencyKey(db, input.idempotencyKey);
  if (!existing) throw new Error('insertPaymentIdempotent: строка не найдена ни после INSERT, ни после конфликта');
  return existing;
}

export async function findPaymentByIdempotencyKey(db: Db, idempotencyKey: string): Promise<PaymentRow | null> {
  const rows = await db.select().from(payments).where(eq(payments.idempotencyKey, idempotencyKey)).limit(1);
  return rows[0] ?? null;
}

export async function findPaymentByProviderPaymentId(db: Db, providerPaymentId: string): Promise<PaymentRow | null> {
  const rows = await db.select().from(payments).where(eq(payments.providerPaymentId, providerPaymentId)).limit(1);
  return rows[0] ?? null;
}

export async function getPaymentById(db: Db, id: string): Promise<PaymentRow | null> {
  const rows = await db.select().from(payments).where(eq(payments.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function updatePaymentStatus(
  db: Db,
  id: string,
  status: PaymentStatus,
  raw?: Record<string, unknown>,
): Promise<PaymentRow | null> {
  const [row] = await db
    .update(payments)
    .set({ status, ...(raw ? { raw } : {}), updatedAt: new Date() })
    .where(eq(payments.id, id))
    .returning();
  return row ?? null;
}

export async function listPaymentsForUser(db: Db, userId: string, limit = 50): Promise<PaymentRow[]> {
  return db.select().from(payments).where(eq(payments.userId, userId)).orderBy(desc(payments.createdAt)).limit(limit);
}
