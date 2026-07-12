/**
 * Перелинковка `/goroskop/{znak}[...]` — ЧИСТАЯ, клиент-безопасная функция (используется
 * `GoroskopPageView.tsx`, гидратируется в браузере). Импорт НАПРЯМУЮ из подмодулей
 * `@stassist/shared/schemas/*` (а НЕ баррель-индекс `@stassist/shared`) — баррель тянет
 * серверные порты/`node:crypto` в клиентский бандл (см. тот же приём в pages/natalnaya-karta/
 * +Page.tsx, pages/privacy-policy/+Page.tsx). `apps/web/lib/goroskop-page-data.ts` (серверный
 * загрузчик `+data.ts`) сознательно НЕ импортируется отсюда и не импортирует отсюда — иначе его
 * барrель-импорты (`loadConfig`, `render`, серверный fetch) тоже попали бы в клиентский граф.
 */
import {
  HOROSCOPE_PERIOD_NAME_RU,
  HOROSCOPE_PERIOD_SLUGS_RU,
  HOROSCOPE_TOPIC_NAME_RU,
  HOROSCOPE_TOPIC_SLUGS_RU,
  type HoroscopePeriod,
  type HoroscopeTopic,
} from '@stassist/shared/schemas/horoscope.js';

export function zodiacHoroscopePath(znakRu: string, period: HoroscopePeriod, topic: HoroscopeTopic): string {
  if (period === 'day' && topic === 'general') return `/goroskop/${znakRu}`;
  if (topic === 'general') return `/goroskop/${znakRu}/${HOROSCOPE_PERIOD_SLUGS_RU[period as Exclude<HoroscopePeriod, 'day'>]}`;
  if (period === 'day') return `/goroskop/${znakRu}/${HOROSCOPE_TOPIC_SLUGS_RU[topic as Exclude<HoroscopeTopic, 'general'>]}`;
  return `/goroskop/${znakRu}/${HOROSCOPE_PERIOD_SLUGS_RU[period as Exclude<HoroscopePeriod, 'day'>]}/${HOROSCOPE_TOPIC_SLUGS_RU[topic as Exclude<HoroscopeTopic, 'general'>]}`;
}

export interface GoroskopNavLink {
  period: HoroscopePeriod;
  topic: HoroscopeTopic;
  label: string;
  path: string;
}

export function goroskopNavLinks(znakRuSlug: string): GoroskopNavLink[] {
  const periods: HoroscopePeriod[] = ['day', 'tomorrow', 'week', 'month', 'year'];
  const topics: HoroscopeTopic[] = ['general', 'love', 'money', 'career', 'health'];
  const links: GoroskopNavLink[] = [];
  for (const period of periods) {
    links.push({ period, topic: 'general', label: HOROSCOPE_PERIOD_NAME_RU[period], path: zodiacHoroscopePath(znakRuSlug, period, 'general') });
  }
  for (const topic of topics) {
    if (topic === 'general') continue;
    links.push({ period: 'day', topic, label: HOROSCOPE_TOPIC_NAME_RU[topic], path: zodiacHoroscopePath(znakRuSlug, 'day', topic) });
  }
  return links;
}
