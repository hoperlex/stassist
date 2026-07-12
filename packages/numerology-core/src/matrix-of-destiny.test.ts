import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import {
  compareMatrixOfDestiny,
  matrixOfDestinyCorePoints,
  matrixOfDestinyDerivedSections,
  reduceToArcanum,
} from './matrix-of-destiny.js';

describe('reduceToArcanum — редукция к диапазону арканов 1–22', () => {
  it('0 → 22 (граничное правило)', () => {
    expect(reduceToArcanum(0)).toBe(22);
  });

  it('значения ≤22 не меняются', () => {
    expect(reduceToArcanum(22)).toBe(22);
    expect(reduceToArcanum(15)).toBe(15);
  });

  it('23 → 2+3=5', () => {
    expect(reduceToArcanum(23)).toBe(5);
  });

  it('99 → 9+9=18 (один проход, 18 уже ≤22)', () => {
    expect(reduceToArcanum(99)).toBe(18);
  });

  it('property: результат всегда в диапазоне 1..22 для любого неотрицательного целого', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 1_000_000 }), (n) => {
        const result = reduceToArcanum(n);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(22);
      }),
    );
  });
});

describe('matrixOfDestinyCorePoints — 9 базовых точек октаграммы (15.06.1990)', () => {
  // A=day=редукция(15)=15; B=month=6; C=yearSum=редукция(1+9+9+0=19)=19
  // D=tasks=редукция(15+6+19=40)=редукция(40)=4 (3+... 4+0=4)
  // E=center=редукция(15+6+19+4=44)=редукция(44)=8 (4+4)
  // F1=редукция(15+6=21)=21; F2=редукция(6+19=25)=7 (2+5); F3=редукция(19+4=23)=5 (2+3)
  // F4=редукция(4+15=19)=19
  const corePoints = matrixOfDestinyCorePoints({ day: 15, month: 6, year: 1990 });

  it('вычисляет A, B, C, D(tasks), E(center) верно', () => {
    expect(corePoints.day).toBe(15);
    expect(corePoints.month).toBe(6);
    expect(corePoints.yearSum).toBe(19);
    expect(corePoints.tasks).toBe(4);
    expect(corePoints.center).toBe(8);
  });

  it('вычисляет вершины прямого квадрата F1..F4 и их алиасы f1..f4', () => {
    expect(corePoints.squareVertex1).toBe(21);
    expect(corePoints.squareVertex2).toBe(7);
    expect(corePoints.squareVertex3).toBe(5);
    expect(corePoints.squareVertex4).toBe(19);
    expect(corePoints.f1).toBe(corePoints.squareVertex1);
    expect(corePoints.f2).toBe(corePoints.squareVertex2);
    expect(corePoints.f3).toBe(corePoints.squareVertex3);
    expect(corePoints.f4).toBe(corePoints.squareVertex4);
  });

  it('regression: center детерминированно равен reduceToArcanum(day+month+yearSum+tasks)', () => {
    expect(corePoints.center).toBe(
      reduceToArcanum(corePoints.day + corePoints.month + corePoints.yearSum + corePoints.tasks),
    );
  });

  it('property: center всегда равен reduceToArcanum(day+month+yearSum+tasks) для любой даты', () => {
    fc.assert(
      fc.property(
        fc.date({
          min: new Date(Date.UTC(1900, 0, 1)),
          max: new Date(Date.UTC(2100, 11, 31)),
          noInvalidDate: true,
        }),
        (date) => {
          const points = matrixOfDestinyCorePoints({
            day: date.getUTCDate(),
            month: date.getUTCMonth() + 1,
            year: date.getUTCFullYear(),
          });
          expect(points.center).toBe(
            reduceToArcanum(points.day + points.month + points.yearSum + points.tasks),
          );
        },
      ),
    );
  });
});

