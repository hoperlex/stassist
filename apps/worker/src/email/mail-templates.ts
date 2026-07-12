/**
 * E-mail-цепочки (req.8 промта Ф8) — русские тексты, каждое письмо заканчивается ссылкой отписки
 * в один клик (`/email-optouts`, см. apps/web/pages/email-optouts) — юридическое требование
 * прозрачности рассылок, тот же принцип, что «отмена подписки в один клик» (req.2).
 */
import type { MailMessage } from '@stassist/shared';

function optoutFooter(appUrl: string, email: string, scope: 'digest' | 'marketing'): { text: string; html: string } {
  const url = `${appUrl}/email-optouts?email=${encodeURIComponent(email)}&scope=${scope}`;
  return {
    text: `\n\nНе хотите получать такие письма? Отписаться в один клик: ${url}`,
    html: `<p style="color:#888;font-size:12px">Не хотите получать такие письма? <a href="${url}">Отписаться в один клик</a>.</p>`,
  };
}

export function buildAbandonedCalcMail(params: { to: string; appUrl: string; profileLabel: string }): MailMessage {
  const footer = optoutFooter(params.appUrl, params.to, 'digest');
  return {
    to: params.to,
    subject: 'Ваша натальная карта уже посчитана — загляните в разбор',
    text:
      `Здравствуйте!\n\nВы недавно рассчитали натальную карту профиля «${params.profileLabel}» на Зодиакум, ` +
      `но ещё не заглянули в подробный разбор. Полная картина — планеты, дома, аспекты и что они значат — ` +
      `уже ждёт вас в личном кабинете: ${params.appUrl}/app` +
      footer.text,
    html:
      `<p>Здравствуйте!</p><p>Вы недавно рассчитали натальную карту профиля «${params.profileLabel}» на Зодиакум, ` +
      `но ещё не заглянули в подробный разбор. Полная картина — планеты, дома, аспекты и что они значат — ` +
      `уже ждёт вас в <a href="${params.appUrl}/app">личном кабинете</a>.</p>` +
      footer.html,
  };
}

export function buildTrialEndingMail(params: { to: string; appUrl: string; currentPeriodEndRu: string }): MailMessage {
  const footer = optoutFooter(params.appUrl, params.to, 'digest');
  return {
    to: params.to,
    subject: 'Пробный период Премиум заканчивается через 2 дня',
    text:
      `Здравствуйте!\n\nВаш бесплатный пробный период подписки «Премиум» заканчивается ${params.currentPeriodEndRu}. ` +
      `Дальше подписка продлится автоматически по тарифу — отменить можно в один клик в любой момент в личном ` +
      `кабинете: ${params.appUrl}/app/podpiska` +
      footer.text,
    html:
      `<p>Здравствуйте!</p><p>Ваш бесплатный пробный период подписки «Премиум» заканчивается ${params.currentPeriodEndRu}. ` +
      `Дальше подписка продлится автоматически по тарифу — отменить можно в один клик в любой момент в ` +
      `<a href="${params.appUrl}/app/podpiska">личном кабинете</a>.</p>` +
      footer.html,
  };
}

export function buildWeeklyDigestMail(params: { to: string; appUrl: string }): MailMessage {
  const footer = optoutFooter(params.appUrl, params.to, 'digest');
  return {
    to: params.to,
    subject: 'Ваша астронеделя — дайджест Зодиакум',
    text:
      `Здравствуйте!\n\nВаш персональный прогноз на неделю и главные транзиты уже готовы — загляните в личный ` +
      `кабинет: ${params.appUrl}/app` +
      footer.text,
    html:
      `<p>Здравствуйте!</p><p>Ваш персональный прогноз на неделю и главные транзиты уже готовы — загляните в ` +
      `<a href="${params.appUrl}/app">личный кабинет</a>.</p>` +
      footer.html,
  };
}
