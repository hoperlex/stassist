import type { PageContextServer } from 'vike/types';
import { render } from 'vike/abort';
import { buildGoroskopPageData, type GoroskopPageData } from '../../../../lib/goroskop-page-data.js';

const YEAR_RE = /^\d{4}$/;

/** `/goroskop/{yyyy}/{znak}` — годовой западный гороскоп (doc 23 §2 «/goroskop/2027/{znak}»). */
export async function data(pageContext: PageContextServer): Promise<GoroskopPageData> {
  const { yyyy, znak } = pageContext.routeParams as { yyyy?: string; znak?: string };
  if (!yyyy || !znak || !YEAR_RE.test(yyyy)) throw render(404);
  return buildGoroskopPageData(znak, 'year', 'general', Number(yyyy));
}