describe('matrixOfDestinyDerivedSections — производные секции (methodologyVerified: false)', () => {
  const corePoints = matrixOfDestinyCorePoints({ day: 15, month: 6, year: 1990 });
  const derived = matrixOfDestinyDerivedSections(corePoints);

  it('помечает секцию как неверифицированную методику', () => {
    expect(derived.methodologyVerified).toBe(false);
  });

  it('7 чакр = редукция(center + периферийная точка) в порядке day,month,yearSum,tasks,f1,f2,f3', () => {
    // center=8; seeds=[15,6,19,4,21,7,5]
    // 8+15=23→5; 8+6=14→14; 8+19=27→9; 8+4=12→12; 8+21=29→11; 8+7=15→15; 8+5=13→13
    expect(derived.chakras).toEqual([5, 14, 9, 12, 11, 15, 13]);
  });

  it('4 предназначения по парам периферийных точек', () => {
    // personal=редукция(day+f1=15+21=36)=9 (3+6)
    // ancestral=редукция(month+f2=6+7=13)=13
    // spiritual=редукция(yearSum+f3=19+5=24)=6 (2+4)
    // social=редукция(tasks+f4=4+19=23)=5 (2+3)
    expect(derived.purposes).toEqual({ personal: 9, ancestral: 13, spiritual: 6, social: 5 });
  });

  it('линия отношений и денежная линия — диагонали прямого квадрата', () => {
    // relationshipLine=редукция(f1+f3=21+5=26)=8; moneyLine=редукция(f2+f4=7+19=26)=8
    expect(derived.relationshipLine).toBe(8);
    expect(derived.moneyLine).toBe(8);
  });

  it('8 возрастных периодов по 9 лет, привязанных к периферийным точкам по порядку', () => {
    expect(derived.agePeriods).toHaveLength(8);
    expect(derived.agePeriods[0]).toEqual({
      periodIndex: 1,
      fromAgeInclusive: 0,
      toAgeExclusive: 9,
      arcanum: 15, // day
    });
    expect(derived.agePeriods[7]).toEqual({
      periodIndex: 8,
      fromAgeInclusive: 63,
      toAgeExclusive: 72,
      arcanum: 19, // f4
    });
  });
});

describe('compareMatrixOfDestiny — совместимость двух дат (15.06.1990 vs 29.02.2000)', () => {
  it('находит общие числа среди 9 базовых точек (арканы 4, 8, 15, по одному совпадению)', () => {
    // A (15.06.1990): day=15, month=6, yearSum=19, tasks=4, center=8, f1=21, f2=7, f3=5, f4=19
    // B (29.02.2000): day=редукция(29)=11, month=2, yearSum=редукция(2)=2,
    //   tasks=редукция(11+2+2=15)=15, center=редукция(11+2+2+15=30)=3,
    //   f1=редукция(11+2=13)=13, f2=редукция(2+2=4)=4, f3=редукция(2+15=17)=17,
    //   f4=редукция(15+11=26)=8
    // Список A: [15,6,19,4,8,21,7,5,19]; список B: [11,2,2,15,3,13,4,17,8]
    // Общие значения: 4 (A×1,B×1), 8 (A×1,B×1), 15 (A×1,B×1) → totalSharedCount=3
    const result = compareMatrixOfDestiny(
      { day: 15, month: 6, year: 1990 },
      { day: 29, month: 2, year: 2000 },
    );
    expect(result.totalSharedCount).toBe(3);
    expect(result.sharedArcanums).toEqual([
      { arcanum: 4, countInA: 1, countInB: 1, sharedCount: 1 },
      { arcanum: 8, countInA: 1, countInB: 1, sharedCount: 1 },
      { arcanum: 15, countInA: 1, countInB: 1, sharedCount: 1 },
    ]);
  });

  it('для одинаковых дат все 9 точек совпадают полностью', () => {
    const result = compareMatrixOfDestiny(
      { day: 3, month: 3, year: 2003 },
      { day: 3, month: 3, year: 2003 },
    );
    expect(result.totalSharedCount).toBe(9);
  });
});
