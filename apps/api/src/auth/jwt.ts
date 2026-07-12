/**
 * Access JWT — EdDSA (Ed25519), короткий TTL, БЕЗ ПД в клеймах (только `sub`/`role`/`jti`), см.
 * docs/architecture/21-техническая-архитектура.md §5. Ключи — `config.auth.jwt{Private,Public}
 * KeyPem` (см. packages/shared/src/config.ts: dev-дефолт закоммичен и намеренно небезопасен,
 * в production `parseConfig` требует реальную пару — падает иначе).
 */
import { importPKCS8, importSPKI, jwtVerify, SignJWT } from 'jose';
import { randomUUID } from 'node:crypto';
import { accessTokenClaimsSchema, type AccessTokenClaims } from '@stassist/shared';

const ALG = 'EdDSA';

export class AccessTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AccessTokenError';
  }
}

export interface SignAccessTokenParams {
  userId: string;
  role: string;
  ttlSeconds: number;
  privateKeyPem: string;
}

export async function signAccessToken(params: SignAccessTokenParams): Promise<string> {
  const key = await importPKCS8(params.privateKeyPem, ALG);
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({ role: params.role })
    .setProtectedHeader({ alg: ALG })
    .setSubject(params.userId)
    .setJti(randomUUID())
    .setIssuedAt(now)
    .setExpirationTime(now + params.ttlSeconds)
    .sign(key);
}

export async function verifyAccessToken(
  token: string,
  publicKeyPem: string,
): Promise<AccessTokenClaims> {
  const key = await importSPKI(publicKeyPem, ALG);
  let payload: unknown;
  try {
    ({ payload } = await jwtVerify(token, key));
  } catch (err) {
    throw new AccessTokenError(`недействительный access-токен: ${(err as Error).message}`);
  }
  const parsed = accessTokenClaimsSchema.safeParse(payload);
  if (!parsed.success) {
    throw new AccessTokenError('access-токен не соответствует ожидаемой схеме claims');
  }
  return parsed.data;
}
