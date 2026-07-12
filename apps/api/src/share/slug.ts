/**
 * Детерминированный слаг для `chart_shares`: хэш от обезличенного содержимого (positions[+B]) —
 * повторный шеринг ТОГО ЖЕ результата отдаёт тот же URL (дедупликация, см. packages/db/src/schema/
 * chart-shares.ts). ЧИСТАЯ функция — только SHA-256 от канонического JSON, без I/O.
 */
import { createHash } from 'node:crypto';
import type { ChartShareCreateRequest } from '@stassist/shared';

export function computeShareSlug(payload: Pick<ChartShareCreateRequest, 'kind' | 'positions' | 'positionsB' | 'caption'>): string {
  const canonical = JSON.stringify({
    kind: payload.kind,
    positions: payload.positions,
    positionsB: payload.positionsB ?? null,
    // Ф9: caption — часть содержимого карточки transit_day (другая подпись = другая карточка/PNG).
    caption: payload.caption ?? null,
  });
  return createHash('sha256').update(canonical).digest('hex').slice(0, 16);
}
