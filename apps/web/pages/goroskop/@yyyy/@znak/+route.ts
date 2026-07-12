/**
 * Guard-функция маршрута (см. apps/web/lib/goroskop-route.ts doc-комментарий): эта директория
 * обслуживает ТОЛЬКО `/goroskop/{yyyy}/{znak}` (первый сегмент — 4-значный год) — соседняя ветка
 * `/goroskop/{znak}/{periodOrTema}` живёт в pages/goroskop/@znak/@slug/.
 */
import type { PageContextServer } from 'vike/types';
import { matchGoroskopYearSign } from '../../../../lib/goroskop-route.js';

export default function route(pageContext: PageContextServer): { routeParams: Record<string, string> } | false {
  const match = matchGoroskopYearSign(pageContext.urlPathname);
  if (!match) return false;
  return { routeParams: { yyyy: match.yyyy, znak: match.znak } };
}
