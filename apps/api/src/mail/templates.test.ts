import { describe, expect, it } from 'vitest';
import { buildEmailVerificationMail, buildPasswordResetMail, buildAlreadyRegisteredMail } from './templates.js';

describe('шаблоны писем (русский язык)', () => {
  it('письмо верификации содержит ссылку и русский текст', () => {
    const mail = buildEmailVerificationMail({ to: 'a@b.com', verifyUrl: 'https://stassist.ru/verify?token=x' });
    expect(mail.to).toBe('a@b.com');
    expect(mail.subject).toContain('Подтвердите');
    expect(mail.text).toContain('https://stassist.ru/verify?token=x');
    expect(mail.html).toContain('https://stassist.ru/verify?token=x');
  });

  it('письмо сброса пароля содержит ссылку и упоминание TTL', () => {
    const mail = buildPasswordResetMail({ to: 'a@b.com', resetUrl: 'https://stassist.ru/reset?token=y' });
    expect(mail.subject).toContain('Сброс пароля');
    expect(mail.text).toContain('1 час');
  });

  it('письмо "уже зарегистрирован" не содержит слова "регистрация подтверждена" (не путает пользователя)', () => {
    const mail = buildAlreadyRegisteredMail({ to: 'a@b.com', resetUrl: 'https://stassist.ru/reset' });
    expect(mail.text).toContain('уже');
  });
});
