# Известные проблемы сборки (к правке до дев-прогона)

- **api dev/start через tsx**: пакет `astronomy-engine` (двойной CJS/ESM) ломает `tsx`
  module-resolution в `apps/api` dev/start-скриптах. Прод `node dist/index.js` НЕ затронут
  (использовался для live-верификации Ф2). Починить до раздачи dev-сервера (фаза дев-конфига).
  Источник: отчёт Ф2 `_report/build/f2-отчёт.md`.
