/**
 * Golden-тесты ядра (см. docs/roadmap/31-конвенции-реализации.md §7): human-verified seed —
 * 5 карт, долготы планет сверены с реальными данными JPL Horizons (независимый авторитетный
 * источник, см. `source`/`verified_by` в каждой фикстуре); дома/углы — регрессионная проверка
 * (задокументировано честно в самих фикстурах, не выдаётся за независимую сверку).
 *
 * Фикстуры импортируются как статические JSON-модули (не `fs.readFileSync` в рантайме теста) —
 * полностью детерминировано и без обращения к файловой системе на этапе выполнения теста
 * (см. docs/roadmap/31-конвенции-реализации.md §1: test:unit без сети/файловой системы).
 *
 * Допуски (жёсткие, из промта Ф1 §«Верификация»): планеты ≤1′, куспиды/углы ≤2′.
 */
import { describe, expect, it } from 'vitest';
import { computeChart } from '../chart.js';
import { angularSeparationDegrees } from '../util/angles.js';
import type { ChartInput } from '@stassist/shared';

import fixture01 from '../../fixtures/golden/01-london-2000.json';
import fixture02 from '../../fixtures/golden/02-moscow-1990.json';
import fixture03 from '../../fixtures/golden/03-losangeles-1955.json';
import fixture04 from '../../fixtures/golden/04-sydney-2020.json';
import fixture05 from '../../fixtures/golden/05-capetown-1925.json';

interface GoldenFixture {
  description: string;
  input: ChartInput;
  expected: {
    longitudes: Record<string, number>;
    angles: { ascDeg: number; mcDeg: number; dscDeg: number; icDeg: number };
    houses: number[];
  };
  tolerances: { planetsArcmin: number; cuspsArcmin: number };
  source: string;
  source_date: string;
  verified_by: string;
}

const FIXTURES = [fixture01, fixture02, fixture03, fixture04, fixture05] as unknown as GoldenFixture[];

describe('golden: 5 human-verified карт (JPL Horizons для долгот планет)', () => {
  for (const fixture of FIXTURES) {
    describe(fixture.description, () => {
      const chart = computeChart(fixture.input);
      const planetToleranceDeg = fixture.tolerances.planetsArcmin / 60;
      const cuspToleranceDeg = fixture.tolerances.cuspsArcmin / 60;

      for (const [body, expectedLon] of Object.entries(fixture.expected.longitudes)) {
        it(`долгота ${body} — расхождение с JPL Horizons ≤ ${fixture.tolerances.planetsArcmin}′`, () => {
          const actual = (chart.bodies as unknown as Record<string, { longitudeDeg: number }>)[body];
          expect(actual).toBeDefined();
          const diff = angularSeparationDegrees(actual!.longitudeDeg, expectedLon);
          expect(diff).toBeLessThanOrEqual(planetToleranceDeg);
        });
      }

      it(`Asc/MC/Dsc/IC — расхождение ≤ ${fixture.tolerances.cuspsArcmin}′ (регрессия)`, () => {
        expect(angularSeparationDegrees(chart.angles.ascDeg, fixture.expected.angles.ascDeg)).toBeLessThanOrEqual(
          cuspToleranceDeg,
        );
        expect(angularSeparationDegrees(chart.angles.mcDeg, fixture.expected.angles.mcDeg)).toBeLessThanOrEqual(
          cuspToleranceDeg,
        );
        expect(angularSeparationDegrees(chart.angles.dscDeg, fixture.expected.angles.dscDeg)).toBeLessThanOrEqual(
          cuspToleranceDeg,
        );
        expect(angularSeparationDegrees(chart.angles.icDeg, fixture.expected.angles.icDeg)).toBeLessThanOrEqual(
          cuspToleranceDeg,
        );
      });

      it(`куспиды домов — расхождение ≤ ${fixture.tolerances.cuspsArcmin}′ (регрессия)`, () => {
        expect(chart.houses).toHaveLength(fixture.expected.houses.length);
        for (let i = 0; i < chart.houses.length; i++) {
          const diff = angularSeparationDegrees(chart.houses[i]!.longitudeDeg, fixture.expected.houses[i]!);
          expect(diff).toBeLessThanOrEqual(cuspToleranceDeg);
        }
      });
    });
  }
});
