import { generateKeyPairSync, randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { AccessTokenError, signAccessToken, verifyAccessToken } from './jwt.js';

function generateTestKeyPair(): { privateKeyPem: string; publicKeyPem: string } {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');
  return {
    privateKeyPem: privateKey.export({ type: 'pkcs8', format: 'pem' }) as string,
    publicKeyPem: publicKey.export({ type: 'spki', format: 'pem' }) as string,
  };
}

describe('access JWT (EdDSA)', () => {
  it('подписывает и проверяет токен, claims содержат sub/role/jti/iat/exp', async () => {
    const { privateKeyPem, publicKeyPem } = generateTestKeyPair();
    const userId = randomUUID();
    const token = await signAccessToken({
      userId,
      role: 'user',
      ttlSeconds: 900,
      privateKeyPem,
    });
    const claims = await verifyAccessToken(token, publicKeyPem);
    expect(claims.sub).toBe(userId);
    expect(claims.role).toBe('user');
    expect(claims.exp - claims.iat).toBe(900);
  });

  it('НЕ содержит e-mail/ПД в теле токена (только sub/role/jti/iat/exp)', async () => {
    const { privateKeyPem } = generateTestKeyPair();
    const token = await signAccessToken({
      userId: randomUUID(),
      role: 'user',
      ttlSeconds: 900,
      privateKeyPem,
    });
    const payloadB64 = token.split('.')[1]!;
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    expect(Object.keys(payload).sort()).toEqual(['exp', 'iat', 'jti', 'role', 'sub']);
  });

  it('отклоняет токен, подписанный чужим ключом', async () => {
    const pairA = generateTestKeyPair();
    const pairB = generateTestKeyPair();
    const token = await signAccessToken({
      userId: randomUUID(),
      role: 'user',
      ttlSeconds: 900,
      privateKeyPem: pairA.privateKeyPem,
    });
    await expect(verifyAccessToken(token, pairB.publicKeyPem)).rejects.toThrow(AccessTokenError);
  });

  it('отклоняет истёкший токен', async () => {
    const { privateKeyPem, publicKeyPem } = generateTestKeyPair();
    const token = await signAccessToken({
      userId: randomUUID(),
      role: 'user',
      ttlSeconds: -1, // уже истёк в момент выпуска
      privateKeyPem,
    });
    await expect(verifyAccessToken(token, publicKeyPem)).rejects.toThrow(AccessTokenError);
  });

  it('разные вызовы дают разный jti (уникальность токена)', async () => {
    const { privateKeyPem, publicKeyPem } = generateTestKeyPair();
    const userId = randomUUID();
    const t1 = await signAccessToken({ userId, role: 'user', ttlSeconds: 900, privateKeyPem });
    const t2 = await signAccessToken({ userId, role: 'user', ttlSeconds: 900, privateKeyPem });
    const c1 = await verifyAccessToken(t1, publicKeyPem);
    const c2 = await verifyAccessToken(t2, publicKeyPem);
    expect(c1.jti).not.toBe(c2.jti);
  });
});
