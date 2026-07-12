/**
 * Юнит-тест S3ObjectStorage — БЕЗ реальной сети:
 *  - put/get/exists/delete проверяются через мок `S3Client.send` (см. options.client в
 *    конструкторе) — сверяем, что уходит правильная команда (тип + Bucket/Key/...);
 *  - getSignedUrl проверяется на РЕАЛЬНОМ (но ни к чему не подключающемся) `S3Client` — presign
 *    в AWS SDK v3 — чистая локальная SigV4-подпись, HTTP-запрос не отправляется, поэтому сеть не
 *    нужна даже без мока.
 */
import { describe, expect, it, vi } from 'vitest';
import {
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { S3ObjectStorage } from './s3-object-storage.js';

const baseOptions = {
  endpoint: 'https://s3.cloud.ru',
  region: 'ru-central1',
  bucket: 'stassist-test',
  accessKeyId: 'AKIA_TEST_ID',
  secretAccessKey: 'test_secret_access_key',
};

describe('S3ObjectStorage — put/get/exists/delete (мок S3Client.send, без сети)', () => {
  it('put() отправляет PutObjectCommand с Bucket/Key/ContentType и Buffer-телом', async () => {
    const send = vi.fn().mockResolvedValue({});
    const storage = new S3ObjectStorage({ ...baseOptions, client: { send } });

    await storage.put('reports/a.pdf', Buffer.from('hello'), 'application/pdf');

    expect(send).toHaveBeenCalledTimes(1);
    const command = send.mock.calls[0]?.[0] as PutObjectCommand;
    expect(command).toBeInstanceOf(PutObjectCommand);
    expect(command.input).toMatchObject({
      Bucket: 'stassist-test',
      Key: 'reports/a.pdf',
      ContentType: 'application/pdf',
    });
    expect(Buffer.isBuffer(command.input.Body)).toBe(true);
  });

  it('put() принимает строку и конвертирует её в Buffer', async () => {
    const send = vi.fn().mockResolvedValue({});
    const storage = new S3ObjectStorage({ ...baseOptions, client: { send } });

    await storage.put('k.txt', 'hello');

    const command = send.mock.calls[0]?.[0] as PutObjectCommand;
    expect(Buffer.from(command.input.Body as Buffer).toString('utf8')).toBe('hello');
  });

  it('get() возвращает Buffer с содержимым объекта', async () => {
    const body = { transformToByteArray: async () => new TextEncoder().encode('content') };
    const send = vi.fn().mockResolvedValue({ Body: body });
    const storage = new S3ObjectStorage({ ...baseOptions, client: { send } });

    const result = await storage.get('k');

    expect(result?.toString('utf8')).toBe('content');
    const command = send.mock.calls[0]?.[0] as GetObjectCommand;
    expect(command).toBeInstanceOf(GetObjectCommand);
    expect(command.input).toMatchObject({ Bucket: 'stassist-test', Key: 'k' });
  });

  it('get() возвращает null, когда объект не найден (NoSuchKey/404)', async () => {
    const err = Object.assign(new Error('not found'), {
      name: 'NoSuchKey',
      $metadata: { httpStatusCode: 404 },
    });
    const send = vi.fn().mockRejectedValue(err);
    const storage = new S3ObjectStorage({ ...baseOptions, client: { send } });

    expect(await storage.get('missing')).toBeNull();
  });

  it('get() пробрасывает прочие ошибки (не 404)', async () => {
    const send = vi.fn().mockRejectedValue(new Error('boom'));
    const storage = new S3ObjectStorage({ ...baseOptions, client: { send } });

    await expect(storage.get('k')).rejects.toThrow('boom');
  });

  it('exists() true при успешном HeadObjectCommand', async () => {
    const send = vi.fn().mockResolvedValue({});
    const storage = new S3ObjectStorage({ ...baseOptions, client: { send } });

    expect(await storage.exists('k')).toBe(true);
    const command = send.mock.calls[0]?.[0] as HeadObjectCommand;
    expect(command).toBeInstanceOf(HeadObjectCommand);
    expect(command.input).toMatchObject({ Bucket: 'stassist-test', Key: 'k' });
  });

  it('exists() false, когда объект не найден (NotFound/404)', async () => {
    const err = Object.assign(new Error('nf'), {
      name: 'NotFound',
      $metadata: { httpStatusCode: 404 },
    });
    const send = vi.fn().mockRejectedValue(err);
    const storage = new S3ObjectStorage({ ...baseOptions, client: { send } });

    expect(await storage.exists('k')).toBe(false);
  });

  it('delete() отправляет DeleteObjectCommand с правильными Bucket/Key', async () => {
    const send = vi.fn().mockResolvedValue({});
    const storage = new S3ObjectStorage({ ...baseOptions, client: { send } });

    await storage.delete('k');

    const command = send.mock.calls[0]?.[0] as DeleteObjectCommand;
    expect(command).toBeInstanceOf(DeleteObjectCommand);
    expect(command.input).toMatchObject({ Bucket: 'stassist-test', Key: 'k' });
  });
});

describe('S3ObjectStorage — getSignedUrl (presign — чистая SigV4-подпись, без сети)', () => {
  it('строит path-style URL (не virtual-hosted) с TTL по умолчанию 3600с', async () => {
    const storage = new S3ObjectStorage(baseOptions);

    const url = await storage.getSignedUrl('reports/a.pdf');
    const parsed = new URL(url);

    expect(parsed.origin).toBe('https://s3.cloud.ru');
    // path-style: /<bucket>/<key> — НЕ virtual-hosted <bucket>.<endpoint>/<key> (обязательно для
    // не-AWS S3, см. doc-комментарий s3-object-storage.ts).
    expect(parsed.pathname).toBe('/stassist-test/reports/a.pdf');
    expect(parsed.searchParams.get('X-Amz-Expires')).toBe('3600');
    expect(parsed.searchParams.has('X-Amz-Signature')).toBe(true);
    expect(parsed.searchParams.has('X-Amz-Credential')).toBe(true);
  });

  it('уважает переданный TTL', async () => {
    const storage = new S3ObjectStorage(baseOptions);

    const url = await storage.getSignedUrl('k', 120);

    expect(new URL(url).searchParams.get('X-Amz-Expires')).toBe('120');
  });
});
