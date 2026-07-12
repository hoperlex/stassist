/**
 * Порт почтового отправителя. Реальная реализация — SMTP (поздние фазы); стаб — ConsoleMailer,
 * пишет письмо в лог и (опционально) в `_work/tmp/mail` для ручного просмотра (§2 конвенций).
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import nodemailer, { type Transporter } from 'nodemailer';

export interface MailMessage {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export interface Mailer {
  send(message: MailMessage): Promise<void>;
}

export interface ConsoleMailerOptions {
  baseDir?: string;
  persist?: boolean;
  log?: (message: string) => void;
}

export class ConsoleMailer implements Mailer {
  private readonly baseDir: string;
  private readonly persist: boolean;
  private readonly log: (message: string) => void;

  constructor(options: ConsoleMailerOptions = {}) {
    this.baseDir = options.baseDir ?? path.join(process.cwd(), '_work', 'tmp', 'mail');
    this.persist = options.persist ?? true;
    this.log = options.log ?? ((message: string) => console.log(message));
  }

  async send(message: MailMessage): Promise<void> {
    this.log(`[stub-mailer] → ${message.to}: ${message.subject}`);
    if (!this.persist) return;
    const fileName = `${Date.now()}-${message.to.replace(/[^a-z0-9@.]/gi, '_')}.json`;
    const filePath = path.join(this.baseDir, fileName);
    await mkdir(this.baseDir, { recursive: true });
    await writeFile(filePath, JSON.stringify(message, null, 2), 'utf8');
  }
}

export interface SmtpMailerOptions {
  host: string;
  port: number;
  from: string;
  user?: string;
  pass?: string;
}

/**
 * Реальный адаптер: SMTP через nodemailer. НЕ используется в этой фазе с живым сервером —
 * инстанцируется только при `MAILER=smtp` (см. ports/factory.ts) и не поднимается в
 * unit/build-гейте (§1 конвенций: инфра-зависимая проверка — это integration/e2e, требует
 * реального SMTP, например MailHog в docker-compose).
 */
export class SmtpMailer implements Mailer {
  private readonly transporter: Transporter;
  private readonly from: string;

  constructor(options: SmtpMailerOptions) {
    this.from = options.from;
    this.transporter = nodemailer.createTransport({
      host: options.host,
      port: options.port,
      // 465 — implicit TLS; остальные порты (587/25/MailHog 1025) — STARTTLS/plain.
      secure: options.port === 465,
      auth: options.user && options.pass ? { user: options.user, pass: options.pass } : undefined,
    });
  }

  async send(message: MailMessage): Promise<void> {
    await this.transporter.sendMail({
      from: this.from,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });
  }
}
