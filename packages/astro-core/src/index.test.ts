import { describe, expect, it } from 'vitest';
import { ASTRO_CORE_VERSION } from './index.js';

describe('@stassist/astro-core (placeholder Ф0)', () => {
  it('экспортирует версию ядра', () => {
    expect(ASTRO_CORE_VERSION).toMatch(/^0\.0\.0/);
  });
});
