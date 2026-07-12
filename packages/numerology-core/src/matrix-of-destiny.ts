/**
 * Матрица судьбы (метод «октаграммы»: нумерология + 22 старших аркана Таро).
 * См. docs/research/06-нумерология-и-минералы.md §2 за общим описанием метода и рыночным
 * контекстом (метод Наталии Ладини, 2006 г.; десятки неофициальных клонов-калькуляторов —
 * matricaladini.ru, matrica-sudby.ru, tvoyamatritsa.ru и др. — считают производные секции
 * ПО-РАЗНОМУ, единого стандарта нет).
 *
 * ЭТОТ МОДУЛЬ РАЗДЕЛЁН НА ДВЕ ЧАСТИ РАЗНОЙ НАДЁЖНОСТИ:
 *  1. {@link matrixOfDestinyCorePoints} — 9 базовых точек октаграммы. Общепринятая часть метода,
 *     одинакова во всех известных клонах-калькуляторах. `methodologyVerified: true`.
 *  2. {@link matrixOfDestinyDerivedSections} — 7 чакр, 4 предназначения, линия отношений,
 *     денежная линия, возрастные периоды. РАЗНЫЕ сервисы считают их по-разному — единого
 *     стандарта нет. Формулы ниже — рабочая гипотеза по общепринятой схеме метода, а НЕ сверенный
 *     факт. `methodologyVerified: false` во всех результатах этой части.
 *     МЕТОДИКА ТРЕБУЕТ СВЕРКИ ЗАКАЗЧИКОМ (напр. с matricaladini.ru) — представленная формула
 *     является рабочей гипотезой по общепринятой схеме «матрицы судьбы», НЕ сверена с конкретным
 *     эталонным сервисом. Подробнее см. README.md, раздел «Известные ограничения».
 */
import { sumDigits } from './digit-utils.js';
import type {
  MatrixAgePeriod,
  MatrixDerivedSections,
  MatrixOfDestinyCompatibilityResult,
  MatrixOfDestinyCorePoints,
  MatrixOfDestinyResult,
  MatrixOfDestinySharedArcanum,
  NumerologyBirthData,
} from './schemas.js';

/**
 * Редукция числа матрицы судьбы к диапазону арканов Таро 1–22: любое число >22 сводится
 * повторной суммой цифр, пока не станет ≤22 (это ОТДЕЛЬНОЕ правило, не такое же как у ЧЖП —
 * здесь нет понятия мастер-числа, только сведение в диапазон индексов арканов).
 *
 * Пограничное правило (по большинству источников): результат 0 заменяется на 22
 * (Шут/Мир на границе цикла арканов) — 0 не является валидным индексом аркана Таро.
 */
export function reduceToArcanum(n: number): number {
  let value = Math.abs(Math.trunc(n));
  if (value === 0) return 22;
  while (value > 22) {
    value = sumDigits(value);
  }
  return value;
}

/**
 * 9 базовых точек октаграммы — общепринятая часть метода:
 *  - A (`day`) = редукция дня рождения;
 *  - B (`month`) = редукция месяца рождения (1–12, уже ≤22, редукция не меняет значение —
 *    пропускается через {@link reduceToArcanum} для единообразия);
 *  - C (`yearSum`) = редукция суммы цифр года рождения;
 *  - D (`tasks`) = редукция(A+B+C) — четвёртая вершина диагонального квадрата
 *    («зона предназначения/задач»);
 *  - E (`center`) = редукция(A+B+C+D) — центр октаграммы («зона комфорта»);
 *  - F1..F4 (`squareVertex1..4`, алиасы `f1..f4`) = вершины второго (прямого) квадрата:
 *    F1=редукция(A+B), F2=редукция(B+C), F3=редукция(C+D), F4=редукция(D+A).
 */
export function matrixOfDestinyCorePoints(
  birthDate: Pick<NumerologyBirthData, 'day' | 'month' | 'year'>,
): MatrixOfDestinyCorePoints {
  const day = reduceToArcanum(birthDate.day);
  const month = reduceToArcanum(birthDate.month);
  const yearSum = reduceToArcanum(sumDigits(birthDate.year));

  const tasks = reduceToArcanum(day + month + yearSum);
  const center = reduceToArcanum(day + month + yearSum + tasks);

  const squareVertex1 = reduceToArcanum(day + month);
  const squareVertex2 = reduceToArcanum(month + yearSum);
  const squareVertex3 = reduceToArcanum(yearSum + tasks);
  const squareVertex4 = reduceToArcanum(tasks + day);

  return {
    day,
    month,
    yearSum,
    tasks,
    center,
    squareVertex1,
    squareVertex2,
    squareVertex3,
    squareVertex4,
    f1: squareVertex1,
    f2: squareVertex2,
    f3: squareVertex3,
    f4: squareVertex4,
  };
}

