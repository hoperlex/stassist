/**
 * `/planety/{planeta}-v-{znak|dom}` — 240 страниц (см. apps/web/lib/planety-route.ts doc-
 * комментарий про ограничение `+route.ts`-загрузчика vike).
 */
import type { PageContextServer } from 'vike/types';
import { matchPlanetInSlug } from '../../../lib/planety-route.js';

export default function route(pageContext: PageContextServer): { routeParams: Record<string, string> } | false {
  const match = matchPlanetInSlug(pageContext.urlPathname);
  if (!match) return false;
  if (match.kind === 'sign') {
    return { routeParams: { kind: 'sign', planetEn: match.planetEnSlug, planetRu: match.planetRuSlug, signEn: match.signEnSlug, signPrep: match.signPrepositionalSlug } };
  }
  return { routeParams: { kind: 'house', planetEn: match.planetEnSlug, planetRu: match.planetRuSlug, house: String(match.house) } };
}
