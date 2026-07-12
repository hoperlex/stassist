/**
 * Репозиторий `users` — тонкая обёртка над drizzle. Не тестируется unit-но (нужна БД) —
 * покрывается integration-тестами (apps/api/src/routes/auth.integration.test.ts).
 */
import { randomBytes } from 'node:crypto';
import { eq } from 'drizzle-orm';
import { users, type Db } from '@stassist/db';

export type UserRow = typeof users.$inferSelect;
export type NewUserRow = typeof users.$inferInsert;

/** Всегда нормализуем e-mail перед записью/чтением — см. packages/db/src/schema/users.ts. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function insertUser(
  db: Db,
  data: { email: string; passwordHash: string; displayName?: string },
): Promise<UserRow> {
  const [row] = await db
    .insert(users)
    .values({
      email: normalizeEmail(data.email),
      passwordHash: data.passwordHash,
      displayName: data.displayName ?? null,
    })
    .returning();
  if (!row) throw new Error('insertUser: INSERT не вернул строку');
  return row;
}

export async function findUserByEmail(db: Db, email: string): Promise<UserRow | null> {
  const rows = await db
    .select()
    .from(users)
    .where(eq(users.email, normalizeEmail(email)))
    .limit(1);
  return rows[0] ?? null;
}

export async function findUserById(db: Db, id: string): Promise<UserRow | null> {
  const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function markEmailVerified(db: Db, userId: string): Promise<void> {
  await db.update(users).set({ emailVerifiedAt: new Date(), updatedAt: new Date() }).where(eq(users.id, userId));
}

export async function updatePasswordHash(db: Db, userId: string, passwordHash: string): Promise<void> {
  await db.update(users).set({ passwordHash, updatedAt: new Date() }).where(eq(users.id, userId));
}

/**
 * Право на забвение (Ф2 — жёсткое стирание ПД учётной записи, см. findings f2.md
 * [forward-reference]: анонимизация UGC-ссылок — отложенный no-op-хук до Ф7).
 * E-mail заменяется на гарантированно неиспользуемый — освобождает исходный адрес для
 * повторной регистрации и делает вход по старому e-mail невозможным.
 */
export async function anonymizeAndDeleteUser(db: Db, userId: string): Promise<void> {
  const anonymizedEmail = `deleted-${userId}-${randomBytes(4).toString('hex')}@stassist.invalid`;
  await db
    .update(users)
    .set({
      email: anonymizedEmail,
      passwordHash: randomBytes(32).toString('hex'), // не argon2-hash — верификация не пройдёт никогда
      displayName: null,
      avatarKey: null,
      status: 'deleted',
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
}
