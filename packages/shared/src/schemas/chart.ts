/**
 * Zod-схемы `ChartInput`/`ChartData` — единый источник правды для расчётного ядра
 * (`packages/astro-core`), API и фронта (см. docs/architecture/21-техническая-архитектура.md §3.2,
 * docs/architecture/22-модель-данных.md §2).
 *
 * ВАЖНО про систему координат (см. docs/roadmap/31-конвенции-реализации.md §7): все долготы/
 * широты тел и точек в `ChartData` — это **видимая геоцентрическая эклиптическая долгота/широта
 * эпохи ДАТЫ** (precession + nutation + aberration + световое время), ВСЕГДА в тропическом
 * (не сидерическом) отсчёте от 0° Овна эпохи даты. Если `preset.zodiac === 'sidereal'`,
 * сидерическая долгота получается вычитанием `meta.ayanamshaDeg` — она не дублируется отдельным
 * полем у каждого тела, чтобы не расходиться с исходной тропической долготой.
 */
import { z } from 'zod';

// ---------------------------------------------------------------------------------------------
// Входные данные
// ---------------------------------------------------------------------------------------------

/** Гражданская дата/время рождения (локальное время места, БЕЗ часового пояса — он в `tzId`). */
export const birthDateTimeSchema = z.object({
  year: z.number().int().min(-4000).max(4000),
  month: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(31),
  hour: z.number().int().min(0).max(23).default(12),
  minute: z.number().int().min(0).max(59).default(0),
  second: z.number().int().min(0).max(59).default(0),
});
export type BirthDateTime = z.infer<typeof birthDateTimeSchema>;

/** Географическое место рождения/события. */
export const geoPlaceSchema = z.object({
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  elevationM: z.number().default(0),
});
export type GeoPlace = z.infer<typeof geoPlaceSchema>;

export const houseSystemSchema = z.enum([
  'placidus',
  'koch',
  'regiomontanus',
  'porphyry',
  'equal',
  'whole_sign',
]);
export type HouseSystem = z.infer<typeof houseSystemSchema>;

export const zodiacTypeSchema = z.enum(['tropical', 'sidereal']);
export type ZodiacType = z.infer<typeof zodiacTypeSchema>;

export const ayanamshaSchema = z.enum(['lahiri', 'raman', 'kp', 'fagan_bradley', 'yukteswar']);
export type Ayanamsha = z.infer<typeof ayanamshaSchema>;

/** Набор тел/точек, которые нужно включить в расчёт (все по умолчанию включены/умолчания ниже). */
export const bodySetSchema = z.object({
  /** Истинный (осциллирующий) узел вместо среднего. По умолчанию — средний узел. */
  trueNode: z.boolean().default(false),
  /**
   * Истинная (оскулирующая) Лилит вместо средней. В MVP (версия 1.x ядра) НЕ реализована —
   * при `true` `computeChart` бросает `NotImplementedError`. См. ACCURACY.md.
   */
  trueLilith: z.boolean().default(false),
  /** Селена (точка напротив средней Лилит, конвенция московской школы). */
  selena: z.boolean().default(true),
  chiron: z.boolean().default(true),
});
export type BodySet = z.infer<typeof bodySetSchema>;

/** Орбисы аспектов: по умолчанию — глобальный орбис на аспект, переопределяемый по телу/паре. */
export const orbsConfigSchema = z.object({
  byAspect: z.record(z.string(), z.number().min(0).max(20)).default({}),
  byBody: z.record(z.string(), z.number().min(0).max(20)).default({}),
});
export type OrbsConfig = z.infer<typeof orbsConfigSchema>;

export const aspectSetSchema = z.enum(['major', 'major_minor']);
export type AspectSet = z.infer<typeof aspectSetSchema>;

/** Расчётный пресет — соответствует `calc_presets` в БД (22-модель-данных.md §2). */
export const calcPresetSchema = z.object({
  zodiac: zodiacTypeSchema.default('tropical'),
  ayanamsha: ayanamshaSchema.optional(),
  houseSystem: houseSystemSchema.default('placidus'),
  bodies: bodySetSchema.default({}),
  orbs: orbsConfigSchema.default({}),
  aspectSet: aspectSetSchema.default('major_minor'),
});
export type CalcPreset = z.infer<typeof calcPresetSchema>;

export const chartInputSchema = z.object({
  dateTime: birthDateTimeSchema,
  /** Время неизвестно → расчёт идёт на полдень локального времени, `meta.noHouses = true`. */
  timeUnknown: z.boolean().default(false),
  /** IANA tz id на момент события (историческая зона), например `Europe/Moscow`. */
  tzId: z.string().min(1),
  place: geoPlaceSchema,
  preset: calcPresetSchema.default({}),
});
export type ChartInput = z.infer<typeof chartInputSchema>;

// ---------------------------------------------------------------------------------------------
// Выходные данные
// ---------------------------------------------------------------------------------------------

export const celestialBodyKeySchema = z.enum([
  'sun',
  'moon',
  'mercury',
  'venus',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'pluto',
  'chiron',
]);
export type CelestialBodyKey = z.infer<typeof celestialBodyKeySchema>;

export const pointKeySchema = z.enum(['meanNode', 'trueNode', 'meanLilith', 'trueLilith', 'selena']);
export type PointKey = z.infer<typeof pointKeySchema>;

