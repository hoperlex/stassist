/**
 * Серверные fetch-обёртки над `/api/v1/horoscopes/*` (см. apps/api/src/routes/horoscopes.ts) —
 * используются `+data.ts` хуками страниц гороскопов (requirement 3 промта Ф5). Деградируют до
 * `null` при ошибке сети/503 — страница обязана показать честный empty-state, а не упасть (тот
 * же принцип, что apps/web/pages/sovmestimost/@pair/+data.ts).
 */
import type { HoroscopeResponse, HoroscopeProfessionSlug } from '@stassist/shared';
import { serverApiGet } from './server-api.js';

async function safeGet(path: string): Promise<HoroscopeResponse | null> {
  try {
    return await serverApiGet<HoroscopeResponse>(path);
  } catch {
    return null;
  }
}

/** `year` — только для period='year' (см. apps/api/src/routes/horoscopes.ts doc-комментарий):
 *  явный год из URL `/goroskop/{yyyy}/{znak}`, а не «текущий». */
export function fetchZodiacHoroscope(signEn: string, period: string, topic: string, year?: number): Promise<HoroscopeResponse | null> {
  const suffix = year ? `?year=${year}` : '';
  return safeGet(`/horoscopes/zodiac/${signEn}/${period}/${topic}${suffix}`);
}

export function fetchEasternHoroscope(yyyy: string, animalEn: string): Promise<HoroscopeResponse | null> {
  return safeGet(`/horoscopes/eastern/${yyyy}/${animalEn}`);
}

export function fetchLunarDayHoroscope(n: number): Promise<HoroscopeResponse | null> {
  return safeGet(`/horoscopes/lunar-day/${n}`);
}

export function fetchHumorZodiacHoroscope(signEn: string): Promise<HoroscopeResponse | null> {
  return safeGet(`/horoscopes/humor/zodiac/${signEn}`);
}

export function fetchHumorProfessionHoroscope(slug: HoroscopeProfessionSlug): Promise<HoroscopeResponse | null> {
  return safeGet(`/horoscopes/humor/profession/${slug}`);
}
