import { describe, expect, it } from 'vitest';
import { generateCsrfToken, verifyCsrfDoubleSubmit, verifyCsrfToken } from './csrf.js';

const SECRET = 'test-cookie-secret-32-chars-min!!';

describe('CSRF (double-submit + HMAC)', () => {
  it('токен, выпущенный generateCsrfToken, проходит verifyCsrfToken тем же секретом', () => {
    const token = generateCsrfToken(SECRET);
    expect(verifyCsrfToken(token, SECRET)).toBe(true);
  });

  it('отклоняет токен с чужим секретом', () => {
    const token = generateCsrfToken(SECRET);
    expect(verifyCsrfToken(token, 'другой-секрет-32-символа-минимум!')).toBe(false);
  });

  it('отклоняет подделанный токен (клиент не может сам сочинить валидную подпись)', () => {
    expect(verifyCsrfToken('fake-nonce.fake-signature', SECRET)).toBe(false);
  });

  it('отклоняет отсутствующий токен', () => {
    expect(verifyCsrfToken(undefined, SECRET)).toBe(false);
  });

  it('double-submit: cookie и заголовок обязаны совпадать', () => {
    const token = generateCsrfToken(SECRET);
    expect(verifyCsrfDoubleSubmit(token, token, SECRET)).toBe(true);
    expect(verifyCsrfDoubleSubmit(token, generateCsrfToken(SECRET), SECRET)).toBe(false);
  });

  it('double-submit: без заголовка — отказ', () => {
    const token = generateCsrfToken(SECRET);
    expect(verifyCsrfDoubleSubmit(token, undefined, SECRET)).toBe(false);
  });
});
