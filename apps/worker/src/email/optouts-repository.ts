import { eq } from 'drizzle-orm';
import { emailOptouts, type Db } from '@stassist/db';

export async function isEmailOptedOut(db: Db, email: string, scope: 'digest' | 'marketing'): Promise<boolean> {
  const rows = await db.select({ scope: emailOptouts.scope }).from(emailOptouts).where(eq(emailOptouts.email, email.trim().toLowerCase())).limit(1);
  const row = rows[0];
  if (!row) return false;
  return row.scope === 'all' || row.scope === scope;
}
