import { describe, expect, it } from 'vitest';
import { computeChart, ASTRO_CORE_VERSION } from './index.js';
import type { ChartInput } from '@stassist/shared';

describe('@stassist/astro-core: computeChart — сквозной смок-тест', () => {
  const input: ChartInput = {
    dateTime: { year: 1990, month: 6, day: 15, hour: 14, minute: 30, second: 0 },
    timeUnknown: false,
    tzId: 'Europe/Moscow',
    place: { lat: 55.75, lon: 37.62, elevationM: 0 },
    preset: {
      zodiac: 'tropical',
      houseSystem: 'placidus',
      bodies: { trueNode: false, trueLilith: false, selena: true, chiron: true },
      orbs: { byAspect: {}, byBody: {} },
      aspectSet: 'major_minor',
    },
  };

  it('экспортирует версию ядра', () => {
    expect(ASTRO_CORE_VERSION).toMatch(/^\d+\.\d+\.\d+/);
  });

  it('считает полную натальную карту без исключений и с валидной структурой', () => {
    const chart = computeChart(input);

    expect(chart.kind).toBe('natal');
    expect(chart.meta.coordinateFrame).toBe('geocentric-apparent-ecliptic-of-date');
    expect(chart.meta.noHouses).toBe(false);
    expect(chart.houses).toHaveLength(12);

    for (const key of ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'] as const) {
      const pos = chart.bodies[key];
      expect(pos).toBeDefined();
      expect(pos!.longitudeDeg).toBeGreaterThanOrEqual(0);
      expect(pos!.longitudeDeg).toBeLessThan(360);
      expect(pos!.houseNumber).toBeGreaterThanOrEqual(1);
      expect(pos!.houseNumber).toBeLessThanOrEqual(12);
    }

    expect(chart.bodies.chiron).toBeDefined();
    expect(chart.points.meanNode).toBeDefined();
    expect(chart.points.meanLilith).toBeDefined();
    expect(chart.points.selena).toBeDefined();
    expect(chart.arabicParts.fortuna).toBeDefined();
    expect(chart.aspects.length).toBeGreaterThan(0);
  });

  it('detimeUnknown=true → noHouses=true, дома пустые, углы — заглушка', () => {
    const chart = computeChart({ ...input, timeUnknown: true });
    expect(chart.meta.noHouses).toBe(true);
    expect(chart.houses).toHaveLength(0);
    for (const key of ['sun', 'moon', 'mercury'] as const) {
      expect(chart.bodies[key]!.houseNumber).toBeNull();
    }
  });

  it('производительность: полный расчёт натала укладывается в разумный бюджет (≤50мс тёплый прогон)', () => {
    computeChart(input); // прогрев (JIT, ленивая инициализация модулей)
    const start = performance.now();
    computeChart(input);
    const elapsedMs = performance.now() - start;
    expect(elapsedMs).toBeLessThan(50);
  });

  it('детерминизм: два вызова с одинаковым входом дают идентичный результат', () => {
    const a = computeChart(input);
    const b = computeChart(input);
    expect(a).toEqual(b);
  });
});
