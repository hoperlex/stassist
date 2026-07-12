import type { PageContextServer } from 'vike/types';
import { render } from 'vike/abort';
import { resolvePeriodOrTopicSlug } from '@stassist/shared';
import { buildGoroskopPageData, type GoroskopPageData } from '../../../../lib/goroskop-page-data.js';

/** `/goroskop/{znak}/{periodOrTema}` — период ИЛИ тема (см. lib/goroskop-page-data.ts, doc 23 §2). */
export async function data(pageContext: PageContextServer): Promise<GoroskopPageData> {
  const { znak, slug } = pageContext.routeParams as { znak?: string; slug?: string };
  const resolved = resolvePeriodOrTopicSlug(slug ?? '');
  if (!znak || !resolved) throw render(404);
  return buildGoroskopPageData(znak, resolved.period, resolved.topic);
}
