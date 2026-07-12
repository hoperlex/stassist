-- wiki_articles — стартовый набор Ф7 (189 статей).
-- СГЕНЕРИРОВАНО: tools/gen-wiki.ts из packages/llm/src/corpus/wiki-content.ts.
-- НЕ редактировать руками — перегенерировать `pnpm data:wiki`.
-- Идемпотентно: ON CONFLICT ("slug") DO UPDATE ТОЛЬКО пока status='draft' (не затирает
-- ручную редактуру редактора, см. §6 конвенций реализации).

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('aries', 'signs', 'Знак зодиака Овен', '## Овен

Овен — знак стихии огонь, кардинальный по качеству. Люди с сильным влиянием Овна склонны проявлять себя через инициативу, скорость и прямое действие. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('taurus', 'signs', 'Знак зодиака Телец', '## Телец

Телец — знак стихии земля, фиксированный по качеству. Люди с сильным влиянием Тельца склонны проявлять себя через устойчивость, практичность и стремление к надёжной опоре. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('gemini', 'signs', 'Знак зодиака Близнецы', '## Близнецы

Близнецы — знак стихии воздух, мутабельный по качеству. Люди с сильным влиянием Близнецов склонны проявлять себя через любопытство, гибкость ума и потребность в разнообразии. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('cancer', 'signs', 'Знак зодиака Рак', '## Рак

Рак — знак стихии вода, кардинальный по качеству. Люди с сильным влиянием Рака склонны проявлять себя через заботу, эмоциональную чуткость и привязанность к близким. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('leo', 'signs', 'Знак зодиака Лев', '## Лев

Лев — знак стихии огонь, фиксированный по качеству. Люди с сильным влиянием Льва склонны проявлять себя через яркое самовыражение, щедрость и потребность быть увиденным. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('virgo', 'signs', 'Знак зодиака Дева', '## Дева

Дева — знак стихии земля, мутабельный по качеству. Люди с сильным влиянием Девы склонны проявлять себя через внимание к деталям, аналитичность и стремление быть полезным. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('libra', 'signs', 'Знак зодиака Весы', '## Весы

Весы — знак стихии воздух, кардинальный по качеству. Люди с сильным влиянием Весов склонны проявлять себя через поиск баланса, эстетику и умение видеть чужую точку зрения. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('scorpio', 'signs', 'Знак зодиака Скорпион', '## Скорпион

Скорпион — знак стихии вода, фиксированный по качеству. Люди с сильным влиянием Скорпиона склонны проявлять себя через глубину, сосредоточенность и способность не отступать. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('sagittarius', 'signs', 'Знак зодиака Стрелец', '## Стрелец

Стрелец — знак стихии огонь, мутабельный по качеству. Люди с сильным влиянием Стрельца склонны проявлять себя через оптимизм, широту взглядов и тягу к новому опыту. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('capricorn', 'signs', 'Знак зодиака Козерог', '## Козерог

Козерог — знак стихии земля, кардинальный по качеству. Люди с сильным влиянием Козерога склонны проявлять себя через дисциплину, терпение и ориентацию на долгосрочный результат. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('aquarius', 'signs', 'Знак зодиака Водолей', '## Водолей

Водолей — знак стихии воздух, фиксированный по качеству. Люди с сильным влиянием Водолея склонны проявлять себя через независимость мышления, нестандартность и интерес к общему благу. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('pisces', 'signs', 'Знак зодиака Рыбы', '## Рыбы

Рыбы — знак стихии вода, мутабельный по качеству. Люди с сильным влиянием Рыб склонны проявлять себя через сочувствие, воображение и тонкую восприимчивость. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('sun', 'planets', 'Солнце в астрологии', '## Солнце

Солнце в натальной карте отвечает за осознанную волю, жизненную силу и то, как человек проявляет себя. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('moon', 'planets', 'Луна в астрологии', '## Луна

Луна в натальной карте отвечает за эмоциональные потребности, привычные реакции и внутреннее ощущение безопасности. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('mercury', 'planets', 'Меркурий в астрологии', '## Меркурий

Меркурий в натальной карте отвечает за мышление, речь и то, как человек обрабатывает и передаёт информацию. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('venus', 'planets', 'Венера в астрологии', '## Венера

Венера в натальной карте отвечает за ценности, притяжение к красоте и стиль близости в отношениях. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('mars', 'planets', 'Марс в астрологии', '## Марс

Марс в натальной карте отвечает за напористость, способ действовать и отстаивать свои границы. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('jupiter', 'planets', 'Юпитер в астрологии', '## Юпитер

Юпитер в натальной карте отвечает за рост, оптимизм и то, в чём человек ищет смысл и расширение. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('saturn', 'planets', 'Сатурн в астрологии', '## Сатурн

Сатурн в натальной карте отвечает за дисциплину, ответственность и зоны, где опыт даётся через труд. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('uranus', 'planets', 'Уран в астрологии', '## Уран

Уран в натальной карте отвечает за потребность в свободе, оригинальность и готовность к переменам. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('neptune', 'planets', 'Нептун в астрологии', '## Нептун

Нептун в натальной карте отвечает за воображение, чувствительность к тонким материям и склонность к идеализации. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('pluto', 'planets', 'Плутон в астрологии', '## Плутон

Плутон в натальной карте отвечает за глубинную трансформацию, скрытые ресурсы и работу с интенсивными процессами. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('chiron', 'planets', 'Хирон в астрологии', '## Хирон

Хирон в натальной карте отвечает за зону наиболее чувствительного, но и наиболее целительного опыта. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('north_node', 'planets', 'Северный узел в астрологии', '## Северный узел

Северный узел в натальной карте отвечает за направление осознанного роста и незнакомую, но развивающую территорию. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lilith', 'planets', 'Лилит в астрологии', '## Лилит

Лилит в натальной карте отвечает за непризнанную, вытесненную часть личности, которая просит признания. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('selena', 'planets', 'Селена в астрологии', '## Селена

Селена в натальной карте отвечает за тонкую интуитивную чувствительность и связь с коллективным опытом. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('house-1', 'houses', '1-й дом гороскопа', '## 1-й дом

1-й дом натальной карты отвечает за личность, внешнее проявление себя и то, как начинаются новые дела. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('house-2', 'houses', '2-й дом гороскопа', '## 2-й дом

2-й дом натальной карты отвечает за ресурсы, финансовую устойчивость и систему ценностей. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('house-3', 'houses', '3-й дом гороскопа', '## 3-й дом

3-й дом натальной карты отвечает за повседневное общение, обучение и ближайшее окружение. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('house-4', 'houses', '4-й дом гороскопа', '## 4-й дом

4-й дом натальной карты отвечает за дом, корни и внутреннюю опору семьи. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('house-5', 'houses', '5-й дом гороскопа', '## 5-й дом

5-й дом натальной карты отвечает за творческое самовыражение, романтику и радость проживания жизни. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('house-6', 'houses', '6-й дом гороскопа', '## 6-й дом

6-й дом натальной карты отвечает за повседневную рутину, работу и заботу о теле. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('house-7', 'houses', '7-й дом гороскопа', '## 7-й дом

7-й дом натальной карты отвечает за партнёрство, брак и открытые договорённости с другими. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('house-8', 'houses', '8-й дом гороскопа', '## 8-й дом

8-й дом натальной карты отвечает за общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('house-9', 'houses', '9-й дом гороскопа', '## 9-й дом

9-й дом натальной карты отвечает за мировоззрение, обучение высшего порядка и дальние горизонты. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('house-10', 'houses', '10-й дом гороскопа', '## 10-й дом

10-й дом натальной карты отвечает за карьеру, статус и публичную репутацию. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('house-11', 'houses', '11-й дом гороскопа', '## 11-й дом

11-й дом натальной карты отвечает за дружеские сообщества, цели на будущее и коллективные проекты. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('house-12', 'houses', '12-й дом гороскопа', '## 12-й дом

12-й дом натальной карты отвечает за уединение, внутреннюю работу и то, что обычно остаётся за кадром. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('conjunction', 'aspects', 'Аспект «Соединение»', '## Соединение

Аспект «соединение» описывает, как две энергии соотносятся друг с другом: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('opposition', 'aspects', 'Аспект «Оппозиция»', '## Оппозиция

Аспект «оппозиция» описывает, как две энергии соотносятся друг с другом: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('trine', 'aspects', 'Аспект «Трин»', '## Трин

Аспект «трин» описывает, как две энергии соотносятся друг с другом: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('square', 'aspects', 'Аспект «Квадрат»', '## Квадрат

Аспект «квадрат» описывает, как две энергии соотносятся друг с другом: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('sextile', 'aspects', 'Аспект «Секстиль»', '## Секстиль

Аспект «секстиль» описывает, как две энергии соотносятся друг с другом: возможность, которая раскрывается, если ею сознательно воспользоваться. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('quincunx', 'aspects', 'Аспект «Квинконс»', '## Квинконс

Аспект «квинконс» описывает, как две энергии соотносятся друг с другом: несовпадение по логике, требующее постоянной тонкой подстройки друг к другу. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('semisextile', 'aspects', 'Аспект «Полусекстиль»', '## Полусекстиль

Аспект «полусекстиль» описывает, как две энергии соотносятся друг с другом: едва заметная, но полезная связь между смежными областями опыта. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-1', 'arcana', 'Аркан 1 — Маг (Матрица судьбы)', '## Аркан 1 — «Маг»

Аркан 1 («Маг») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 1 («Маг») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 1 («Маг») в позиции «личное предназначение» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 1 («Маг») в позиции «социальное предназначение» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 1 («Маг») в позиции «линия отношений» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 1 («Маг») в позиции «денежная линия» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-2', 'arcana', 'Аркан 2 — Верховная Жрица (Матрица судьбы)', '## Аркан 2 — «Верховная Жрица»

Аркан 2 («Верховная Жрица») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 2 («Верховная Жрица») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 2 («Верховная Жрица») в позиции «личное предназначение» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 2 («Верховная Жрица») в позиции «социальное предназначение» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 2 («Верховная Жрица») в позиции «линия отношений» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 2 («Верховная Жрица») в позиции «денежная линия» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-3', 'arcana', 'Аркан 3 — Императрица (Матрица судьбы)', '## Аркан 3 — «Императрица»

Аркан 3 («Императрица») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 3 («Императрица») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 3 («Императрица») в позиции «личное предназначение» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 3 («Императрица») в позиции «социальное предназначение» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 3 («Императрица») в позиции «линия отношений» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 3 («Императрица») в позиции «денежная линия» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-4', 'arcana', 'Аркан 4 — Император (Матрица судьбы)', '## Аркан 4 — «Император»

Аркан 4 («Император») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 4 («Император») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 4 («Император») в позиции «личное предназначение» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 4 («Император») в позиции «социальное предназначение» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 4 («Император») в позиции «линия отношений» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 4 («Император») в позиции «денежная линия» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-5', 'arcana', 'Аркан 5 — Иерофант (Матрица судьбы)', '## Аркан 5 — «Иерофант»

Аркан 5 («Иерофант») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 5 («Иерофант») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 5 («Иерофант») в позиции «личное предназначение» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 5 («Иерофант») в позиции «социальное предназначение» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 5 («Иерофант») в позиции «линия отношений» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 5 («Иерофант») в позиции «денежная линия» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-6', 'arcana', 'Аркан 6 — Влюблённые (Матрица судьбы)', '## Аркан 6 — «Влюблённые»

Аркан 6 («Влюблённые») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 6 («Влюблённые») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 6 («Влюблённые») в позиции «личное предназначение» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 6 («Влюблённые») в позиции «социальное предназначение» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 6 («Влюблённые») в позиции «линия отношений» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 6 («Влюблённые») в позиции «денежная линия» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-7', 'arcana', 'Аркан 7 — Колесница (Матрица судьбы)', '## Аркан 7 — «Колесница»

Аркан 7 («Колесница») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 7 («Колесница») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 7 («Колесница») в позиции «личное предназначение» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 7 («Колесница») в позиции «социальное предназначение» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 7 («Колесница») в позиции «линия отношений» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 7 («Колесница») в позиции «денежная линия» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-8', 'arcana', 'Аркан 8 — Сила (Матрица судьбы)', '## Аркан 8 — «Сила»

Аркан 8 («Сила») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 8 («Сила») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 8 («Сила») в позиции «личное предназначение» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 8 («Сила») в позиции «социальное предназначение» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 8 («Сила») в позиции «линия отношений» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 8 («Сила») в позиции «денежная линия» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-9', 'arcana', 'Аркан 9 — Отшельник (Матрица судьбы)', '## Аркан 9 — «Отшельник»

Аркан 9 («Отшельник») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 9 («Отшельник») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 9 («Отшельник») в позиции «личное предназначение» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 9 («Отшельник») в позиции «социальное предназначение» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 9 («Отшельник») в позиции «линия отношений» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 9 («Отшельник») в позиции «денежная линия» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-10', 'arcana', 'Аркан 10 — Колесо Фортуны (Матрица судьбы)', '## Аркан 10 — «Колесо Фортуны»

Аркан 10 («Колесо Фортуны») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 10 («Колесо Фортуны») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 10 («Колесо Фортуны») в позиции «личное предназначение» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 10 («Колесо Фортуны») в позиции «социальное предназначение» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 10 («Колесо Фортуны») в позиции «линия отношений» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 10 («Колесо Фортуны») в позиции «денежная линия» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-11', 'arcana', 'Аркан 11 — Справедливость (Матрица судьбы)', '## Аркан 11 — «Справедливость»

Аркан 11 («Справедливость») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 11 («Справедливость») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 11 («Справедливость») в позиции «личное предназначение» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 11 («Справедливость») в позиции «социальное предназначение» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 11 («Справедливость») в позиции «линия отношений» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 11 («Справедливость») в позиции «денежная линия» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-12', 'arcana', 'Аркан 12 — Повешенный (Матрица судьбы)', '## Аркан 12 — «Повешенный»

Аркан 12 («Повешенный») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 12 («Повешенный») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 12 («Повешенный») в позиции «личное предназначение» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 12 («Повешенный») в позиции «социальное предназначение» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 12 («Повешенный») в позиции «линия отношений» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 12 («Повешенный») в позиции «денежная линия» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-13', 'arcana', 'Аркан 13 — Смерть (Матрица судьбы)', '## Аркан 13 — «Смерть»

Аркан 13 («Смерть») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 13 («Смерть») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 13 («Смерть») в позиции «личное предназначение» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 13 («Смерть») в позиции «социальное предназначение» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 13 («Смерть») в позиции «линия отношений» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 13 («Смерть») в позиции «денежная линия» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-14', 'arcana', 'Аркан 14 — Умеренность (Матрица судьбы)', '## Аркан 14 — «Умеренность»

Аркан 14 («Умеренность») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 14 («Умеренность») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 14 («Умеренность») в позиции «личное предназначение» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 14 («Умеренность») в позиции «социальное предназначение» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 14 («Умеренность») в позиции «линия отношений» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 14 («Умеренность») в позиции «денежная линия» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-15', 'arcana', 'Аркан 15 — Дьявол (Матрица судьбы)', '## Аркан 15 — «Дьявол»

Аркан 15 («Дьявол») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 15 («Дьявол») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 15 («Дьявол») в позиции «личное предназначение» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 15 («Дьявол») в позиции «социальное предназначение» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 15 («Дьявол») в позиции «линия отношений» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 15 («Дьявол») в позиции «денежная линия» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-16', 'arcana', 'Аркан 16 — Башня (Матрица судьбы)', '## Аркан 16 — «Башня»

Аркан 16 («Башня») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 16 («Башня») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 16 («Башня») в позиции «личное предназначение» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 16 («Башня») в позиции «социальное предназначение» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 16 («Башня») в позиции «линия отношений» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 16 («Башня») в позиции «денежная линия» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-17', 'arcana', 'Аркан 17 — Звезда (Матрица судьбы)', '## Аркан 17 — «Звезда»

Аркан 17 («Звезда») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 17 («Звезда») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 17 («Звезда») в позиции «личное предназначение» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 17 («Звезда») в позиции «социальное предназначение» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 17 («Звезда») в позиции «линия отношений» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 17 («Звезда») в позиции «денежная линия» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-18', 'arcana', 'Аркан 18 — Луна (Матрица судьбы)', '## Аркан 18 — «Луна»

Аркан 18 («Луна») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 18 («Луна») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 18 («Луна») в позиции «личное предназначение» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 18 («Луна») в позиции «социальное предназначение» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 18 («Луна») в позиции «линия отношений» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 18 («Луна») в позиции «денежная линия» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-19', 'arcana', 'Аркан 19 — Солнце (Матрица судьбы)', '## Аркан 19 — «Солнце»

Аркан 19 («Солнце») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 19 («Солнце») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 19 («Солнце») в позиции «личное предназначение» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 19 («Солнце») в позиции «социальное предназначение» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 19 («Солнце») в позиции «линия отношений» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 19 («Солнце») в позиции «денежная линия» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-20', 'arcana', 'Аркан 20 — Суд (Матрица судьбы)', '## Аркан 20 — «Суд»

Аркан 20 («Суд») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 20 («Суд») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 20 («Суд») в позиции «личное предназначение» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 20 («Суд») в позиции «социальное предназначение» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 20 («Суд») в позиции «линия отношений» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 20 («Суд») в позиции «денежная линия» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-21', 'arcana', 'Аркан 21 — Мир (Матрица судьбы)', '## Аркан 21 — «Мир»

Аркан 21 («Мир») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 21 («Мир») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 21 («Мир») в позиции «личное предназначение» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 21 («Мир») в позиции «социальное предназначение» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 21 («Мир») в позиции «линия отношений» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 21 («Мир») в позиции «денежная линия» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-22', 'arcana', 'Аркан 22 — Шут (Матрица судьбы)', '## Аркан 22 — «Шут»

Аркан 22 («Шут») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 22 («Шут») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.

Аркан 22 («Шут») в позиции «личное предназначение» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 22 («Шут») в позиции «социальное предназначение» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.

Аркан 22 («Шут») в позиции «линия отношений» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.

Аркан 22 («Шут») в позиции «денежная линия» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-1', 'lunar_days', '1-й лунный день', '## 1-й лунный день

Традиционные ключевые темы 1-го лунного дня: начало нового цикла, закладка намерений. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-2', 'lunar_days', '2-й лунный день', '## 2-й лунный день

Традиционные ключевые темы 2-го лунного дня: выбор направления, накопление ресурса. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-3', 'lunar_days', '3-й лунный день', '## 3-й лунный день

Традиционные ключевые темы 3-го лунного дня: активность, первые практические шаги. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-4', 'lunar_days', '4-й лунный день', '## 4-й лунный день

Традиционные ключевые темы 4-го лунного дня: преодоление препятствий, устойчивость. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-5', 'lunar_days', '5-й лунный день', '## 5-й лунный день

Традиционные ключевые темы 5-го лунного дня: перемены, гибкость, новые контакты. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-6', 'lunar_days', '6-й лунный день', '## 6-й лунный день

Традиционные ключевые темы 6-го лунного дня: баланс, забота о теле и отношениях. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-7', 'lunar_days', '7-й лунный день', '## 7-й лунный день

Традиционные ключевые темы 7-го лунного дня: осмысление пройденного, творческий поиск. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-8', 'lunar_days', '8-й лунный день', '## 8-й лунный день

Традиционные ключевые темы 8-го лунного дня: структурирование, доведение дел до порядка. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-9', 'lunar_days', '9-й лунный день', '## 9-й лунный день

Традиционные ключевые темы 9-го лунного дня: осторожность, работа с внутренними ограничениями. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-10', 'lunar_days', '10-й лунный день', '## 10-й лунный день

Традиционные ключевые темы 10-го лунного дня: сила воли, реализация задуманного. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-11', 'lunar_days', '11-й лунный день', '## 11-й лунный день

Традиционные ключевые темы 11-го лунного дня: подъём энергии, радость, общение. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-12', 'lunar_days', '12-й лунный день', '## 12-й лунный день

Традиционные ключевые темы 12-го лунного дня: кропотливая работа, внимание к деталям. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-13', 'lunar_days', '13-й лунный день', '## 13-й лунный день

Традиционные ключевые темы 13-го лунного дня: трансформация, освобождение от лишнего. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-14', 'lunar_days', '14-й лунный день', '## 14-й лунный день

Традиционные ключевые темы 14-го лунного дня: кульминация, пик активности лунного месяца. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-15', 'lunar_days', '15-й лунный день', '## 15-й лунный день

Традиционные ключевые темы 15-го лунного дня: полнолуние — эмоциональная насыщенность, кульминация. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-16', 'lunar_days', '16-й лунный день', '## 16-й лунный день

Традиционные ключевые темы 16-го лунного дня: выбор нового вектора после кульминации. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-17', 'lunar_days', '17-й лунный день', '## 17-й лунный день

Традиционные ключевые темы 17-го лунного дня: уединение, восстановление сил. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-18', 'lunar_days', '18-й лунный день', '## 18-й лунный день

Традиционные ключевые темы 18-го лунного дня: интуитивные прозрения, работа с подсознанием. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-19', 'lunar_days', '19-й лунный день', '## 19-й лунный день

Традиционные ключевые темы 19-го лунного дня: решительность, преодоление сомнений. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-20', 'lunar_days', '20-й лунный день', '## 20-й лунный день

Традиционные ключевые темы 20-го лунного дня: сотрудничество, совместные проекты. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-21', 'lunar_days', '21-й лунный день', '## 21-й лунный день

Традиционные ключевые темы 21-го лунного дня: ответственность, деловая активность. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-22', 'lunar_days', '22-й лунный день', '## 22-й лунный день

Традиционные ключевые темы 22-го лунного дня: практичность, работа с материальным миром. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-23', 'lunar_days', '23-й лунный день', '## 23-й лунный день

Традиционные ключевые темы 23-го лунного дня: подведение промежуточных итогов. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-24', 'lunar_days', '24-й лунный день', '## 24-й лунный день

Традиционные ключевые темы 24-го лунного дня: очищение, освобождение от ненужного. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-25', 'lunar_days', '25-й лунный день', '## 25-й лунный день

Традиционные ключевые темы 25-го лунного дня: терпение, работа над ошибками. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-26', 'lunar_days', '26-й лунный день', '## 26-й лунный день

Традиционные ключевые темы 26-го лунного дня: гармонизация, налаживание связей. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-27', 'lunar_days', '27-й лунный день', '## 27-й лунный день

Традиционные ключевые темы 27-го лунного дня: завершение больших дел. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-28', 'lunar_days', '28-й лунный день', '## 28-й лунный день

Традиционные ключевые темы 28-го лунного дня: светлое, лёгкое завершение цикла. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-29', 'lunar_days', '29-й лунный день', '## 29-й лунный день

Традиционные ключевые темы 29-го лунного дня: переходный, «выпадающий» день — минимум новых начинаний. Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunnyj-den-30', 'lunar_days', '30-й лунный день', '## 30-й лунный день

Традиционные ключевые темы 30-го лунного дня: полное завершение цикла, подготовка к новому (бывает не в каждом месяце). Лунный день сменяется не строго в полночь, а в момент новолуния (см. точный лунный календарь `/lunnyj-kalendar` — там дата привязана к реальному астрономическому расчёту, эта статья — справочник общего значения дня вне привязки к конкретной дате).

Значения лунных дней — часть народной традиции лунных календарей, распространённая в популярной литературе, а не единый закреплённый стандарт одной астрологической школы; относитесь к ним как к ориентиру, не как к предписанию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-1', 'nakshatras', 'Накшатра 1 — Ашвини', '## 1. Ашвини

Ашвини — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-2', 'nakshatras', 'Накшатра 2 — Бхарани', '## 2. Бхарани

Бхарани — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-3', 'nakshatras', 'Накшатра 3 — Криттика', '## 3. Криттика

Криттика — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-4', 'nakshatras', 'Накшатра 4 — Рохини', '## 4. Рохини

Рохини — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-5', 'nakshatras', 'Накшатра 5 — Мригашира', '## 5. Мригашира

Мригашира — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-6', 'nakshatras', 'Накшатра 6 — Ардра', '## 6. Ардра

Ардра — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-7', 'nakshatras', 'Накшатра 7 — Пунарвасу', '## 7. Пунарвасу

Пунарвасу — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-8', 'nakshatras', 'Накшатра 8 — Пушья', '## 8. Пушья

Пушья — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-9', 'nakshatras', 'Накшатра 9 — Ашлеша', '## 9. Ашлеша

Ашлеша — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-10', 'nakshatras', 'Накшатра 10 — Магха', '## 10. Магха

Магха — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-11', 'nakshatras', 'Накшатра 11 — Пурва Пхалгуни', '## 11. Пурва Пхалгуни

Пурва Пхалгуни — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-12', 'nakshatras', 'Накшатра 12 — Уттара Пхалгуни', '## 12. Уттара Пхалгуни

Уттара Пхалгуни — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-13', 'nakshatras', 'Накшатра 13 — Хаста', '## 13. Хаста

Хаста — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-14', 'nakshatras', 'Накшатра 14 — Читра', '## 14. Читра

Читра — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-15', 'nakshatras', 'Накшатра 15 — Свати', '## 15. Свати

Свати — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-16', 'nakshatras', 'Накшатра 16 — Вишакха', '## 16. Вишакха

Вишакха — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-17', 'nakshatras', 'Накшатра 17 — Анурадха', '## 17. Анурадха

Анурадха — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-18', 'nakshatras', 'Накшатра 18 — Джьештха', '## 18. Джьештха

Джьештха — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-19', 'nakshatras', 'Накшатра 19 — Мула', '## 19. Мула

Мула — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-20', 'nakshatras', 'Накшатра 20 — Пурва Ашадха', '## 20. Пурва Ашадха

Пурва Ашадха — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-21', 'nakshatras', 'Накшатра 21 — Уттара Ашадха', '## 21. Уттара Ашадха

Уттара Ашадха — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-22', 'nakshatras', 'Накшатра 22 — Шравана', '## 22. Шравана

Шравана — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-23', 'nakshatras', 'Накшатра 23 — Дханишта', '## 23. Дханишта

Дханишта — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-24', 'nakshatras', 'Накшатра 24 — Шатабхиша', '## 24. Шатабхиша

Шатабхиша — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-25', 'nakshatras', 'Накшатра 25 — Пурва Бхадрапада', '## 25. Пурва Бхадрапада

Пурва Бхадрапада — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-26', 'nakshatras', 'Накшатра 26 — Уттара Бхадрапада', '## 26. Уттара Бхадрапада

Уттара Бхадрапада — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra-27', 'nakshatras', 'Накшатра 27 — Ревати', '## 27. Ревати

Ревати — одна из 27 лунных стоянок (накшатр) ведической астрологии (джйотиш). Джйотиш — версия 1.x продукта портала (см. дорожную карту, docs/architecture/20-архитектура-услуг.md, «Границы MVP»): расчётный модуль ещё не реализован, поэтому подробная трактовка этой накшатры будет наполнена вместе с запуском джйотиш-калькулятора. Название приведено как общепринятый классический факт традиции.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('sovremennaya-zapadnaya', 'schools', 'Современная западная (психологическая) астрология', '## Современная западная астрология

Ядро всей русскоязычной практики и пресет портала по умолчанию: тропический зодиак, 10 планет (включая Уран, Нептун, Плутон) плюс Хирон, Лилит и Лунные узлы, система домов Плацидус. Психологическую ветвь традиции (восходит к работам Лиз Грин и Дэйна Радьяра) в русскоязычном пространстве представляет, среди прочих, школа Авессалома Подводного. Почти все крупные российские школы обучения (Академия Левина, школа Волоконцева, LabLife, ВШКА, «Аквилон») преподают именно эту систему с психологическо-прогностическим уклоном. На портале это пресет «Современная западная».', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('karmicheskiy-sloy', 'schools', 'Кармическая астрология (узлы, Лилит, Селена)', '## Кармический слой

Не отдельная расчётная система, а интерпретационная надстройка поверх западного расчёта: Лунные узлы (Раху/Кету), Чёрная Луна Лилит, Белая Луна Селена, ретроградные планеты. Это самая «виральная» тема в русскоязычном интернете — статьи про кармические узлы публикуют даже массовые медиа. Важный нюанс: разные школы считают Белую Луну по-разному — московская/петербургская школы берут точку, противоположную Лилит, тогда как авестийская школа Глобы использует отдельную фиктивную точку со своими эфемеридами (см. статью про авестийскую школу). Портал по умолчанию считает Селену как анти-Лилит.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('vedicheskaya-jyotish', 'schools', 'Ведическая астрология (джйотиш)', '## Джйотиш

Сидерический зодиак (в отличие от тропического западного — разница задаётся углом айанамши, сейчас около 24°, стандарт — айанамша Лахири), 9 грах (Солнце—Сатурн плюс узлы Раху и Кету как «планеты»), без Урана/Нептуна/Плутона, целознаковые дома, 27 накшатр (лунных стоянок) и система периодов вимшоттари-даша. Вторая по объёму образовательная ниша в русскоязычном астрологическом образовании. **Статус на портале: версия 1.x** (см. docs/architecture/20-архитектура-услуг.md, «Границы MVP») — расчётный модуль джйотиш ещё не реализован, раздел накшатр наполняется поэтапно.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('avestiyskaya-globa', 'schools', 'Авестийская школа Павла Глобы', '## Авестийская школа

Специфически русскоязычное направление (основана в конце 1980-х годов, Астрологический институт Павла Глобы): тропический зодиак плюс расширенный набор фиктивных точек (Белая Луна/Селена с собственными эфемеридами, гипотетическая Прозерпина), зороастрийский календарь, синтез с хирологией и нумерологией. **Статус на портале: версия 2+** (см. «Границы MVP») — требует отдельных фиктивных точек, которых пока нет в расчётном ядре.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('tradicionnaya-ellinisticheskaya', 'schools', 'Традиционная и эллинистическая астрология', '## Традиционная (эллинистическая) астрология

Возрождение техник античной астрологии, запущенное проектом Project Hindsight (1993) и получившее широкую известность благодаря книге Криса Бреннана «Hellenistic Astrology» (2017). Ключевые техники: целознаковые дома (whole sign), учение о секте (день/ночь), жребии (арабские части), профекции, zodiacal releasing. В русскоязычном пространстве представлена нишево, без крупных школ. Хорарная астрология (астрология вопроса) — близкое направление, использует только 7 классических планет и дома Регимонтануса; на русском языке возрождена во многом благодаря переводам Уильяма Лилли и Джона Фроули.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('horarnaya-elektivnaya', 'schools', 'Хорарная и элективная астрология', '## Хорар и электив

Хорарная астрология отвечает на конкретный заданный вопрос по карте момента его возникновения; элективная — подбирает благоприятный момент для начала дела. Обе используют традиционный набор из 7 классических планет и дома Регимонтануса (стандарт по Уильяму Лилли и современным переводам Джона Фроули). Это инструменты для практикующих астрологов, требующие точной формулировки вопроса и строгих ограничителей суждения. **Статус на портале: версия 2** (см. «Границы MVP») — калькулятор элективных окон в MVP уже частично покрыт мастером индивидуальных прогнозов («план/вопрос»), полноценный хорарный модуль — в дорожной карте.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('kamni-i-astrologiya', 'stones', 'Камни и минералы в астрологии', '## Камни и астрология

Традиция приписывать драгоценным и поделочным камням соответствия знакам зодиака, планетам и декадам восходит к разным историческим системам (западной, ведической наваратне и другим) — они не всегда совпадают между собой. Полный каталог камней с карточками свойств и соответствий смотрите в разделе [«Камни»](/kamni).', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('kak-vybrat-kamen', 'stones', 'Как выбрать камень-талисман', '## Как выбрать камень

Популярные подходы: по знаку зодиака, по управляющей планете сильнейшего объекта карты, по декаде рождения или по аркану Матрицы судьбы. Ни один из подходов не является медицинским или научным фактом — это справочная информация о традиционных представлениях. Используйте фильтры в [каталоге камней](/kamni), чтобы подобрать вариант по своему знаку или назначению.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('ascendent', 'glossary', 'Асцендент (Асц, ASC)', '## Асцендент (Асц, ASC)

Точка восхода — знак зодиака, поднимающийся над горизонтом в момент рождения; куспид 1-го дома, «маска» и стиль первого впечатления.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('descendent', 'glossary', 'Десцендент (Дсц, DSC)', '## Десцендент (Дсц, DSC)

Точка, противоположная Асценденту; куспид 7-го дома, тема партнёрства и открытых противников.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('midheaven', 'glossary', 'Середина неба (МС, Medium Coeli)', '## Середина неба (МС, Medium Coeli)

Верхняя точка карты, куспид 10-го дома; тема карьеры, статуса и публичной реализации.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('ic', 'glossary', 'Нижнее небо (IC, Imum Coeli)', '## Нижнее небо (IC, Imum Coeli)

Точка, противоположная МС, куспид 4-го дома; тема дома, корней и семьи.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('severnyj-uzel', 'glossary', 'Северный узел (Раху)', '## Северный узел (Раху)

Точка пересечения орбиты Луны с эклиптикой; в кармической традиции — направление осознанного роста.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('yuzhnyj-uzel', 'glossary', 'Южный узел (Кету)', '## Южный узел (Кету)

Точка, противоположная Северному узлу; привычная, комфортная территория опыта.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('retrogradnost', 'glossary', 'Ретроградность', '## Ретроградность

Видимое попятное движение планеты с Земли (иллюзия, вызванная разницей орбитальных скоростей); в интерпретации — тема пересмотра и внутренней переработки.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('orbis', 'glossary', 'Орбис', '## Орбис

Допустимое отклонение от точного угла аспекта, при котором аспект всё ещё считается действующим.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('tranzit', 'glossary', 'Транзит', '## Транзит

Текущее положение планеты на небе, рассматриваемое в связи с точками натальной карты.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('progressiya', 'glossary', 'Прогрессия', '## Прогрессия

Символический метод прогноза, где один день после рождения соответствует одному году жизни (вторичные прогрессии).', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('solyar', 'glossary', 'Соляр (солнечное возвращение)', '## Соляр (солнечное возвращение)

Карта момента, когда транзитное Солнце возвращается в точную натальную позицию — используется для прогноза на год.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lunar', 'glossary', 'Лунар (лунное возвращение)', '## Лунар (лунное возвращение)

Карта момента точного возврата транзитной Луны в натальную позицию — прогноз на месяц.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('sinastriya', 'glossary', 'Синастрия', '## Синастрия

Сопоставление двух натальных карт для анализа совместимости через межкартовые аспекты.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('kompozit', 'glossary', 'Композит', '## Композит

Единая «карта отношений», построенная из средних точек между позициями двух натальных карт.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('kuspid', 'glossary', 'Куспид', '## Куспид

Начальная граница астрологического дома.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('stikhiya', 'glossary', 'Стихия (элемент)', '## Стихия (элемент)

Огонь, Земля, Воздух, Вода — 4 группы знаков зодиака, задающие общий тип темперамента.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('krest-kachestvo', 'glossary', 'Крест (качество знака)', '## Крест (качество знака)

Кардинальный, фиксированный, мутабельный — три группы знаков, описывающие стиль включения в новое дело.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('upravitel', 'glossary', 'Управитель (правитель)', '## Управитель (правитель)

Планета, традиционно связанная с управлением знаком или домом (см. также «обитель»).', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('obitel', 'glossary', 'Обитель (дом планеты)', '## Обитель (дом планеты)

Знак, в котором планета проявляется наиболее органично — классическое эссенциальное достоинство.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('ekzaltaciya', 'glossary', 'Экзальтация', '## Экзальтация

Знак, в котором сила планеты особенно возвышена — классическое эссенциальное достоинство.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('izgnanie', 'glossary', 'Изгнание (детримент)', '## Изгнание (детримент)

Знак, противоположный обители планеты — традиционно считается положением затруднённого проявления.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('padenie', 'glossary', 'Падение', '## Падение

Знак, противоположный экзальтации планеты — традиционно положение ослабленного проявления.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('aspekt', 'glossary', 'Аспект', '## Аспект

Угловое соотношение между двумя точками карты, описывающее характер их взаимодействия.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('soedinenie', 'glossary', 'Соединение (0°)', '## Соединение (0°)

Аспект слияния энергий двух объектов карты в одной точке.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('oppoziciya', 'glossary', 'Оппозиция (180°)', '## Оппозиция (180°)

Аспект противостояния/полярности, требующий баланса между двумя темами.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('trin', 'glossary', 'Трин (120°)', '## Трин (120°)

Гармоничный аспект лёгкого, естественного взаимодействия энергий.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('kvadrat', 'glossary', 'Квадрат (90°)', '## Квадрат (90°)

Напряжённый аспект внутреннего конфликта, требующий усилия для разрешения.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('sekstil', 'glossary', 'Секстиль (60°)', '## Секстиль (60°)

Аспект возможностей, реализуемых при сознательном усилии.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('kvinkuns', 'glossary', 'Квинконс (150°)', '## Квинконс (150°)

Аспект несоответствия, требующий постоянной подстройки между несовместимыми темами.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('sekta', 'glossary', 'Секта', '## Секта

В традиционной астрологии — принадлежность карты к «дневной» или «ночной» (по положению Солнца), влияющая на трактовку планет.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('horar', 'glossary', 'Хорар', '## Хорар

Раздел астрологии, отвечающий на конкретный вопрос по карте момента его возникновения.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('elektiv', 'glossary', 'Электив', '## Электив

Подбор благоприятного момента для начала дела по заданным астрологическим критериям.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('ayanamsha', 'glossary', 'Айанамша', '## Айанамша

Угол расхождения между тропическим и сидерическим зодиаком на заданную дату (стандарт — Лахири).', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('tropicheskiy-zodiak', 'glossary', 'Тропический зодиак', '## Тропический зодиак

Зодиак, отсчитываемый от точки весеннего равноденствия; основа западной астрологии.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('sidericheskiy-zodiak', 'glossary', 'Сидерический зодиак', '## Сидерический зодиак

Зодиак, привязанный к положению звёзд; основа джйотиша.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('dom-astrologicheskiy', 'glossary', 'Дом (астрологический)', '## Дом (астрологический)

Одна из 12 секторов карты, отвечающая за конкретную сферу жизни.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('placidus', 'glossary', 'Система домов Плацидус', '## Система домов Плацидус

Система расчёта домов по времени прохождения дуги — самая распространённая в современных программах.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('koh', 'glossary', 'Система домов Коха', '## Система домов Коха

Альтернативная система расчёта домов, популярная у части российских школ.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('celoznakovye-doma', 'glossary', 'Целознаковые дома (whole sign)', '## Целознаковые дома (whole sign)

Система, где каждый дом строго совпадает с одним знаком зодиака; стандарт джйотиша и эллинистического возрождения.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('stellium', 'glossary', 'Стеллиум', '## Стеллиум

Скопление трёх и более планет в одном знаке или доме.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('zatmenie', 'glossary', 'Затмение', '## Затмение

Солнечное или лунное затмение — усиленная точка узловой оси, отмечающая значимые повороты судьбы.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('progressivnaya-luna', 'glossary', 'Прогрессивная Луна', '## Прогрессивная Луна

Положение Луны в карте вторичных прогрессий — показатель эмоционального фона текущего периода.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('khiron', 'glossary', 'Хирон', '## Хирон

Малое небесное тело («кентавр»), символизирующее зону наиболее чувствительного и целительного опыта.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('lilit', 'glossary', 'Лилит (Чёрная Луна)', '## Лилит (Чёрная Луна)

Апогей лунной орбиты — точка, а не физическое тело; символизирует непризнанную часть личности.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('belaya-luna-glossary', 'glossary', 'Селена (Белая Луна)', '## Селена (Белая Луна)

Точка, которую московская/петербургская школы считают противоположной Лилит; символизирует тонкую интуицию.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('arkan-taro', 'glossary', 'Аркан Таро', '## Аркан Таро

Одна из 22 старших карт Таро; в Матрице судьбы — число 1–22, получаемое редукцией даты рождения.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('matrica-sudby', 'glossary', 'Матрица судьбы', '## Матрица судьбы

Нумеролого-таро система построения октаграммы по дате рождения (метод Наталии Ладини, 2006–2008).', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('chislo-zhiznennogo-puti', 'glossary', 'Число жизненного пути', '## Число жизненного пути

Базовое нумерологическое число, получаемое редукцией полной даты рождения.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('psihomatrica-pifagora', 'glossary', 'Психоматрица Пифагора', '## Психоматрица Пифагора

Таблица 3×3 из цифр даты рождения, используемая для нумерологического портрета.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('numerologiya', 'glossary', 'Нумерология', '## Нумерология

Система толкования чисел даты рождения и имени как символических характеристик личности.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('nakshatra', 'glossary', 'Накшатра', '## Накшатра

1 из 27 лунных стоянок джйотиша — сектор эклиптики шириной 13°20′.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('vimshottari-dasha', 'glossary', 'Вимшоттари-даша', '## Вимшоттари-даша

Система планетных периодов джйотиша длиной 120 лет, используемая для датировки событий.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('goroskop', 'glossary', 'Гороскоп', '## Гороскоп

В быту — прогноз по знаку зодиака; изначально — карта неба на заданный момент.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('natalnaya-karta', 'glossary', 'Натальная карта', '## Натальная карта

Карта неба на точный момент и место рождения человека.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('direkciya', 'glossary', 'Дирекция', '## Дирекция

Символический метод прогноза, сдвигающий точки карты на фиксированный угол за единицу времени.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('ingressiya', 'glossary', 'Ингрессия', '## Ингрессия

Момент перехода планеты из одного знака зодиака в другой.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';

INSERT INTO "wiki_articles" ("slug", "section", "title", "body_md", "status", "version")
VALUES ('void-of-course', 'glossary', 'Луна без курса (Void of Course)', '## Луна без курса (Void of Course)

Период между последним значимым аспектом Луны в знаке и её переходом в следующий знак — традиционно считается неблагоприятным для начала важных дел.', 'draft', 1)
ON CONFLICT ("slug") DO UPDATE SET
  "section" = EXCLUDED."section",
  "title" = EXCLUDED."title",
  "body_md" = EXCLUDED."body_md",
  "updated_at" = now()
WHERE "wiki_articles"."status" = 'draft';
