/**
 * Сборка содержимого строки `sky_days` (Ф9): payload (событие + факты — антигаллюцинационное
 * основание текста, тот же принцип, что `horoscopes.astro_events`) и обезличенный транзитный
 * снапшот дня в форме `SharePositions`.
 *
 * Почему SharePositions, а не «сырые» позиции: одна форма кормит сразу три потребителя —
 * ChartWheel на SSR-странице дня, вторую карту share-карточки `transit_day` (OG-конвейер как у
 * synastry) и проекцию к наталу в API (routes/sky.ts достаёт из bodies долготу+скорость). Дома/
 * углы у транзитного снапшота не считаются (нет места наблюдения — небо «одно на всех»):
 * `meta.noHouses=true`, углы — нулевые заглушки, ChartWheel их не рисует (тот же контракт, что
 * у карт с неизвестным временем рождения, см. chartMetaSchema.noHouses).
 *
 * Снимок берётся на референсный час опорной локации (Москва) — консистентно с
 * `computeNotableAspectsToday` (см. doc-комментарий horoscope/astro-day-facts.ts).
 */
import {
  bodyGeocentricPosition,
  detectAspects,
  localWallTimeToUtc,
  PLANET_BODIES,
  resolveTime,
  sunApparentPosition,
  type AspectableBody,
} from '@stassist/astro-core';
import type { NotableAspectFact } from '@stassist/llm';
import {
  sharePositionsSchema,
  type SharePositions,
  type SkyDayEvent,
  type SkyDayPayload,
} from '@stassist/shared';
import { CALENDAR_REFERENCE_LOCATION, REFERENCE_SNAPSHOT_HOUR } from '../astro-calendar/reference-location.js';
import type { DaySkyFact } from '../horoscope/astro-day-facts.js';

interface RawPosition {
  longitudeDeg: number;
  latitudeDeg: number;
  distanceAu: number | null;
  speedLongDegPerDay: number;
}

function toPosition(raw: RawPosition): SharePositions['bodies']['sun'] {
  const lon = ((raw.longitudeDeg % 360) + 360) % 360;
  const signIndex = Math.min(11, Math.floor(lon / 30));
  return {
    longitudeDeg: lon,
    latitudeDeg: raw.latitudeDeg,
    distanceAu: raw.distanceAu,
    speedLongDegPerDay: raw.speedLongDegPerDay,
    isRetrograde: raw.speedLongDegPerDay < 0,
    signIndex,
    signDegree: lon - signIndex * 30,
    houseNumber: null,
  };
}

const STUB_ANGLES: SharePositions['angles'] = { ascDeg: 0, mcDeg: 0, dscDeg: 0, icDeg: 0, armcDeg: 0, vertexDeg: null };

/** Обезличенный транзитный снапшот неба на референсный час `dayKey` — детерминирован от даты. */
export function buildTransitSnapshot(dayKey: string): SharePositions {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dayKey);
  if (!match) throw new Error(`buildTransitSnapshot: dayKey "${dayKey}" не в формате YYYY-MM-DD`);
  const [, y, m, d] = match;
  const utc = localWallTimeToUtc(
    { year: Number(y), month: Number(m), day: Number(d), hour: REFERENCE_SNAPSHOT_HOUR, minute: 0, second: 0 },
    CALENDAR_REFERENCE_LOCATION.tzId,
  );
  const { astroTime } = resolveTime(utc);

  const sun = sunApparentPosition(astroTime);
  const moon = bodyGeocentricPosition('moon', astroTime);
  const bodies: Record<string, ReturnType<typeof toPosition>> = {
    sun: toPosition(sun),
    moon: toPosition(moon),
  };
  for (const body of PLANET_BODIES) {
    bodies[body] = toPosition(bodyGeocentricPosition(body, astroTime));
  }

  // Мажорные транзит-транзит аспекты дня — рисуются линиями внутри колеса дня.
  const aspectable: AspectableBody[] = Object.entries(bodies).map(([key, p]) => ({
    key,
    longitudeDeg: p.longitudeDeg,
    speedLongDegPerDay: p.speedLongDegPerDay,
  }));
  const aspects = detectAspects(aspectable, { aspectSet: 'major' });

  // .parse — та же активная whitelist-защита от ПД, что anonymizeChartData (strip лишних ключей).
  return sharePositionsSchema.parse({
    bodies,
    points: {},
    angles: STUB_ANGLES,
    houses: [],
    aspects,
    meta: { houseSystem: 'placidus', zodiac: 'tropical', noHouses: true },
  });
}

export function buildSkyDayPayload(
  fact: DaySkyFact,
  notableAspects: readonly NotableAspectFact[],
  event: SkyDayEvent,
): SkyDayPayload {
  return {
    event,
    notableAspects: notableAspects.map((a) => ({ bodyA: a.bodyA, bodyB: a.bodyB, angle: a.angle, orbDeg: a.orbDeg })),
    moonSignIndex: fact.moonSignIndex,
    lunarDay: fact.lunarDay,
    phaseName: fact.phaseName,
    retrogradeBodies: [...fact.retrogradeBodies],
  };
}
