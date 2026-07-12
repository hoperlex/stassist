/**
 * Выбор «события дня» для «Неба дня» (Ф9, см. docs/strategy/11-соцраздел-созвездие.md §3) —
 * ЧИСТАЯ детерминированная функция над фактами дня (astro_calendar + notableAspects), без I/O.
 *
 * Приоритет (яркость события для массового читателя, по убыванию):
 *   1) ингресс планеты в знак («Марс входит в Весы») — редкое и наглядное;
 *   2) точная фаза Луны (ново/полнолуние) — культурно самое узнаваемое;
 *   3) станция ретро (тело появилось в retrogradeBodies — упрощение MVP: сам список станций
 *      astro_calendar не хранит, поэтому «ретро продолжается» тоже допустимый повод);
 *   4) самый точный мажорный аспект дня (орбис минимален);
 *   5) fallback — Луна в знаке (есть всегда).
 *
 * Луна из ингрессов исключается: она меняет знак каждые ~2.5 дня — это и есть fallback (5),
 * а не «событие» уровня (1).
 */
import type { NotableAspectFact } from '@stassist/llm';
import { aspectNameRu, objectNameRu } from '@stassist/llm';
import { signByIndex, type SkyDayEvent } from '@stassist/shared';
import type { DaySkyFact } from '../horoscope/astro-day-facts.js';

const EXACT_PHASES = new Set(['new', 'full']);

const PHASE_TITLE_RU: Record<string, string> = {
  new: 'Новолуние',
  full: 'Полнолуние',
  first_quarter: 'Первая четверть Луны',
  last_quarter: 'Последняя четверть Луны',
  waxing_crescent: 'Растущая Луна',
  waxing_gibbous: 'Растущая Луна',
  waning_gibbous: 'Убывающая Луна',
  waning_crescent: 'Убывающая Луна',
};

/** Родительный падеж («Девы») — для оборотов «в знак/в знаке …» (явные формы из ZODIAC_SIGNS,
 *  алгоритмического склонения в проекте нет — см. заголовок schemas/zodiac.ts). */
function signGenitiveRu(signIndex: number): string {
  return signByIndex(signIndex)?.nameRuGenitive ?? `знака №${signIndex + 1}`;
}

export interface SelectedDayEvent {
  event: SkyDayEvent;
  /** Готовый заголовок дня («Марс входит в Весы»). */
  title: string;
}

export function selectDayEvent(fact: DaySkyFact, notableAspects: readonly NotableAspectFact[]): SelectedDayEvent {
  const ingress = fact.signIngresses.find((i) => i.body !== 'moon');
  if (ingress) {
    return {
      event: { kind: 'ingress', body: ingress.body, signIndex: ingress.toSignIndex },
      title: `${objectNameRu(ingress.body)} входит в знак ${signGenitiveRu(ingress.toSignIndex)}`,
    };
  }

  if (EXACT_PHASES.has(fact.phaseName)) {
    return {
      event: { kind: 'moon_phase', phaseName: fact.phaseName, signIndex: fact.moonSignIndex },
      title: `${PHASE_TITLE_RU[fact.phaseName]} в знаке ${signGenitiveRu(fact.moonSignIndex)}`,
    };
  }

  const retro = fact.retrogradeBodies.find((b) => b !== 'moon' && b !== 'sun');
  if (retro) {
    return {
      event: { kind: 'retro_station', body: retro },
      title: `Ретроградный ${objectNameRu(retro)}`,
    };
  }

  const topAspect = [...notableAspects].sort((a, b) => a.orbDeg - b.orbDeg)[0];
  if (topAspect) {
    return {
      event: { kind: 'aspect', aspect: { ...topAspect, angle: topAspect.angle } },
      title: `${objectNameRu(topAspect.bodyA)} — ${aspectNameRu(topAspect.angle)} — ${objectNameRu(topAspect.bodyB)}`,
    };
  }

  return {
    event: { kind: 'moon_sign', signIndex: fact.moonSignIndex },
    title: `Луна в знаке ${signGenitiveRu(fact.moonSignIndex)}`,
  };
}
