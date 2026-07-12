/**
 * Реальный адаптер `ObjectStorage` поверх S3-совместимого API (`@aws-sdk/client-s3` +
 * `@aws-sdk/s3-request-presigner`). Целевой провайдер прода/стейджа — **s3.cloud.ru**
 * (см. `.env.example` S3_*), локально — MinIO (docker-compose): оба совместимы с одним и тем же
 * адаптером, т.к. ни тот ни другой не является AWS.
 *
 * Два момента, обязательных для НЕ-AWS S3-совместимых эндпоинтов:
 *  - `forcePathStyle: true` — путь вида `https://s3.cloud.ru/<bucket>/<key>`, а не
 *    virtual-hosted `https://<bucket>.s3.cloud.ru/<key>` (последний требует wildcard-DNS/TLS,
 *    которого нет у большинства не-AWS провайдеров, включая s3.cloud.ru/MinIO);
 *  - явный `endpoint` (иначе SDK по умолчанию бьёт в `*.amazonaws.com`).
 *
 * НЕ используется в unit/build-гейте с реальной сетью — конструируется только при `STORAGE=s3`
 * (см. ports/factory.ts). Unit-тест (s3-object-storage.test.ts) мокает `S3Client.send`, реальную
 * сеть проверяет только задача B (round-trip put/exists/get/presigned-GET/delete против
 * настоящего s3.cloud.ru — вне этого репозитория/CI).
 */
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { ObjectStorage } from './object-storage.js';

export interface S3ObjectStorageOptions {
  /** Кастомный endpoint S3-совместимого провайдера (напр. `https://s3.cloud.ru`). */
  endpoint: string;
  region: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
  /** Только для unit-тестов: подменяет реальный `S3Client` мок-объектом (без сети). */
  client?: Pick<S3Client, 'send'>;
}

/** TTL подписанной ссылки по умолчанию — 1 час (разумный баланс: достаточно для скачивания
 *  PDF/OG-картинки пользователем, не оставляет ссылку «живой» надолго). Вызывающий код может
 *  передать свой TTL (см. apps/api/src/routes/orders.ts — 7 дней для PDF заказа). */
const DEFAULT_SIGNED_URL_TTL_SECONDS = 60 * 60;

function isNotFoundError(err: unknown): boolean {
  if (typeof err !== 'object' || err === null) return false;
  const name = 'name' in err ? String((err as { name?: unknown }).name) : '';
  if (name === 'NotFound' || name === 'NoSuchKey') return true;
  const metadata = (err as { $metadata?: { httpStatusCode?: number } }).$metadata;
  return metadata?.httpStatusCode === 404;
}

export class S3ObjectStorage implements ObjectStorage {
  private readonly client: Pick<S3Client, 'send'>;
  private readonly bucket: string;

  constructor(options: S3ObjectStorageOptions) {
    this.bucket = options.bucket;
    this.client =
      options.client ??
      new S3Client({
        endpoint: options.endpoint,
        region: options.region,
        // ОБЯЗАТЕЛЬНО для не-AWS S3-совместимых эндпоинтов (см. doc-комментарий файла).
        forcePathStyle: true,
        credentials: {
          accessKeyId: options.accessKeyId,
          secretAccessKey: options.secretAccessKey,
        },
      });
  }

  async put(key: string, data: Buffer | string, contentType?: string): Promise<void> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: typeof data === 'string' ? Buffer.from(data, 'utf8') : data,
        ContentType: contentType,
      }),
    );
  }

  async get(key: string): Promise<Buffer | null> {
    try {
      const res = await this.client.send(new GetObjectCommand({ Bucket: this.bucket, Key: key }));
      if (!res.Body) return null;
      const bytes = await res.Body.transformToByteArray();
      return Buffer.from(bytes);
    } catch (err) {
      if (isNotFoundError(err)) return null;
      throw err;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      await this.client.send(new HeadObjectCommand({ Bucket: this.bucket, Key: key }));
      return true;
    } catch (err) {
      if (isNotFoundError(err)) return false;
      throw err;
    }
  }

  async getSignedUrl(key: string, expiresInSec = DEFAULT_SIGNED_URL_TTL_SECONDS): Promise<string> {
    const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    // getSignedUrl принимает полноценный S3Client — при мок-клиенте в тестах caller передаёт
    // client через options.client, но подпись всё равно детерминированно строится по команде/
    // креденшлам самого клиента, поэтому мок должен предоставлять config (см. тест).
    return getSignedUrl(this.client as S3Client, command, { expiresIn: expiresInSec });
  }

  async delete(key: string): Promise<void> {
    await this.client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
  }
}
