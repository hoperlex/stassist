/**
 * Zod-схемы входных/выходных данных пакета `@stassist/numerology-core`. Локальны для этого
 * пакета (НЕ в `packages/shared`) — по решению фазы numerology-core разрабатывается независимо.
 * Все публичные функции пакета принимают/возвращают типы, выведенные отсюда через `z.infer<>`.
 */
import { z } from 'zod';
import { isValidCalendarDate } from './date-utils.js';

// ---------------------------------------------------------------------------------------------
// Входные данные
// ---------------------------------------------------------------------------------------------

/** Дата рождения для нумерологических расчётов; полное имя — опционально (для чисел по имени). */
export const numerologyBirthDataSchema = z
  .object({
    day: z.number().int().min(1).max(31),
    month: z.number().int().min(1).max(12),
    year: z.number().int().min(1).max(9999),
    fullName: z.string().min(1).optional(),
  })
  .refine((data) => isValidCalendarDate(data.day, data.month, data.year), {
    message: 'Некорректная календарная дата: такого дня не существует в этом месяце/году',
    path: ['day'],
  });
export type NumerologyBirthData = z.infer<typeof numerologyBirthDataSchema>;

/**
 * «Текущая» дата для прогностики (персональные циклы). Передаётся параметром явно — модуль
 * не обращается к системным часам (`Date.now()` внутри логики пакета не используется).
 */
export const numerologyCurrentDateSchema = z
  .object({
    day: z.number().int().min(1).max(31),
    month: z.number().int().min(1).max(12),
    year: z.number().int().min(1).max(9999),
  })
  .refine((data) => isValidCalendarDate(data.day, data.month, data.year), {
    message: 'Некорректная календарная дата: такого дня не существует в этом месяце/году',
    path: ['day'],
  });
export type NumerologyCurrentDate = z.infer<typeof numerologyCurrentDateSchema>;

// ---------------------------------------------------------------------------------------------
// Число жизненного пути
// ---------------------------------------------------------------------------------------------

export const lifePathResultSchema = z.object({
  /** Сквозная сумма всех цифр даты рождения до первой редукции. */
  digitSum: z.number().int().positive(),
  /** Итоговое число жизненного пути: 1–9, либо мастер-число 11/22. */
  lifePathNumber: z.number().int(),
});
export type LifePathResult = z.infer<typeof lifePathResultSchema>;

// ---------------------------------------------------------------------------------------------
// Числа по имени
// ---------------------------------------------------------------------------------------------

export const nameNumbersResultSchema = z.object({
  normalizedName: z.string(),
  expressionNumber: z.number().int(),
  soulUrgeNumber: z.number().int(),
  personalityNumber: z.number().int(),
});
export type NameNumbersResult = z.infer<typeof nameNumbersResultSchema>;

// ---------------------------------------------------------------------------------------------
// Психоматрица (квадрат Пифагора)
// ---------------------------------------------------------------------------------------------

const gridRowSchema = z.tuple([z.number().int().nonnegative(), z.number().int().nonnegative(), z.number().int().nonnegative()]);

export const psychoMatrixResultSchema = z.object({
  /** (1) — сумма всех цифр даты рождения. */
  number1: z.number().int(),
  /** (2) — сумма цифр числа (1), один проход. */
  number2: z.number().int(),
  /** (3) — (1) минус удвоенная первая цифра дня рождения. */
  number3: z.number().int(),
  /** (4) — сумма цифр числа (3), один проход. */
  number4: z.number().int(),
  /** Частота цифр 1–9 в объединённом мультимножестве (ключи — строки '1'..'9'). */
  counts: z.record(z.string(), z.number().int().nonnegative()),
  /**
   * Сетка 3×3 традиционного квадрата Пифагора, строки сверху вниз, по столбцам —
   * характер(1,2,3) / энергия(4,5,6) / интерес(7,8,9): grid[row][col].
   */
  grid: z.tuple([gridRowSchema, gridRowSchema, gridRowSchema]),
  rowSums: z.tuple([z.number().int(), z.number().int(), z.number().int()]),
  colSums: z.tuple([z.number().int(), z.number().int(), z.number().int()]),
  diagonalMain: z.number().int(),
  diagonalAnti: z.number().int(),
});
export type PsychoMatrixResult = z.infer<typeof psychoMatrixResultSchema>;

// ---------------------------------------------------------------------------------------------
// Персональные циклы
// ---------------------------------------------------------------------------------------------

export const personalCyclesResultSchema = z.object({
  personalYear: z.number().int().min(1).max(9),
  personalMonth: z.number().int().min(1).max(9),
  personalDay: z.number().int().min(1).max(9),
});
export type PersonalCyclesResult = z.infer<typeof personalCyclesResultSchema>;

// ---------------------------------------------------------------------------------------------
// Совместимость по ЧЖП
// ---------------------------------------------------------------------------------------------

