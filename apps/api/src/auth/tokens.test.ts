import { describe, expect, it } from 'vitest';
import { generateOpaqueToken, hashesEqual, hashOpaqueToken } from './tokens.js';

describe('opaque-токены (refresh/verify-email/reset)', () => {
  it('генерирует токены разной случайной строки при каждом вызове', () => {
    expect(generateOpaqueToken()).not.toBe(generateOpaqueToken());
  });

  it('hashOpaqueToken детерминирован для одного и того же токена', () => {
    const token = generateOpaqueToken();
    expect(hashOpaqueToken(token)).toBe(hashOpaqueToken(token));
  });

  it('разные токены дают разный hash', () => {
    expect(hashOpaqueToken('a')).not.toBe(hashOpaqueToken('b'));
  });

  it('hash — hex sha256 (64 символа)', () => {
    expect(hashOpaqueToken('x')).toMatch(/^[0-9a-f]{64}$/);
  });

  it('hashesEqual сравнивает корректно (true/false)', () => {
    const h = hashOpaqueToken('secret');
    expect(hashesEqual(h, hashOpaqueToken('secret'))).toBe(true);
    expect(hashesEqual(h, hashOpaqueToken('other'))).toBe(false);
  });

  it('hashesEqual безопасен при разной длине входа (не бросает)', () => {
    expect(hashesEqual('ab', hashOpaqueToken('secret'))).toBe(false);
  });
});
