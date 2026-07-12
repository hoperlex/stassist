/**
 * Полный список позиций «матрицы судьбы» (арканной октаграммы), для которых сеется корпус
 * `arcanum:<1-22>:<position>` (см. src/facts/keys.ts `arcanumKey`). Источник структуры —
 * `@stassist/numerology-core` (`matrixOfDestinyResultSchema`), которая явно НЕ называет позиции
 * текстовыми слагами (JSDoc пакета: «текстовые трактовки — уровень контента/LLM») — слаги ниже
 * ПРИДУМАНЫ здесь как таксономия контента Ф4 (не «факт», а схема именования), задокументированы
 * явно, чтобы Ф6 (PDF «Матрица судьбы») могла использовать ТЕ ЖЕ слаги, а не изобретать свои
 * (см. находку [наполнение-контентом-кросс-фаза] в _work/build/findings/f4.md).
 *
 * Соответствие 7 чакр ↔ периферийные точки октаграммы — РЕДАКЦИОННОЕ решение (numerology-core НЕ
 * закрепляет порядок): `chakras[i]` в коде считается по порядку `day, month, yearSum, tasks, f1,
 * f2, f3` (см. packages/numerology-core/src/matrix-of-destiny.ts) — здесь этому порядку
 * присвоены стандартные названия 7 чакр (корень→...→коронная), общепринятая общественная
 * терминология, не факт конкретной карты.
 */
import type { MatrixOfDestinyResult } from '@stassist/numerology-core';
import { arcanumKey } from './keys.js';

export type MatrixPositionCategory = 'core_point' | 'health_chakra' | 'purpose' | 'line' | 'age_period';

export interface MatrixPositionDef {
  slug: string;
  category: MatrixPositionCategory;
  labelRu: string;
}

export const MATRIX_CORE_POINTS: readonly MatrixPositionDef[] = [
  { slug: 'point_day', category: 'core_point', labelRu: 'личные качества и таланты (точка «День»)' },
  { slug: 'point_month', category: 'core_point', labelRu: 'родовая задача по материнской линии (точка «Месяц»)' },
  { slug: 'point_year', category: 'core_point', labelRu: 'родовая задача по отцовской линии (точка «Год»)' },
  { slug: 'point_tasks', category: 'core_point', labelRu: 'главная жизненная задача (точка «Задачи»)' },
  { slug: 'point_center', category: 'core_point', labelRu: 'зона комфорта (центр октаграммы)' },
  { slug: 'point_f1', category: 'core_point', labelRu: 'квадрант Ф1 октаграммы' },
  { slug: 'point_f2', category: 'core_point', labelRu: 'квадрант Ф2 октаграммы' },
  { slug: 'point_f3', category: 'core_point', labelRu: 'квадрант Ф3 октаграммы' },
  { slug: 'point_f4', category: 'core_point', labelRu: 'квадрант Ф4 октаграммы' },
] as const;

/** Порядок соответствует `chakras[i]` в numerology-core (day,month,yearSum,tasks,f1,f2,f3). */
export const MATRIX_HEALTH_CHAKRAS: readonly MatrixPositionDef[] = [
  { slug: 'health_root', category: 'health_chakra', labelRu: 'корневая чакра — опора и жизненная сила' },
  { slug: 'health_sacral', category: 'health_chakra', labelRu: 'сакральная чакра — энергия и чувственность' },
  { slug: 'health_solar_plexus', category: 'health_chakra', labelRu: 'чакра солнечного сплетения — воля и самооценка' },
  { slug: 'health_heart', category: 'health_chakra', labelRu: 'сердечная чакра — эмоции и отношения' },
  { slug: 'health_throat', category: 'health_chakra', labelRu: 'горловая чакра — самовыражение и коммуникация' },
  { slug: 'health_third_eye', category: 'health_chakra', labelRu: 'чакра третьего глаза — интуиция и ясность' },
  { slug: 'health_crown', category: 'health_chakra', labelRu: 'коронная чакра — духовность и смысл' },
] as const;

