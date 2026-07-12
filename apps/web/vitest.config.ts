import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    name: '@stassist/web:unit',
    environment: 'node',
    include: ['**/*.test.{ts,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      'e2e/**',
      '**/*.integration.test.{ts,tsx}',
      '**/*.e2e.test.{ts,tsx}',
    ],
  },
});
