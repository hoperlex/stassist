import type { PageContextServer } from 'vike/types';
import { buildGoroskopPageData, type GoroskopPageData } from '../../../lib/goroskop-page-data.js';

export async function data(pageContext: PageContextServer): Promise<GoroskopPageData> {
  const znak = pageContext.routeParams.znak ?? '';
  return buildGoroskopPageData(znak, 'day', 'general');
}
