/**
 * Кросс-валидация astro-core против НЕЗАВИСИМОГО open-source эфемеридного источника —
 * npm-пакет `ephemeris` (JS-порт эфемерид Moshier/DE404, см. docs/research/02 §4). Установлен
 * как devDependency (используется ТОЛЬКО в тестах, детерминированно и офлайн после `pnpm install`
 * — никакой сети во время самого теста). GPL-3.0 пакета не распространяется с продуктом (не
 * зависимость рантайма ядра) — соответствует указанию промта Ф1 §7.
 *
 * Диапазон: 1900–2050, случайные даты и широты (включая >60°, южное полушарие) — географическая
 * широта наблюдателя НЕ влияет на геоцентрическую эклиптическую долготу (проверено: у `ephemeris`
 * результат идентичен для lat=0 и lat=89), поэтому используется для проверки чарта в целом
 * (созвездие/дом), а сравнение долгот — по случайным датам без привязки к широте.
 *
 * Допуски (задокументированы явно, это ИСПОЛНИМЫЙ критерий — не «сверка на глаз»):
 *  - Солнце, Меркурий..Плутон: ≤2′ (оба источника заявляют точность лучше 1″..1′, разница
 *    источников данных/констант даёт расхождение в единицы-десятки угловых секунд — см. прогон).
 *  - Луна: ≤3′ (быстрее движется, чуть больше расхождение лунных теорий ELP2000 vs Moshier).
 * Максимальное фактическое расхождение прогона печатается в консоль (см. `_report/build/f1-отчёт.md`).
 */
import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { getAllPlanets } from 'ephemeris';
import * as AE from 'astronomy-engine';
import { sunApparentPosition } from '../ephemeris/sun-vsop87.js';
import { bodyGeocentricPosition, PLANET_BODIES } from '../ephemeris/planets.js';
import { angularSeparationDegrees } from '../util/angles.js';

const PLANET_TOLERANCE_DEG = 2 / 60;
const MOON_TOLERANCE_DEG = 3 / 60;

function randomDateInRange(year: number, month: number, day: number, hour: number): Date {
  return new Date(Date.UTC(year, month, day, hour, 0, 0));
}

describe('cross-validation: astro-core vs ephemeris (Moshier/DE404), 1900–2050', () => {
  it('Солнце: расхождение ≤2\' на широком наборе случайных дат', () => {
    let maxDiffArcsec = 0;
    fc.assert(
      fc.property(
        fc.integer({ min: 1900, max: 2050 }),
        fc.integer({ min: 0, max: 11 }),
        fc.integer({ min: 1, max: 27 }),
        fc.integer({ min: 0, max: 23 }),
        (year, month, day, hour) => {
          const date = randomDateInRange(year, month, day, hour);
          const time = AE.MakeTime(date);
          const ours = sunApparentPosition(time).longitudeDeg;
          const theirs = getAllPlanets(date, 0, 0, 0).observed.sun!.apparentLongitudeDd;
          const diff = angularSeparationDegrees(ours, theirs);
          maxDiffArcsec = Math.max(maxDiffArcsec, diff * 3600);
          expect(diff).toBeLessThanOrEqual(PLANET_TOLERANCE_DEG);
        },
      ),
      { numRuns: 60 },
    );
    console.log(`[cross-validation] Солнце: макс. расхождение = ${maxDiffArcsec.toFixed(2)}″`);
  });

  it('Луна: расхождение ≤3\' на широком наборе случайных дат', () => {
    let maxDiffArcsec = 0;
    fc.assert(
      fc.property(
        fc.integer({ min: 1900, max: 2050 }),
        fc.integer({ min: 0, max: 11 }),
        fc.integer({ min: 1, max: 27 }),
        fc.integer({ min: 0, max: 23 }),
        (year, month, day, hour) => {
          const date = randomDateInRange(year, month, day, hour);
          const time = AE.MakeTime(date);
          const ours = bodyGeocentricPosition('moon', time).longitudeDeg;
          const theirs = getAllPlanets(date, 0, 0, 0).observed.moon!.apparentLongitudeDd;
          const diff = angularSeparationDegrees(ours, theirs);
          maxDiffArcsec = Math.max(maxDiffArcsec, diff * 3600);
          expect(diff).toBeLessThanOrEqual(MOON_TOLERANCE_DEG);
        },
      ),
      { numRuns: 60 },
    );
    console.log(`[cross-validation] Луна: макс. расхождение = ${maxDiffArcsec.toFixed(2)}″`);
  });

  for (const planet of PLANET_BODIES) {
    it(`${planet}: расхождение ≤2' на широком наборе случайных дат`, () => {
      let maxDiffArcsec = 0;
      fc.assert(
        fc.property(
          fc.integer({ min: 1900, max: 2050 }),
          fc.integer({ min: 0, max: 11 }),
          fc.integer({ min: 1, max: 27 }),
          fc.integer({ min: 0, max: 23 }),
          (year, month, day, hour) => {
            const date = randomDateInRange(year, month, day, hour);
            const time = AE.MakeTime(date);
            const ours = bodyGeocentricPosition(planet, time).longitudeDeg;
            const theirs = getAllPlanets(date, 0, 0, 0).observed[planet]!.apparentLongitudeDd;
            const diff = angularSeparationDegrees(ours, theirs);
            maxDiffArcsec = Math.max(maxDiffArcsec, diff * 3600);
            expect(diff).toBeLessThanOrEqual(PLANET_TOLERANCE_DEG);
          },
        ),
        { numRuns: 30 },
      );
      console.log(`[cross-validation] ${planet}: макс. расхождение = ${maxDiffArcsec.toFixed(2)}″`);
    });
  }

  // Примечание: флаг `is_retrograde` пакета `ephemeris` НЕ используется для кросс-валидации —
  // на контрольной дате 1900-01-01 он даёт `true` для Меркурия, тогда как обе независимые
  // долготы (наша и его же apparentLongitudeDd, расхождение <11″) монотонно растут в широком
  // окне вокруг даты (проверено вручную) — то есть это баг вычисления флага в самом пакете
  // `ephemeris`, а не показатель расхождения долгот. Проверка «ретроградность ⇔ отрицательная
  // скорость» — самосогласованный численный property-тест, см. `ephemeris/properties.test.ts`.
});
