/**
 * Сборка `PdfReportContent` для 3 типов индивидуальных прогнозов (req.4 промта Ф8: «событие/
 * период/вопрос» → «транзиты на дату / карта периода / элективные окна в интервале»). ЧИСТЫЕ
 * функции — расчёт делают ТЕ ЖЕ функции `@stassist/astro-core`
 * (`scoreElectiveMoment`/`findElectiveWindows`), что задокументированы правилами 1-9 в
 * `packages/astro-core/src/electives/find-electives.ts` — «сверка с astro-core напрямую» из
 * промта Ф8 буквально выполняется этими вызовами напрямую, без отдельной параллельной эвристики.
 * LLM используется ТОЛЬКО для короткого вступления (см. `generate-custom-forecast-job.ts`), не
 * для расчёта дат/аспектов — те приходят готовыми в `introText` уже посчитанными.
 */
import type { Bodies, CustomForecastSubject } from '@stassist/shared';
import {
  findElectiveWindows,
  scoreElectiveMoment,
  type ElectiveAspectContribution,
  type ElectiveWindow,
} from '@stassist/astro-core';
import { aspectNameRu, objectNameRu } from '@stassist/llm';
import type { PdfReportContent } from '../pdf/report-content-types.js';

function formatAspectLineRu(a: ElectiveAspectContribution): string {
  return `${objectNameRu(a.transitBody)} — ${aspectNameRu(a.angleName)} к натальному ${objectNameRu(a.natalBody)} (орбис ${a.orbDeg.toFixed(1)}°)`;
}

function formatDateRu(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
}

const FORECAST_DISCLAIMER_PARAGRAPHS = [
  'Материал носит информационно-развлекательный характер и не является гарантией событий или ' +
    'основанием для медицинских, финансовых и юридических решений — см. также общий дисклеймер сервиса.',
];

/** Показывается пользователю в разделе «Как считали» — прозрачность правил (req.4 промта: явно
 *  задокументировать критерии). Краткая версия полного doc-комментария astro-core-модуля. */
export const CUSTOM_FORECAST_RULES_DISCLAIMER_RU =
  'Расчёт полностью детерминированный (без участия ИИ): рассматриваются точные аспекты между ' +
  'транзитными Солнце..Плутон+Луна и вашими натальными планетами (набор аспектов major+minor, ' +
  'стандартные орбисы сервиса). Гармоничные аспекты (трин, секстиль) считаются благоприятными, ' +
  'напряжённые (квадрат, оппозиция) — сложными, соединение — нейтральным (его природа зависит от ' +
  'конкретных планет и не оценивается автоматически). Период, когда Луна «без курса» (void-of-' +
  'course), и ретроградный Меркурий (для вопросов о договорах/поездках/переговорах) учитываются как ' +
  'предупреждающие факторы. Полная формула — открытый код пакета astro-core сервиса.';

export interface ForecastContentBaseInput {
  coverNoteRu: string;
  introText: string;
  generatedAtIso: string;
}

export type EventDateSubject = Extract<CustomForecastSubject, { type: 'event_date' }>;

export function buildEventDateContent(
  input: ForecastContentBaseInput & { subject: EventDateSubject; natalBodies: Partial<Bodies> },
): PdfReportContent {
  const at = new Date(`${input.subject.eventDate}T12:00:00Z`);
  const score = scoreElectiveMoment(input.natalBodies, at, {
    weighRetrogradeMercury: input.subject.weighRetrogradeMercury,
  });
  const sorted = [...score.aspects].sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));

  return {
    titleRu: `Прогноз на ${formatDateRu(score.atUtc)}`,
    subtitleRu: input.subject.question,
    coverNoteRu: input.coverNoteRu,
    introParagraphs: [input.introText],
    sections: [
      {
        heading: 'Транзиты на выбранную дату',
        paragraphs:
          sorted.length > 0
            ? sorted.map((a) => formatAspectLineRu(a))
            : ['На выбранную дату точных значимых транзитов к вашей натальной карте не найдено — нейтральный, ровный день.'],
      },
      {
        heading: 'Особенности дня',
        paragraphs: [
          score.voidMoon
            ? 'Луна в этот день (в момент расчёта) без курса — void-of-course: классически не лучшее время для начала новых дел.'
            : 'Луна не находится в периоде «без курса» на момент расчёта.',
          score.mercuryRetrograde
            ? 'Меркурий ретрограден — будьте внимательны с документами, договорённостями и техникой.'
            : 'Меркурий движется в прямом направлении.',
        ],
      },
      { heading: 'Как считали', paragraphs: [CUSTOM_FORECAST_RULES_DISCLAIMER_RU] },
    ],
    disclaimerParagraphs: FORECAST_DISCLAIMER_PARAGRAPHS,
    generatedAtIso: input.generatedAtIso,
  };
}

