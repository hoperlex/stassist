/**
 * Ротация refresh-токенов + reuse detection — ЧИСТАЯ логика над `RefreshTokenRepository`
 * (интерфейс, не завязана на Postgres), покрывается unit-тестами на `InMemoryRefreshTokenRepository`
 * без БД/сети (см. findings f2.md [auth-unit-vs-integration], требование задачи).
 *
 * Алгоритм (док. 21 §5, 22-модель-данных.md §1):
 *  - каждый обмен refresh-токена ГАСИТ предъявленный и выпускает НОВЫЙ той же `familyId`
 *    (`rotatedFrom` = id погашенного) — «семья» = цепочка одной непрерывной сессии;
 *  - предъявление уже погашенного (revokedAt != null) токена — reuse: кто-то использует токен
 *    после того, как он уже был обменян (украденная копия ИЛИ гонка вкладок) → ВСЯ семья
 *    отзывается немедленно, требуется полный повторный логин.
 */
import { generateOpaqueToken, hashOpaqueToken } from './tokens.js';
import type { RefreshTokenRepository, StoredRefreshToken } from './refresh-repository.js';

export class RefreshTokenInvalidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RefreshTokenInvalidError';
  }
}

export interface IssueFirstRefreshTokenParams {
  userId: string;
  repo: RefreshTokenRepository;
  now?: Date;
  ttlSeconds: number;
  familyId: string;
}

export interface IssuedToken {
  plaintext: string;
  record: StoredRefreshToken;
}

/** Первый токен новой семьи — выпускается при логине. */
export async function issueFirstRefreshToken(params: IssueFirstRefreshTokenParams): Promise<IssuedToken> {
  const now = params.now ?? new Date();
  const plaintext = generateOpaqueToken();
  const record = await params.repo.insert({
    userId: params.userId,
    tokenHash: hashOpaqueToken(plaintext),
    familyId: params.familyId,
    expiresAt: new Date(now.getTime() + params.ttlSeconds * 1000),
    rotatedFrom: null,
    revokedAt: null,
  });
  return { plaintext, record };
}

export type RotateOutcome =
  | { kind: 'rotated'; issued: IssuedToken; userId: string; familyId: string }
  | { kind: 'reuse-detected'; userId: string; familyId: string; revokedCount: number };

export interface RotateRefreshTokenParams {
  presentedTokenPlaintext: string;
  repo: RefreshTokenRepository;
  now?: Date;
  ttlSeconds: number;
}

/**
 * Предъявляет refresh-токен на обмен. Бросает `RefreshTokenInvalidError`, если токен неизвестен
 * или истёк по TTL (истёкший — НЕ reuse, т.к. он мог и не быть погашен явно: TTL сам по себе не
 * триггерит отзыв семьи, только явное погашение при ротации).
 */
export async function rotateRefreshToken(params: RotateRefreshTokenParams): Promise<RotateOutcome> {
  const now = params.now ?? new Date();
  const tokenHash = hashOpaqueToken(params.presentedTokenPlaintext);
  const existing = await params.repo.findByHash(tokenHash);
  if (!existing) {
    throw new RefreshTokenInvalidError('refresh-токен неизвестен');
  }

  if (existing.revokedAt) {
    // Reuse detected: предъявлен уже погашенный токен — отзываем всю семью.
    const revokedCount = await params.repo.revokeFamily(existing.familyId, now);
    return {
      kind: 'reuse-detected',
      userId: existing.userId,
      familyId: existing.familyId,
      revokedCount,
    };
  }

  if (existing.expiresAt.getTime() <= now.getTime()) {
    throw new RefreshTokenInvalidError('refresh-токен истёк');
  }

  await params.repo.revoke(existing.id, now);
  const plaintext = generateOpaqueToken();
  const record = await params.repo.insert({
    userId: existing.userId,
    tokenHash: hashOpaqueToken(plaintext),
    familyId: existing.familyId,
    expiresAt: new Date(now.getTime() + params.ttlSeconds * 1000),
    rotatedFrom: existing.id,
    revokedAt: null,
  });

  return {
    kind: 'rotated',
    issued: { plaintext, record },
    userId: existing.userId,
    familyId: existing.familyId,
  };
}
