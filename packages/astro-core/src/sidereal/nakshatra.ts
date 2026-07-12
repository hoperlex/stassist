/**
 * Накшатры — 27 равных делений сидерического зодиака по 13°20′ (360/27), от 0° сидерической
 * Овна. Общепринятые названия и порядок паданов (25 каждая накшатра делится на 4 пады по
 * 3°20′) — стандартная, повсеместно принятая система (высокая уверенность).
 */
import { normalizeDegrees } from '../util/angles.js';

export const NAKSHATRA_NAMES = [
  'Ашвини',
  'Бхарани',
  'Криттика',
  'Рохини',
  'Мригашира',
  'Ардра',
  'Пунарвасу',
  'Пушья',
  'Ашлеша',
  'Магха',
  'Пурва Пхалгуни',
  'Уттара Пхалгуни',
  'Хаста',
  'Читра',
  'Свати',
  'Вишакха',
  'Анурадха',
  'Джьештха',
  'Мула',
  'Пурва Ашадха',
  'Уттара Ашадха',
  'Шравана',
  'Дхаништха',
  'Шатабхиша',
  'Пурва Бхадрапада',
  'Уттара Бхадрапада',
  'Ревати',
] as const;

const NAKSHATRA_SPAN_DEG = 360 / 27;
const PADA_SPAN_DEG = NAKSHATRA_SPAN_DEG / 4;

export interface NakshatraPosition {
  readonly index: number;
  readonly name: string;
  readonly pada: number;
  readonly degreeInNakshatra: number;
}

export function nakshatraOf(siderealLongitudeDeg: number): NakshatraPosition {
  const lon = normalizeDegrees(siderealLongitudeDeg);
  const index = Math.floor(lon / NAKSHATRA_SPAN_DEG) % 27;
  const degreeInNakshatra = lon - index * NAKSHATRA_SPAN_DEG;
  const pada = Math.floor(degreeInNakshatra / PADA_SPAN_DEG) + 1;
  return { index, name: NAKSHATRA_NAMES[index]!, pada, degreeInNakshatra };
}
