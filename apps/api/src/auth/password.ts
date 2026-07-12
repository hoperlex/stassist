/**
 * Хэширование паролей — argon2id (док. 21 §5). Реализация через `hash-wasm` (чистый WASM, БЕЗ
 * нативной компиляции при установке — надёжнее, чем `argon2` npm с node-gyp, в оффлайн-CI-среде,
 * см. findings f2.md [auth-unit-vs-integration]: должно быть unit-тестируемо без сети).
 *
 * Параметры — консервативный дефолт OWASP (m=19 MiB, t=2, p=1) — не самый тяжёлый вариант,
 * подобран для баланса «безопасно достаточно» / «не душит единственный API-процесс на VPS».
 * `outputType: 'encoded'` даёт готовую PHC-строку (алгоритм+параметры+соль+хэш в одном поле) —
 * не нужно хранить соль отдельной колонкой.
 */
import { randomBytes } from 'node:crypto';
import { argon2id, argon2Verify } from 'hash-wasm';

export interface Argon2Params {
  iterations: number;
  parallelism: number;
  memorySizeKiB: number;
  hashLengthBytes: number;
  saltLengthBytes: number;
}

export const DEFAULT_ARGON2_PARAMS: Argon2Params = {
  iterations: 2,
  parallelism: 1,
  memorySizeKiB: 19 * 1024,
  hashLengthBytes: 32,
  saltLengthBytes: 16,
};

export async function hashPassword(
  password: string,
  params: Argon2Params = DEFAULT_ARGON2_PARAMS,
): Promise<string> {
  const salt = randomBytes(params.saltLengthBytes);
  return argon2id({
    password,
    salt,
    iterations: params.iterations,
    parallelism: params.parallelism,
    memorySize: params.memorySizeKiB,
    hashLength: params.hashLengthBytes,
    outputType: 'encoded',
  });
}

export async function verifyPassword(password: string, encodedHash: string): Promise<boolean> {
  try {
    return await argon2Verify({ password, hash: encodedHash });
  } catch {
    // Некорректный формат hash (напр. пустая строка-заглушка для dummy-verify — см.
    // auth/dummy-hash.ts) — трактуем как «пароль не подошёл», не как 500.
    return false;
  }
}
