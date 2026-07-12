/**
 * Playwright — уровень e2e (см. §1 конвенций реализации): гейт RUN_E2E=1, отдельно от
 * typecheck/lint/test:unit/build. Требует установленный браузер (`pnpm exec playwright install
 * chromium`) — это «требует ручного шага» в offline/без-docker окружении.
 */
import { defineConfig } from '@playwright/test';

const PORT = 3098;

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  webServer: {
    command: `cross-env NODE_ENV=development WEB_PORT=${PORT} COOKIE_SECRET=e2e-test-cookie-secret-32-chars-min tsx server/index.ts`,
    port: PORT,
    reuseExistingServer: false,
    timeout: 30_000,
  },
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
});
