import { buildPdKeyring, type Config, type PdCipherKeyring } from '@stassist/shared';

let cached: PdCipherKeyring | undefined;
let cachedFor: Config['pdEncryption'] | undefined;

/** Кэширует keyring, пока конфигурация ключей не меняется (в проде — весь lifetime процесса). */
export function getPdKeyring(config: Config): PdCipherKeyring {
  if (!cached || cachedFor !== config.pdEncryption) {
    cached = buildPdKeyring(config.pdEncryption.activeVersion, config.pdEncryption.keysBase64);
    cachedFor = config.pdEncryption;
  }
  return cached;
}
