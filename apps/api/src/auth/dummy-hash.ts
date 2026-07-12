/**
 * Хэш-заглушка для защиты от enumeration по времени ответа: если e-mail не найден, логин всё
 * равно прогоняет `verifyPassword` против ЭТОГО хэша (а не возвращает мгновенно) — иначе ответ
 * для «нет такого e-mail» был бы заметно быстрее ответа «неверный пароль», что раскрывает
 * существование аккаунта (док. 21 §5: «защита от enumeration в auth»).
 */
import { hashPassword } from './password.js';

let cached: Promise<string> | undefined;

export function getDummyPasswordHash(): Promise<string> {
  cached ??= hashPassword('dummy-password-only-for-constant-time-comparison');
  return cached;
}
