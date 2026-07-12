/**
 * Асинхронная worker-задача генерации ИИ-разборов (см. находку
 * [внутренняя-полнота-модель-исполнения] в _work/build/findings/f4.md): апи создаёт `ai_reports`
 * со status='queued' (см. apps/api/src/routes/ai-reports.ts), эта задача — periodic pg-boss cron
 * (см. worker.ts AI_REPORT_QUEUE) — сканирует очередь и обрабатывает. Тот же архитектурный
 * паттерн, что `process-pending-shares.ts` (Ф3): API не держит соединения к pg-boss, только к
 * Postgres — задержка публикации до одного тика cron.
 *
 * `kind='big3'` ДОПУСТИМО обрабатывать синхронно прямо в apps/api (см.
 * packages/llm/src/reports/report-kinds.ts `allowSynchronous`) — этот job всё равно подхватит
 * и такие queued-строки, если API решит не генерировать big3 синхронно (напр. под нагрузкой).
 */
import type { Logger } from 'pino';
import type { ChartData, NatalFullSphere } from '@stassist/shared';
import type { Db } from '@stassist/db';
import { generateReport, type ChunkRepository } from '@stassist/llm';
import type { LlmProvider } from '@stassist/shared';
import { findChartById } from './charts-repository.js';
import { findQueuedAiReports, markDone, markFailed, markGenerating, type AiReportRow } from './ai-reports-repository.js';

interface AiReportInput {
  sphere?: NatalFullSphere;
  question?: string;
}

function parseInput(row: AiReportRow): AiReportInput {
  const raw = row.input as Record<string, unknown> | null;
  return {
    sphere: typeof raw?.sphere === 'string' ? (raw.sphere as NatalFullSphere) : undefined,
    question: typeof raw?.question === 'string' ? raw.question : undefined,
  };
}

export async function processOneAiReport(db: Db, llm: LlmProvider, chunkRepository: ChunkRepository, row: AiReportRow): Promise<void> {
  await markGenerating(db, row.id);
  if (!row.chartId) {
    await markFailed(db, row.id, 'ai_reports.chart_id не задан — нечего анализировать');
    return;
  }
  const chart = await findChartById(db, row.chartId);
  if (!chart) {
    await markFailed(db, row.id, `charts не найден по id=${row.chartId}`);
    return;
  }
  const input = parseInput(row);
  const result = await generateReport({
    chartData: chart.data as ChartData,
    kind: row.kind,
    sphere: input.sphere,
    question: input.question,
    llm,
    chunkRepository,
  });
  await markDone(db, row.id, result);
}

/** Обрабатывает пачку queued-строк (см. worker.ts, AI_REPORT_CRON). Ошибка по одной строке не
 *  прерывает обработку остальных — каждая помечается 'failed' независимо. */
export async function processQueuedAiReports(db: Db, llm: LlmProvider, chunkRepository: ChunkRepository, logger: Logger): Promise<number> {
  const queued = await findQueuedAiReports(db);
  let processed = 0;
  for (const row of queued) {
    try {
      await processOneAiReport(db, llm, chunkRepository, row);
      processed += 1;
    } catch (err) {
      logger.error({ err, reportId: row.id }, 'ai-report: генерация не удалась');
      await markFailed(db, row.id, err instanceof Error ? err.message : String(err));
    }
  }
  return processed;
}
