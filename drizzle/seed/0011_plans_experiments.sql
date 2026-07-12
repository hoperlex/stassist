-- Ф8: тарифные планы + реестр A/B-экспериментов (doc 22 §4, §7б; промт Ф8 req.1-3).
-- Единый источник правды по значениям — packages/shared/src/schemas/billing.ts PLAN_CATALOG,
-- packages/shared/src/schemas/paywall.ts PAYWALL_VARIANTS. Держать в синхроне при правках цен.
-- Идемпотентно: повторный прогон обновляет существующие строки по уникальному ключу (code).

INSERT INTO "plans" ("code", "title_ru", "price_kop", "period", "trial_days", "features")
VALUES (
  'free', 'Бесплатный', 0, 'none', 0,
  '["Расчёт натальной карты, матрицы судьбы, психоматрицы и совместимости","Краткий персональный гороскоп на день","Один полный ИИ-разбор «Большая тройка» бесплатно","Публичная лента гороскопов, база знаний и калькуляторы без ограничений"]'::jsonb
)
ON CONFLICT ("code") DO UPDATE SET
  "title_ru" = EXCLUDED."title_ru",
  "price_kop" = EXCLUDED."price_kop",
  "period" = EXCLUDED."period",
  "trial_days" = EXCLUDED."trial_days",
  "features" = EXCLUDED."features",
  "updated_at" = now();

INSERT INTO "plans" ("code", "title_ru", "price_kop", "period", "trial_days", "features")
VALUES (
  'premium_m', 'Премиум (месяц)', 34900, 'month', 7,
  '["Полная персональная лента прогнозов — день и неделя, без сокращений","Безлимитный чат с ИИ-астропомощником по вашей карте","Полные разборы: натальная карта, синастрия, соляр, транзиты месяца","Скидка 20% на PDF-отчёты и индивидуальные прогнозы","Отмена подписки в один клик в любой момент, доступ сохраняется до конца периода"]'::jsonb
)
ON CONFLICT ("code") DO UPDATE SET
  "title_ru" = EXCLUDED."title_ru",
  "price_kop" = EXCLUDED."price_kop",
  "period" = EXCLUDED."period",
  "trial_days" = EXCLUDED."trial_days",
  "features" = EXCLUDED."features",
  "updated_at" = now();

INSERT INTO "plans" ("code", "title_ru", "price_kop", "period", "trial_days", "features")
VALUES (
  'premium_y', 'Премиум (год)', 249000, 'year', 7,
  '["Все возможности месячного плана","Экономия — как 2 месяца бесплатно по сравнению с помесячной оплатой","Приоритетная очередь генерации отчётов"]'::jsonb
)
ON CONFLICT ("code") DO UPDATE SET
  "title_ru" = EXCLUDED."title_ru",
  "price_kop" = EXCLUDED."price_kop",
  "period" = EXCLUDED."period",
  "trial_days" = EXCLUDED."trial_days",
  "features" = EXCLUDED."features",
  "updated_at" = now();

INSERT INTO "experiments" ("code", "variants", "active")
VALUES ('paywall_v1', '["control","trial_first"]'::jsonb, true)
ON CONFLICT ("code") DO UPDATE SET
  "variants" = EXCLUDED."variants",
  "active" = EXCLUDED."active",
  "updated_at" = now();
