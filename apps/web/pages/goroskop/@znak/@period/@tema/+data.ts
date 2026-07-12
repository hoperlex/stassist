import type { PageContextServer } from 'vike/types';
import { render } from 'vike/abort';
import { HOROSCOPE_PERIOD_SLUG_TO_PERIOD, HOROSCOPE_TOPIC_SLUG_TO_TOPIC } from '@stassist/shared';
import { buildGoroskopPageData, type GoroskopPageData } from '../../../../../lib/goroskop-page-data.js';

/** `/goroskop/{znak}/{period}/{tema}` — полное произведение (16 оставшихся комбинаций, см.
 *  lib/goroskop-page-data.ts doc-комментарий и packages/shared/src/schemas/horoscope.ts). */
export async function data(pageContext: PageContextServer): Promise<GoroskopPageData> {
  const { znak, period: periodSlug, tema: topicSlug } = pageContext.routeParams as { znak?: string; period?: string; tema?: string };
  const period = periodSlug ? HOROSCOPE_PERIOD_SLUG_TO_PERIOD[periodSlug] : undefined;
  const topic = topicSlug ? HOROSCOPE_TOPIC_SLUG_TO_TOPIC[topicSlug] : undefined;
  if (!znak || !period || !topic) throw render(404);
  return buildGoroskopPageData(znak, period, topic);
}
