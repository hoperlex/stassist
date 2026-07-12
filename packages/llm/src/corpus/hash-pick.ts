/**
 * Детерминированный выбор варианта фразы по хэшу ключа — даёт текстам корпуса лёгкую вариативность
 * (не «один и тот же коннектор всегда») без случайности (см. §4 конвенций реализации: seed-корпус
 * обязан быть детерминированным — повторная генерация даёт побайтово тот же SQL).
 */
import { createHash } from 'node:crypto';

export function hashPick<T>(seed: string, variants: readonly T[]): T {
  if (variants.length === 0) throw new Error('hashPick: пустой список вариантов');
  const digest = createHash('sha256').update(seed).digest();
  const idx = digest[0]! % variants.length;
  return variants[idx]!;
}
