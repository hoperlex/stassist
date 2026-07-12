import { describe, expect, it } from 'vitest';
import { buildCacheKey } from './cache-key.js';

const BASE = { birthProfileId: 'p1', kind: 'natal_full' as const, promptVersion: 'v1', presetId: 'preset1', coreVersion: '1.0.0' };

describe('buildCacheKey', () => {
  it('детерминирован для одинакового входа', () => {
    expect(buildCacheKey(BASE)).toBe(buildCacheKey({ ...BASE }));
  });

  it('меняется при смене пресета (нет утечки между пресетами)', () => {
    expect(buildCacheKey(BASE)).not.toBe(buildCacheKey({ ...BASE, presetId: 'preset2' }));
  });

  it('меняется при апгрейде ядра (core_version)', () => {
    expect(buildCacheKey(BASE)).not.toBe(buildCacheKey({ ...BASE, coreVersion: '1.1.0' }));
  });

  it('меняется при бампе версии промта', () => {
    expect(buildCacheKey(BASE)).not.toBe(buildCacheKey({ ...BASE, promptVersion: 'v2' }));
  });

  it('разные сферы natal_full не схлопываются в один кэш', () => {
    const a = buildCacheKey({ ...BASE, sphere: 'personality' });
    const b = buildCacheKey({ ...BASE, sphere: 'career' });
    expect(a).not.toBe(b);
  });

  it('разные вопросы custom_question не схлопываются в один кэш', () => {
    const a = buildCacheKey({ ...BASE, kind: 'custom_question', question: 'вопрос 1' });
    const b = buildCacheKey({ ...BASE, kind: 'custom_question', question: 'вопрос 2' });
    expect(a).not.toBe(b);
  });
});
