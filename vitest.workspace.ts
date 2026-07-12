// Единая workspace-конфигурация vitest на весь монорепозиторий (см. §1 конвенций реализации,
// docs/roadmap/31-конвенции-реализации.md). Агрегирует конфиги отдельных пакетов/приложений —
// у каждого свой `vitest.config.ts` (уровень unit) и, где применимо, `vitest.integration.config.ts`
// (уровень integration, тесты сами себя skip-ают через describe.skipIf(!process.env.DATABASE_URL)).
//
// Запуск по всему репо: `pnpm vitest --project '*:unit'` / `pnpm vitest --project '*:integration'`.
// Запуск по одному пакету (что и делает `pnpm -r test:unit`): каждый package.json вызывает
// `vitest run` в своей директории — vitest сам находит локальный vitest.config.ts.
//
// e2e (Playwright) сюда не входит — это gate RUN_E2E=1, отдельный раннер (см. package.json
// apps/web, скрипт test:e2e).
export default [
  'apps/*/vitest.config.ts',
  'apps/*/vitest.integration.config.ts',
  'packages/*/vitest.config.ts',
];
