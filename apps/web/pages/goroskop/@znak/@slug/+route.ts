/**
 * Guard-функция маршрута (см. apps/web/lib/goroskop-route.ts doc-комментарий): эта директория
 * обслуживает ТОЛЬКО `/goroskop/{znak}/{periodOrTema}` (первый сегмент — реальный знак, НЕ год) —
 * соседняя ветка `/goroskop/{yyyy}/{znak}` живёт в pages/goroskop/@yyyy/@znak/.
 */
import type { PageContextServer } from 'vike/types';
import { matchGoroskopSignSlug } from '../../../../lib/goroskop-route.js';

export default function route(pageContext: PageContextServer): { routeParams: Record<string, string> } | false {
  const match = matchGoroskopSignSlug(pageContext.urlPathname);
  if (!match) return false;
  return { routeParams: { znak: match.znak, slug: match.slug } };
}