export type PeriodMapSubject = Extract<CustomForecastSubject, { type: 'period_map' }>;

const PERIOD_SAMPLE_STEP_MS = 3 * 24 * 60 * 60 * 1000; // 3 суток — достаточно для обзорной карты периода

export function buildPeriodMapContent(
  input: ForecastContentBaseInput & { subject: PeriodMapSubject; natalBodies: Partial<Bodies> },
): PdfReportContent {
  const from = new Date(`${input.subject.periodStart}T12:00:00Z`);
  const to = new Date(`${input.subject.periodEnd}T12:00:00Z`);
  const byKey = new Map<string, { line: string; orbDeg: number; dateIso: string }>();

  for (let t = from.getTime(); t <= to.getTime(); t += PERIOD_SAMPLE_STEP_MS) {
    const moment = new Date(t);
    const score = scoreElectiveMoment(input.natalBodies, moment);
    for (const a of score.aspects) {
      const key = `${a.natalBody}:${a.angleName}:${a.transitBody}`;
      const existing = byKey.get(key);
      if (!existing || a.orbDeg < existing.orbDeg) {
        byKey.set(key, { line: formatAspectLineRu(a), orbDeg: a.orbDeg, dateIso: moment.toISOString() });
      }
    }
  }

  const items = [...byKey.values()].sort((a, b) => a.orbDeg - b.orbDeg).slice(0, 15);

  return {
    titleRu: `Карта периода: ${formatDateRu(from.toISOString())} — ${formatDateRu(to.toISOString())}`,
    subtitleRu: input.subject.question,
    coverNoteRu: input.coverNoteRu,
    introParagraphs: [input.introText],
    sections: [
      {
        heading: 'Ключевые транзиты периода',
        paragraphs:
          items.length > 0
            ? items.map((i) => `${formatDateRu(i.dateIso)} — ${i.line}`)
            : ['За выбранный период точных значимых транзитов к вашей натальной карте не найдено.'],
      },
      { heading: 'Как считали', paragraphs: [CUSTOM_FORECAST_RULES_DISCLAIMER_RU] },
    ],
    disclaimerParagraphs: FORECAST_DISCLAIMER_PARAGRAPHS,
    generatedAtIso: input.generatedAtIso,
  };
}

export type ElectivesQuestionSubject = Extract<CustomForecastSubject, { type: 'electives_question' }>;

/** Обёртка над `findElectiveWindows` (astro-core) — единственное место, где выбирается шаг
 *  сэмплирования по «глубине» заказа (req.4 промта «→ параметры → глубина»). */
export function computeElectiveWindowsForOrder(subject: ElectivesQuestionSubject, natalBodies: Partial<Bodies>): ElectiveWindow[] {
  const from = new Date(`${subject.intervalStart}T00:00:00Z`);
  const to = new Date(`${subject.intervalEnd}T00:00:00Z`);
  return findElectiveWindows(natalBodies, from, to, {
    sampleStepHours: subject.depth === 'deep' ? 6 : 12,
    weighRetrogradeMercury: subject.weighRetrogradeMercury,
  });
}

export function buildElectivesContent(
  input: ForecastContentBaseInput & { subject: ElectivesQuestionSubject; windows: readonly ElectiveWindow[] },
): PdfReportContent {
  const top = input.windows.slice(0, 5);
  const best = top[0];

  return {
    titleRu: 'Поиск благоприятного окна',
    subtitleRu: input.subject.question,
    coverNoteRu: input.coverNoteRu,
    introParagraphs: [input.introText],
    sections: [
      {
        heading: 'Наиболее благоприятные окна в указанном интервале',
        paragraphs:
          top.length > 0
            ? top.map(
                (w, i) =>
                  `${i + 1}. ${formatDateRu(w.startUtc)} — ${formatDateRu(w.endUtc)} (оценка благоприятности ${w.peakScore.toFixed(1)})` +
                  `${w.voidMoon ? ', частично попадает на период void-of-course Луны — уточните точное время' : ''}` +
                  `${w.mercuryRetrograde ? ', частично попадает на ретроградный Меркурий' : ''}`,
              )
            : ['В указанном интервале не найдено окон с положительной оценкой благоприятности — рассмотрите более широкий интервал или другой вопрос.'],
      },
      {
        heading: 'Ключевые аспекты лучшего окна',
        paragraphs: best ? best.topAspects.map((a) => formatAspectLineRu(a)) : ['Нет данных для отображения.'],
      },
      { heading: 'Как считали', paragraphs: [CUSTOM_FORECAST_RULES_DISCLAIMER_RU] },
    ],
    disclaimerParagraphs: FORECAST_DISCLAIMER_PARAGRAPHS,
    generatedAtIso: input.generatedAtIso,
  };
}
