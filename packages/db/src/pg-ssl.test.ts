import { describe, expect, it } from 'vitest';
import { needsExplicitSsl, resolvePgSsl, resolvePgPoolConfig } from './pg-ssl.js';

describe('needsExplicitSsl (локальный Postgres без SSL / Supabase с обязательным SSL)', () => {
  it('false для localhost без sslmode (обычный docker-compose)', () => {
    expect(needsExplicitSsl('postgres://stassist:stassist@localhost:5432/stassist')).toBe(false);
  });

  it('false для 127.0.0.1 без sslmode', () => {
    expect(needsExplicitSsl('postgres://u:p@127.0.0.1:5432/db')).toBe(false);
  });

  it('true для удалённого хоста (Supabase) без sslmode в строке', () => {
    expect(
      needsExplicitSsl('postgres://postgres.abcdefgh:pw@aws-0-eu-central-1.pooler.supabase.com:5432/postgres'),
    ).toBe(true);
  });

  it('false, если строка УЖЕ содержит sslmode — не трогаем (pg сам разберёт)', () => {
    expect(needsExplicitSsl('postgres://u:p@db.example.supabase.co:5432/postgres?sslmode=no-verify')).toBe(
      false,
    );
    expect(needsExplicitSsl('postgres://u:p@db.example.supabase.co:5432/postgres?sslmode=require')).toBe(false);
  });

  it('false для нераспознаваемой строки (не бросает)', () => {
    expect(needsExplicitSsl('не-dsn-строка')).toBe(false);
  });
});

describe('resolvePgSsl / resolvePgPoolConfig', () => {
  it('resolvePgSsl для localhost — undefined (ssl не форсируется)', () => {
    expect(resolvePgSsl('postgres://u:p@localhost:5432/db')).toBeUndefined();
  });

  it('resolvePgSsl для удалённого хоста без sslmode — rejectUnauthorized:false', () => {
    expect(resolvePgSsl('postgres://u:p@db.supabase.co:5432/postgres')).toEqual({
      rejectUnauthorized: false,
    });
  });

  it('resolvePgPoolConfig прокидывает connectionString и не добавляет ssl для localhost', () => {
    const cs = 'postgres://u:p@localhost:5432/db';
    expect(resolvePgPoolConfig(cs)).toEqual({ connectionString: cs });
  });

  it('resolvePgPoolConfig добавляет ssl для удалённого хоста', () => {
    const cs = 'postgres://u:p@db.supabase.co:5432/postgres';
    expect(resolvePgPoolConfig(cs)).toEqual({
      connectionString: cs,
      ssl: { rejectUnauthorized: false },
    });
  });
});
