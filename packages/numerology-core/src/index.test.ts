import { describe, expect, it } from 'vitest';
import { NUMEROLOGY_CORE_VERSION } from './index.js';

describe('@stassist/numerology-core (placeholder Ф0)', () => {
  it('экспортирует версию пакета', () => {
    expect(NUMEROLOGY_CORE_VERSION).toMatch(/^0\.0\.0/);
  });
});
