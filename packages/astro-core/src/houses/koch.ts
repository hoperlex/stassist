/**
 * Кох (Birthplace system) — приближённая реализация.
 *
 * ЧЕСТНОЕ ОГРАНИЧЕНИЕ (см. `packages/astro-core/ACCURACY.md`): классическая формула Коха делит
 * не саму дугу RAMC→Asc, а долю СОБСТВЕННОЙ полудуги восхождения MC/IC (аналогично Плацидусу,
 * но с фиксированной, не итерируемой восходящей разностью). Несколько опробованных вариантов
 * этой классической формулы (с восходящей разностью MC/IC, разными знаками/долями) на тестовых
 * картах давали НЕМОНОТОННЫЕ куспиды (дом 2 «до» Асцендента) — то есть неверны, и мы не готовы
 * публиковать неверную формулу под видом точной.
 *
 * Вместо этого здесь — прозрачно заявленное приближение: линейная интерполяция по прямому
 * восхождению (RA) между уже точно известными угловыми куспидами (MC↔Asc для 11/12, Asc↔IC для
 * 2/3), с переводом результата обратно в эклиптическую долготу (β=0). Даёт монотонные,
 * самосогласованные куспиды, качественно близкие к Плацидусу на средних широтах — НО НЕ
 * идентичные эталонным таблицам классического Коха. Куспиды 1/4/7/10 точны (это углы карты).
 * Требует замены на точную формулу при сверке с эталонным источником перед продакшен-показом
 * пользователю системы Коха.
 */
import { eclipticLongitudeOfRa, raOfEclipticPoint } from './ascendant-mc.js';
import { normalizeDegrees } from '../util/angles.js';
import type { HouseComputationContext, HouseCusps } from './types.js';

function interpolateByRa(raStart: number, raEnd: number, fraction: number, epsDeg: number): number {
  const arc = normalizeDegrees(raEnd - raStart) || 360;
  const ra = normalizeDegrees(raStart + arc * fraction);
  return eclipticLongitudeOfRa(ra, epsDeg);
}

export function kochHouses(ctx: HouseComputationContext): HouseCusps | null {
  const { ramcDeg: ramc, obliquityDeg: eps, ascDeg: asc, mcDeg: mc } = ctx;

  const raAsc = raOfEclipticPoint(asc, eps);
  const raIc = normalizeDegrees(ramc + 180);

  const l11 = interpolateByRa(ramc, raAsc, 1 / 3, eps);
  const l12 = interpolateByRa(ramc, raAsc, 2 / 3, eps);
  const l2 = interpolateByRa(raAsc, raIc, 1 / 3, eps);
  const l3 = interpolateByRa(raAsc, raIc, 2 / 3, eps);

  const cusps = new Array<number>(12);
  cusps[0] = asc;
  cusps[1] = normalizeDegrees(l2);
  cusps[2] = normalizeDegrees(l3);
  cusps[3] = normalizeDegrees(mc + 180);
  cusps[4] = normalizeDegrees(l11 + 180);
  cusps[5] = normalizeDegrees(l12 + 180);
  cusps[6] = normalizeDegrees(asc + 180);
  cusps[7] = normalizeDegrees(l2 + 180);
  cusps[8] = normalizeDegrees(l3 + 180);
  cusps[9] = normalizeDegrees(mc);
  cusps[10] = normalizeDegrees(l11);
  cusps[11] = normalizeDegrees(l12);

  return { cusps };
}
