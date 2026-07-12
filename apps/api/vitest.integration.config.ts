import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    name: '@stassist/api:integration',
    environment: 'node',
    include: ['src/**/*.integration.test.ts'],
  },
});