/** Положение тела/точки — тропическая видимая геоцентрическая долгота/широта эпохи даты. */
export const positionSchema = z.object({
  longitudeDeg: z.number().min(0).max(360),
  latitudeDeg: z.number(),
  distanceAu: z.number().nullable(),
  speedLongDegPerDay: z.number(),
  isRetrograde: z.boolean(),
  /** Индекс знака 0=Овен..11=Рыбы (в системе `preset.zodiac`, см. заголовок файла). */
  signIndex: z.number().int().min(0).max(11),
  /** Градус внутри знака, 0..30. */
  signDegree: z.number().min(0).max(30),
  /** Номер дома 1..12, либо `null`, если `meta.noHouses === true`. */
  houseNumber: z.number().int().min(1).max(12).nullable(),
});
export type Position = z.infer<typeof positionSchema>;

export const houseCuspSchema = z.object({
  number: z.number().int().min(1).max(12),
  longitudeDeg: z.number().min(0).max(360),
});
export type HouseCusp = z.infer<typeof houseCuspSchema>;

export const anglesSchema = z.object({
  ascDeg: z.number().min(0).max(360),
  mcDeg: z.number().min(0).max(360),
  dscDeg: z.number().min(0).max(360),
  icDeg: z.number().min(0).max(360),
  /** RAMC — прямое восхождение середины неба, градусы. */
  armcDeg: z.number().min(0).max(360),
  vertexDeg: z.number().min(0).max(360).nullable(),
});
export type Angles = z.infer<typeof anglesSchema>;

export const aspectAngleNameSchema = z.enum([
  'conjunction',
  'opposition',
  'trine',
  'square',
  'sextile',
  'quincunx',
  'semisextile',
  'semisquare',
  'sesquiquadrate',
  'quintile',
  'biquintile',
]);
export type AspectAngleName = z.infer<typeof aspectAngleNameSchema>;

export const aspectSchema = z.object({
  bodyA: z.string(),
  bodyB: z.string(),
  angleName: aspectAngleNameSchema,
  exactAngleDeg: z.number(),
  actualDeltaDeg: z.number(),
  orbDeg: z.number(),
  orbAllowedDeg: z.number(),
  /** true = орбис сокращается (аспект «собирается»), false = расходится. */
  applying: z.boolean(),
});
export type Aspect = z.infer<typeof aspectSchema>;

export const arabicPartSchema = z.object({
  longitudeDeg: z.number().min(0).max(360),
  signIndex: z.number().int().min(0).max(11),
  signDegree: z.number().min(0).max(30),
  houseNumber: z.number().int().min(1).max(12).nullable(),
  /** Использованная формула (день/ночь по секте). */
  formula: z.enum(['day', 'night']),
});
export type ArabicPart = z.infer<typeof arabicPartSchema>;

export const chartMetaSchema = z.object({
  coreVersion: z.string(),
  /** Зафиксированная система координат — см. заголовок файла и ACCURACY.md. */
  coordinateFrame: z.literal('geocentric-apparent-ecliptic-of-date'),
  zodiac: zodiacTypeSchema,
  ayanamsha: ayanamshaSchema.optional(),
  ayanamshaDeg: z.number().optional(),
  houseSystem: houseSystemSchema,
  /** true, если запрошенная система домов заменена на Порфирия из-за |широта| > 66.5°. */
  houseSystemFallback: z.boolean().default(false),
  /** true при `input.timeUnknown` — дома/углы не считаются, `houses`/`angles` — заглушки. */
  noHouses: z.boolean().default(false),
  deltaTSeconds: z.number(),
  julianDayUT: z.number(),
  julianDayTT: z.number(),
  gmstDeg: z.number(),
  gastDeg: z.number(),
  /** Свободный текст об известных допущениях/фоллбэках конкретного расчёта (не обязателен). */
  accuracyNotes: z.array(z.string()).default([]),
});
export type ChartMeta = z.infer<typeof chartMetaSchema>;

export const chartKindSchema = z.enum([
  'natal',
  'transit',
  'progression',
  'symbolic_direction',
  'solar_return',
  'lunar_return',
  'synastry',
  'composite',
  'davison',
  'horary',
]);
export type ChartKind = z.infer<typeof chartKindSchema>;

/**
 * Тела и точки — `z.object` с опциональными полями (а не `z.record` по enum-ключу): у Хирона
 * (диапазон таблицы), истинных vs средних узла/Лилит и Селены — реальная взаимоисключаемость/
 * необязательность, которую `z.record(enumSchema, …)` неверно типизирует как «все ключи
 * обязательны».
 */
export const bodiesSchema = z.object({
  sun: positionSchema,
  moon: positionSchema,
  mercury: positionSchema,
  venus: positionSchema,
  mars: positionSchema,
  jupiter: positionSchema,
  saturn: positionSchema,
  uranus: positionSchema,
  neptune: positionSchema,
  pluto: positionSchema,
  /** Отсутствует, если дата вне диапазона таблицы Хирона (см. `meta.accuracyNotes`). */
  chiron: positionSchema.optional(),
});
export type Bodies = z.infer<typeof bodiesSchema>;

export const pointsSchema = z.object({
  meanNode: positionSchema.optional(),
  trueNode: positionSchema.optional(),
  meanLilith: positionSchema.optional(),
  trueLilith: positionSchema.optional(),
  selena: positionSchema.optional(),
});
export type Points = z.infer<typeof pointsSchema>;

export const chartDataSchema = z.object({
  kind: chartKindSchema.default('natal'),
  input: chartInputSchema,
  meta: chartMetaSchema,
  bodies: bodiesSchema,
  points: pointsSchema,
  arabicParts: z.record(z.string(), arabicPartSchema).default({}),
  angles: anglesSchema,
  houses: z.array(houseCuspSchema),
  aspects: z.array(aspectSchema),
});
export type ChartData = z.infer<typeof chartDataSchema>;
