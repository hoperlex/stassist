/**
 * SSR-данные архивной страницы «Неба дня» `/nebo-dnya/{YYYY-MM-DD}` (Ф9). Несуществующий день —
 * 404 (в отличие от корня раздела: у архива нет причины существовать без данных).
 */
import { render } from 'vike/abort';
import type { PageContextServer } from 'vike/types';
import { loadSkyDayData, type NeboDnyaData } from '../+data.js';

export async function data(pageContext: PageContextServer): Promise<NeboDnyaData> {
  const dayKey = pageContext.routeParams.dayKey ?? '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dayKey)) throw render(404);
  const result = await loadSkyDayData(`/sky/days/${dayKey}`, `/nebo-dnya/${dayKey}`);
  if (!result.day) throw render(404);
  return result;
}
