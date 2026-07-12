/**
 * Порт объектного хранилища (S3-совместимого). Реальная реализация — `S3ObjectStorage`
 * (s3-object-storage.ts, s3.cloud.ru/MinIO через `@aws-sdk/client-s3`, см. doc-комментарий там);
 * здесь — интерфейс + тривиальный in-memory стаб (§2 конвенций реализации), дефолт для
 * unit-тестов и development без `STORAGE=s3`.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

export interface ObjectStorage {
  put(key: string, data: Buffer | string, contentType?: string): Promise<void>;
  get(key: string): Promise<Buffer | null>;
  /** Существует ли объект под этим ключом (без скачивания тела). */
  exists(key: string): Promise<boolean>;
  /** Подписанная (или, для стаба, условная) ссылка на объект. */
  getSignedUrl(key: string, expiresInSec?: number): Promise<string>;
  delete(key: string): Promise<void>;
}

export interface MemoryObjectStorageOptions {
  /**
   * Каталог, куда стаб дополнительно сохраняет копии объектов для ручного просмотра при
   * разработке (см. docs/roadmap/31-конвенции-реализации.md §2). По умолчанию —
   * `<cwd>/_work/tmp/storage`. В unit-тестах передавайте путь внутри os.tmpdir(), чтобы не
   * писать за пределы файловой системы, разрешённой для теста.
   */
  baseDir?: string;
  /** Отключить запись на диск (используется в тестах, которым нельзя трогать FS вовсе). */
  persist?: boolean;
}

/** Тривиальный стаб ObjectStorage: хранит объекты в памяти процесса. */
export class MemoryObjectStorage implements ObjectStorage {
  private readonly store = new Map<string, { data: Buffer; contentType?: string }>();
  private readonly baseDir: string;
  private readonly persist: boolean;

  constructor(options: MemoryObjectStorageOptions = {}) {
    this.baseDir = options.baseDir ?? path.join(process.cwd(), '_work', 'tmp', 'storage');
    this.persist = options.persist ?? true;
  }

  async put(key: string, data: Buffer | string, contentType?: string): Promise<void> {
    const buf = typeof data === 'string' ? Buffer.from(data) : data;
    this.store.set(key, { data: buf, contentType });
    if (this.persist) {
      const filePath = path.join(this.baseDir, key);
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, buf);
    }
  }

  async get(key: string): Promise<Buffer | null> {
    return this.store.get(key)?.data ?? null;
  }

  async exists(key: string): Promise<boolean> {
    return this.store.has(key);
  }

  async getSignedUrl(key: string, expiresInSec = 3600): Promise<string> {
    return `memory://stub-storage/${encodeURIComponent(key)}?expires=${expiresInSec}`;
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }
}
