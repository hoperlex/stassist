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
import { appendDisclaimer } from '../postprocess/disclaimer.js';
import { buildSoftRefusalText, detectForbidden } from '../postprocess/forbidden-filters.js';
import { buildPrompt } from '../prompt/build-prompt.js';
import { retrieveForFacts, type UsedChunkAudit } from '../rag/retriever.js';
import type { ChunkRepository } from '../rag/chunk-repository.js';
import { CORPUS_VERSION, PROMPT_VERSION } from '../version.js';
import { reportKindConfig } from './report-kinds.js';
import { buildTaskDescription } from './task-description.js';
import { resolveTimeUnknown } from './time-unknown.js';

/** `kind`, для которых вопрос пользователя вклеивается в промт СВОБОДНЫМ текстом (см.
 *  task-description.ts) — те же, для которых нужен гейт ДО вызова LLM (находка
 *  [report-input-no-prefilter]). */
const FREE_TEXT_REPORT_KINDS: ReadonlySet<ReportKind> = new Set(['custom_question', 'order']);

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

/**
 * Находка [report-input-no-prefilter]: `chat-pipeline.ts` гейтит запрещённый вопрос ДО вызова
 * LLM (короткое замыкание, экономит токены, гарантированный мягкий отказ); для отчётов
 * `custom_question`/`order` вопрос пользователя раньше уходил в LLM без предварительной
 * проверки — ловился только пост-фильтром НА ВЫХОДЕ (защита в глубину, но не дыра честности —
 * выход всё равно фильтруется), однако запрещённый запрос тратил токены/деньги. Симметрично
 * `chat-pipeline.ts` (см. `answerChatQuestion`).
 */
function prefilterInput(input: GenerateReportInput): GenerateReportResult | null {
  if (!FREE_TEXT_REPORT_KINDS.has(input.kind) || !input.question) return null;
  const forbidden = detectForbidden(input.question);
  if (forbidden.length === 0) return null;

  return {
    contentMd: appendDisclaimer(buildSoftRefusalText(forbidden)),
    calcBlock: {},
    factKeys: [],
    usedChunks: [],
    tokensIn: 0,
    tokensOut: 0,
    provider: 'filter',
    costMicros: 0,
    flagged: true,
    flagReasons: forbidden.map((f) => `forbidden-input:${f.category}`),
    promptVersion: input.promptVersion ?? PROMPT_VERSION,
    corpusVersion: input.corpusVersion ?? CORPUS_VERSION,
  };
}

export async function generateReport(input: GenerateReportInput): Promise<GenerateReportResult> {
  const prefiltered = prefilterInput(input);
  if (prefiltered) return prefiltered;

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
