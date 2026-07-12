import type { PageContextServer } from 'vike/types';
import { render } from 'vike/abort';
import { isValidLunarDayNumber, loadConfig } from '@stassist/shared';
import { articleJsonLd, breadcrumbJsonLd, type PageSeo } from '../../../lib/seo.js';
import { fetchLunarDayHoroscope } from '../../../lib/horoscope-content.js';

export interface LunnyjDenData {
  seo: PageSeo;
  n: number;
  bodyMd: string | null;
  computed: boolean;
}

/** `/lunnyj-den/{n}` — общее (evergreen) значение лунного дня 1..30 (requirement 3 промта Ф5:
 *  «лунные `/lunnyj-den/{n}`»; НЕ путать с `/lunnyj-kalendar/{yyyy-mm}` Ф3 — тот про конкретные
 *  даты месяца, этот про АРХЕТИП дня номер N безотносительно даты). */
export async function data(pageContext: PageContextServer): Promise<LunnyjDenData> {
  const raw = pageContext.routeParams.n ?? '';
  const n = Number(raw);
  if (!isValidLunarDayNumber(n)) throw render(404);

  const appUrl = loadConfig().appUrl;
  const result = await fetchLunarDayHoroscope(n);
  const title = `${n}-й лунный день — значение и характеристика | Stassist`;
  const description = `Что означает ${n}-й лунный день: общая характеристика, на что обратить внимание, рекомендации.`;
  const path = `/lunnyj-den/${n}`;
  const computed = result?.computed ?? false;

  return {
    seo: {
      title,
      description,
      canonicalPath: path,
      noindex: !computed, // см. doc-комментарий apps/web/lib/seo.ts PageSeo.noindex
      jsonLd: [
        breadcrumbJsonLd(appUrl, [
          { name: 'Главная', path: '/' },
          { name: 'Лунный календарь', path: '/lunnyj-kalendar' },
          { name: `${n}-й лунный день`, path },
        ]),
        articleJsonLd(appUrl, { headline: title, description, path, datePublished: result?.publishedAt ?? null }),
      ],
    },
    n,
    bodyMd: result?.bodyMd ?? null,
    computed,
  };
}
