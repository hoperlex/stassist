import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { MemoryObjectStorage } from './object-storage.js';

describe('MemoryObjectStorage', () => {
  it('хранит и отдаёт объект без записи на диск', async () => {
    const storage = new MemoryObjectStorage({ persist: false });
    await storage.put('reports/a.pdf', 'hello');
    expect((await storage.get('reports/a.pdf'))?.toString()).toBe('hello');
    expect(await storage.get('missing')).toBeNull();
  });

  it('удаляет объект', async () => {
    const storage = new MemoryObjectStorage({ persist: false });
    await storage.put('k', 'v');
    await storage.delete('k');
    expect(await storage.get('k')).toBeNull();
  });

  it('возвращает детерминированную по форме подписанную ссылку', async () => {
    const storage = new MemoryObjectStorage({ persist: false });
    const url = await storage.getSignedUrl('k', 60);
    expect(url).toMatch(/^memory:\/\/stub-storage\/k\?expires=60$/);
  });

  it('при persist=true пишет копию в baseDir внутри os.tmpdir()', async () => {
    const baseDir = path.join(os.tmpdir(), `stassist-test-${Date.now()}`);
    const storage = new MemoryObjectStorage({ baseDir, persist: true });
    await storage.put('a/b.txt', 'content');
    expect((await storage.get('a/b.txt'))?.toString()).toBe('content');
  });
});
