import { describe, expect, it } from 'vitest';
import { UI_PACKAGE_VERSION } from './index.js';

describe('@stassist/ui', () => {
  it('экспортирует версию пакета', () => {
    expect(UI_PACKAGE_VERSION).toMatch(/^0\.\d+\.\d+/);
  });
});
