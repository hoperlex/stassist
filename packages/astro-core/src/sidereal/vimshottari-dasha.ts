/**
 * Вимшоттари-даша — 120-летний цикл 9 планет, порядок и длительности периодов общеприняты и
 * не оспариваются в вед. астрологии (высокая уверенность): Кету 7, Венера 20, Солнце 6, Луна 10,
 * Марс 7, Раху 18, Юпитер 16, Сатурн 19, Меркурий 17 лет (сумма 120). Владыка даши на момент
 * рождения и остаток его периода определяются накшатрой Луны: у каждой из 27 накшатр —
 * фиксированный владыка (цикл из 9 повторяется 3 раза), остаток пропорционален непройденной
 * части накшатры (13°20′).
 */
import { nakshatraOf } from './nakshatra.js';

export const DASHA_LORDS_ORDER = [
  'ketu',
  'venus',
  'sun',
  'moon',
  'mars',
  'rahu',
  'jupiter',
  'saturn',
  'mercury',
] as const;
export type DashaLord = (typeof DASHA_LORDS_ORDER)[number];

export const DASHA_PERIOD_YEARS: Record<DashaLord, number> = {
  ketu: 7,
  venus: 20,
  sun: 6,
  moon: 10,
  mars: 7,
  rahu: 18,
  jupiter: 16,
  saturn: 19,
  mercury: 17,
};

const TOTAL_CYCLE_YEARS = Object.values(DASHA_PERIOD_YEARS).reduce((a, b) => a + b, 0); // 120

export interface DashaPeriod {
  readonly lord: DashaLord;
  readonly startAgeYears: number;
  readonly endAgeYears: number;
}

/** Владыка накшатры (порядок дашей циклически повторяется 3 раза на 27 накшатр). */
export function nakshatraDashaLord(nakshatraIndex: number): DashaLord {
  return DASHA_LORDS_ORDER[nakshatraIndex % 9]!;
}

/**
 * Полная последовательность 9 периодов маха-даши от рождения (в возрасте, годы), начиная с
 * остатка периода владыки накшатры Луны на момент рождения.
 */
export function computeVimshottariMahadashas(moonSiderealLongitudeDeg: number): DashaPeriod[] {
  const nak = nakshatraOf(moonSiderealLongitudeDeg);
  const nakshatraSpanDeg = 360 / 27;
  const fractionElapsed = nak.degreeInNakshatra / nakshatraSpanDeg;

  const startLordIndex = nak.index % 9;
  const startLord = DASHA_LORDS_ORDER[startLordIndex]!;
  const startLordFullYears = DASHA_PERIOD_YEARS[startLord];
  const balanceYears = startLordFullYears * (1 - fractionElapsed);

  const periods: DashaPeriod[] = [];
  let cursor = 0;
  periods.push({ lord: startLord, startAgeYears: cursor, endAgeYears: balanceYears });
  cursor = balanceYears;

  for (let i = 1; i < 9; i++) {
    const lord = DASHA_LORDS_ORDER[(startLordIndex + i) % 9]!;
    const dur = DASHA_PERIOD_YEARS[lord];
    periods.push({ lord, startAgeYears: cursor, endAgeYears: cursor + dur });
    cursor += dur;
  }

  return periods;
}

export { TOTAL_CYCLE_YEARS };
