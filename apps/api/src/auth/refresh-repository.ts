/**
 * Интерфейс репозитория refresh-токенов + in-memory реализация для unit-тестов ротации/reuse
 * detection БЕЗ БД (см. findings f2.md [auth-unit-vs-integration]). Pg-реализация —
 * apps/api/src/repositories/refresh-token-repository.pg.ts (используется только в integration).
 */

export interface StoredRefreshToken {
  id: string;
  userId: string;
  tokenHash: string;
  familyId: string;
  expiresAt: Date;
  rotatedFrom: string | null;
  revokedAt: Date | null;
  createdAt: Date;
}

export type NewRefreshToken = Omit<StoredRefreshToken, 'id' | 'createdAt'>;

export interface RefreshTokenRepository {
  insert(token: NewRefreshToken): Promise<StoredRefreshToken>;
  findByHash(tokenHash: string): Promise<StoredRefreshToken | null>;
  revoke(id: string, revokedAt: Date): Promise<void>;
  /** Отзывает ВСЕ ещё не отозванные токены семьи (reuse detection). Возвращает кол-во отозванных. */
  revokeFamily(familyId: string, revokedAt: Date): Promise<number>;
}

let memoryIdCounter = 0;

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
  private readonly rows = new Map<string, StoredRefreshToken>();

  async insert(token: NewRefreshToken): Promise<StoredRefreshToken> {
    const row: StoredRefreshToken = {
      ...token,
      id: `mem-${(memoryIdCounter += 1)}`,
      createdAt: new Date(),
    };
    this.rows.set(row.id, row);
    return row;
  }

  async findByHash(tokenHash: string): Promise<StoredRefreshToken | null> {
    for (const row of this.rows.values()) {
      if (row.tokenHash === tokenHash) return row;
    }
    return null;
  }

  async revoke(id: string, revokedAt: Date): Promise<void> {
    const row = this.rows.get(id);
    if (row && !row.revokedAt) row.revokedAt = revokedAt;
  }

  async revokeFamily(familyId: string, revokedAt: Date): Promise<number> {
    let count = 0;
    for (const row of this.rows.values()) {
      if (row.familyId === familyId && !row.revokedAt) {
        row.revokedAt = revokedAt;
        count += 1;
      }
    }
    return count;
  }

  /** Только для тестов: прямой доступ к снимку состояния. */
  snapshot(): StoredRefreshToken[] {
    return [...this.rows.values()];
  }
}
