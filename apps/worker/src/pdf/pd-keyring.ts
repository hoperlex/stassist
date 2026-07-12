/**
 * Кэширующая обёртка над `buildPdKeyring` — worker-локальная копия `apps/api/src/auth/pd-
 * keyring.ts` (apps/worker НЕ зависит от apps/api, см. §1 монорепо в docs/architecture/
 * 21-техническая-архитектура.md — каждое приложение самостоятельно строит keyring из
 * `Config.pdEncryption`, идентичного между процессами через общий `@stassist/shared` `parseConfig`).
 * Нужен здесь, т.к. генерация PDF-заказа читает 🔒 `birth_profiles` (дату рождения) — см.
 * `birth-profile-lookup.ts`.
 */
import { buildPdKeyring, type Config, type PdCipherKeyring } from '@stassist/shared';

let cached: PdCipherKeyring | undefined;
let cachedFor: Config['pdEncryption'] | undefined;

export function getPdKeyring(config: Config): PdCipherKeyring {
  if (!cached || cachedFor !== config.pdEncryption) {
    cached = buildPdKeyring(config.pdEncryption.activeVersion, config.pdEncryption.keysBase64);
    cachedFor = config.pdEncryption;
  }
  return cached;
}
