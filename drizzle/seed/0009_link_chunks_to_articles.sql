-- interpretation_chunks.source_article_id — бэкфилл связи чанк → статья-источник Ф7.
-- СГЕНЕРИРОВАНО: tools/gen-wiki.ts. Правило — см. packages/shared/src/schemas/wiki.ts
-- articleSlugForChunkKey() (doc-комментарий там — источник правды по семантике).
-- Структурная связь (не редакционный контент) — безопасно перезапускать многократно.

-- sign:{sign}:overview → signs/{sign}
UPDATE "interpretation_chunks" c SET "source_article_id" = w.id
FROM "wiki_articles" w
WHERE w.section = 'signs' AND w.slug = split_part(c.key, ':', 2)
  AND c.key ~ '^sign:[a-z]+:overview$';

-- planet:{planet}:overview → planets/{planet}
UPDATE "interpretation_chunks" c SET "source_article_id" = w.id
FROM "wiki_articles" w
WHERE w.section = 'planets' AND w.slug = split_part(c.key, ':', 2)
  AND c.key ~ '^planet:[a-z_]+:overview$';

-- house:{n}:overview → houses/house-{n}
UPDATE "interpretation_chunks" c SET "source_article_id" = w.id
FROM "wiki_articles" w
WHERE w.section = 'houses' AND w.slug = 'house-' || split_part(c.key, ':', 2)
  AND c.key ~ '^house:[0-9]+:overview$';

-- planet_in_sign / planet_in_house / point_in_sign / point_in_house → planets/{planet|point}
UPDATE "interpretation_chunks" c SET "source_article_id" = w.id
FROM "wiki_articles" w
WHERE w.section = 'planets' AND w.slug = split_part(c.key, ':', 2)
  AND (c.key ~ '^planet_in_sign:' OR c.key ~ '^planet_in_house:' OR c.key ~ '^point_in_sign:' OR c.key ~ '^point_in_house:');

-- asc_in_sign:{sign} → signs/{sign}
UPDATE "interpretation_chunks" c SET "source_article_id" = w.id
FROM "wiki_articles" w
WHERE w.section = 'signs' AND w.slug = split_part(c.key, ':', 2)
  AND c.key ~ '^asc_in_sign:';

-- aspect:{angle}:overview (ровно 3 сегмента) → aspects/{angle}
UPDATE "interpretation_chunks" c SET "source_article_id" = w.id
FROM "wiki_articles" w
WHERE w.section = 'aspects' AND w.slug = split_part(c.key, ':', 2)
  AND c.key ~ '^aspect:[a-z]+:overview$';

-- aspect:{lo}:{angle}:{hi} (между объектами, ровно 4 сегмента) → aspects/{angle}
UPDATE "interpretation_chunks" c SET "source_article_id" = w.id
FROM "wiki_articles" w
WHERE w.section = 'aspects' AND w.slug = split_part(c.key, ':', 3)
  AND c.key ~ '^aspect:[a-z_]+:[a-z]+:[a-z_]+$';

-- arcanum:{n}:{position} → arcana/arkan-{n}
UPDATE "interpretation_chunks" c SET "source_article_id" = w.id
FROM "wiki_articles" w
WHERE w.section = 'arcana' AND w.slug = 'arkan-' || split_part(c.key, ':', 2)
  AND c.key ~ '^arcanum:[0-9]+:';
