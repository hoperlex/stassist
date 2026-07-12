import { describe, expect, it } from 'vitest';
import { renderChartWheelSvg } from '@stassist/ui/render';
import type { SharePositions } from '@stassist/shared';
import { buildShareChartWheelInput, composeTransitDayShareSvg } from './build-share-svg.js';

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

  it('Ф9: transit_day — биколесо «натал + небо дня» с заголовком раздела', () => {
    const input = buildShareChartWheelInput({ kind: 'transit_day', positions, positionsB: positions, theme: 'light' });
    expect(input.secondary).toBeDefined();
    expect(input.title).toBe('Небо дня — Зодиакум');
  });
});

describe('composeTransitDayShareSvg (Ф9: OG-карточка отклика с подписью)', () => {
  const wheelSvg = renderChartWheelSvg(
    buildShareChartWheelInput({ kind: 'transit_day', positions, positionsB: positions, theme: 'light' }),
  );

  it('компонует OG 1200×630: подпись, слоган и вложенное колесо', () => {
    const svg = composeTransitDayShareSvg(wheelSvg, 'В точку · Марс — квадрат — Солнце, орб 1.2°', 'light');
    expect(svg).toContain('viewBox="0 0 1200 630"');
    expect(svg).toContain('В точку · Марс — квадрат — Солнце, орб 1.2°');
    expect(svg).toContain('небо у всех одно');
    expect(svg).toContain('<svg x="660" y="75"'); // колесо позиционировано вложенным svg
  });

  it('экранирует XML в подписи (пользовательский текст не ломает SVG)', () => {
    const svg = composeTransitDayShareSvg(wheelSvg, 'A<B & "C"', 'dark');
    expect(svg).toContain('A&lt;B &amp; &quot;C&quot;');
  });

  it('длинная подпись переносится максимум на 3 строки', () => {
    const long = Array.from({ length: 20 }, (_unused, i) => `слово${i}`).join(' ');
    const svg = composeTransitDayShareSvg(wheelSvg, long, 'light');
    const captionLines = svg.match(/x="72" y="(300|344|388)"/g) ?? [];
    expect(captionLines.length).toBeLessThanOrEqual(3);
  });
});
