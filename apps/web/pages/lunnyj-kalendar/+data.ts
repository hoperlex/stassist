import { loadConfig, type LunarCalendarMonthResponse } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../lib/seo.js';
import { serverApiGet } from '../../lib/server-api.js';

export interface LunnyjKalendarData {
  seo: PageSeo;
  currentYyyyMm: string;
  today: LunarCalendarMonthResponse['days'][number] | null;
  referenceLocation: LunarCalendarMonthResponse['referenceLocation'];
  computed: boolean;
}

function currentYyyyMm(): string {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
}

/**
 * `/lunnyj-kalendar` — виджет «сегодня» + ссылка на текущий месяц (см. docs/roadmap/prompts/
 * f3-калькуляторы-и-карта.md требование 2). Лунные дни геозависимы — предрасчёт worker'а
 * ключуется по ОПОРНОЙ локации (Москва), это явно показано в UI (findings f3.md
 * [internal-completeness] «не задана опорная локация»).
 */
export async function data(): Promise<LunnyjKalendarData> {
  const appUrl = loadConfig().appUrl;
  const yyyyMm = currentYyyyMm();
  const todayIso = new Date().toISOString().slice(0, 10);

  let month: LunarCalendarMonthResponse | null = null;
  try {
    month = await serverApiGet<LunarCalendarMonthResponse>(`/calc/lunar-calendar/${yyyyMm}`);
  } catch {
    month = null;
  }

  return {
    seo: {
      title: 'Лунный календарь сегодня — лунный день, фаза, void of course | Stassist',
      description:
        'Лунный календарь: лунный день, знак и фаза Луны, периоды void of course по московскому времени.',
      canonicalPath: '/lunnyj-kalendar',
      jsonLd: [breadcrumbJsonLd(appUrl, [{ name: 'Главная', path: '/' }, { name: 'Лунный календарь', path: '/lunnyj-kalendar' }])],
    },
    currentYyyyMm: yyyyMm,
    today: month?.days.find((d) => d.date === todayIso) ?? null,
    referenceLocation: month?.referenceLocation ?? { name: 'Москва', lat: 55.7558, lon: 37.6173, tzId: 'Europe/Moscow' },
    computed: Boolean(month?.computed),
  };
}
