/**
 * Pg-реализация `RefreshTokenRepository` (интерфейс — apps/api/src/auth/refresh-repository.ts).
 * Логика ротации/reuse detection в auth/refresh-rotation.ts НЕ знает про Postgres — эта обёртка
 * лишь переводит интерфейс в SQL. Покрывается integration-тестами (нужна БД), сам алгоритм —
 * unit-тестами на InMemoryRefreshTokenRepository (см. auth/refresh-rotation.test.ts).
 */
import { and, eq, isNull } from 'drizzle-orm';
import { refreshTokens, type Db } from '@stassist/db';
import type {
  NewRefreshToken,
  RefreshTokenRepository,
  StoredRefreshToken,
} from '../auth/refresh-repository.js';

function toStored(row: typeof refreshTokens.$inferSelect): StoredRefreshToken {
  return {
    id: row.id,
    userId: row.userId,
    tokenHash: row.tokenHash,
    familyId: row.familyId,
    expiresAt: row.expiresAt,
    rotatedFrom: row.rotatedFrom,
    revokedAt: row.revokedAt,
    createdAt: row.createdAt,
  };
}

export class PgRefreshTokenRepository implements RefreshTokenRepository {
  constructor(private readonly db: Db) {}

  async insert(token: NewRefreshToken): Promise<StoredRefreshToken> {
    const [row] = await this.db
      .insert(refreshTokens)
      .values({
        userId: token.userId,
        tokenHash: token.tokenHash,
        familyId: token.familyId,
        expiresAt: token.expiresAt,
        rotatedFrom: token.rotatedFrom,
        revokedAt: token.revokedAt,
      })
      .returning();
    if (!row) throw new Error('PgRefreshTokenRepository.insert: INSERT не вернул строку');
    return toStored(row);
  }

  async findByHash(tokenHash: string): Promise<StoredRefreshToken | null> {
    const rows = await this.db.select().from(refreshTokens).where(eq(refreshTokens.tokenHash, tokenHash)).limit(1);
    const row = rows[0];
    return row ? toStored(row) : null;
  }

  async revoke(id: string, revokedAt: Date): Promise<void> {
    await this.db
      .update(refreshTokens)
      .set({ revokedAt, updatedAt: revokedAt })
      .where(and(eq(refreshTokens.id, id), isNull(refreshTokens.revokedAt)));
  }

  async revokeFamily(familyId: string, revokedAt: Date): Promise<number> {
    const rows = await this.db
      .update(refreshTokens)
      .set({ revokedAt, updatedAt: revokedAt })
      .where(and(eq(refreshTokens.familyId, familyId), isNull(refreshTokens.revokedAt)))
      .returning({ id: refreshTokens.id });
    return rows.length;
  }

  /** Все сессии пользователя разом — password reset (`revokeOtherSessions`) и удаление аккаунта. */
  async revokeAllForUser(userId: string, revokedAt: Date): Promise<number> {
    const rows = await this.db
      .update(refreshTokens)
      .set({ revokedAt, updatedAt: revokedAt })
      .where(and(eq(refreshTokens.userId, userId), isNull(refreshTokens.revokedAt)))
      .returning({ id: refreshTokens.id });
    return rows.length;
  }
}
