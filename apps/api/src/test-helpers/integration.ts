/**
 * Общие утилиты для integration-тестов Ф2 (auth/birth-profiles/account). НЕ *.test.ts —
 * не подхватывается ни `test:unit`, ни `test:integration` конфигом vitest сама по себе.
 *
 * Требует реальный Postgres с уже применёнными миграциями (`pnpm db:migrate`) — см.
 * _report/build/f2-отчёт.md, раздел «требует ручного шага».
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { parseConfig, type Config } from '@stassist/shared';

export function buildTestConfig(overrides: Partial<NodeJS.ProcessEnv> = {}): Config {
  return parseConfig({
    ...process.env,
    NODE_ENV: 'test',
    COOKIE_SECRET: 'x'.repeat(32),
    MAILER: 'stub',
    GEOCODER: 'stub',
    ...overrides,
  } as NodeJS.ProcessEnv);
}

export function randomTestEmail(): string {
  return `test-${randomUUID()}@example.com`;
}

const MAIL_DIR = path.join(process.cwd(), '_work', 'tmp', 'mail');

/**
 * ConsoleMailer (стаб-Mailer по умолчанию) пишет каждое письмо JSON-файлом в `_work/tmp/mail`
 * (см. packages/shared/src/ports/mailer.ts). Интеграционный тест не может расшифровать hash
 * токена из БД (это и есть цель одноразовых токенов) — вместо этого читает последний файл,
 * адресованный нужному e-mail, и вытаскивает `token=...` из ссылки в теле письма.
 */
export async function readLastMailTokenFor(email: string): Promise<string> {
  const files = (await readdir(MAIL_DIR)).filter((f) => f.includes(encodeSafe(email)) || f.includes(email));
  if (files.length === 0) {
    throw new Error(`Не найдено писем для ${email} в ${MAIL_DIR} — проверьте, что MAILER=stub`);
  }
  const latest = files.sort().at(-1)!;
  const raw = await readFile(path.join(MAIL_DIR, latest), 'utf8');
  const mail = JSON.parse(raw) as { text?: string };
  const match = /token=([^&\s"]+)/.exec(mail.text ?? '');
  if (!match) throw new Error(`Не нашёл token= в письме ${latest}`);
  return decodeURIComponent(match[1]!);
}

function encodeSafe(email: string): string {
  return email.replace(/[^a-z0-9@.]/gi, '_');
}
