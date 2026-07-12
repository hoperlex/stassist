import { describe, expect, it } from 'vitest';
import { renderChartWheelSvg } from '@stassist/ui/render';
import { isValidPng, svgToPngBuffer } from './render-og-png.js';

const minimalSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="20" height="20" fill="red"/></svg>';

describe('svgToPngBuffer', () => {
  it('рендерит валидный PNG (сигнатура) из простого SVG', () => {
    const png = svgToPngBuffer(minimalSvg, { width: 100 });
    expect(isValidPng(png)).toBe(true);
    expect(png.length).toBeGreaterThan(0);
  });

  it('рендерит валидный PNG из реального ChartWheel SVG (та же функция, что и SSR/кабинет)', () => {
    const svg = renderChartWheelSvg({
      primary: {
        bodies: {
          sun: { longitudeDeg: 10, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 0, signDegree: 10, houseNumber: 1 },
          moon: { longitudeDeg: 100, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 13, isRetrograde: false, signIndex: 3, signDegree: 10, houseNumber: 4 },
          mercury: { longitudeDeg: 15, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 0, signDegree: 15, houseNumber: 1 },
          venus: { longitudeDeg: 200, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 6, signDegree: 20, houseNumber: 7 },
          mars: { longitudeDeg: 280, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 9, signDegree: 10, houseNumber: 9 },
          jupiter: { longitudeDeg: 340, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 11, signDegree: 10, houseNumber: 11 },
          saturn: { longitudeDeg: 60, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 2, signDegree: 0, houseNumber: 3 },
          uranus: { longitudeDeg: 130, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 4, signDegree: 10, houseNumber: 5 },
          neptune: { longitudeDeg: 150, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 5, signDegree: 0, houseNumber: 5 },
          pluto: { longitudeDeg: 170, latitudeDeg: 0, distanceAu: 1, speedLongDegPerDay: 1, isRetrograde: false, signIndex: 5, signDegree: 20, houseNumber: 6 },
        },
        points: {},
        angles: { ascDeg: 15, mcDeg: 285, dscDeg: 195, icDeg: 105, armcDeg: 280, vertexDeg: null },
        houses: Array.from({ length: 12 }, (_unused, i) => ({ number: i + 1, longitudeDeg: (15 + i * 30) % 360 })),
        aspects: [],
      },
      size: 300,
    });
    const png = svgToPngBuffer(svg, { width: 300 });
    expect(isValidPng(png)).toBe(true);
  });
});

describe('isValidPng', () => {
  it('отвергает произвольные небайты как невалидный PNG', () => {
    expect(isValidPng(Buffer.from('не картинка'))).toBe(false);
  });
});
