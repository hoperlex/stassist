/**
 * Ответ чата (см. f4-llm-конвейер.md req.6). Лимиты free/премиум (3/100 вопросов в день) — не
 * забота этой чистой функции (нужна БД для счётчика запросов пользователя за сутки) — это
 * ответственность apps/api/src/routes (см. отчёт фазы, раздел про чат). Здесь — только
 * интент-роутинг + сборка промта + генерация + пост-обработка, идентичная логика анти-
 * галлюцинаций, что и в reports/pipeline.ts (используется тот же promt-слой).
 */
import type { ChartData, EmbeddingProvider, LlmProvider } from '@stassist/shared';
import { serializeChartFacts } from '../facts/serializer.js';
import { buildPrompt } from '../prompt/build-prompt.js';
import { postprocessReport } from '../postprocess/postprocess.js';
import { buildSoftRefusalText } from '../postprocess/forbidden-filters.js';
import { appendDisclaimer } from '../postprocess/disclaimer.js';
import type { ChunkRepository } from '../rag/chunk-repository.js';
import { retrieveForFacts, retrieveSemantic } from '../rag/retriever.js';
import { classifyIntent, type ChatIntent } from './intent-router.js';

export interface AnswerChatInput {
  question: string;
  /** Карта профиля чата, если он привязан к birth_profile — иначе отвечаем в общих чертах. */
  chartData?: ChartData;
  llm: LlmProvider;
  chunkRepository: ChunkRepository;
  /** Семантический ретрив — опционален (§8 промта Ф4: точный ретрив по ключам работает без него). */
  embeddings?: EmbeddingProvider;
}

export interface AnswerChatResult {
  answer: string;
  flagged: boolean;
  intent: ChatIntent;
  tokensIn: number;
  tokensOut: number;
  provider: string;
}

export async function answerChatQuestion(input: AnswerChatInput): Promise<AnswerChatResult> {
  const classification = classifyIntent(input.question);

  if (classification.forbidden.length > 0) {
    return {
      answer: appendDisclaimer(buildSoftRefusalText(classification.forbidden)),
      flagged: true,
      intent: classification.intent,
      tokensIn: 0,
      tokensOut: 0,
      provider: 'filter',
    };
  }

  const serialized = input.chartData ? serializeChartFacts(input.chartData) : undefined;
  const factsText =
    serialized?.text ??
    'ДАННЫЕ КАРТЫ: профиль не привязан к этому чату — отвечай в общих чертах, без указания конкретных позиций планет.';

  let chunkTexts: string[] = [];
  if (serialized && serialized.factKeys.length > 0) {
    const retrieval = await retrieveForFacts(serialized.factKeys, input.chunkRepository);
    chunkTexts = retrieval.chunks.map((c) => c.text);
  }
  if (chunkTexts.length === 0 && input.embeddings) {
    const vector = await input.embeddings.embed(input.question);
    const semantic = await retrieveSemantic(vector, input.chunkRepository, 5);
    chunkTexts = semantic.map((c) => c.text);
  }

  const { system, prompt } = buildPrompt({
    factsText,
    chunkTexts,
    task: `Ответь на вопрос пользователя в чате кратко (2-4 абзаца): «${input.question}».`,
  });

  const genResult = await input.llm.generate({ system, prompt, maxTokens: 900 });
  const post = postprocessReport({ text: genResult.text });

  return {
    answer: post.contentMd,
    flagged: post.flagged,
    intent: classification.intent,
    tokensIn: genResult.tokensIn,
    tokensOut: genResult.tokensOut,
    provider: genResult.provider,
  };
}
