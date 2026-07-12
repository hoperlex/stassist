/**
 * Обезличенный снапшот `chart_shares` (positions/positionsB, см. packages/shared/src/schemas/
 * calc.ts `SharePositions`) → вход для {@link renderChartWheelSvg} (`@stassist/ui/render`) — та
 * же функция, что рисует SSR-страницу шеринга (см. apps/web pages/podelitsya/@slug). ЧИСТАЯ
 * функция, не трогает БД/сеть — юнит-тестируется напрямую.
 */
import type { ChartWheelInput } from '@stassist/ui/render';
import type { SharePositions, ShareKind } from '@stassist/shared';

export interface ShareSvgSource {
  kind: ShareKind;
  positions: SharePositions;
  positionsB: SharePositions | null;
  theme: 'light' | 'dark';
}

function toWheelPositions(p: SharePositions) {
  return {
    bodies: p.bodies,
    points: p.points,
    angles: p.angles,
    houses: p.houses,
    aspects: p.aspects,
    noHouses: p.meta.noHouses,
  };
}

export function buildShareChartWheelInput(source: ShareSvgSource): ChartWheelInput {
  const secondary = source.kind === 'synastry' && source.positionsB ? toWheelPositions(source.positionsB) : undefined;
  return {
    theme: source.theme,
    primary: toWheelPositions(source.positions),
    secondary,
    title: source.kind === 'synastry' ? 'Совместимость — Зодиакум' : 'Натальная карта — Зодиакум',
  };
}
