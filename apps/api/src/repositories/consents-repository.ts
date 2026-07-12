/**
 * consents — согласия 152-ФЗ. `docVersion` — источник правды `LEGAL_DOC_VERSIONS`
 * (@stassist/shared) — репозиторий сам версии не выбирает, только записывает переданную.
 */
import { and, desc, eq, isNull } from 'drizzle-orm';
import { consents, type Db } from '@stassist/db';
import type { ConsentKind } from '@stassist/shared';

export type ConsentRow = typeof consents.$inferSelect;

export async function grantConsent(
  db: Db,
  params: { userId: string; kind: ConsentKind; docVersion: string; now?: Date },
): Promise<ConsentRow> {
  const now = params.now ?? new Date();
  const [row] = await db
    .insert(consents)
    .values({ userId: params.userId, kind: params.kind, docVersion: params.docVersion, grantedAt: now })
    .returning();
  if (!row) throw new Error('grantConsent: INSERT не вернул строку');
  return row;
}

export async function revokeConsent(db: Db, userId: string, kind: ConsentKind, now: Date = new Date()): Promise<void> {
  await db
    .update(consents)
    .set({ revokedAt: now, updatedAt: now })
    .where(and(eq(consents.userId, userId), eq(consents.kind, kind), isNull(consents.revokedAt)));
}

export async function listConsents(db: Db, userId: string): Promise<ConsentRow[]> {
  return db.select().from(consents).where(eq(consents.userId, userId)).orderBy(desc(consents.grantedAt));
}

/** Активное (не отозванное) согласие ТЕКУЩЕЙ версии документа — гейт создания профиля рождения. */
export async function hasActiveConsent(
  db: Db,
  userId: string,
  kind: ConsentKind,
  currentDocVersion: string,
): Promise<boolean> {
  const rows = await db
    .select()
    .from(consents)
    .where(
      and(
        eq(consents.userId, userId),
        eq(consents.kind, kind),
        eq(consents.docVersion, currentDocVersion),
        isNull(consents.revokedAt),
      ),
    )
    .limit(1);
  return rows.length > 0;
}
