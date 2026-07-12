/**
 * email_optouts — отписки от рассылок (req.8 промта Ф8 «отписка в один клик», см.
 * packages/db/src/schema/email-optouts.ts).
 */
import { eq } from 'drizzle-orm';
import { emailOptouts, type Db } from '@stassist/db';

export type EmailOptoutRow = typeof emailOptouts.$inferSelect;

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

/** Идемпотентно. Уникальность по email (одна строка на пользователя) — если уже стоит `scope='all'`
 *  (отписка от всего), более узкая последующая отписка ('digest'/'marketing') НЕ ослабляет её —
 *  честно сохраняем самое строгое пожелание пользователя. */
export async function insertEmailOptout(db: Db, email: string, scope: 'all' | 'digest' | 'marketing'): Promise<void> {
  const normalized = normalizeEmail(email);
  const existing = await db.select().from(emailOptouts).where(eq(emailOptouts.email, normalized)).limit(1);
  if (existing[0]?.scope === 'all') return;
  await db.insert(emailOptouts).values({ email: normalized, scope }).onConflictDoUpdate({ target: emailOptouts.email, set: { scope } });
}

export async function isEmailOptedOut(db: Db, email: string): Promise<boolean> {
  const rows = await db.select().from(emailOptouts).where(eq(emailOptouts.email, normalizeEmail(email))).limit(1);
  return rows.length > 0;
}
