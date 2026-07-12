/**
 * Ба-цзы (四柱八字, «4 столпа судьбы») — отдельный календарный модуль без эфемерид: 10 небесных
 * стволов (天干) × 12 земных ветвей (地支) → 60-летний/60-дневный цикл, 5 стихий (五行).
 *
 * МЕТОДИКА ТРЕБУЕТ СВЕРКИ ЗАКАЗЧИКОМ (см. ACCURACY.md) в двух местах, явно помеченных ниже:
 *  1. Столп дня — опорная дата 1900-01-31 = 甲辰 (Цзя-Чэнь), широко цитируемый в открытых
 *     источниках якорь 60-дневного цикла; не сверен нами с первоисточником напрямую.
 *  2. Столп месяца — использует ГРАНИЦЫ КАЛЕНДАРНЫХ МЕСЯЦЕВ как приближение вместо точных
 *     солнечных термов (節氣/цзеци), которые определяют настоящие границы месяцев Ба-цзы
 *     (обычно 4–8 число григорианского месяца ± несколько дней). Это упрощение MVP.
 * Столп года (по началу года ~4 февраля, Личунь 立春 — приближённая дата, тот же тип упрощения)
 * — год начинается 4 февраля (округлённая дата Личунь), опорный год 1984 = 甲子 (Цзя-Цзы,
 * начало 60-летнего цикла) — широко известный, высокая уверенность.
 */
export const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const;
export const EARTHLY_BRANCHES = [
  '子',
  '丑',
  '寅',
  '卯',
  '辰',
  '巳',
  '午',
  '未',
  '申',
  '酉',
  '戌',
  '亥',
] as const;

export const STEM_ELEMENT: readonly string[] = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水'];
export const BRANCH_ELEMENT: readonly string[] = [
  '水',
  '土',
  '木',
  '木',
  '土',
  '火',
  '火',
  '土',
  '金',
  '金',
  '土',
  '水',
];

export interface Pillar {
  readonly stemIndex: number;
  readonly branchIndex: number;
  readonly stem: string;
  readonly branch: string;
  readonly element: string;
}

function makePillar(stemIndex: number, branchIndex: number): Pillar {
  const s = ((stemIndex % 10) + 10) % 10;
  const b = ((branchIndex % 12) + 12) % 12;
  return { stemIndex: s, branchIndex: b, stem: HEAVENLY_STEMS[s]!, branch: EARTHLY_BRANCHES[b]!, element: STEM_ELEMENT[s]! };
}

/** «Личунь» (立春, начало года Ба-цзы) — приближённо 4 февраля (см. предупреждение в шапке файла). */
const LICHUN_APPROX_MONTH = 2;
const LICHUN_APPROX_DAY = 4;

const YEAR_CYCLE_REFERENCE = 1984; // 甲子 (Цзя-Цзы) — высокая уверенность, общеизвестный факт.

export function yearPillar(gregorianYear: number, month: number, day: number): Pillar {
  const baziYear =
    month < LICHUN_APPROX_MONTH || (month === LICHUN_APPROX_MONTH && day < LICHUN_APPROX_DAY)
      ? gregorianYear - 1
      : gregorianYear;
  const offset = baziYear - YEAR_CYCLE_REFERENCE;
  return makePillar(offset, offset); // 1984 = 甲子 (индекс ствола 0, ветви 0) — общеизвестный якорь.
}

/** Юлианский день (целое число, полдень) для григорианской даты — алгоритм Флигеля—Ван Фландерна. */
export function gregorianToJdn(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

/** Опорная дата 1900-01-31 = 甲辰 (Цзя-Чэнь) — см. предупреждение в шапке файла. */
const DAY_PILLAR_REFERENCE_JDN = gregorianToJdn(1900, 1, 31);
const DAY_PILLAR_REFERENCE_STEM = 0; // 甲
const DAY_PILLAR_REFERENCE_BRANCH = 4; // 辰

export function dayPillar(gregorianYear: number, month: number, day: number): Pillar {
  const jdn = gregorianToJdn(gregorianYear, month, day);
  const diff = jdn - DAY_PILLAR_REFERENCE_JDN;
  return makePillar(DAY_PILLAR_REFERENCE_STEM + diff, DAY_PILLAR_REFERENCE_BRANCH + diff);
}

/** «Пять тигров» (五虎遁): ствол месяца Инь (寅, первый месяц) по стволу года. */
const FIVE_TIGERS_YIN_MONTH_STEM: readonly number[] = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0]; // индекс по stemIndex года 0..9

/** Столп месяца — ветвь по приближённой границе календарного месяца (см. шапку файла), ствол — по «пяти тиграм». */
export function monthPillar(gregorianYear: number, month: number, day: number): Pillar {
  const yp = yearPillar(gregorianYear, month, day);
  // Месяц Ба-цзы начинается ~4 числа месяца; ветвь месяца: Инь(2)=1-й месяц Ба-цзы (примерно февраль).
  const approxBaziMonthIndex = day < LICHUN_APPROX_DAY ? (month - 2 + 12) % 12 : (month - 1) % 12;
  const branchIndex = (2 + approxBaziMonthIndex) % 12; // 2=寅 (первая ветвь месяца Ба-цзы)
  const monthStemBase = FIVE_TIGERS_YIN_MONTH_STEM[yp.stemIndex]!;
  const stemIndex = monthStemBase + approxBaziMonthIndex;
  return makePillar(stemIndex, branchIndex);
}

/** «Пять крыс» (五鼠遁): ствол часа Цзы (子, 23–01ч) по стволу дня. */
const FIVE_RATS_ZI_HOUR_STEM: readonly number[] = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];

/** Столп часа: ветвь — по 2-часовым интервалам (Цзы = 23:00–00:59), ствол — по «пяти крысам». */
export function hourPillar(gregorianYear: number, month: number, day: number, hour: number): Pillar {
  const dp = dayPillar(gregorianYear, month, day);
  const branchIndex = Math.floor(((hour + 1) % 24) / 2);
  const stemBase = FIVE_RATS_ZI_HOUR_STEM[dp.stemIndex]!;
  return makePillar(stemBase + branchIndex, branchIndex);
}

export interface FourPillars {
  readonly year: Pillar;
  readonly month: Pillar;
  readonly day: Pillar;
  readonly hour: Pillar;
}

export function computeFourPillars(gregorianYear: number, month: number, day: number, hour: number): FourPillars {
  return {
    year: yearPillar(gregorianYear, month, day),
    month: monthPillar(gregorianYear, month, day),
    day: dayPillar(gregorianYear, month, day),
    hour: hourPillar(gregorianYear, month, day, hour),
  };
}
