import { describe, expect, it } from 'vitest';
import { LLM_PACKAGE_VERSION } from './index.js';

describe('@stassist/llm (placeholder Ф0)', () => {
  it('экспортирует версию пакета', () => {
    expect(LLM_PACKAGE_VERSION).toMatch(/^0\.0\.0/);
  });
});
