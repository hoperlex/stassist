/**
 * Заголовки/описания/пути для страниц гороскопов (см. docs/architecture/23-seo-стратегия.md §3:
 * «уникальный H1/title/description по шаблонам с вариациями»). Сервер-только (используется
 * `apps/web/lib/goroskop-page-data.ts`, `+data.ts`) — `zodiacHoroscopePath` переиспользуется из
 * `goroskop-nav-links.ts` (клиент-безопасный модуль, см. его doc-комментарий про баррель
 * `@stassist/shared` и `node:crypto` в клиентском бандле), а не дублируется здесь.
 */
import { HOROSCOPE_PERIOD_NAME_RU, HOROSCOPE_TOPIC_NAME_RU, type HoroscopePeriod, type HoroscopeTopic } from '@stassist/shared/schemas/horoscope.js';
import type { ZodiacSignInfo } from '@stassist/shared/schemas/zodiac.js';
import { zodiacHoroscopePath } from './goroskop-nav-links.js';

export { zodiacHoroscopePath };

export function zodiacHoroscopeTitle(sign: ZodiacSignInfo, period: HoroscopePeriod, topic: HoroscopeTopic): string {
  const periodWord = HOROSCOPE_PERIOD_NAME_RU[period];
  const topicWord = HOROSCOPE_TOPIC_NAME_RU[topic];
  return `Гороскоп для ${sign.nameRuGenitive} ${periodWord} — ${topicWord} гороскоп | Зодиакум`;
}

export function zodiacHoroscopeH1(sign: ZodiacSignInfo, period: HoroscopePeriod, topic: HoroscopeTopic): string {
  const periodWord = HOROSCOPE_PERIOD_NAME_RU[period];
  const topicPrefix = topic === 'general' ? '' : `${HOROSCOPE_TOPIC_NAME_RU[topic]} `;
  return `${topicPrefix}Гороскоп для ${sign.nameRuGenitive} ${periodWord}`;
}

export function zodiacHoroscopeDescription(sign: ZodiacSignInfo, period: HoroscopePeriod, topic: HoroscopeTopic): string {
  const periodWord = HOROSCOPE_PERIOD_NAME_RU[period];
  const topicWord = HOROSCOPE_TOPIC_NAME_RU[topic];
  return `${topicWord} гороскоп для ${sign.nameRu} ${periodWord}: астрологический прогноз на основе реальных положений планет.`;
}
