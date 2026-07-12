/**
 * Конвейер отчёта (см. docs/architecture/21-техническая-архитектура.md §4): ChartData →
 * сериализация → точный ретрив чанков → сборка промта → генерация → пост-валидация. Чистая
 * оркестрация — принимает `LlmProvider`/`ChunkRepository` как параметры (dependency injection),
 * поэтому юнит-тестируется без БД/сети (см. `pipeline.test.ts`).
 *
 * НЕ пишет в БД сама — apps/worker/src/llm/generate-report-job.ts вызывает `generateReport()` и
 * сам сохраняет результат в `ai_reports` (см. находку [внутренняя-полнота-модель-исполнения]).
 */
import type { ChartData, LlmProvider, NatalFullSphere, ReportKind } from '@stassist/shared';
import { serializeChartFacts } from '../facts/serializer.js';
import { estimateCostMicros } from '../providers/pricing.js';
import { postprocessReport } from '../postprocess/postprocess.js';
import { buildPrompt } from '../prompt/build-prompt.js';
import { retrieveForFacts, type UsedChunkAudit } from '../rag/retriever.js';
import type { ChunkRepository } from '../rag/chunk-repository.js';
import { CORPUS_VERSION, PROMPT_VERSION } from '../version.js';
import { reportKindConfig } from './report-kinds.js';
import { buildTaskDescription } from './task-description.js';
import { resolveTimeUnknown } from './time-unknown.js';

export interface GenerateReportInput {
  chartData: ChartData;
  kind: ReportKind;
  sphere?: NatalFullSphere;
  question?: string;
  llm: LlmProvider;
  chunkRepository: ChunkRepository;
  promptVersion?: string;
  corpusVersion?: string;
}

export interface GenerateReportResult {
  contentMd: string;
  calcBlock: Record<string, unknown>;
  factKeys: string[];
  usedChunks: UsedChunkAudit[];
  tokensIn: number;
  tokensOut: number;
  provider: string;
  costMicros: number;
  flagged: boolean;
  flagReasons: string[];
  promptVersion: string;
  corpusVersion: string;
}

export async function generateReport(input: GenerateReportInput): Promise<GenerateReportResult> {
  const config = reportKindConfig(input.kind);
  const { text: factsText, factKeys } = serializeChartFacts(input.chartData);
  const timeDecision = resolveTimeUnknown(input.kind, input.sphere, input.chartData.meta.noHouses);

  const retrieval = await retrieveForFacts(factKeys, input.chunkRepository);

  const task = buildTaskDescription(input.kind, { sphere: input.sphere, question: input.question });
  const taskWithNote = timeDecision.disclaimerNote ? `${task}\n\nВАЖНО: ${timeDecision.disclaimerNote}` : task;

  const { system, prompt } = buildPrompt({
    factsText,
    chunkTexts: retrieval.chunks.map((c) => c.text),
    task: taskWithNote,
  });

  const genResult = await input.llm.generate({ system, prompt, maxTokens: config.defaultMaxTokens });
  const post = postprocessReport({ text: genResult.text });
  const costMicros = estimateCostMicros(genResult.provider, genResult.tokensIn, genResult.tokensOut);

  return {
    contentMd: post.contentMd,
    calcBlock: {
      meta: input.chartData.meta,
      factsText,
      timeUnknownNote: timeDecision.disclaimerNote,
    },
    factKeys,
    usedChunks: retrieval.usedKeys,
    tokensIn: genResult.tokensIn,
    tokensOut: genResult.tokensOut,
    provider: genResult.provider,
    costMicros,
    flagged: post.flagged,
    flagReasons: post.flagReasons,
    promptVersion: input.promptVersion ?? PROMPT_VERSION,
    corpusVersion: input.corpusVersion ?? CORPUS_VERSION,
  };
}
