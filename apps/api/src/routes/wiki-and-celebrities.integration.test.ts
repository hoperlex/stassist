/**
 * Ф7 M7 — «Верификация» промта: «поиск находит «Венера в Скорпионе»»; галерея знаменитостей
 * читает засеянный набор (celebrities, verified:false). Требует DATABASE_URL — авто-skip.
 * Предпосылка: `pnpm data:wiki && pnpm data:celebrities && pnpm db:seed` применены.
 */
import { describe, expect, it, afterAll } from 'vitest';
import { buildApp } from '../app.js';
import { closeDb } from '../db.js';
import { buildTestConfig } from '../test-helpers/integration.js';

describe.skipIf(!process.env.DATABASE_URL)('вики-поиск + галерея знаменитостей (integration)', () => {
  afterAll(async () => {
    await closeDb();
  });

  it('поиск «Венера в Скорпионе» находит статью «Венера» (pg_trgm)', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/wiki-articles?q=' + encodeURIComponent('Венера в Скорпионе') });
    expect(res.statusCode).toBe(200);
    const body = res.json() as { items: Array<{ slug: string; section: string }> };
    expect(body.items.some((a) => a.slug === 'venus' && a.section === 'planets')).toBe(true);
    await app.close();
  });

  it('раздел planets отдаёт непустой список из 14 статей (обязательный минимум MVP)', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/wiki-articles?section=planets&limit=50' });
    const body = res.json() as { items: unknown[] };
    expect(body.items.length).toBe(14);
    await app.close();
  });

  it('GET /wiki-articles/mars — статья непуста (bodyMd), есть в разделе planets', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/wiki-articles/mars' });
    expect(res.statusCode).toBe(200);
    const body = res.json() as { bodyMd: string | null; section: string };
    expect(body.section).toBe('planets');
    expect(body.bodyMd?.length ?? 0).toBeGreaterThan(20);
    await app.close();
  });

  it('галерея: список знаменитостей непуст, у каждой verified=false (требует проверки заказчиком)', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/celebrities?limit=50' });
    const body = res.json() as { items: Array<{ birthData: { verified: boolean } | null }> };
    expect(body.items.length).toBeGreaterThanOrEqual(20);
    for (const c of body.items) expect(c.birthData?.verified).toBe(false);
    await app.close();
  });

  it('честный empty-state: карточка без координат → hasEnoughDataToCompute=false (не выдумывает данные)', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    const res = await app.inject({ method: 'GET', url: '/api/v1/celebrities/albert-eynshteyn' });
    const body = res.json() as { hasEnoughDataToCompute: boolean };
    expect(body.hasEnoughDataToCompute).toBe(false);
    await app.close();
  });

  it('редактор может править статью (PATCH), версия увеличивается, создаётся ревизия', async () => {
    const app = await buildApp({ config: buildTestConfig() });
    // Регистрируем пользователя и назначаем роль editor напрямую (нет публичного API для этого).
    const email = `editor-${Date.now()}@example.com`;
    await app.inject({ method: 'POST', url: '/api/v1/auth/register', payload: { email, password: 'correct-horse-3' } });
    const { Pool } = await import('pg');
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    await pool.query("UPDATE users SET role = 'editor' WHERE email = $1", [email]);
    const loginRes = await app.inject({ method: 'POST', url: '/api/v1/auth/login', payload: { email, password: 'correct-horse-3' } });
    const { accessToken } = loginRes.json() as { accessToken: string };

    const before = await app.inject({ method: 'GET', url: '/api/v1/wiki-articles/mars' });
    const beforeVersion = (before.json() as { version: number }).version;

    const patchRes = await app.inject({
      method: 'PATCH',
      url: '/api/v1/wiki-articles/mars',
      headers: { authorization: `Bearer ${accessToken}` },
      payload: { status: 'reviewed' },
    });
    expect(patchRes.statusCode).toBe(200);
    const patched = patchRes.json() as { version: number; status: string; editorId: string };
    expect(patched.version).toBe(beforeVersion + 1);
    expect(patched.status).toBe('reviewed');

    const revisionsRes = await app.inject({ method: 'GET', url: '/api/v1/wiki-articles/mars/revisions', headers: { authorization: `Bearer ${accessToken}` } });
    const revisions = (revisionsRes.json() as { items: Array<{ version: number }> }).items;
    expect(revisions.some((r) => r.version === beforeVersion)).toBe(true);

    await pool.end();
    await app.close();
  });
});
