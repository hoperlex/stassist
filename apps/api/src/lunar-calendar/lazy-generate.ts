/**
 * Ленивая генерация `astro_calendar` «при заходе» (находка [lunnyj-kalendar-empty]: до этой
 * фичи таблица заполнялась ТОЛЬКО суточным cron worker'а — окно ВСЕГДА строилось вперёд от даты
 * первого прогона, поэтому свежий деплой отдавал пустой лунный календарь до ~суток, а прошлые
 * месяцы/уже прошедшие дни текущего месяца оставались пустыми НАВСЕГДА, т.к. cron их не покрывал
 * никогда). Тот же принцип, что `apps/api/src/horoscope/lazy-generate.ts` (`ensureZodiacHoroscope`
 * и др.): если строк на запрошенный период нет — считаем синхронно прямо в HTTP-запросе и
 * кэшируем (upsert) на будущее. В отличие от гороскопов, здесь считать ДЕШЕВЛЕ и без LLM —
 * `@stassist/astro-core` детерминированно и быстро (эфемериды, без сети/провайдера), поэтому
 * достаточно синхронного пути без отдельной async-очереди. cron worker'а (см. apps/worker/src/
 * astro-calendar) продолжает независимо досчитывать окно вперёд — эта функция просто закрывает
 * разрыв там, где cron ещё (или уже никогда) не дотянулся.
 */
import { buildAstroCalendarWindow } from '@stassist/astro-core';
import type { Db } from '@stassist/db';
import {
  daysInMonth,
  findAstroCalendarMonth,
  upsertAstroCalendarDays,
  type AstroCalendarRow,
} from '../repositories/astro-calendar-repository.js';

/** ЧИСТАЯ функция (без I/O) — покрывается unit-тестом на границы месяца/года, см.
 *  lazy-generate.test.ts. */
export function shiftDateIso(dateIso: string, deltaDays: number): string {
  const [y, m, d] = dateIso.split('-').map(Number) as [number, number, number];
  return new Date(Date.UTC(y, m - 1, d + deltaDays)).toISOString().slice(0, 10);
}

/**
 * Гарантирует, что месяц `yyyyMm` ('YYYY-MM') полностью посчитан в `astro_calendar`, и
 * возвращает его строки. Если хотя бы один день отсутствует — пересчитывает и апсертит ВЕСЬ
 * месяц целиком (та же батч-экономия, что у гороскопов: один визит примирует весь месяц срезу,
 * а не по одному дню за запрос; upsert идемпотентен — уже верные дни просто перезаписываются тем
 * же значением).
 *
 * Окно считается на ОДИН день ШИРЕ месяца назад (см. doc-комментарий `buildAstroCalendarWindow`
 * про ингрессы относительно ПРЕДЫДУЩЕГО дня): этот лишний день нужен только для корректных
 * ингрессов 1-го числа месяца, сам он в БД НЕ апсертится — чтобы случайно не деградировать уже
 * посчитанный день соседнего (предыдущего) месяца до «первого дня окна без ингрессов».
 */
export async function ensureAstroCalendarMonth(db: Db, yyyyMm: string): Promise<AstroCalendarRow[]> {
  const total = daysInMonth(yyyyMm);
  const existing = await findAstroCalendarMonth(db, yyyyMm);
  if (existing.length >= total) return existing;

  const firstDayOfMonth = `${yyyyMm}-01`;
  const extendedStart = shiftDateIso(firstDayOfMonth, -1);
  const window = buildAstroCalendarWindow(extendedStart, total + 1);
  const monthOnly = window.slice(1); // отбрасываем «разогревочный» день до начала месяца
  await upsertAstroCalendarDays(db, monthOnly);
  return findAstroCalendarMonth(db, yyyyMm);
}
