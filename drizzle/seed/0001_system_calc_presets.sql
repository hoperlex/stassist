-- Системные расчётные пресеты (calc_presets.user_id IS NULL) — Ф2, doc 20 «Границы MVP» M0/M5.
-- СГЕНЕРИРОВАНО: tools/seed-calc-presets.ts из packages/db/src/seed/system-calc-presets.ts.
-- НЕ редактировать руками — перегенерировать `pnpm data:seed-calc-presets`.
-- Идемпотентно: повторный прогон обновляет параметры существующих системных пресетов по code.

INSERT INTO "calc_presets" ("user_id", "code", "name", "zodiac", "ayanamsha", "house_system", "bodies", "orbs", "aspect_set")
VALUES (NULL, 'modern_western', 'Современная западная', 'tropical', NULL, 'placidus', '{"trueNode":false,"trueLilith":false,"selena":true,"chiron":true}'::jsonb, '{"byAspect":{"conjunction":8,"semisextile":2,"semisquare":2,"sextile":6,"quintile":2,"square":7,"trine":8,"sesquiquadrate":2,"biquintile":2,"quincunx":3,"opposition":8},"byBody":{"meanNode":3,"trueNode":3,"meanLilith":2,"selena":2,"chiron":3,"fortuna":1}}'::jsonb, 'major_minor')
ON CONFLICT ("code") DO UPDATE SET
  "name" = EXCLUDED."name",
  "zodiac" = EXCLUDED."zodiac",
  "ayanamsha" = EXCLUDED."ayanamsha",
  "house_system" = EXCLUDED."house_system",
  "bodies" = EXCLUDED."bodies",
  "orbs" = EXCLUDED."orbs",
  "aspect_set" = EXCLUDED."aspect_set",
  "updated_at" = now();

INSERT INTO "calc_presets" ("user_id", "code", "name", "zodiac", "ayanamsha", "house_system", "bodies", "orbs", "aspect_set")
VALUES (NULL, 'classical', 'Классическая', 'tropical', NULL, 'whole_sign', '{"trueNode":false,"trueLilith":false,"selena":false,"chiron":false}'::jsonb, '{"byAspect":{"conjunction":10,"opposition":10,"trine":8,"square":8,"sextile":6},"byBody":{}}'::jsonb, 'major')
ON CONFLICT ("code") DO UPDATE SET
  "name" = EXCLUDED."name",
  "zodiac" = EXCLUDED."zodiac",
  "ayanamsha" = EXCLUDED."ayanamsha",
  "house_system" = EXCLUDED."house_system",
  "bodies" = EXCLUDED."bodies",
  "orbs" = EXCLUDED."orbs",
  "aspect_set" = EXCLUDED."aspect_set",
  "updated_at" = now();
