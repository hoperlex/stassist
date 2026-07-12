/**
 * Персональные циклы (год/месяц/день) — прогностика на основе даты рождения и «текущей» даты,
 * которая всегда передаётся параметром (никакого `Date.now()` внутри пакета).
 */
import { reduceToSingleDigit } from './digit-utils.js';
import type {
  NumerologyBirthData,
  NumerologyCurrentDate,
  PersonalCyclesResult,
} from './schemas.js';

/**
 * Персональные год/месяц/день (по большинству источников — всегда 1–9, БЕЗ мастер-чисел):
 *  - персональный год = редукция(день рождения + месяц рождения + текущий год);
 *  - персональный месяц = редукция(персональный год + номер текущего месяца);
 *  - персональный день = редукция(персональный месяц + число текущего дня).
 */
export function personalCycles(
  birthDate: Pick<NumerologyBirthData, 'day' | 'month'>,
  currentDate: NumerologyCurrentDate,
): PersonalCyclesResult {
  const personalYear = reduceToSingleDigit(birthDate.day + birthDate.month + currentDate.year);
  const personalMonth = reduceToSingleDigit(personalYear + currentDate.month);
  const personalDay = reduceToSingleDigit(personalMonth + currentDate.day);

  return { personalYear, personalMonth, personalDay };
}
