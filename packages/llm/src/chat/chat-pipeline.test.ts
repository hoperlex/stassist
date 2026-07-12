import { describe, expect, it } from 'vitest';
import type { LlmProvider } from '@stassist/shared';
import { InMemoryChunkRepository, type StoredChunk } from '../rag/chunk-repository.js';
import { buildTestChartData } from '../test-fixtures/chart-data.js';
import { answerChatQuestion } from './chat-pipeline.js';

function fakeLlm(text: string): LlmProvider {
  return {
    name: 'fake',
    async generate() {
      return { text, provider: 'fake', tokensIn: 1, tokensOut: 1 };
    },
  };
}

describe('answerChatQuestion', () => {
  it('провокационный вопрос — короткое замыкание ДО вызова LLM (tokensIn=0)', async () => {
    const result = await answerChatQuestion({
      question: 'сниму ли я порчу?',
      llm: fakeLlm('не должно быть вызвано'),
      chunkRepository: new InMemoryChunkRepository([]),
    });
    expect(result.flagged).toBe(true);
    expect(result.tokensIn).toBe(0);
    expect(result.answer).not.toContain('не должно быть вызвано');
  });

  it('без привязанного профиля отвечает в общих чертах, не роняясь', async () => {
    const result = await answerChatQuestion({
      question: 'что такое ретроградный Меркурий?',
      llm: fakeLlm('Ретроградный Меркурий — период пересмотра коммуникаций.'),
      chunkRepository: new InMemoryChunkRepository([]),
    });
    expect(result.answer).toContain('Ретроградный Меркурий');
    expect(result.intent).toBe('natal');
  });

  it('с привязанным профилем использует факты и ретрив по ключам', async () => {
    const chunk: StoredChunk = { key: 'planet_in_sign:sun:gemini', tradition: 'western', text: 'Солнце в Близнецах.', quality: 'draft', version: 1 };
    let capturedPrompt = '';
    const result = await answerChatQuestion({
      question: 'расскажи про моё Солнце',
      chartData: buildTestChartData(),
      llm: {
        name: 'capture',
        async generate(req) {
          capturedPrompt = req.prompt;
          return { text: 'ответ', provider: 'capture', tokensIn: 1, tokensOut: 1 };
        },
      },
      chunkRepository: new InMemoryChunkRepository([chunk]),
    });
    expect(capturedPrompt).toContain('Солнце в Близнецах');
    expect(result.answer).toContain('ответ');
  });
});
