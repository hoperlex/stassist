import { describe, expect, it } from 'vitest';
import { ConsoleMailer } from './mailer.js';

describe('ConsoleMailer', () => {
  it('логирует письмо и не бросает без persist', async () => {
    const lines: string[] = [];
    const mailer = new ConsoleMailer({ persist: false, log: (m) => lines.push(m) });
    await mailer.send({ to: 'user@example.com', subject: 'Привет' });
    expect(lines[0]).toContain('user@example.com');
    expect(lines[0]).toContain('Привет');
  });
});
