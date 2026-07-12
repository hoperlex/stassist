import { describe, expect, it } from 'vitest';
import { hashPassword, verifyPassword } from './password.js';

describe('argon2id (hash-wasm)', () => {
  it('хэширует и проверяет верный пароль', async () => {
    const hash = await hashPassword('correct horse battery staple 1');
    expect(await verifyPassword('correct horse battery staple 1', hash)).toBe(true);
  });

  it('отклоняет неверный пароль', async () => {
    const hash = await hashPassword('correct horse battery staple 1');
    expect(await verifyPassword('wrong password 1', hash)).toBe(false);
  });

  it('два хэша одного пароля различаются (случайная соль)', async () => {
    const a = await hashPassword('same-password-1');
    const b = await hashPassword('same-password-1');
    expect(a).not.toBe(b);
  });

  it('хэш закодирован в формате PHC ($argon2id$...)', async () => {
    const hash = await hashPassword('x1234567');
    expect(hash.startsWith('$argon2id$')).toBe(true);
  });

  it('verifyPassword не бросает на мусорном hash (некорректный формат)', async () => {
    await expect(verifyPassword('any', 'not-a-valid-hash')).resolves.toBe(false);
  });
});
