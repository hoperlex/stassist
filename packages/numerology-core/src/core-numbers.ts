/**
 * Базовые нумерологические числа: число жизненного пути (ЧЖП) и числа по имени
 * (выражение / душа / личность, пифагорейская система, кириллица).
 */
import { LETTER_VALUES, VOWELS } from './constants.js';
import { reduceKeepMasterNumbers } from './digit-utils.js';
import { normalizeName } from './text-utils.js';
import type { LifePathResult, NameNumbersResult, NumerologyBirthData } from './schemas.js';

/**
 * Число жизненного пути (ЧЖП): сквозная сумма ВСЕХ цифр даты рождения (день+месяц+год как
 * строка цифр), редуцируется до 1–9; мастер-числа 11 и 22 не редуцируются дальше.
 *
 * Выбор метода (см. README.md пакета и docs/research/06-нумерология-и-минералы.md §1):
 * используется «сквозное сложение всех цифр», а НЕ «метод трёх циклов» (день/месяц/год
 * редуцируются по отдельности, затем складываются) — оба метода общеприняты, но дают разные
 * мастер-числа на части дат. Это осознанный, задокументированный выбор портала.
 *
 * Пример: 29.02.2000 → цифры 2,9,0,2,2,0,0,0 → сумма 15 → 1+5=6 (не мастер-число) → ЧЖП=6.
 */
export function lifePathNumber(birthDate: Pick<NumerologyBirthData, 'day' | 'month' | 'year'>): LifePathResult {
  const digitsString =
    String(birthDate.day).padStart(2, '0') +
    String(birthDate.month).padStart(2, '0') +
    String(birthDate.year).padStart(4, '0');
  let digitSum = 0;
  for (const char of digitsString) {
    digitSum += Number(char);
  }
  return {
    digitSum,
    lifePathNumber: reduceKeepMasterNumbers(digitSum),
  };
}

/** Сумма значений букв нормализованной строки по циклической таблице {@link LETTER_VALUES}. */
function sumOfLetterValues(normalizedLetters: string): number {
  let sum = 0;
  for (const char of normalizedLetters) {
    const value = LETTER_VALUES[char];
    if (value === undefined) {
      throw new Error(
        `Неизвестная буква "${char}" после нормализации — normalizeName() должна была отфильтровать её`,
      );
    }
    sum += value;
  }
  return sum;
}

/**
 * Числа по имени (пифагорейская система, кириллица, таблица {@link LETTER_VALUES}):
 *  - число выражения (Expression) — по ВСЕМ буквам полного имени;
 *  - число души (Soul Urge) — только по гласным ({@link VOWELS});
 *  - число личности (Personality) — только по «не гласным» буквам.
 *
 * Мастер-числа 11/22 сохраняются (та же логика редукции, что и для ЧЖП — по аналогии; это
 * решение по умолчанию для целостности продукта, отдельно не сверялось с конкретным эталоном).
 *
 * Принимает СЫРУЮ строку имени и нормализует её сама ({@link normalizeName}).
 */
export function nameNumbers(fullName: string): NameNumbersResult {
  const normalizedName = normalizeName(fullName);
  if (normalizedName.length === 0) {
    throw new Error('После нормализации имя пустое — нет ни одной буквы А-Я/Ё');
  }

  const vowelsOnly = [...normalizedName].filter((char) => VOWELS.has(char)).join('');
  const consonantsOnly = [...normalizedName].filter((char) => !VOWELS.has(char)).join('');

  return {
    normalizedName,
    expressionNumber: reduceKeepMasterNumbers(sumOfLetterValues(normalizedName)),
    soulUrgeNumber: reduceKeepMasterNumbers(sumOfLetterValues(vowelsOnly)),
    personalityNumber: reduceKeepMasterNumbers(sumOfLetterValues(consonantsOnly)),
  };
}
