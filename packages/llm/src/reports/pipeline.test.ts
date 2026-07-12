import { describe, expect, it } from 'vitest';
import type { LlmGenerateRequest, LlmGenerateResult, LlmProvider } from '@stassist/shared';
import { StubLlmProvider } from '@stassist/shared';
import { InMemoryChunkRepository, type StoredChunk } from '../rag/chunk-repository.js';
import { buildTestChartData } from '../test-fixtures/chart-data.js';
import { generateReport } from './pipeline.js';

function chunk(key: string, text: string): StoredChunk {
  return { key, tradition: 'western', text, quality: 'draft', version: 1 };
}

function fakeLlm(text: string): LlmProvider {
  return {
    name: 'fake',
    async generate(req: LlmGenerateRequest): Promise<LlmGenerateResult> {
      return { text, provider: 'fake', tokensIn: Math.ceil(req.prompt.length / 4), tokensOut: Math.ceil(text.length / 4) };
    },
  };
}

describe('generateReport — конвейер (со StubLlmProvider, без сети/БД)', () => {
  it('big3: собирает факты, ретрив, вызывает LLM, пост-обрабатывает, добавляет дисклеймер', async () => {
    const repo = new InMemoryChunkRepository([
      chunk('planet_in_sign:sun:gemini', 'Солнце в Близнецах — любознательность.'),
      chunk('planet_in_sign:moon:scorpio', 'Луна в Скорпионе — глубина чувств.'),
    ]);
    const result = await generateReport({
      chartData: buildTestChartData(),
      kind: 'big3',
      llm: fakeLlm('Ваш разбор: Солнце и Луна в характерных позициях.'),
      chunkRepository: repo,
    });
    expect(result.contentMd).toContain('Ваш разбор');
    expect(result.contentMd).toContain('информационно-развлекательный');
    expect(result.factKeys.length).toBeGreaterThan(0);
    expect(result.usedChunks.some((u) => u.resolvedKey === 'planet_in_sign:sun:gemini')).toBe(true);
    expect(result.provider).toBe('fake');
    expect(result.flagged).toBe(false);
    expect(result.promptVersion).toBeTruthy();
    expect(result.corpusVersion).toBeTruthy();
  });

  it('работает со StubLlmProvider (детерминированный конвейер end-to-end без ключей)', async () => {
    const repo = new InMemoryChunkRepository([]);
    const result = await generateReport({
      chartData: buildTestChartData(),
      kind: 'big3',
      llm: new StubLlmProvider(),
      chunkRepository: repo,
    });
    expect(result.provider).toBe('stub');
    expect(result.contentMd.length).toBeGreaterThan(0);
  });

  it('time_unknown: big3 деградирует до Солнца/Луны с явной пометкой в промте (не блокирует генерацию)', async () => {
    const fixture = buildTestChartData({
      meta: {
        coreVersion: '1.0.0',
        coordinateFrame: 'geocentric-apparent-ecliptic-of-date',
        zodiac: 'tropical',
        houseSystem: 'placidus',
        houseSystemFallback: false,
        noHouses: true,
        deltaTSeconds: 60,
        julianDayUT: 2448058.1,
        julianDayTT: 2448058.101,
        gmstDeg: 100,
        gastDeg: 100.01,
        accuracyNotes: [],
      },
      houses: [],
    });
    for (const body of Object.values(fixture.bodies)) if (body) body.houseNumber = null;
    for (const point of Object.values(fixture.points)) if (point) point.houseNumber = null;

    let capturedPrompt = '';
    const llm: LlmProvider = {
      name: 'capture',
      async generate(req) {
        capturedPrompt = req.prompt;
        return { text: 'разбор без домов', provider: 'capture', tokensIn: 1, tokensOut: 1 };
      },
    };
    const result = await generateReport({
      chartData: fixture,
      kind: 'big3',
      llm,
      chunkRepository: new InMemoryChunkRepository([]),
    });
    expect(capturedPrompt).toContain('Асцендент не рассчитан');
    expect(result.factKeys.some((k) => k.startsWith('asc_in_sign:'))).toBe(false);
  });

  it('провокационный ответ LLM → flagged=true, текст заменён мягким отказом', async () => {
    const result = await generateReport({
      chartData: buildTestChartData(),
      kind: 'custom_question',
      question: 'когда я умру',
      llm: fakeLlm('Отвечаю: когда я умру, вы узнаете точную дату из карты.'),
      chunkRepository: new InMemoryChunkRepository([]),
    });
    expect(result.flagged).toBe(true);
    expect(result.contentMd).toContain('обратитесь к психологу');
  });

  it('кэш: повторный вызов с теми же входами не меняет промт-версию/корпус-версию (для cache_key)', async () => {
    const a = await generateReport({
      chartData: buildTestChartData(),
      kind: 'big3',
      llm: fakeLlm('x'),
      chunkRepository: new InMemoryChunkRepository([]),
    });
    const b = await generateReport({
      chartData: buildTestChartData(),
      kind: 'big3',
      llm: fakeLlm('x'),
      chunkRepository: new InMemoryChunkRepository([]),
    });
    expect(a.promptVersion).toBe(b.promptVersion);
    expect(a.corpusVersion).toBe(b.corpusVersion);
  });
});
