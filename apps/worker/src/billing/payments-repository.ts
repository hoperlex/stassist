import { eq } from 'drizzle-orm';
import { payments, type Db } from '@stassist/db';
import type { PaymentProviderName, PaymentStatus } from '@stassist/shared';

export type PaymentRow = typeof payments.$inferSelect;

export interface InsertPaymentInput {
  userId: string;
  subscriptionId: string;
  provider: PaymentProviderName;
  providerPaymentId: string;
  amountKop: number;
  status: PaymentStatus;
  idempotencyKey: string;
  raw?: Record<string, unknown>;
}

/** Идемпотентно по `idempotency_key` (тот же паттерн, что apps/api/src/repositories/
 *  payments-repository.ts — продублировано, см. doc-комментарий billing/webhook-processor.ts). */
export async function insertPaymentIdempotent(db: Db, input: InsertPaymentInput): Promise<PaymentRow> {
  const [row] = await db
    .insert(payments)
    .values({
      userId: input.userId,
      subscriptionId: input.subscriptionId,
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
  const rows = await db.select().from(payments).where(eq(payments.idempotencyKey, input.idempotencyKey)).limit(1);
  const existing = rows[0];
  if (!existing) throw new Error('insertPaymentIdempotent: строка не найдена ни после INSERT, ни после конфликта');
  return existing;
}

export async function findByProviderPaymentId(db: Db, providerPaymentId: string): Promise<PaymentRow | null> {
  const rows = await db.select().from(payments).where(eq(payments.providerPaymentId, providerPaymentId)).limit(1);
  return rows[0] ?? null;
}

export async function updatePaymentStatus(db: Db, id: string, status: PaymentStatus): Promise<void> {
  await db.update(payments).set({ status, updatedAt: new Date() }).where(eq(payments.id, id));
}
