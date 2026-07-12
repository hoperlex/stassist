import { describe, expect, it } from 'vitest';
import { renderChartWheelSvg } from '@stassist/ui/render';
import type { SharePositions } from '@stassist/shared';
import { buildShareChartWheelInput } from './build-share-svg.js';

function pos(longitudeDeg: number) {
  return {
    longitudeDeg,
    latitudeDeg: 0,
    distanceAu: 1,
    speedLongDegPerDay: 1,
    isRetrograde: false,
    signIndex: Math.floor(longitudeDeg / 30),
    signDegree: longitudeDeg % 30,
    houseNumber: 1,
  };
}

const positions: SharePositions = {
  bodies: {
    sun: pos(10), moon: pos(100), mercury: pos(15), venus: pos(200), mars: pos(280),
    jupiter: pos(340), saturn: pos(60), uranus: pos(130), neptune: pos(150), pluto: pos(170),
  },
  points: {},
  angles: { ascDeg: 15, mcDeg: 285, dscDeg: 195, icDeg: 105, armcDeg: 280, vertexDeg: null },
  houses: Array.from({ length: 12 }, (_unused, i) => ({ number: i + 1, longitudeDeg: (15 + i * 30) % 360 })),
  aspects: [],
  meta: { houseSystem: 'placidus', zodiac: 'tropical', noHouses: false },
};

describe('buildShareChartWheelInput', () => {
  it('маппит натальный снапшот в ChartWheelInput без secondary', () => {
    const input = buildShareChartWheelInput({ kind: 'natal', positions, positionsB: null, theme: 'light' });
    expect(input.secondary).toBeUndefined();
    expect(input.primary.noHouses).toBe(false);
    // результат — валидная SVG-строка (переиспользуем тот же рендер, что и SSR/PNG)
    const svg = renderChartWheelSvg(input);
    expect(svg.startsWith('<svg')).toBe(true);
  });

  it('маппит synastry-снапшот в биколесо с secondary', () => {
    const input = buildShareChartWheelInput({ kind: 'synastry', positions, positionsB: positions, theme: 'dark' });
    expect(input.secondary).toBeDefined();
    expect(input.theme).toBe('dark');
    const svg = renderChartWheelSvg(input);
    expect(svg).toContain('#1a1730'); // тёмный фон
  });

  it('synastry без positionsB деградирует к обычному колесу (защита от отсутствующих данных)', () => {
    const input = buildShareChartWheelInput({ kind: 'synastry', positions, positionsB: null, theme: 'light' });
    expect(input.secondary).toBeUndefined();
  });
});
