import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { psychoMatrix } from './psycho-matrix.js';

describe('psychoMatrix — квадрат Пифагора', () => {
  it('22.08.1985: number1=35, number2=8, number3=31, number4=4 (ручной пересчёт)', () => {
    // (1) = 2+2+0+8+1+9+8+5 = 35
    // (2) = 3+5 = 8
    // первая цифра дня "22" = 2 → (3) = 35 - 2*2 = 31
    // (4) = 3+1 = 4
    const result = psychoMatrix({ day: 22, month: 8, year: 1985 });
    expect(result.number1).toBe(35);
    expect(result.number2).toBe(8);
    expect(result.number3).toBe(31);
    expect(result.number4).toBe(4);

    // Мультимножество (без нулей): дата[2,2,8,1,9,8,5] + 35[3,5] + 8[8] + 31[3,1] + 4[4]
    // 1:2, 2:2, 3:2, 4:1, 5:2, 6:0, 7:0, 8:3, 9:1 (сумма = 13 цифр)
    expect(result.counts).toEqual({
      '1': 2,
      '2': 2,
      '3': 2,
      '4': 1,
      '5': 2,
      '6': 0,
      '7': 0,
      '8': 3,
      '9': 1,
    });
    expect(result.grid).toEqual([
      [2, 1, 0],
      [2, 2, 3],
      [2, 0, 1],
    ]);
    expect(result.rowSums).toEqual([3, 7, 3]);
    expect(result.colSums).toEqual([6, 3, 4]);
    expect(result.diagonalMain).toBe(5); // 2+2+1
    expect(result.diagonalAnti).toBe(4); // 0+2+2
  });

  it('29.02.2000: number1=15, number2=6, number3=11, number4=2 (ручной пересчёт)', () => {
    // (1) = 2+9+0+2+2+0+0+0 = 15
    // (2) = 1+5 = 6
    // первая цифра дня "29" = 2 → (3) = 15 - 2*2 = 11
    // (4) = 1+1 = 2
    const result = psychoMatrix({ day: 29, month: 2, year: 2000 });
    expect(result.number1).toBe(15);
    expect(result.number2).toBe(6);
    expect(result.number3).toBe(11);
    expect(result.number4).toBe(2);

    // Мультимножество (без нулей): дата[2,9,2,2] + 15[1,5] + 6[6] + 11[1,1] + 2[2]
    // 1:3, 2:4, 3:0, 4:0, 5:1, 6:1, 7:0, 8:0, 9:1 (сумма = 10 цифр)
    expect(result.counts).toEqual({
      '1': 3,
      '2': 4,
      '3': 0,
      '4': 0,
      '5': 1,
      '6': 1,
      '7': 0,
      '8': 0,
      '9': 1,
    });
    expect(result.grid).toEqual([
      [3, 0, 0],
      [4, 1, 0],
      [0, 1, 1],
    ]);
    expect(result.rowSums).toEqual([3, 5, 2]);
    expect(result.colSums).toEqual([7, 2, 1]);
    expect(result.diagonalMain).toBe(5); // 3+1+1
    expect(result.diagonalAnti).toBe(1); // 0+1+0
  });

  it('property: сумма всех 9 ячеек сетки равна числу учтённых (ненулевых) цифр', () => {
    fc.assert(
      fc.property(
        fc.date({
          min: new Date(Date.UTC(1900, 0, 1)),
          max: new Date(Date.UTC(2100, 11, 31)),
          noInvalidDate: true,
        }),
        (date) => {
          const day = date.getUTCDate();
          const month = date.getUTCMonth() + 1;
          const year = date.getUTCFullYear();
          const result = psychoMatrix({ day, month, year });

          const dateAndNumbersDigits =
            String(day).padStart(2, '0') +
            String(month).padStart(2, '0') +
            String(year).padStart(4, '0') +
            String(result.number1) +
            String(result.number2) +
            String(Math.abs(result.number3)) +
            String(result.number4);
          const expectedTotal = [...dateAndNumbersDigits].filter((ch) => ch !== '0').length;

          const gridTotal = result.grid.flat().reduce((acc, v) => acc + v, 0);
          expect(gridTotal).toBe(expectedTotal);
        },
      ),
    );
  });
});
