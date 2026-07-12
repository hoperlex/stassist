/**
 * Конфигурация типов разборов MVP (см. f4-llm-конвейер.md req.5, находку
 * [самодостаточность-тарификация] в f4.md). Модель исполнения (см. находку
 * [внутренняя-полнота-модель-исполнения]): все типы — асинхронная worker-задача
 * (apps/worker/src/llm/generate-report-job.ts), КРОМЕ `big3`, которую `apps/api` вправе выполнить
 * синхронно прямо в HTTP-запросе (лёгкий, бесплатный разбор — не требует очереди для хорошего UX).
 */
import { isFreeReportKind, type ReportKind } from '@stassist/shared';

export interface ReportKindConfig {
  kind: ReportKind;
  free: boolean;
  allowSynchronous: boolean;
  defaultMaxTokens: number;
}

export const REPORT_KIND_CONFIGS: Record<ReportKind, ReportKindConfig> = {
  big3: { kind: 'big3', free: true, allowSynchronous: true, defaultMaxTokens: 1200 },
  natal_full: { kind: 'natal_full', free: false, allowSynchronous: false, defaultMaxTokens: 2500 },
  synastry: { kind: 'synastry', free: false, allowSynchronous: false, defaultMaxTokens: 2200 },
  solar_year: { kind: 'solar_year', free: false, allowSynchronous: false, defaultMaxTokens: 2000 },
  transit_month: { kind: 'transit_month', free: false, allowSynchronous: false, defaultMaxTokens: 1600 },
  matrix_full: { kind: 'matrix_full', free: false, allowSynchronous: false, defaultMaxTokens: 2000 },
  custom_question: { kind: 'custom_question', free: false, allowSynchronous: false, defaultMaxTokens: 900 },
  order: { kind: 'order', free: false, allowSynchronous: false, defaultMaxTokens: 2500 },
};

export function reportKindConfig(kind: ReportKind): ReportKindConfig {
  return REPORT_KIND_CONFIGS[kind];
}

export { isFreeReportKind };
