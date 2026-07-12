import { render } from 'vike/abort';
import type { PageContextServer } from 'vike/types';
import { loadConfig, type LunarCalendarMonthResponse } from '@stassist/shared';
import { breadcrumbJsonLd, type PageSeo } from '../../../lib/seo.js';
import { serverApiGet } from '../../../lib/server-api.js';

export interface LunnyjKalendarMonthData {
  seo: PageSeo;
  yyyyMm: string;
  days: LunarCalendarMonthResponse['days'];
  referenceLocation: LunarCalendarMonthResponse['referenceLocation'];
  computed: boolean;
  prevYyyyMm: string;
  nextYyyyMm: string;
}

const MONTH_RE = /^(\d{4})-(\d{2})$/;
const MONTH_NAMES_RU = [
  'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
  'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь',
];

function shiftMonth(yyyyMm: string, delta: number): string {
  const [y, m] = yyyyMm.split('-').map(Number) as [number, number];
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

export async function data(pageContext: PageContextServer): Promise<LunnyjKalendarMonthData> {
  const yyyyMm = pageContext.routeParams.month ?? '';
  if (!MONTH_RE.test(yyyyMm)) {
    throw render(404);
  }

  let month: LunarCalendarMonthResponse | null = null;
  try {
    month = await serverApiGet<LunarCalendarMonthResponse>(`/calc/lunar-calendar/${yyyyMm}`);
  } catch {
    month = null;
  }

  const appUrl = loadConfig().appUrl;
  const [, y, m] = MONTH_RE.exec(yyyyMm)!;
  const monthName = MONTH_NAMES_RU[Number(m) - 1];

  return {
    seo: {
      title: `Лунный календарь на ${monthName} ${y} — лунные дни по месяцу | Stassist`,
      description: `Лунный календарь на ${monthName} ${y}: лунные дни, знак и фаза Луны на каждый день месяца.`,
      canonicalPath: `/lunnyj-kalendar/${yyyyMm}`,
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Лунный календарь', path: '/lunnyj-kalendar' },
          { name: `${monthName} ${y}`, path: `/lunnyj-kalendar/${yyyyMm}` },
        ]),
      ],
    },
    yyyyMm,
    days: month?.days ?? [],
    referenceLocation: month?.referenceLocation ?? { name: 'Москва', lat: 55.7558, lon: 37.6173, tzId: 'Europe/Moscow' },
    computed: Boolean(month?.computed),
    prevYyyyMm: shiftMonth(yyyyMm, -1),
    nextYyyyMm: shiftMonth(yyyyMm, 1),
  };
}
