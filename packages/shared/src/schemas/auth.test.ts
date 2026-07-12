import { describe, expect, it } from 'vitest';
import { loginRequestSchema, passwordSchema, registerRequestSchema } from './auth.js';

describe('registerRequestSchema', () => {
  it('принимает валидную регистрацию и нормализует e-mail', () => {
    const parsed = registerRequestSchema.parse({
      email: '  User@Example.COM ',
      password: 'password1',
    });
    expect(parsed.email).toBe('user@example.com');
  });

  it('отклоняет короткий пароль', () => {
    expect(() => registerRequestSchema.parse({ email: 'a@b.com', password: '123' })).toThrow();
  });

  it('отклоняет пароль без цифр', () => {
    expect(() => passwordSchema.parse('onlyletters')).toThrow();
  });

  it('отклоняет пароль без букв', () => {
    expect(() => passwordSchema.parse('12345678')).toThrow();
  });

  it('отклоняет некорректный e-mail', () => {
    expect(() => registerRequestSchema.parse({ email: 'not-an-email', password: 'password1' })).toThrow();
  });
});

describe('loginRequestSchema', () => {
  it('не навязывает политику пароля при логине (только непустой)', () => {
    expect(() => loginRequestSchema.parse({ email: 'a@b.com', password: 'x' })).not.toThrow();
  });
});
