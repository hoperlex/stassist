/**
 * /api/v1/account — экспорт (JSON, расшифрованные данные) и удаление аккаунта (жёсткое стирание
 * ПД, вход становится невозможен, аудит-запись создана). Требует DATABASE_URL — авто-skip.
 */
import { describe, expect, it, afterAll } from 'vitest';
import { Pool } from 'pg';
import { buildApp } from '../app.js';
import { closeDb } from '../db.js';
import { buildTestConfig, randomTestEmail } from '../test-helpers/integration.js';

describe.skipIf(!process.env.DATABASE_URL)('account: экспорт и удаление (152-ФЗ, integration)', () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  afterAll(async () => {
    await pool.end();
    await closeDb();
  });

  it('экспорт возвращает расшифрованные данные пользователя', async () => {
    const config = buildTestConfig();
    const app = await buildApp({ config });
    const email = randomTestEmail();
    const password = 'correct-horse-4';
    await app.inject({ method: 'POST', url: '/api/v1/auth/register', payload: { email, password } });
    const loginRes = await app.inject({ method: 'POST', url: '/api/v1/auth/login', payload: { email, password } });
    const { accessToken } = loginRes.json() as { accessToken: string };

    const exportRes = await app.inject({
      method: 'GET',
      url: '/api/v1/account/export',
      headers: { authorization: `Bearer ${accessToken}` },
    });
    expect(exportRes.statusCode).toBe(200);
    const body = exportRes.json() as { user: { email: string } };
    expect(body.user.email).toBe(email);
    await app.close();
  });

  it('удаление: ПД стёрты, вход невозможен, аудит-запись создана', async () => {
    const config = buildTestConfig();
    const app = await buildApp({ config });
    const email = randomTestEmail();
    const password = 'correct-horse-5';
    await app.inject({ method: 'POST', url: '/api/v1/auth/register', payload: { email, password } });
    const loginRes = await app.inject({ method: 'POST', url: '/api/v1/auth/login', payload: { email, password } });
    const { accessToken, user } = loginRes.json() as { accessToken: string; user: { id: string } };

    const deleteRes = await app.inject({
      method: 'DELETE',
      url: '/api/v1/account',
      headers: { authorization: `Bearer ${accessToken}` },
      payload: { password },
    });
    expect(deleteRes.statusCode).toBe(200);

    // Вход по старому e-mail невозможен — он анонимизирован.
    const loginAfter = await app.inject({ method: 'POST', url: '/api/v1/auth/login', payload: { email, password } });
    expect(loginAfter.statusCode).toBe(401);

    // ПД в БД стёрты (не просто помечены).
    const { rows } = await pool.query('SELECT email, status, display_name FROM users WHERE id = $1', [user.id]);
    expect(rows[0].email).not.toBe(email);
    expect(rows[0].status).toBe('deleted');
    expect(rows[0].display_name).toBeNull();

    // Аудит-запись создана.
    const audit = await pool.query(
      "SELECT * FROM audit_log WHERE actor_id = $1 AND action = 'user.account_deleted'",
      [user.id],
    );
    expect(audit.rowCount).toBeGreaterThan(0);

    await app.close();
  });
});
