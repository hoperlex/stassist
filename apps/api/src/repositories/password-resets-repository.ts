/**
 * password_resets — одноразовый токен сброса пароля, TTL 1 час (док. 21 §5).
 */
import { and, eq, isNull } from 'drizzle-orm';
import { passwordResets, type Db } from '@stassist/db';

export const PASSWORD_RESET_TTL_MS = 60 * 60 * 1000; // 1 час

export async function insertPasswordReset(
  db: Db,
  params: { userId: string; tokenHash: string; now?: Date },
): Promise<void> {
  const now = params.now ?? new Date();
  await db.insert(passwordResets).values({
    userId: params.userId,
    tokenHash: params.tokenHash,
    expiresAt: new Date(now.getTime() + PASSWORD_RESET_TTL_MS),
  });
}

export async function consumePasswordReset(
  db: Db,
  tokenHash: string,
  now: Date = new Date(),
): Promise<{ userId: string } | null> {
  const rows = await db
    .select()
    .from(passwordResets)
    .where(and(eq(passwordResets.tokenHash, tokenHash), isNull(passwordResets.usedAt)))
    .limit(1);
  const row = rows[0];
  if (!row) return null;
  if (row.expiresAt.getTime() <= now.getTime()) return null;

  await db.update(passwordResets).set({ usedAt: now, updatedAt: now }).where(eq(passwordResets.id, row.id));
  return { userId: row.userId };
}
