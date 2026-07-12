/**
 * email_verifications — хранилище хэша одноразового токена подтверждения e-mail (находка f2.md
 * [schema-gap], см. packages/db/src/schema/email-verifications.ts).
 */
import { and, eq, isNull } from 'drizzle-orm';
import { emailVerifications, type Db } from '@stassist/db';

export const EMAIL_VERIFICATION_TTL_MS = 24 * 60 * 60 * 1000; // 24 часа

export async function insertEmailVerification(
  db: Db,
  params: { userId: string; tokenHash: string; now?: Date },
): Promise<void> {
  const now = params.now ?? new Date();
  await db.insert(emailVerifications).values({
    userId: params.userId,
    tokenHash: params.tokenHash,
    expiresAt: new Date(now.getTime() + EMAIL_VERIFICATION_TTL_MS),
  });
}

export async function consumeEmailVerification(
  db: Db,
  tokenHash: string,
  now: Date = new Date(),
): Promise<{ userId: string } | null> {
  const rows = await db
    .select()
    .from(emailVerifications)
    .where(and(eq(emailVerifications.tokenHash, tokenHash), isNull(emailVerifications.usedAt)))
    .limit(1);
  const row = rows[0];
  if (!row) return null;
  if (row.expiresAt.getTime() <= now.getTime()) return null;

  await db
    .update(emailVerifications)
    .set({ usedAt: now, updatedAt: now })
    .where(eq(emailVerifications.id, row.id));
  return { userId: row.userId };
}