/**
 * Производные секции матрицы судьбы (чакры, предназначения, линии, возрастные периоды).
 *
 * МЕТОДИКА ТРЕБУЕТ СВЕРКИ ЗАКАЗЧИКОМ (напр. с matricaladini.ru) — представленная формула
 * является рабочей гипотезой по общепринятой схеме «матрицы судьбы», НЕ сверена с конкретным
 * эталонным сервисом.
 *
 * Формулы (осознанный выбор одной из правдоподобных схем — НЕ единственно верная):
 *  - 7 чакр = редукция(center + периферийная точка), для 7 периферийных точек по порядку
 *    `day, month, yearSum, tasks, f1, f2, f3` (используются 7 из 8 периферийных точек, f4
 *    сознательно исключена из чакр и используется в денежной линии — см. ниже);
 *  - 4 предназначения: личное = редукция(day+f1), родовое = редукция(month+f2),
 *    духовное = редукция(yearSum+f3), социальное/планетарное = редукция(tasks+f4);
 *  - линия отношений = редукция(f1+f3) — диагональ прямого квадрата;
 *  - денежная линия = редукция(f2+f4) — вторая диагональ прямого квадрата;
 *  - возрастные периоды: 8 периодов по 9 лет (0–72 года), период i (1..8) привязан к
 *    i-й периферийной точке в порядке day, month, yearSum, tasks, f1, f2, f3, f4.
 */
export function matrixOfDestinyDerivedSections(
  corePoints: MatrixOfDestinyCorePoints,
): MatrixDerivedSections {
  const { day, month, yearSum, tasks, center, f1, f2, f3, f4 } = corePoints;

  const chakraSeeds = [day, month, yearSum, tasks, f1, f2, f3] as const;
  const chakras = chakraSeeds.map((point) => reduceToArcanum(center + point)) as [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ];

  const purposes = {
    personal: reduceToArcanum(day + f1),
    ancestral: reduceToArcanum(month + f2),
    spiritual: reduceToArcanum(yearSum + f3),
    social: reduceToArcanum(tasks + f4),
  };

  const relationshipLine = reduceToArcanum(f1 + f3);
  const moneyLine = reduceToArcanum(f2 + f4);

  const peripheralPointsInOrder = [day, month, yearSum, tasks, f1, f2, f3, f4];
  const agePeriods: MatrixAgePeriod[] = peripheralPointsInOrder.map((arcanum, index) => ({
    periodIndex: index + 1,
    fromAgeInclusive: index * 9,
    toAgeExclusive: (index + 1) * 9,
    arcanum,
  }));

  return {
    methodologyVerified: false,
    chakras,
    purposes,
    relationshipLine,
    moneyLine,
    agePeriods,
  };
}

/** Полный расчёт матрицы судьбы: базовые точки (verified) + производные секции (unverified). */
export function matrixOfDestiny(
  birthDate: Pick<NumerologyBirthData, 'day' | 'month' | 'year'>,
): MatrixOfDestinyResult {
  const corePoints = matrixOfDestinyCorePoints(birthDate);
  return {
    birthDate: { day: birthDate.day, month: birthDate.month, year: birthDate.year },
    corePoints,
    corePointsMethodologyVerified: true,
    derivedSections: matrixOfDestinyDerivedSections(corePoints),
  };
}

/**
 * Совместимость двух дат по матрице судьбы: находит ОБЩИЕ числа (арканы) среди базовых 9 точек
 * октаграммы каждой даты — чистая арифметика сравнения мультимножеств, без текстовой трактовки.
 */
export function compareMatrixOfDestiny(
  birthDateA: Pick<NumerologyBirthData, 'day' | 'month' | 'year'>,
  birthDateB: Pick<NumerologyBirthData, 'day' | 'month' | 'year'>,
): MatrixOfDestinyCompatibilityResult {
  const corePointsA = matrixOfDestinyCorePoints(birthDateA);
  const corePointsB = matrixOfDestinyCorePoints(birthDateB);

  const listA = [
    corePointsA.day,
    corePointsA.month,
    corePointsA.yearSum,
    corePointsA.tasks,
    corePointsA.center,
    corePointsA.f1,
    corePointsA.f2,
    corePointsA.f3,
    corePointsA.f4,
  ];
  const listB = [
    corePointsB.day,
    corePointsB.month,
    corePointsB.yearSum,
    corePointsB.tasks,
    corePointsB.center,
    corePointsB.f1,
    corePointsB.f2,
    corePointsB.f3,
    corePointsB.f4,
  ];

  const sharedArcanums: MatrixOfDestinySharedArcanum[] = [];
  let totalSharedCount = 0;
  for (let arcanum = 1; arcanum <= 22; arcanum += 1) {
    const countInA = listA.filter((v) => v === arcanum).length;
    const countInB = listB.filter((v) => v === arcanum).length;
    const sharedCount = Math.min(countInA, countInB);
    if (sharedCount > 0) {
      sharedArcanums.push({ arcanum, countInA, countInB, sharedCount });
      totalSharedCount += sharedCount;
    }
  }

  return { corePointsA, corePointsB, sharedArcanums, totalSharedCount };
}
