/**
 * packages/astro-core — расчётное ядро (чистый TS, без I/O): позиции планет, дома, аспекты,
 * прогностика (см. docs/architecture/21-техническая-архитектура.md §3).
 *
 * Публичный API: `computeChart(input: ChartInput): ChartData` (натал/транзит/т.п. — базовая
 * карта) + отдельные функции прогностики/root-finding для соляров, прогрессий, дирекций,
 * композита, Davison, void-of-course и т.д. (см. README/ACCURACY.md).
 */
export { ASTRO_CORE_VERSION } from './version.js';
export { computeChart } from './chart.js';

// --- время ---
export { localWallTimeToUtc } from './time/timezone.js';
export { resolveTime, J2000_JD, tjyFromJdTT, centuriesTTFromJdTT } from './time/julian-day.js';
export { gmstDegrees, gastDegrees, ramcDegrees } from './time/sidereal-time.js';

// --- эфемериды ---
export { sunApparentPosition, sunApparentLongitudeDeg } from './ephemeris/sun-vsop87.js';
export { bodyGeocentricPosition, PLANET_BODIES, type PlanetBody } from './ephemeris/planets.js';
export {
  meanNodeLongitudeDeg,
  trueNodeLongitudeDeg,
  meanLilithLongitudeDeg,
  selenaLongitudeDeg,
  trueLilithLongitudeDeg,
  NotImplementedError,
} from './ephemeris/nodes-lilith.js';
export { chironPosition, ChironOutOfRangeError, type ChironPosition } from './ephemeris/chiron.js';

// --- дома ---
export { computeHouses, POLAR_LATITUDE_LIMIT_DEG } from './houses/index.js';
export { ascLongitudeDeg, mcLongitudeDeg, declinationOfEclipticPoint, ascensionalDifferenceDeg } from './houses/ascendant-mc.js';

// --- аспекты ---
export { detectAspects, type AspectableBody, type DetectAspectsConfig } from './aspects/index.js';
export { ASPECT_ANGLE_DEG, MAJOR_ASPECTS, MINOR_ASPECTS, DEFAULT_ORB_BY_ASPECT } from './aspects/presets.js';

// --- root-finding / прогностика ---
export { brentRoot, scanForBracket } from './rootfinding/brent.js';
export { findTimeOfLongitude, findAllTimesOfLongitude, ttToAstroTime } from './rootfinding/longitude-search.js';
export { findAllTimesOfRelativeAspect } from './rootfinding/relative-aspect-search.js';
export { findNextIngress, type IngressEvent } from './rootfinding/ingresses.js';
export { findExactTransitAspects } from './rootfinding/transits.js';
export { findMoonVoidOfCourse, type VoidOfCourseResult } from './rootfinding/void-of-course.js';
export {
  findSolarReturnTT,
  findSolarReturnNearAge,
  findLunarReturnTT,
  findLunarReturnNearMonth,
} from './rootfinding/returns.js';

export {
  secondaryProgressedJdTT,
  computeSecondaryProgressionLongitudes,
  type ProgressedLongitudes,
} from './forecast/progressions.js';
export { symbolicDirectedLongitudeDeg, DEFAULT_DIRECTION_RATE_DEG_PER_YEAR } from './forecast/directions.js';
export { compositeLongitudeDeg, compositeLongitudes } from './forecast/composite.js';
export { davisonMidpoint, type DavisonMidpoint } from './forecast/davison.js';

// --- арабские части ---
export { fortunaLongitudeDeg, computeArabicPart, isDaySect, type ArabicPartResult } from './arabic-parts/fortuna.js';

// --- лунный календарь ---
export { moonPhaseAngleDeg, moonPhaseName, nextMoonQuarter, type MoonPhaseName, type MoonPhaseEvent } from './lunar-calendar/phases.js';
export { findLunarDay, type LunarDayResult } from './lunar-calendar/lunar-days.js';

// --- сидерика / джйотиш (про запас, см. ACCURACY.md) ---
export { ayanamshaDeg, toSiderealDeg } from './sidereal/ayanamsha.js';
export { nakshatraOf, NAKSHATRA_NAMES, type NakshatraPosition } from './sidereal/nakshatra.js';
export {
  computeVimshottariMahadashas,
  nakshatraDashaLord,
  DASHA_LORDS_ORDER,
  DASHA_PERIOD_YEARS,
  TOTAL_CYCLE_YEARS,
  type DashaLord,
  type DashaPeriod,
} from './sidereal/vimshottari-dasha.js';

// --- ба-цзы ---
export {
  computeFourPillars,
  yearPillar,
  monthPillar,
  dayPillar,
  hourPillar,
  gregorianToJdn,
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
  STEM_ELEMENT,
  BRANCH_ELEMENT,
  type Pillar,
  type FourPillars,
} from './bazi/index.js';

// --- утилиты углов (полезны в пакетах-потребителях: llm-сериализатор, ui) ---
export {
  normalizeDegrees,
  shortestDeltaDegrees,
  angularSeparationDegrees,
  signIndexOf,
  signDegreeOf,
  midpointShortArcDegrees,
  lerpAngleDegrees,
} from './util/angles.js';
