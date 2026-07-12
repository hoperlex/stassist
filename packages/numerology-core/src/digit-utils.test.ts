import { describe, expect, it } from 'vitest';
import { reduceKeepMasterNumbers, reduceToSingleDigit, sumDigits } from './digit-utils.js';

describe('sumDigits — один проход суммирования цифр', () => {
  it('считает сумму цифр положительного числа', () => {
    expect(sumDigits(123)).toBe(6); // 1+2+3
    expect(sumDigits(15)).toBe(6); // 1+5
  });

  it('приводит отрицательные числа к модулю', () => {
    expect(sumDigits(-45)).toBe(9); // |-45| = 45 → 4+5
  });

  it('sumDigits(0) === 0', () => {
    expect(sumDigits(0)).toBe(0);
  });
});

describe('reduceKeepMasterNumbers — редукция с сохранением мастер-чисел 11/22', () => {
  it('редуцирует обычное число до одной цифры', () => {
    // 15 → 1+5=6 (не мастер-число, продолжаем редукцию)
    expect(reduceKeepMasterNumbers(15)).toBe(6);
  });

  it('останавливается на 11, если сумма цифр даёт 11', () => {
    // 29 → 2+9=11 → это мастер-число, останавливаемся
    expect(reduceKeepMasterNumbers(29)).toBe(11);
  });

  it('останавливается на 22, если сумма цифр даёт 22', () => {
    expect(reduceKeepMasterNumbers(22)).toBe(22);
  });

  it('останавливается на 11 через промежуточный шаг (38 → 11)', () => {
    // 38 → 3+8=11 → мастер-число, останавливаемся
    expect(reduceKeepMasterNumbers(38)).toBe(11);
  });

  it('33 НЕ является мастер-числом в этой схеме — редуцируется дальше', () => {
    // 33 → 3+3=6 (осознанное решение портала: мастер-числа — только 11 и 22)
    expect(reduceKeepMasterNumbers(33)).toBe(6);
  });
});

describe('reduceToSingleDigit — полная редукция до 1–9 без мастер-чисел', () => {
  it('редуцирует число, которое у reduceKeepMasterNumbers остановилось бы на 11', () => {
    // 29 → 2+9=11 → 1+1=2 (мастер-числа здесь не действуют)
    expect(reduceToSingleDigit(29)).toBe(2);
  });

  it('reduceToSingleDigit(11) === 2', () => {
    expect(reduceToSingleDigit(11)).toBe(2);
  });

  it('числа ≤9 возвращаются без изменений', () => {
    expect(reduceToSingleDigit(4)).toBe(4);
  });
});
