# Stassist — астрологический портал

Проектная документация коммерческого русскоязычного портала астрологических услуг:
гороскопы (включая шуточные), ИИ-астропомощник, индивидуальные прогнозы, нумерология и
минералы, база знаний, коммьюнити.

## Состав пакета документов

| Раздел | Содержание |
|---|---|
| [docs/research/](docs/research/00-обзор-исследования.md) | Исследование рынка: школы, алгоритмы, конкуренты (включая [каталог топ-50](docs/research/09-топ50-каталог.md)), рынок/юридика РФ, ИИ, SEO |
| [docs/strategy/](docs/strategy/10-выводы-и-позиционирование.md) | Позиционирование, сегменты, монетизация, каналы роста, риски, KPI |
| [docs/architecture/](docs/architecture/20-архитектура-услуг.md) | Архитектура услуг (M0–M10), [техническая архитектура](docs/architecture/21-техническая-архитектура.md), [модель данных](docs/architecture/22-модель-данных.md), [SEO-стратегия](docs/architecture/23-seo-стратегия.md) |
| [docs/roadmap/](docs/roadmap/30-план-реализации.md) | План реализации по фазам Ф0–Ф8 + [самодостаточные промты](docs/roadmap/prompts/) для каждой фазы |
| `_work/` | Служебные данные: JSON-профили топ-50, результаты адверсариальной верификации фактов, находки верификации фаз реализации (`_work/build/findings/`) |
| `_report/` | `top50-матрица.xlsx` — Excel-каталог конкурентов; `_report/build/` — отчёты по фазам реализации (`f0-отчёт.md` и далее) |
| `apps/`, `packages/`, `drizzle/` | Монорепозиторий реализации (см. раздел «Монорепозиторий» ниже) |

## Ключевые решения

- Стек: Node.js + TypeScript + Fastify · React + AntD5 (SSR через vike) · PostgreSQL + Drizzle · pino · zod.
- Расчётное ядро — **только open-source**: astronomy-engine (MIT) + собственные системы домов,
  без Swiss Ephemeris (AGPL). Точность гарантируется golden-тестами.
- ИИ: расчёт всегда детерминированный; LLM только интерпретирует (RAG по собственному корпусу),
  слой абстракции провайдеров (Claude / YandexGPT / GigaChat / OpenRouter).
- Индивидуальные прогнозы: ИИ в MVP, маркетплейс живых астрологов — этап 2 (задел в модели данных).
- 152-ФЗ: продовая БД с ПД — в РФ с запуска (Yandex Managed PostgreSQL); Supabase — dev/стейдж.
- Главный канал роста — SEO-программатика + Telegram/Дзен (реклама эзотерики ограничена площадками).

## Монорепозиторий (Ф0 — инфраструктура)

Реализация ведётся по фазам ([docs/roadmap/30-план-реализации.md](docs/roadmap/30-план-реализации.md));
Ф0 создала каркас монорепозитория — «скелет, который ходит»: три процесса (api/web/worker),
CI, миграции БД, docker-compose/caddy для деплоя. Бизнес-логики ещё нет — она появится
в следующих фазах.

```
stassist/
  apps/
    api/      # Fastify: healthz/readyz, security-плагины, zod-роуты
    web/      # vike SSR (React 18 + AntD5) как middleware Fastify; страницы «/» и «/app»
    worker/   # pg-boss с ленивой инициализацией (без БД — degraded, не крашится)
  packages/
    shared/          # zod-конфиг (degraded-режим), порты+стабы инфры (S3/mailer/geocoder/
                      # платежи/LLM/эмбеддинги), общие схемы/константы
    astro-core/      # расчётное ядро — наполнится в Ф1
    numerology-core/ # нумерология/матрица судьбы — наполнится в Ф4/Ф6
    llm/             # ИИ-конвейер — наполнится в Ф4
    ui/              # общие React-компоненты — наполнится в Ф3
  drizzle/           # SQL-first миграции (сгенерированы оффлайн из TS-схемы)
  docker-compose.yml # postgres (pgvector) + minio + api/web/worker + caddy
  caddy/Caddyfile    # реверс-прокси: '/' → web, '/api' и /healthz,/readyz → api
  .github/workflows/ # CI: гейт собираемости + отдельные job-ы docker-образов/деплоя
```

### Быстрый старт

```bash
pnpm install
pnpm -r typecheck && pnpm -r lint && pnpm -r test:unit && pnpm -r build   # зелёный гейт фазы
pnpm --filter @stassist/api dev      # http://localhost:3001 (healthz/readyz)
pnpm --filter @stassist/web dev      # http://localhost:3000 ('/' и '/app')
pnpm --filter @stassist/worker dev   # degraded без DATABASE_URL, не крашится
```

Уровни тестов (см. [31-конвенции-реализации.md §1](docs/roadmap/31-конвенции-реализации.md)):
`test:unit` (без сети/БД, гоняется всегда), `test:integration` (нужен `DATABASE_URL`,
без него — авто-skip), `test:e2e` (Playwright, гейт `RUN_E2E=1`, нужен `pnpm exec playwright
install chromium`).

