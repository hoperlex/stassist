/**
 * Шифрование персональных данных на уровне приложения (AES-256-GCM), см. docs/architecture/
 * 21-техническая-архитектура.md §7 и 22-модель-данных.md (поля 🔒 в `birth_profiles`).
 *
 * Формат шифртекста: `v<версия>:<iv base64>:<authTag base64>:<ciphertext base64>` — версия ключа
 * зашита в сам шифртекст (требование задачи «ротация ключа предусмотрена версией в шифртексте»),
 * поэтому расшифровка старых записей продолжает работать после смены активного ключа: нужно
 * лишь не выбрасывать старые версии из `keyring.keys`.
 *
 * Чистая функция без I/O — полностью покрывается unit-тестом (round-trip, порча authTag,
 * неизвестная версия ключа) без БД/сети (см. findings f2.md [auth-unit-vs-integration]).
 */
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH_BYTES = 12;
const KEY_LENGTH_BYTES = 32;

export interface PdCipherKeyring {
  /** Версия ключа, которой шифруются НОВЫЕ значения. */
  activeVersion: number;
  /** Все известные версии ключей (нужны, чтобы расшифровывать данные, зашифрованные раньше). */
  keys: Record<number, Buffer>;
}

export class PdCipherError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PdCipherError';
  }
}

/** Собирает keyring из base64-строк (как они приходят из конфигурации/секретов). */
export function buildPdKeyring(
  activeVersion: number,
  keysBase64: Readonly<Record<number, string>>,
): PdCipherKeyring {
  const keys: Record<number, Buffer> = {};
  for (const [versionStr, b64] of Object.entries(keysBase64)) {
    const version = Number(versionStr);
    const buf = Buffer.from(b64, 'base64');
    if (buf.length !== KEY_LENGTH_BYTES) {
      throw new PdCipherError(
        `ключ шифрования ПД версии ${version}: ожидается ${KEY_LENGTH_BYTES} байт (AES-256), получено ${buf.length}`,
      );
    }
    keys[version] = buf;
  }
  if (!keys[activeVersion]) {
    throw new PdCipherError(`активная версия ключа ${activeVersion} отсутствует в keyring`);
  }
  return { activeVersion, keys };
}

/** Шифрует строковое значение активным ключом keyring. */
export function encryptPd(plaintext: string, keyring: PdCipherKeyring): string {
  const key = keyring.keys[keyring.activeVersion];
  if (!key) {
    throw new PdCipherError(`нет ключа активной версии ${keyring.activeVersion}`);
  }
  const iv = randomBytes(IV_LENGTH_BYTES);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return [
    `v${keyring.activeVersion}`,
    iv.toString('base64'),
    authTag.toString('base64'),
    ciphertext.toString('base64'),
  ].join(':');
}

/** Расшифровывает значение, полученное `encryptPd` (любой известной в keyring версии). */
export function decryptPd(payload: string, keyring: PdCipherKeyring): string {
  const parts = payload.split(':');
  if (parts.length !== 4 || !parts[0]!.startsWith('v')) {
    throw new PdCipherError('неверный формат шифртекста ПД');
  }
  const [versionTag, ivB64, tagB64, ctB64] = parts as [string, string, string, string];
  const version = Number(versionTag.slice(1));
  const key = keyring.keys[version];
  if (!key) {
    throw new PdCipherError(`нет ключа версии ${version} в keyring — невозможно расшифровать`);
  }
  const iv = Buffer.from(ivB64, 'base64');
  const authTag = Buffer.from(tagB64, 'base64');
  const ciphertext = Buffer.from(ctB64, 'base64');
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  try {
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return plaintext.toString('utf8');
  } catch {
    // GCM authTag mismatch (порча/подмена шифртекста) — не течём деталями исключения наружу.
    throw new PdCipherError('не удалось расшифровать: шифртекст повреждён или подделан');
  }
}
