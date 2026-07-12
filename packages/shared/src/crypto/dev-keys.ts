/**
 * НЕБЕЗОПАСНЫЕ ключи по умолчанию — используются ТОЛЬКО когда соответствующая переменная
 * окружения не задана (см. config.ts: та же категория «всегда обязательные с dev-дефолтом», что
 * и COOKIE_SECRET из Ф0). Сгенерированы один раз офлайн (`node -e "crypto.generateKeyPairSync
 * ('ed25519')"` / `crypto.randomBytes(32)`), закоммичены сознательно — они существуют именно для
 * того, чтобы быть публичными и НИКОГДА не использоваться в проде.
 *
 * `parseConfig` в NODE_ENV=production бросает ConfigError, если эффективный ключ совпадает с
 * одной из этих констант (см. config.ts) — доп. защита сверх паттерна COOKIE_SECRET.
 */

/** Ed25519 keypair (PKCS8/SPKI PEM) — подпись access JWT (EdDSA), см. auth/jwt.ts в apps/api. */
export const DEV_INSECURE_JWT_PRIVATE_KEY_PEM = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEINxu/kgQFiOPJyxxWGzqW9pEAxUB3JFdR7WKAKDXb6as
-----END PRIVATE KEY-----
`;

export const DEV_INSECURE_JWT_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAQZSiCvm1439ki2xU0XzzE1BLvf/vHXcLuHYybPmZe28=
-----END PUBLIC KEY-----
`;

/** AES-256 ключ (32 байта, base64) — шифрование ПД (`packages/shared/src/crypto/pd-cipher.ts`). */
export const DEV_INSECURE_PD_ENCRYPTION_KEY_BASE64 = 'mQonWMcDzHKbgQep5FSsApUFkxrPIlv4K2h5DoNshzc=';
