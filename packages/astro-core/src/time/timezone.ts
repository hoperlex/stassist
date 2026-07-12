/**
 * Перевод гражданского (местного) времени рождения в UTC по IANA tz-идентификатору.
 *
 * Не используем внешние библиотеки (luxon/date-fns-tz): движок Node.js (ICU, полный tzdb)
 * уже умеет отдавать исторические смещения часовых поясов через `Intl.DateTimeFormat`
 * (включая LMT-эпоху до введения поясного времени) — этого достаточно и не добавляет
 * лишней зависимости. Алгоритм — стандартный приём «угадать смещение → уточнить»,
 * применяемый во всех подобных библиотеках.
 */
import type { BirthDateTime } from '@stassist/shared';

/** Смещение таймзоны (в минутах, восток — положительное) в момент `utcInstantMs`. */
function tzOffsetMinutesAt(utcInstantMs: number, tzId: string): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tzId,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const parts = dtf.formatToParts(new Date(utcInstantMs));
  const get = (type: string): number => Number(parts.find((p) => p.type === type)?.value ?? '0');
  // "Как если бы" компоненты локального времени были UTC — разница с реальным UTC-моментом
  // и есть смещение пояса в этот момент.
  const asIfUtc = new Date(0);
  asIfUtc.setUTCFullYear(get('year'), get('month') - 1, get('day'));
  asIfUtc.setUTCHours(get('hour'), get('minute'), get('second'), 0);
  return (asIfUtc.getTime() - utcInstantMs) / 60000;
}

/**
 * Переводит гражданское время `dt` в часовом поясе `tzId` в момент UTC.
 *
 * Двухшаговая итерация: сначала считаем стенные компоненты «как если бы» они были UTC,
 * находим смещение в этот момент, уточняем; повторяем ещё раз (нужно для стабильности
 * рядом с переходами летнего/зимнего времени). Для неоднозначного часа при переводе стрелок
 * назад берём результат второй итерации (детерминированно, без дополнительного UI-выбора —
 * это осознанное упрощение, задокументировано в ACCURACY.md).
 *
 * @throws {RangeError} если `tzId` не распознан ICU (Intl бросит `RangeError` сам).
 */
export function localWallTimeToUtc(dt: BirthDateTime, tzId: string): Date {
  const wallAsUtc = new Date(0);
  wallAsUtc.setUTCFullYear(dt.year, dt.month - 1, dt.day);
  wallAsUtc.setUTCHours(dt.hour, dt.minute, dt.second, 0);
  const wallAsUtcMs = wallAsUtc.getTime();

  const offset1 = tzOffsetMinutesAt(wallAsUtcMs, tzId);
  let utcMs = wallAsUtcMs - offset1 * 60000;

  const offset2 = tzOffsetMinutesAt(utcMs, tzId);
  if (offset2 !== offset1) {
    utcMs = wallAsUtcMs - offset2 * 60000;
  }

  return new Date(utcMs);
}
