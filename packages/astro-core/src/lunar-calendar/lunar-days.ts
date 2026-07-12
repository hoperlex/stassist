/**
 * Лунные дни (русская традиция): границы по восходам Луны для геолокации; 1-й день — от
 * новолуния до первого восхода Луны после него (см. docs/research/02-алгоритмы-и-библиотеки.md §2).
 * Использует `astronomy-engine.SearchRiseSet` (готовая функция восходов/заходов).
 */
import * as AE from 'astronomy-engine';

export interface LunarDayResult {
  readonly dayNumber: number;
  readonly startTime: AE.AstroTime;
  /** `null`, если следующий восход не найден в разумном горизонте (циркумполярный случай). */
  readonly endTime: AE.AstroTime | null;
}

const MAX_DAYS_SAFETY = 32;

/** Ближайшее новолуние ДО (или в момент) `referenceTime`. */
function precedingNewMoon(referenceTime: AE.AstroTime): AE.AstroTime {
  const cursor = referenceTime.AddDays(-40);
  let newMoon = AE.SearchMoonPhase(0, cursor, 45);
  if (!newMoon) throw new Error('Не удалось найти новолуние в окне поиска — неожиданная ошибка');
  for (;;) {
    const next = AE.SearchMoonPhase(0, newMoon.AddDays(1), 35);
    if (!next || next.ut > referenceTime.ut) break;
    newMoon = next;
  }
  return newMoon;
}

/** Находит текущий лунный день на момент `referenceTime` для наблюдателя `observer`. */
export function findLunarDay(observer: AE.Observer, referenceTime: AE.AstroTime): LunarDayResult {
  const newMoon = precedingNewMoon(referenceTime);

  let dayStart = newMoon;
  let dayNumber = 1;
  for (let i = 0; i < MAX_DAYS_SAFETY; i++) {
    const rise = AE.SearchRiseSet(AE.Body.Moon, observer, 1, dayStart.AddDays(0.001), 3);
    if (!rise) {
      return { dayNumber, startTime: dayStart, endTime: null };
    }
    if (rise.ut > referenceTime.ut) {
      return { dayNumber, startTime: dayStart, endTime: rise };
    }
    dayStart = rise;
    dayNumber++;
  }
  return { dayNumber, startTime: dayStart, endTime: null };
}
