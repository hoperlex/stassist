/**
 * Одноразовые opaque-токены (refresh, e-mail verification, password reset) — в БД хранится
 * ТОЛЬКО sha256-hash, никогда сам токен (док. 21 §5, 22-модель-данных.md §1). Общая утилита для
 * всех трёх сценариев — формат и хэширование идентичны, различаются только TTL/таблица.
 */
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

/** Криптографически случайный токен, url-safe (годится и для query-параметра ссылки в письме). */
export function generateOpaqueToken(bytes = 32): string {
  return randomBytes(bytes).toString('base64url');
}

export function hashOpaqueToken(token: string): string {
  return createHash('sha256').update(token, 'utf8').digest('hex');
}

/** Сравнение hash-строк за постоянное время (обе — hex одинаковой длины при нормальной работе). */
export function hashesEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'hex');
  const bufB = Buffer.from(b, 'hex');
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
