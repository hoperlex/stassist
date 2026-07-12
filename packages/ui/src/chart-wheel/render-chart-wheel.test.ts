import { describe, expect, it } from 'vitest';
import type { Aspect, Bodies, Points } from '@stassist/shared';
import { renderChartWheelSvg } from './render-chart-wheel.js';
import type { ChartWheelPositions } from './types.js';

function pos(longitudeDeg: number, houseNumber: number | null = 1, isRetrograde = false) {
  return {
    longitudeDeg,
    latitudeDeg: 0,
    distanceAu: 1,
    speedLongDegPerDay: isRetrograde ? -0.5 : 1,
    isRetrograde,
    signIndex: Math.floor(longitudeDeg / 30),
    signDegree: longitudeDeg % 30,
    houseNumber,
  };
}

const bodies: Bodies = {
  sun: pos(10, 1),
  moon: pos(100, 4),
  mercury: pos(15, 1),
  venus: pos(200, 7, true),
  mars: pos(280, 9),
  jupiter: pos(340, 11),
  saturn: pos(60, 3),
  uranus: pos(130, 5),
  neptune: pos(150, 5),
  pluto: pos(170, 6),
  chiron: pos(220, 7),
};

const points: Points = {
  meanNode: pos(45, 2),
  meanLilith: pos(75, 3),
  selena: pos(255, 8),
};

const aspects: Aspect[] = [
  { bodyA: 'sun', bodyB: 'mercury', angleName: 'conjunction', exactAngleDeg: 0, actualDeltaDeg: 5, orbDeg: 5, orbAllowedDeg: 8, applying: true },
  { bodyA: 'sun', bodyB: 'moon', angleName: 'square', exactAngleDeg: 90, actualDeltaDeg: 90, orbDeg: 0, orbAllowedDeg: 7, applying: false },
  { bodyA: 'venus', bodyB: 'jupiter', angleName: 'trine', exactAngleDeg: 120, actualDeltaDeg: 140, orbDeg: 20, orbAllowedDeg: 8, applying: false },
];

const fullPositions: ChartWheelPositions = {
  bodies,
  points,
  angles: { ascDeg: 15, mcDeg: 285, dscDeg: 195, icDeg: 105, armcDeg: 280, vertexDeg: null },
  houses: Array.from({ length: 12 }, (_unused, i) => ({ number: i + 1, longitudeDeg: (15 + i * 30) % 360 })),
  aspects,
};

const noHousesPositions: ChartWheelPositions = {
  ...fullPositions,
  angles: { ascDeg: 0, mcDeg: 0, dscDeg: 0, icDeg: 0, armcDeg: 0, vertexDeg: null },
  houses: [],
  noHouses: true,
};

describe('renderChartWheelSvg', () => {
  it('строит валидную самозамкнутую SVG-строку с заданным размером', () => {
    const svg = renderChartWheelSvg({ primary: fullPositions, size: 400, title: 'Тестовая карта' });
    expect(svg.startsWith('<svg')).toBe(true);
    expect(svg.trim().endsWith('</svg>')).toBe(true);
    expect(svg).toContain('viewBox="0 0 400 400"');
    expect(svg).toContain('Тестовая карта');
  });

  it('рисует все 12 глифов знаков зодиака', () => {
    const svg = renderChartWheelSvg({ primary: fullPositions });
    for (const glyph of ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']) {
      expect(svg).toContain(glyph);
    }
  });

  it('рисует глифы планет и ретро-маркер для ретроградных тел', () => {
    const svg = renderChartWheelSvg({ primary: fullPositions });
    expect(svg).toContain('☉'); // Солнце
    expect(svg).toContain('☽'); // Луна
    expect(svg).toContain('℞'); // Венера ретроградна во фикстуре
  });

  it('рисует линии домов и ASC/MC при известном времени рождения', () => {
    const svg = renderChartWheelSvg({ primary: fullPositions });
    expect(svg).toContain('>ASC<');
    expect(svg).toContain('>MC<');
  });

  it('пропускает дома/углы при noHouses=true (время рождения неизвестно)', () => {
    const svg = renderChartWheelSvg({ primary: noHousesPositions });
    expect(svg).not.toContain('>ASC<');
    expect(svg).not.toContain('>MC<');
    // но зодиакальное кольцо и планеты всё равно рисуются — страница не пустая
    expect(svg).toContain('♈');
    expect(svg).toContain('☉');
  });

  it('поддерживает тёмную тему без ошибок и с другим фоном', () => {
    const light = renderChartWheelSvg({ primary: fullPositions, theme: 'light' });
    const dark = renderChartWheelSvg({ primary: fullPositions, theme: 'dark' });
    expect(light).not.toEqual(dark);
    expect(dark).toContain('#1a1730');
  });

  it('биколесо синастрии: рисует планеты карты B и межкартовые аспекты', () => {
    const crossAspects: Aspect[] = [
      { bodyA: 'a:sun', bodyB: 'b:moon', angleName: 'trine', exactAngleDeg: 120, actualDeltaDeg: 118, orbDeg: 2, orbAllowedDeg: 8, applying: true },
    ];
    const svg = renderChartWheelSvg({ primary: fullPositions, secondary: fullPositions, crossAspects, size: 500 });
    expect(svg).toContain('viewBox="0 0 500 500"');
    // планеты карты A и B оба нарисованы — глиф Солнца встречается минимум дважды (a: и b:)
    const sunOccurrences = svg.split('☉').length - 1;
    expect(sunOccurrences).toBeGreaterThanOrEqual(2);
  });

  it('детерминированность: одинаковый вход даёт байт-в-байт одинаковый вывод', () => {
    const svg1 = renderChartWheelSvg({ primary: fullPositions, size: 480 });
    const svg2 = renderChartWheelSvg({ primary: fullPositions, size: 480 });
    expect(svg1).toBe(svg2);
  });

  it('экранирует служебные символы в title (защита от XML-инъекции)', () => {
    const svg = renderChartWheelSvg({ primary: fullPositions, title: '<script>alert(1)</script>' });
    expect(svg).not.toContain('<script>');
    expect(svg).toContain('&lt;script&gt;');
  });
});