export const MATRIX_PURPOSES: readonly MatrixPositionDef[] = [
  { slug: 'purpose_personal', category: 'purpose', labelRu: 'личное предназначение' },
  { slug: 'purpose_ancestral', category: 'purpose', labelRu: 'родовое предназначение' },
  { slug: 'purpose_spiritual', category: 'purpose', labelRu: 'духовное предназначение' },
  { slug: 'purpose_social', category: 'purpose', labelRu: 'социальное предназначение' },
] as const;

export const MATRIX_LINES: readonly MatrixPositionDef[] = [
  { slug: 'relationship_line', category: 'line', labelRu: 'линия отношений' },
  { slug: 'money_line', category: 'line', labelRu: 'денежная линия' },
] as const;

export const MATRIX_AGE_PERIODS: readonly MatrixPositionDef[] = Array.from({ length: 8 }, (_, i) => ({
  slug: `age_period_${i + 1}`,
  category: 'age_period' as const,
  labelRu: `возрастной период №${i + 1} (9-летний цикл)`,
}));

/** Полный набор — 9 + 7 + 4 + 2 + 8 = 30 позиций × 22 аркана (см. заголовок файла). */
export const ALL_MATRIX_POSITIONS: readonly MatrixPositionDef[] = [
  ...MATRIX_CORE_POINTS,
  ...MATRIX_HEALTH_CHAKRAS,
  ...MATRIX_PURPOSES,
  ...MATRIX_LINES,
  ...MATRIX_AGE_PERIODS,
];

/**
 * Из реального результата `matrixOfDestiny()` строит список (ключ, аркан), которые нужно найти
 * в корпусе для отчёта matrix_full — используется и сериализатором фактов, и ретривером.
 */
export function matrixFactEntries(result: MatrixOfDestinyResult): Array<{ key: string; arcanum: number }> {
  const { corePoints, derivedSections } = result;
  const entries: Array<{ key: string; arcanum: number }> = [
    { key: arcanumKey(corePoints.day, 'point_day'), arcanum: corePoints.day },
    { key: arcanumKey(corePoints.month, 'point_month'), arcanum: corePoints.month },
    { key: arcanumKey(corePoints.yearSum, 'point_year'), arcanum: corePoints.yearSum },
    { key: arcanumKey(corePoints.tasks, 'point_tasks'), arcanum: corePoints.tasks },
    { key: arcanumKey(corePoints.center, 'point_center'), arcanum: corePoints.center },
    { key: arcanumKey(corePoints.f1, 'point_f1'), arcanum: corePoints.f1 },
    { key: arcanumKey(corePoints.f2, 'point_f2'), arcanum: corePoints.f2 },
    { key: arcanumKey(corePoints.f3, 'point_f3'), arcanum: corePoints.f3 },
    { key: arcanumKey(corePoints.f4, 'point_f4'), arcanum: corePoints.f4 },
  ];
  MATRIX_HEALTH_CHAKRAS.forEach((chakra, i) => {
    const arcanum = derivedSections.chakras[i];
    if (arcanum !== undefined) entries.push({ key: arcanumKey(arcanum, chakra.slug), arcanum });
  });
  entries.push(
    { key: arcanumKey(derivedSections.purposes.personal, 'purpose_personal'), arcanum: derivedSections.purposes.personal },
    { key: arcanumKey(derivedSections.purposes.ancestral, 'purpose_ancestral'), arcanum: derivedSections.purposes.ancestral },
    { key: arcanumKey(derivedSections.purposes.spiritual, 'purpose_spiritual'), arcanum: derivedSections.purposes.spiritual },
    { key: arcanumKey(derivedSections.purposes.social, 'purpose_social'), arcanum: derivedSections.purposes.social },
    { key: arcanumKey(derivedSections.relationshipLine, 'relationship_line'), arcanum: derivedSections.relationshipLine },
    { key: arcanumKey(derivedSections.moneyLine, 'money_line'), arcanum: derivedSections.moneyLine },
  );
  for (const period of derivedSections.agePeriods) {
    entries.push({ key: arcanumKey(period.arcanum, `age_period_${period.periodIndex}`), arcanum: period.arcanum });
  }
  return entries;
}