export const lifePathCompatibilityResultSchema = z.object({
  /** Базовые числа для сравнения (11→2, 22→4, иначе без изменений). */
  baseA: z.number().int().min(1).max(9),
  baseB: z.number().int().min(1).max(9),
  /** Оценка совместимости 0–100 — РАБОЧАЯ ЭВРИСТИКА, см. README. */
  score: z.number().int().min(0).max(100),
});
export type LifePathCompatibilityResult = z.infer<typeof lifePathCompatibilityResultSchema>;

// ---------------------------------------------------------------------------------------------
// Матрица судьбы
// ---------------------------------------------------------------------------------------------

const arcanumSchema = z.number().int().min(1).max(22);

/** 9 базовых точек октаграммы — общепринятая часть метода, methodologyVerified: true. */
export const matrixOfDestinyCorePointsSchema = z.object({
  day: arcanumSchema,
  month: arcanumSchema,
  yearSum: arcanumSchema,
  /** D — «зона предназначения/задач». */
  tasks: arcanumSchema,
  /** E — центр октаграммы («зона комфорта»). */
  center: arcanumSchema,
  squareVertex1: arcanumSchema,
  squareVertex2: arcanumSchema,
  squareVertex3: arcanumSchema,
  squareVertex4: arcanumSchema,
  /** Алиасы squareVertex1..4 — сохранены для удобства чтения формул. */
  f1: arcanumSchema,
  f2: arcanumSchema,
  f3: arcanumSchema,
  f4: arcanumSchema,
});
export type MatrixOfDestinyCorePoints = z.infer<typeof matrixOfDestinyCorePointsSchema>;

export const matrixAgePeriodSchema = z.object({
  periodIndex: z.number().int().min(1).max(8),
  fromAgeInclusive: z.number().int().min(0),
  toAgeExclusive: z.number().int().min(0),
  arcanum: arcanumSchema,
});
export type MatrixAgePeriod = z.infer<typeof matrixAgePeriodSchema>;

/**
 * Производные секции матрицы судьбы (7 чакр, 4 предназначения, линия отношений, денежная линия,
 * возрастные периоды) — МЕТОДИКА ТРЕБУЕТ СВЕРКИ ЗАКАЗЧИКОМ (напр. с matricaladini.ru).
 * Представленные формулы — рабочая гипотеза по общепринятой схеме «матрицы судьбы»,
 * НЕ сверена с конкретным эталонным сервисом. См. README.md, раздел «Известные ограничения».
 */
export const matrixDerivedSectionsSchema = z.object({
  methodologyVerified: z.literal(false),
  chakras: z.tuple([
    arcanumSchema,
    arcanumSchema,
    arcanumSchema,
    arcanumSchema,
    arcanumSchema,
    arcanumSchema,
    arcanumSchema,
  ]),
  purposes: z.object({
    personal: arcanumSchema,
    ancestral: arcanumSchema,
    spiritual: arcanumSchema,
    social: arcanumSchema,
  }),
  relationshipLine: arcanumSchema,
  moneyLine: arcanumSchema,
  agePeriods: z.array(matrixAgePeriodSchema).length(8),
});
export type MatrixDerivedSections = z.infer<typeof matrixDerivedSectionsSchema>;

export const matrixOfDestinyResultSchema = z.object({
  birthDate: z.object({
    day: z.number().int().min(1).max(31),
    month: z.number().int().min(1).max(12),
    year: z.number().int().min(1).max(9999),
  }),
  /** 9 базовых точек октаграммы — общепринятая часть метода. */
  corePoints: matrixOfDestinyCorePointsSchema,
  corePointsMethodologyVerified: z.literal(true),
  /** Производные секции — methodologyVerified: false, требуют сверки заказчиком. */
  derivedSections: matrixDerivedSectionsSchema,
});
export type MatrixOfDestinyResult = z.infer<typeof matrixOfDestinyResultSchema>;

export const matrixOfDestinySharedArcanumSchema = z.object({
  arcanum: arcanumSchema,
  countInA: z.number().int().min(1),
  countInB: z.number().int().min(1),
  sharedCount: z.number().int().min(1),
});
export type MatrixOfDestinySharedArcanum = z.infer<typeof matrixOfDestinySharedArcanumSchema>;

/** Совместимость двух дат по базовым 9 точкам матрицы судьбы — чистое сравнение множеств. */
export const matrixOfDestinyCompatibilityResultSchema = z.object({
  corePointsA: matrixOfDestinyCorePointsSchema,
  corePointsB: matrixOfDestinyCorePointsSchema,
  sharedArcanums: z.array(matrixOfDestinySharedArcanumSchema),
  totalSharedCount: z.number().int().min(0),
});
export type MatrixOfDestinyCompatibilityResult = z.infer<
  typeof matrixOfDestinyCompatibilityResultSchema
>;
