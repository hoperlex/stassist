-- compat_pages: 78 канонических пар знаков — SKELETON-строки (body_md = NULL), Ф3.
-- СГЕНЕРИРОВАНО: tools/seed-compat-pages.ts из packages/shared/src/schemas/zodiac.ts
-- (allCanonicalCompatPairs). НЕ редактировать руками — перегенерировать
-- `pnpm data:seed-compat-pages`. Идемпотентно: ON CONFLICT DO NOTHING — повторный прогон
-- НЕ затирает body_md, залитый Ф4 (см. docs/roadmap/31-конвенции-реализации.md §5/§6).

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('oven', 'oven', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('oven', 'telec', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('oven', 'bliznecy', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('oven', 'rak', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('oven', 'lev', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('oven', 'deva', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('oven', 'vesy', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('oven', 'skorpion', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('oven', 'strelec', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('oven', 'kozerog', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('oven', 'vodoley', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('oven', 'ryby', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('telec', 'telec', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('telec', 'bliznecy', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('telec', 'rak', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('telec', 'lev', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('telec', 'deva', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('telec', 'vesy', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('telec', 'skorpion', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('telec', 'strelec', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('telec', 'kozerog', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('telec', 'vodoley', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('telec', 'ryby', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('bliznecy', 'bliznecy', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('bliznecy', 'rak', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('bliznecy', 'lev', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('bliznecy', 'deva', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('bliznecy', 'vesy', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('bliznecy', 'skorpion', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('bliznecy', 'strelec', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('bliznecy', 'kozerog', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('bliznecy', 'vodoley', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('bliznecy', 'ryby', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('rak', 'rak', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('rak', 'lev', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('rak', 'deva', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('rak', 'vesy', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('rak', 'skorpion', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('rak', 'strelec', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('rak', 'kozerog', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('rak', 'vodoley', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('rak', 'ryby', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('lev', 'lev', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('lev', 'deva', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('lev', 'vesy', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('lev', 'skorpion', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('lev', 'strelec', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('lev', 'kozerog', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('lev', 'vodoley', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('lev', 'ryby', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('deva', 'deva', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('deva', 'vesy', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('deva', 'skorpion', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('deva', 'strelec', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('deva', 'kozerog', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('deva', 'vodoley', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('deva', 'ryby', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('vesy', 'vesy', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('vesy', 'skorpion', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('vesy', 'strelec', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('vesy', 'kozerog', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('vesy', 'vodoley', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('vesy', 'ryby', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('skorpion', 'skorpion', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('skorpion', 'strelec', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('skorpion', 'kozerog', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('skorpion', 'vodoley', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('skorpion', 'ryby', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('strelec', 'strelec', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('strelec', 'kozerog', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('strelec', 'vodoley', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('strelec', 'ryby', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('kozerog', 'kozerog', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('kozerog', 'vodoley', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('kozerog', 'ryby', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('vodoley', 'vodoley', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('vodoley', 'ryby', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;

INSERT INTO "compat_pages" ("sign_a", "sign_b", "body_md")
VALUES ('ryby', 'ryby', NULL)
ON CONFLICT ("sign_a", "sign_b") DO NOTHING;
