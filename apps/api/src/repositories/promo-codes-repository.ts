/**
 * promo_codes — см. packages/db/src/schema/promo-codes.ts.
 */
import { eq, sql } from 'drizzle-orm';
import { promoCodes, type Db } from '@stassist/db';

export type PromoCodeRow = typeof promoCodes.$inferSelect;

export async function findPromoCodeByCode(db: Db, code: string): Promise<PromoCodeRow | null> {
  const rows = await db.select().from(promoCodes).where(eq(promoCodes.code, code.trim().toUpperCase())).limit(1);
  return rows[0] ?? null;
}

/** Атомарный инкремент на стороне БД (без read-modify-write из приложения — исключает гонку при
 *  одновременном использовании промокода несколькими пользователями). */
export async function incrementPromoCodeUsage(db: Db, id: string): Promise<void> {
  await db
    .update(promoCodes)
    .set({ usedCount: sql`${promoCodes.usedCount} + 1`, updatedAt: new Date() })
    .where(eq(promoCodes.id, id));
}
