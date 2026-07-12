/**
 * Хирон (астероид 2060 Chiron) — видимая геоцентрическая эклиптическая долгота/широта эпохи
 * даты, интерполяцией по предрассчитанной кусочной аппроксимации Чебышёва.
 *
 * Модуль ЧИСТЫЙ (без I/O, без сети) — использует только закоммиченную таблицу коэффициентов
 * `chiron-data.generated.ts`, которую строит оффлайн-скрипт `tools/gen-chiron.ts` из данных
 * JPL Horizons (see его шапку — там же обоснование системы координат и точности).
 *
 * Почему вообще так: ни `astronomy-engine`, ни другая open-source JS-библиотека без Swiss
 * Ephemeris не считают позиции малых тел/астероидов — только большие планеты. JPL Horizons —
 * официальный государственный источник; предрасчитанная и закоммиченная таблица избавляет
 * рантайм от сетевых обращений, сохраняя точность ~1' на диапазоне 1900–2100.
 */
import {
  CHIRON_CHEBYSHEV_WINDOWS,
  CHIRON_RANGE_JD_TT,
  type ChironChebyshevWindow,
} from './chiron-data.generated.js';

export class ChironOutOfRangeError extends Error {
  constructor(jdTT: number) {
    super(`Хирон: дата вне диапазона таблицы эфемерид (JD TT=${jdTT})`);
    this.name = 'ChironOutOfRangeError';
  }
}

export interface ChironPosition {
  /** Видимая геоцентрическая эклиптическая долгота эпохи даты, градусы, [0,360). */
  readonly longitudeDeg: number;
  /** Видимая геоцентрическая эклиптическая широта эпохи даты, градусы. */
  readonly latitudeDeg: number;
  /** Производная долготы по времени, град/сутки — знак определяет ретроградность. */
  readonly speedLongDegPerDay: number;
  readonly isRetrograde: boolean;
}

/**
 * Находит окно, покрывающее `jdTT` (бинарный поиск — таблица маленькая, ~200 записей, но
 * структура на будущее не помешает). Окна стыкуются без зазоров: jdEndTT[i] === jdStartTT[i+1].
 */
function findWindow(jdTT: number): ChironChebyshevWindow {
  if (jdTT < CHIRON_RANGE_JD_TT.start || jdTT > CHIRON_RANGE_JD_TT.end) {
    throw new ChironOutOfRangeError(jdTT);
  }

  let lo = 0;
  let hi = CHIRON_CHEBYSHEV_WINDOWS.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    const window = CHIRON_CHEBYSHEV_WINDOWS[mid]!;
    if (jdTT > window.jdEndTT) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }

  const found = CHIRON_CHEBYSHEV_WINDOWS[lo];
  if (!found || jdTT < found.jdStartTT || jdTT > found.jdEndTT) {
    throw new ChironOutOfRangeError(jdTT);
  }
  return found;
}

/**
 * Значение ряда Чебышёва и его производная по x в точке x — одновременно, по стандартной
 * совместной рекуррентной формуле (T_0=1,T_1=x,T_k=2x·T_{k-1}-T_{k-2};
 * T_0'=0,T_1'=1,T_k'=2·T_{k-1}+2x·T_{k-1}'-T_{k-2}'). Численно устойчиво, аналитическая точность.
 */
function evalChebyshevSeriesWithDerivative(
  coeffs: readonly number[],
  x: number,
): { value: number; derivative: number } {
  const n = coeffs.length;
  if (n === 0) return { value: 0, derivative: 0 };

  let tPrev = 1; // T_0(x)
  let tCurr = x; // T_1(x)
  let dPrev = 0; // T_0'(x)
  let dCurr = 1; // T_1'(x)

  let value = coeffs[0]! * tPrev;
  let derivative = coeffs[0]! * dPrev;
  if (n > 1) {
    value += coeffs[1]! * tCurr;
    derivative += coeffs[1]! * dCurr;
  }

  for (let k = 2; k < n; k++) {
    const tNext = 2 * x * tCurr - tPrev;
    const dNext = 2 * tCurr + 2 * x * dCurr - dPrev;
    value += coeffs[k]! * tNext;
    derivative += coeffs[k]! * dNext;
    tPrev = tCurr;
    tCurr = tNext;
    dPrev = dCurr;
    dCurr = dNext;
  }

  return { value, derivative };
}

/** Позиция Хирона (видимая геоцентрическая эклиптическая, эпохи даты) в момент `jdTT` (JD TT). */
export function chironPosition(jdTT: number): ChironPosition {
  const window = findWindow(jdTT);

  const halfSpan = (window.jdEndTT - window.jdStartTT) / 2;
  const x = (jdTT - window.jdStartTT) / halfSpan - 1; // нормализация в [-1,1]
  const dxdt = 1 / halfSpan; // производная x по jdTT, сутки^-1

  const lon = evalChebyshevSeriesWithDerivative(window.lonCoeffs, x);
  const lat = evalChebyshevSeriesWithDerivative(window.latCoeffs, x);

  // Ряд долготы — развёрнутый (unwrapped); приводим к [0,360) только на выходе.
  const longitudeDeg = ((lon.value % 360) + 360) % 360;
  const speedLongDegPerDay = lon.derivative * dxdt;

  return {
    longitudeDeg,
    latitudeDeg: lat.value,
    speedLongDegPerDay,
    isRetrograde: speedLongDegPerDay < 0,
  };
}