> **Известная проблема (`tsx` dev-режим api/worker + `astronomy-engine`).** `pnpm --filter
> @stassist/api dev|start` и `pnpm --filter @stassist/worker dev|start` могут упасть на старте с
> `TypeError: Cannot read properties of undefined (reading 'Mercury')`
> (`packages/astro-core/src/ephemeris/planets.ts`) — это ESM/CJS-интероп несовместимость между
> `tsx`/esbuild и dual-package экспортами `astronomy-engine` (пакет отдаёт разные сборки на
> `import`/`require`, см. его `package.json` `exports`), не связанная с БД/S3 и не вызванная
> изменениями этой задачи (воспроизводится и на чистом дереве). `pnpm -r build` (обычный `tsc`,
> НЕ esbuild) собирает эти же пакеты без проблем. **Обходной путь**: гонять api/worker через
> собранный `dist` — именно так и работает прод (см. `apps/api/Dockerfile`/`apps/worker/Dockerfile`
> `CMD ["node", "dist/index.js"]`):
> ```bash
> pnpm -r build
> node apps/api/dist/index.js       # вместо `pnpm --filter @stassist/api dev`
> node apps/worker/dist/index.js    # вместо `pnpm --filter @stassist/worker dev`
> ```
> `apps/web` не зависит от `@stassist/astro-core` напрямую — `pnpm --filter @stassist/web dev`
> не задет. Требует отдельного расследования/фикса (не в рамках этой задачи).

### Supabase (dev/стейдж-альтернатива БД, ADR-8) + S3 (s3.cloud.ru)

БД — по умолчанию локальный `DATABASE_URL` (docker-compose, без SSL). Как альтернатива на
dev/стейдже — облачный **Supabase** с СИНТЕТИЧЕСКИМИ данными (152-ФЗ: реальные ПД россиян в
зарубежную БД — нельзя, см. `docs/architecture/21-техническая-архитектура.md` §10, ADR-8):

```bash
export DATABASE_URL="$DATABASE_URL_SUPABASE_STAGE"   # значение — в .env, не коммитится
pnpm db:migrate   # применяет drizzle/migrations/*.sql (pgcrypto/vector/pg_trgm — Supabase их поддерживает)
pnpm db:seed      # применяет drizzle/seed/*.sql (идемпотентно)
pnpm data:horoscopes-backfill   # наполняет horoscopes на сегодня (иначе таблица пустая)
```

Особенности Supabase, которые важно учесть:
- **SSL обязателен.** `pg`/`pg-boss` в этом репозитории досчитывают `ssl` автоматически
  (`packages/db/src/pg-ssl.ts`): для localhost/127.0.0.1 без SSL, для любого другого хоста без
  явного `sslmode` в DSN — форсируют `{ rejectUnauthorized: false }`. Если DSN уже содержит
  `?sslmode=require|no-verify|...` — используется он как есть (стандартный разбор `pg`).
- **Пул-порт (6543) vs прямой/session-порт (5432).** Миграции (advisory lock) и `pg-boss`
  (LISTEN/NOTIFY, подготовленные операторы) требуют session-режима — используйте прямой порт
  Supabase (5432) или пуловый хост в session-режиме, НЕ transaction-pooler (6543).
- `tools/db-migrate.ts`/`tools/db-seed.ts` содержат СВОЮ маленькую копию SSL-логики (не импортируют
  `@stassist/db`) — см. doc-комментарий в файлах: причина — известная проблема `tsx` +
  `astronomy-engine` выше.

Объектное хранилище — по умолчанию `STORAGE=stub` (`MemoryObjectStorage`, in-memory + копия в
`_work/tmp/storage`). Реальный адаптер — S3-совместимое API (**s3.cloud.ru** на проде, MinIO
локально, см. `docker-compose.yml`):

```bash
export STORAGE=s3
export S3_ENDPOINT=...        # см. .env.example — https://s3.cloud.ru (прод) / MinIO (локально)
export S3_REGION=...
export S3_BUCKET=...
export S3_ACCESS_KEY_ID=...
export S3_SECRET_ACCESS_KEY=...
```

`S3ObjectStorage` (`packages/shared/src/ports/s3-object-storage.ts`) — `@aws-sdk/client-s3` +
`@aws-sdk/s3-request-presigner`, `forcePathStyle: true` (обязательно для не-AWS S3), presigned
GET с настраиваемым TTL. Реальные значения — только в `.env` (не коммитится); плейсхолдеры и
описание переменных — [.env.example](.env.example).

### Секреты

По ТЗ секреты никогда не попадают в git/образы/фронтенд/логи/БД. Локально — файл `.env`
(в `.gitignore`, никогда не коммитится), пример всех переменных — [.env.example](.env.example).
На стейдже/проде — protected environment variables CI или Docker secrets, не сырые `.env` в
образе. Схема и валидация — `packages/shared/src/config.ts` (zod): в `NODE_ENV=production`
отсутствие обязательных для выбранной (не-stub) подсистемы переменных — падение процесса на
старте (fail-fast); в `development`/`test` — degraded-режим (подсистема не инициализируется,
`GET /healthz` всё равно отвечает 200). pino-логи используют redaction-лист
(`apps/api/src/logging.ts`): `Authorization`/`Cookie`/пароли/токены/поля рождения никогда не
попадают в логи в открытом виде.

Плейсхолдеры `{{ЗАПОЛНИТ ЗАКАЗЧИК}}` в `.env.example` — внешние факты, которые агент
не фабрикует (реквизиты ЮKassa, домен стейджа/прода, контакт для User-Agent Nominatim и т.д.),
см. [31-конвенции-реализации.md §8](docs/roadmap/31-конвенции-реализации.md).

## Методика

Пакет собран мультиагентным исследованием (12.07.2026): 8 направлений скаутинга (~160 источников),
50 агентов-профилировщиков конкурентов + 12 скептиков, адверсариальная верификация 41 критичного
факта в 9 кластерах (26 подтверждено, 14 уточнено, 0 опровергнуто, 1 не проверяемо), финальная
трёхмерная проверка полноты/согласованности/достоверности с внесением всех исправлений.
Оценочные цифры помечены «оценка»; непроверяемое — «требует проверки».
