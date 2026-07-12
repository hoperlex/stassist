/**
 * Порт почтового отправителя. Реальная реализация — SMTP (поздние фазы); стаб — ConsoleMailer,
 * пишет письмо в лог и (опционально) в `_work/tmp/mail` для ручного просмотра (§2 конвенций).
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

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
