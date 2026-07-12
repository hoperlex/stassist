import { describe, expect, it } from 'vitest';
import { ConsoleMailer, SmtpMailer } from './mailer.js';

describe('ConsoleMailer', () => {
  it('логирует письмо и не бросает без persist', async () => {
    const lines: string[] = [];
    const mailer = new ConsoleMailer({ persist: false, log: (m) => lines.push(m) });
    await mailer.send({ to: 'user@example.com', subject: 'Привет' });
    expect(lines[0]).toContain('user@example.com');
    expect(lines[0]).toContain('Привет');
  });
});

describe('SmtpMailer', () => {
  // nodemailer.createTransport() НЕ открывает сетевое соединение синхронно (соединение — только
  // при send()) — конструктор безопасен для unit-теста (без сети, см. §1 конвенций реализации).
  it('конструируется без сети и реализует интерфейс Mailer', () => {
    const mailer = new SmtpMailer({ host: 'localhost', port: 1025, from: 'noreply@stassist.ru' });
    expect(typeof mailer.send).toBe('function');
  });
});
