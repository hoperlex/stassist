-- interpretation_chunks — seed-корпус Ф4 (1601 чанков), версия f4-corpus-2026.07.1.
-- СГЕНЕРИРОВАНО: tools/gen-corpus.ts из packages/llm/src/corpus/build-corpus.ts.
-- НЕ редактировать руками — перегенерировать `pnpm data:corpus`.
-- Идемпотентно: ON CONFLICT ("key") DO UPDATE ТОЛЬКО пока quality='draft' — не затирает
-- ручную редактуру (quality='reviewed', см. §6 конвенций реализации).

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('sign:aries:overview', 'western', 'Овен — знак стихии огонь, кардинальный по качеству. Люди с сильным влиянием Овна склонны проявлять себя через инициативу, скорость и прямое действие. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('sign:taurus:overview', 'western', 'Телец — знак стихии земля, фиксированный по качеству. Люди с сильным влиянием Тельца склонны проявлять себя через устойчивость, практичность и стремление к надёжной опоре. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('sign:gemini:overview', 'western', 'Близнецы — знак стихии воздух, мутабельный по качеству. Люди с сильным влиянием Близнецов склонны проявлять себя через любопытство, гибкость ума и потребность в разнообразии. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('sign:cancer:overview', 'western', 'Рак — знак стихии вода, кардинальный по качеству. Люди с сильным влиянием Рака склонны проявлять себя через заботу, эмоциональную чуткость и привязанность к близким. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('sign:leo:overview', 'western', 'Лев — знак стихии огонь, фиксированный по качеству. Люди с сильным влиянием Льва склонны проявлять себя через яркое самовыражение, щедрость и потребность быть увиденным. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('sign:virgo:overview', 'western', 'Дева — знак стихии земля, мутабельный по качеству. Люди с сильным влиянием Девы склонны проявлять себя через внимание к деталям, аналитичность и стремление быть полезным. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('sign:libra:overview', 'western', 'Весы — знак стихии воздух, кардинальный по качеству. Люди с сильным влиянием Весов склонны проявлять себя через поиск баланса, эстетику и умение видеть чужую точку зрения. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('sign:scorpio:overview', 'western', 'Скорпион — знак стихии вода, фиксированный по качеству. Люди с сильным влиянием Скорпиона склонны проявлять себя через глубину, сосредоточенность и способность не отступать. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('sign:sagittarius:overview', 'western', 'Стрелец — знак стихии огонь, мутабельный по качеству. Люди с сильным влиянием Стрельца склонны проявлять себя через оптимизм, широту взглядов и тягу к новому опыту. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('sign:capricorn:overview', 'western', 'Козерог — знак стихии земля, кардинальный по качеству. Люди с сильным влиянием Козерога склонны проявлять себя через дисциплину, терпение и ориентацию на долгосрочный результат. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('sign:aquarius:overview', 'western', 'Водолей — знак стихии воздух, фиксированный по качеству. Люди с сильным влиянием Водолея склонны проявлять себя через независимость мышления, нестандартность и интерес к общему благу. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('sign:pisces:overview', 'western', 'Рыбы — знак стихии вода, мутабельный по качеству. Люди с сильным влиянием Рыб склонны проявлять себя через сочувствие, воображение и тонкую восприимчивость. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet:sun:overview', 'western', 'Солнце в натальной карте отвечает за осознанную волю, жизненную силу и то, как человек проявляет себя. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet:moon:overview', 'western', 'Луна в натальной карте отвечает за эмоциональные потребности, привычные реакции и внутреннее ощущение безопасности. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet:mercury:overview', 'western', 'Меркурий в натальной карте отвечает за мышление, речь и то, как человек обрабатывает и передаёт информацию. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet:venus:overview', 'western', 'Венера в натальной карте отвечает за ценности, притяжение к красоте и стиль близости в отношениях. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet:mars:overview', 'western', 'Марс в натальной карте отвечает за напористость, способ действовать и отстаивать свои границы. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet:jupiter:overview', 'western', 'Юпитер в натальной карте отвечает за рост, оптимизм и то, в чём человек ищет смысл и расширение. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet:saturn:overview', 'western', 'Сатурн в натальной карте отвечает за дисциплину, ответственность и зоны, где опыт даётся через труд. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet:uranus:overview', 'western', 'Уран в натальной карте отвечает за потребность в свободе, оригинальность и готовность к переменам. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet:neptune:overview', 'western', 'Нептун в натальной карте отвечает за воображение, чувствительность к тонким материям и склонность к идеализации. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet:pluto:overview', 'western', 'Плутон в натальной карте отвечает за глубинную трансформацию, скрытые ресурсы и работу с интенсивными процессами. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet:chiron:overview', 'karmic', 'Хирон в натальной карте отвечает за зону наиболее чувствительного, но и наиболее целительного опыта. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet:north_node:overview', 'karmic', 'Северный узел в натальной карте отвечает за направление осознанного роста и незнакомую, но развивающую территорию. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet:lilith:overview', 'karmic', 'Лилит в натальной карте отвечает за непризнанную, вытесненную часть личности, которая просит признания. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet:selena:overview', 'karmic', 'Селена в натальной карте отвечает за тонкую интуитивную чувствительность и связь с коллективным опытом. Это архетипическая тема, которая проявляется в характере независимо от знака и дома, но именно их сочетание задаёт конкретную окраску. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('house:1:overview', 'western', '1-й дом натальной карты отвечает за личность, внешнее проявление себя и то, как начинаются новые дела. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('house:2:overview', 'western', '2-й дом натальной карты отвечает за ресурсы, финансовую устойчивость и систему ценностей. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('house:3:overview', 'western', '3-й дом натальной карты отвечает за повседневное общение, обучение и ближайшее окружение. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('house:4:overview', 'western', '4-й дом натальной карты отвечает за дом, корни и внутреннюю опору семьи. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('house:5:overview', 'western', '5-й дом натальной карты отвечает за творческое самовыражение, романтику и радость проживания жизни. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('house:6:overview', 'western', '6-й дом натальной карты отвечает за повседневную рутину, работу и заботу о теле. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('house:7:overview', 'western', '7-й дом натальной карты отвечает за партнёрство, брак и открытые договорённости с другими. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('house:8:overview', 'western', '8-й дом натальной карты отвечает за общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('house:9:overview', 'western', '9-й дом натальной карты отвечает за мировоззрение, обучение высшего порядка и дальние горизонты. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('house:10:overview', 'western', '10-й дом натальной карты отвечает за карьеру, статус и публичную репутацию. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('house:11:overview', 'western', '11-й дом натальной карты отвечает за дружеские сообщества, цели на будущее и коллективные проекты. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('house:12:overview', 'western', '12-й дом натальной карты отвечает за уединение, внутреннюю работу и то, что обычно остаётся за кадром. Планеты, попадающие в этот дом, окрашивают соответствующую область жизни своей энергией. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:conjunction:overview', 'western', 'Аспект «соединение» описывает, как две энергии соотносятся друг с другом: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:opposition:overview', 'western', 'Аспект «оппозиция» описывает, как две энергии соотносятся друг с другом: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:trine:overview', 'western', 'Аспект «трин» описывает, как две энергии соотносятся друг с другом: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:square:overview', 'western', 'Аспект «квадрат» описывает, как две энергии соотносятся друг с другом: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sextile:overview', 'western', 'Аспект «секстиль» описывает, как две энергии соотносятся друг с другом: возможность, которая раскрывается, если ею сознательно воспользоваться. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:quincunx:overview', 'western', 'Аспект «квинконс» описывает, как две энергии соотносятся друг с другом: несовпадение по логике, требующее постоянной тонкой подстройки друг к другу. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:semisextile:overview', 'western', 'Аспект «полусекстиль» описывает, как две энергии соотносятся друг с другом: едва заметная, но полезная связь между смежными областями опыта. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:semisquare:overview', 'western', 'Аспект «полуквадрат» описывает, как две энергии соотносятся друг с другом: лёгкое трение, которое подталкивает к небольшим, но нужным корректировкам. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sesquiquadrate:overview', 'western', 'Аспект «полутораквадрат» описывает, как две энергии соотносятся друг с другом: повторяющееся напряжение, обращающее внимание на одну и ту же тему снова и снова. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:quintile:overview', 'western', 'Аспект «квинтиль» описывает, как две энергии соотносятся друг с другом: индивидуальный, немного нестандартный талант, раскрывающийся через практику. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:biquintile:overview', 'western', 'Аспект «биквинтиль» описывает, как две энергии соотносятся друг с другом: тонкий, не всегда заметный со стороны, но устойчивый творческий ресурс. Конкретный смысл зависит от того, какие именно объекты карты соединены этим аспектом.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('element:fire:overview', 'western', 'Стихия отвечает за энергию инициативы, спонтанность и вдохновение действием. Баланс стихий в карте показывает, какие ресурсы даются легко, а какие требуют сознательного развития.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('element:earth:overview', 'western', 'Стихия отвечает за практичность, устойчивость и умение доводить начатое до результата. Баланс стихий в карте показывает, какие ресурсы даются легко, а какие требуют сознательного развития.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('element:air:overview', 'western', 'Стихия отвечает за интеллектуальную гибкость, общительность и обмен идеями. Баланс стихий в карте показывает, какие ресурсы даются легко, а какие требуют сознательного развития.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('element:water:overview', 'western', 'Стихия отвечает за эмоциональную глубину, чуткость и интуитивное восприятие. Баланс стихий в карте показывает, какие ресурсы даются легко, а какие требуют сознательного развития.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('cross:cardinal:overview', 'western', 'Крест (качество знака) отражает инициативу и умение запускать новые начинания. Это то, как человек в принципе подходит к любому начинанию — независимо от темы.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('cross:fixed:overview', 'western', 'Крест (качество знака) отражает устойчивость, упорство и способность доводить дело до конца. Это то, как человек в принципе подходит к любому начинанию — независимо от темы.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('cross:mutable:overview', 'western', 'Крест (качество знака) отражает гибкость, адаптивность и готовность подстраиваться под обстоятельства. Это то, как человек в принципе подходит к любому начинанию — независимо от темы.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:sun:aries', 'western', 'Солнце в знаке Овна проявляет осознанную волю через инициативу, скорость и прямое действие. Это сочетание задаёт индивидуальную окраску базовой темы Солнца. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:sun:taurus', 'western', 'Солнце в знаке Тельца проявляет осознанную волю через устойчивость, практичность и стремление к надёжной опоре. Это сочетание задаёт индивидуальную окраску базовой темы Солнца. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:sun:gemini', 'western', 'Солнце в знаке Близнецов проявляет осознанную волю через любопытство, гибкость ума и потребность в разнообразии. Это сочетание задаёт индивидуальную окраску базовой темы Солнца. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:sun:cancer', 'western', 'Солнце в знаке Рака проявляет осознанную волю через заботу, эмоциональную чуткость и привязанность к близким. Это сочетание задаёт индивидуальную окраску базовой темы Солнца. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:sun:leo', 'western', 'Солнце в знаке Льва проявляет осознанную волю через яркое самовыражение, щедрость и потребность быть увиденным. Это сочетание задаёт индивидуальную окраску базовой темы Солнца. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:sun:virgo', 'western', 'Солнце в знаке Девы проявляет осознанную волю через внимание к деталям, аналитичность и стремление быть полезным. Это сочетание задаёт индивидуальную окраску базовой темы Солнца. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:sun:libra', 'western', 'Солнце в знаке Весов проявляет осознанную волю через поиск баланса, эстетику и умение видеть чужую точку зрения. Это сочетание задаёт индивидуальную окраску базовой темы Солнца. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:sun:scorpio', 'western', 'Солнце в знаке Скорпиона проявляет осознанную волю через глубину, сосредоточенность и способность не отступать. Это сочетание задаёт индивидуальную окраску базовой темы Солнца. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:sun:sagittarius', 'western', 'Солнце в знаке Стрельца проявляет осознанную волю через оптимизм, широту взглядов и тягу к новому опыту. Это сочетание задаёт индивидуальную окраску базовой темы Солнца. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:sun:capricorn', 'western', 'Солнце в знаке Козерога проявляет осознанную волю через дисциплину, терпение и ориентацию на долгосрочный результат. Это сочетание задаёт индивидуальную окраску базовой темы Солнца. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:sun:aquarius', 'western', 'Солнце в знаке Водолея проявляет осознанную волю через независимость мышления, нестандартность и интерес к общему благу. Это сочетание задаёт индивидуальную окраску базовой темы Солнца. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:sun:pisces', 'western', 'Солнце в знаке Рыб проявляет осознанную волю через сочувствие, воображение и тонкую восприимчивость. Это сочетание задаёт индивидуальную окраску базовой темы Солнца. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:sun:1', 'western', 'Солнце в 1-м доме направляет энергию, связанную с темой Солнца, в сферу «личность, внешнее проявление себя и то, как начинаются новые дела». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:sun:2', 'western', 'Солнце в 2-м доме направляет энергию, связанную с темой Солнца, в сферу «ресурсы, финансовую устойчивость и систему ценностей». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:sun:3', 'western', 'Солнце в 3-м доме направляет энергию, связанную с темой Солнца, в сферу «повседневное общение, обучение и ближайшее окружение». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:sun:4', 'western', 'Солнце в 4-м доме направляет энергию, связанную с темой Солнца, в сферу «дом, корни и внутреннюю опору семьи». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:sun:5', 'western', 'Солнце в 5-м доме направляет энергию, связанную с темой Солнца, в сферу «творческое самовыражение, романтику и радость проживания жизни». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:sun:6', 'western', 'Солнце в 6-м доме направляет энергию, связанную с темой Солнца, в сферу «повседневную рутину, работу и заботу о теле». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:sun:7', 'western', 'Солнце в 7-м доме направляет энергию, связанную с темой Солнца, в сферу «партнёрство, брак и открытые договорённости с другими». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:sun:8', 'western', 'Солнце в 8-м доме направляет энергию, связанную с темой Солнца, в сферу «общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:sun:9', 'western', 'Солнце в 9-м доме направляет энергию, связанную с темой Солнца, в сферу «мировоззрение, обучение высшего порядка и дальние горизонты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:sun:10', 'western', 'Солнце в 10-м доме направляет энергию, связанную с темой Солнца, в сферу «карьеру, статус и публичную репутацию». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:sun:11', 'western', 'Солнце в 11-м доме направляет энергию, связанную с темой Солнца, в сферу «дружеские сообщества, цели на будущее и коллективные проекты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:sun:12', 'western', 'Солнце в 12-м доме направляет энергию, связанную с темой Солнца, в сферу «уединение, внутреннюю работу и то, что обычно остаётся за кадром». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:moon:aries', 'western', 'Луна в знаке Овна проявляет эмоциональные потребности через инициативу, скорость и прямое действие. Это сочетание задаёт индивидуальную окраску базовой темы Луны. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:moon:taurus', 'western', 'Луна в знаке Тельца проявляет эмоциональные потребности через устойчивость, практичность и стремление к надёжной опоре. Это сочетание задаёт индивидуальную окраску базовой темы Луны. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:moon:gemini', 'western', 'Луна в знаке Близнецов проявляет эмоциональные потребности через любопытство, гибкость ума и потребность в разнообразии. Это сочетание задаёт индивидуальную окраску базовой темы Луны. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:moon:cancer', 'western', 'Луна в знаке Рака проявляет эмоциональные потребности через заботу, эмоциональную чуткость и привязанность к близким. Это сочетание задаёт индивидуальную окраску базовой темы Луны. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:moon:leo', 'western', 'Луна в знаке Льва проявляет эмоциональные потребности через яркое самовыражение, щедрость и потребность быть увиденным. Это сочетание задаёт индивидуальную окраску базовой темы Луны. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:moon:virgo', 'western', 'Луна в знаке Девы проявляет эмоциональные потребности через внимание к деталям, аналитичность и стремление быть полезным. Это сочетание задаёт индивидуальную окраску базовой темы Луны. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:moon:libra', 'western', 'Луна в знаке Весов проявляет эмоциональные потребности через поиск баланса, эстетику и умение видеть чужую точку зрения. Это сочетание задаёт индивидуальную окраску базовой темы Луны. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:moon:scorpio', 'western', 'Луна в знаке Скорпиона проявляет эмоциональные потребности через глубину, сосредоточенность и способность не отступать. Это сочетание задаёт индивидуальную окраску базовой темы Луны. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:moon:sagittarius', 'western', 'Луна в знаке Стрельца проявляет эмоциональные потребности через оптимизм, широту взглядов и тягу к новому опыту. Это сочетание задаёт индивидуальную окраску базовой темы Луны. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:moon:capricorn', 'western', 'Луна в знаке Козерога проявляет эмоциональные потребности через дисциплину, терпение и ориентацию на долгосрочный результат. Это сочетание задаёт индивидуальную окраску базовой темы Луны. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:moon:aquarius', 'western', 'Луна в знаке Водолея проявляет эмоциональные потребности через независимость мышления, нестандартность и интерес к общему благу. Это сочетание задаёт индивидуальную окраску базовой темы Луны. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:moon:pisces', 'western', 'Луна в знаке Рыб проявляет эмоциональные потребности через сочувствие, воображение и тонкую восприимчивость. Это сочетание задаёт индивидуальную окраску базовой темы Луны. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:moon:1', 'western', 'Луна в 1-м доме направляет энергию, связанную с темой Луны, в сферу «личность, внешнее проявление себя и то, как начинаются новые дела». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:moon:2', 'western', 'Луна в 2-м доме направляет энергию, связанную с темой Луны, в сферу «ресурсы, финансовую устойчивость и систему ценностей». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:moon:3', 'western', 'Луна в 3-м доме направляет энергию, связанную с темой Луны, в сферу «повседневное общение, обучение и ближайшее окружение». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:moon:4', 'western', 'Луна в 4-м доме направляет энергию, связанную с темой Луны, в сферу «дом, корни и внутреннюю опору семьи». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:moon:5', 'western', 'Луна в 5-м доме направляет энергию, связанную с темой Луны, в сферу «творческое самовыражение, романтику и радость проживания жизни». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:moon:6', 'western', 'Луна в 6-м доме направляет энергию, связанную с темой Луны, в сферу «повседневную рутину, работу и заботу о теле». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:moon:7', 'western', 'Луна в 7-м доме направляет энергию, связанную с темой Луны, в сферу «партнёрство, брак и открытые договорённости с другими». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:moon:8', 'western', 'Луна в 8-м доме направляет энергию, связанную с темой Луны, в сферу «общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:moon:9', 'western', 'Луна в 9-м доме направляет энергию, связанную с темой Луны, в сферу «мировоззрение, обучение высшего порядка и дальние горизонты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:moon:10', 'western', 'Луна в 10-м доме направляет энергию, связанную с темой Луны, в сферу «карьеру, статус и публичную репутацию». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:moon:11', 'western', 'Луна в 11-м доме направляет энергию, связанную с темой Луны, в сферу «дружеские сообщества, цели на будущее и коллективные проекты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:moon:12', 'western', 'Луна в 12-м доме направляет энергию, связанную с темой Луны, в сферу «уединение, внутреннюю работу и то, что обычно остаётся за кадром». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mercury:aries', 'western', 'Меркурий в знаке Овна проявляет мышление через инициативу, скорость и прямое действие. Это сочетание задаёт индивидуальную окраску базовой темы Меркурия. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mercury:taurus', 'western', 'Меркурий в знаке Тельца проявляет мышление через устойчивость, практичность и стремление к надёжной опоре. Это сочетание задаёт индивидуальную окраску базовой темы Меркурия. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mercury:gemini', 'western', 'Меркурий в знаке Близнецов проявляет мышление через любопытство, гибкость ума и потребность в разнообразии. Это сочетание задаёт индивидуальную окраску базовой темы Меркурия. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mercury:cancer', 'western', 'Меркурий в знаке Рака проявляет мышление через заботу, эмоциональную чуткость и привязанность к близким. Это сочетание задаёт индивидуальную окраску базовой темы Меркурия. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mercury:leo', 'western', 'Меркурий в знаке Льва проявляет мышление через яркое самовыражение, щедрость и потребность быть увиденным. Это сочетание задаёт индивидуальную окраску базовой темы Меркурия. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mercury:virgo', 'western', 'Меркурий в знаке Девы проявляет мышление через внимание к деталям, аналитичность и стремление быть полезным. Это сочетание задаёт индивидуальную окраску базовой темы Меркурия. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mercury:libra', 'western', 'Меркурий в знаке Весов проявляет мышление через поиск баланса, эстетику и умение видеть чужую точку зрения. Это сочетание задаёт индивидуальную окраску базовой темы Меркурия. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mercury:scorpio', 'western', 'Меркурий в знаке Скорпиона проявляет мышление через глубину, сосредоточенность и способность не отступать. Это сочетание задаёт индивидуальную окраску базовой темы Меркурия. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mercury:sagittarius', 'western', 'Меркурий в знаке Стрельца проявляет мышление через оптимизм, широту взглядов и тягу к новому опыту. Это сочетание задаёт индивидуальную окраску базовой темы Меркурия. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mercury:capricorn', 'western', 'Меркурий в знаке Козерога проявляет мышление через дисциплину, терпение и ориентацию на долгосрочный результат. Это сочетание задаёт индивидуальную окраску базовой темы Меркурия. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mercury:aquarius', 'western', 'Меркурий в знаке Водолея проявляет мышление через независимость мышления, нестандартность и интерес к общему благу. Это сочетание задаёт индивидуальную окраску базовой темы Меркурия. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mercury:pisces', 'western', 'Меркурий в знаке Рыб проявляет мышление через сочувствие, воображение и тонкую восприимчивость. Это сочетание задаёт индивидуальную окраску базовой темы Меркурия. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mercury:1', 'western', 'Меркурий в 1-м доме направляет энергию, связанную с темой Меркурия, в сферу «личность, внешнее проявление себя и то, как начинаются новые дела». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mercury:2', 'western', 'Меркурий в 2-м доме направляет энергию, связанную с темой Меркурия, в сферу «ресурсы, финансовую устойчивость и систему ценностей». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mercury:3', 'western', 'Меркурий в 3-м доме направляет энергию, связанную с темой Меркурия, в сферу «повседневное общение, обучение и ближайшее окружение». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mercury:4', 'western', 'Меркурий в 4-м доме направляет энергию, связанную с темой Меркурия, в сферу «дом, корни и внутреннюю опору семьи». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mercury:5', 'western', 'Меркурий в 5-м доме направляет энергию, связанную с темой Меркурия, в сферу «творческое самовыражение, романтику и радость проживания жизни». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mercury:6', 'western', 'Меркурий в 6-м доме направляет энергию, связанную с темой Меркурия, в сферу «повседневную рутину, работу и заботу о теле». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mercury:7', 'western', 'Меркурий в 7-м доме направляет энергию, связанную с темой Меркурия, в сферу «партнёрство, брак и открытые договорённости с другими». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mercury:8', 'western', 'Меркурий в 8-м доме направляет энергию, связанную с темой Меркурия, в сферу «общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mercury:9', 'western', 'Меркурий в 9-м доме направляет энергию, связанную с темой Меркурия, в сферу «мировоззрение, обучение высшего порядка и дальние горизонты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mercury:10', 'western', 'Меркурий в 10-м доме направляет энергию, связанную с темой Меркурия, в сферу «карьеру, статус и публичную репутацию». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mercury:11', 'western', 'Меркурий в 11-м доме направляет энергию, связанную с темой Меркурия, в сферу «дружеские сообщества, цели на будущее и коллективные проекты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mercury:12', 'western', 'Меркурий в 12-м доме направляет энергию, связанную с темой Меркурия, в сферу «уединение, внутреннюю работу и то, что обычно остаётся за кадром». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:venus:aries', 'western', 'Венера в знаке Овна проявляет ценности через инициативу, скорость и прямое действие. Это сочетание задаёт индивидуальную окраску базовой темы Венеры. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:venus:taurus', 'western', 'Венера в знаке Тельца проявляет ценности через устойчивость, практичность и стремление к надёжной опоре. Это сочетание задаёт индивидуальную окраску базовой темы Венеры. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:venus:gemini', 'western', 'Венера в знаке Близнецов проявляет ценности через любопытство, гибкость ума и потребность в разнообразии. Это сочетание задаёт индивидуальную окраску базовой темы Венеры. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:venus:cancer', 'western', 'Венера в знаке Рака проявляет ценности через заботу, эмоциональную чуткость и привязанность к близким. Это сочетание задаёт индивидуальную окраску базовой темы Венеры. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:venus:leo', 'western', 'Венера в знаке Льва проявляет ценности через яркое самовыражение, щедрость и потребность быть увиденным. Это сочетание задаёт индивидуальную окраску базовой темы Венеры. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:venus:virgo', 'western', 'Венера в знаке Девы проявляет ценности через внимание к деталям, аналитичность и стремление быть полезным. Это сочетание задаёт индивидуальную окраску базовой темы Венеры. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:venus:libra', 'western', 'Венера в знаке Весов проявляет ценности через поиск баланса, эстетику и умение видеть чужую точку зрения. Это сочетание задаёт индивидуальную окраску базовой темы Венеры. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:venus:scorpio', 'western', 'Венера в знаке Скорпиона проявляет ценности через глубину, сосредоточенность и способность не отступать. Это сочетание задаёт индивидуальную окраску базовой темы Венеры. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:venus:sagittarius', 'western', 'Венера в знаке Стрельца проявляет ценности через оптимизм, широту взглядов и тягу к новому опыту. Это сочетание задаёт индивидуальную окраску базовой темы Венеры. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:venus:capricorn', 'western', 'Венера в знаке Козерога проявляет ценности через дисциплину, терпение и ориентацию на долгосрочный результат. Это сочетание задаёт индивидуальную окраску базовой темы Венеры. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:venus:aquarius', 'western', 'Венера в знаке Водолея проявляет ценности через независимость мышления, нестандартность и интерес к общему благу. Это сочетание задаёт индивидуальную окраску базовой темы Венеры. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:venus:pisces', 'western', 'Венера в знаке Рыб проявляет ценности через сочувствие, воображение и тонкую восприимчивость. Это сочетание задаёт индивидуальную окраску базовой темы Венеры. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:venus:1', 'western', 'Венера в 1-м доме направляет энергию, связанную с темой Венеры, в сферу «личность, внешнее проявление себя и то, как начинаются новые дела». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:venus:2', 'western', 'Венера в 2-м доме направляет энергию, связанную с темой Венеры, в сферу «ресурсы, финансовую устойчивость и систему ценностей». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:venus:3', 'western', 'Венера в 3-м доме направляет энергию, связанную с темой Венеры, в сферу «повседневное общение, обучение и ближайшее окружение». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:venus:4', 'western', 'Венера в 4-м доме направляет энергию, связанную с темой Венеры, в сферу «дом, корни и внутреннюю опору семьи». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:venus:5', 'western', 'Венера в 5-м доме направляет энергию, связанную с темой Венеры, в сферу «творческое самовыражение, романтику и радость проживания жизни». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:venus:6', 'western', 'Венера в 6-м доме направляет энергию, связанную с темой Венеры, в сферу «повседневную рутину, работу и заботу о теле». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:venus:7', 'western', 'Венера в 7-м доме направляет энергию, связанную с темой Венеры, в сферу «партнёрство, брак и открытые договорённости с другими». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:venus:8', 'western', 'Венера в 8-м доме направляет энергию, связанную с темой Венеры, в сферу «общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:venus:9', 'western', 'Венера в 9-м доме направляет энергию, связанную с темой Венеры, в сферу «мировоззрение, обучение высшего порядка и дальние горизонты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:venus:10', 'western', 'Венера в 10-м доме направляет энергию, связанную с темой Венеры, в сферу «карьеру, статус и публичную репутацию». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:venus:11', 'western', 'Венера в 11-м доме направляет энергию, связанную с темой Венеры, в сферу «дружеские сообщества, цели на будущее и коллективные проекты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:venus:12', 'western', 'Венера в 12-м доме направляет энергию, связанную с темой Венеры, в сферу «уединение, внутреннюю работу и то, что обычно остаётся за кадром». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mars:aries', 'western', 'Марс в знаке Овна проявляет напористость через инициативу, скорость и прямое действие. Это сочетание задаёт индивидуальную окраску базовой темы Марса. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mars:taurus', 'western', 'Марс в знаке Тельца проявляет напористость через устойчивость, практичность и стремление к надёжной опоре. Это сочетание задаёт индивидуальную окраску базовой темы Марса. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mars:gemini', 'western', 'Марс в знаке Близнецов проявляет напористость через любопытство, гибкость ума и потребность в разнообразии. Это сочетание задаёт индивидуальную окраску базовой темы Марса. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mars:cancer', 'western', 'Марс в знаке Рака проявляет напористость через заботу, эмоциональную чуткость и привязанность к близким. Это сочетание задаёт индивидуальную окраску базовой темы Марса. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mars:leo', 'western', 'Марс в знаке Льва проявляет напористость через яркое самовыражение, щедрость и потребность быть увиденным. Это сочетание задаёт индивидуальную окраску базовой темы Марса. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mars:virgo', 'western', 'Марс в знаке Девы проявляет напористость через внимание к деталям, аналитичность и стремление быть полезным. Это сочетание задаёт индивидуальную окраску базовой темы Марса. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mars:libra', 'western', 'Марс в знаке Весов проявляет напористость через поиск баланса, эстетику и умение видеть чужую точку зрения. Это сочетание задаёт индивидуальную окраску базовой темы Марса. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mars:scorpio', 'western', 'Марс в знаке Скорпиона проявляет напористость через глубину, сосредоточенность и способность не отступать. Это сочетание задаёт индивидуальную окраску базовой темы Марса. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mars:sagittarius', 'western', 'Марс в знаке Стрельца проявляет напористость через оптимизм, широту взглядов и тягу к новому опыту. Это сочетание задаёт индивидуальную окраску базовой темы Марса. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mars:capricorn', 'western', 'Марс в знаке Козерога проявляет напористость через дисциплину, терпение и ориентацию на долгосрочный результат. Это сочетание задаёт индивидуальную окраску базовой темы Марса. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mars:aquarius', 'western', 'Марс в знаке Водолея проявляет напористость через независимость мышления, нестандартность и интерес к общему благу. Это сочетание задаёт индивидуальную окраску базовой темы Марса. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:mars:pisces', 'western', 'Марс в знаке Рыб проявляет напористость через сочувствие, воображение и тонкую восприимчивость. Это сочетание задаёт индивидуальную окраску базовой темы Марса. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mars:1', 'western', 'Марс в 1-м доме направляет энергию, связанную с темой Марса, в сферу «личность, внешнее проявление себя и то, как начинаются новые дела». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mars:2', 'western', 'Марс в 2-м доме направляет энергию, связанную с темой Марса, в сферу «ресурсы, финансовую устойчивость и систему ценностей». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mars:3', 'western', 'Марс в 3-м доме направляет энергию, связанную с темой Марса, в сферу «повседневное общение, обучение и ближайшее окружение». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mars:4', 'western', 'Марс в 4-м доме направляет энергию, связанную с темой Марса, в сферу «дом, корни и внутреннюю опору семьи». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mars:5', 'western', 'Марс в 5-м доме направляет энергию, связанную с темой Марса, в сферу «творческое самовыражение, романтику и радость проживания жизни». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mars:6', 'western', 'Марс в 6-м доме направляет энергию, связанную с темой Марса, в сферу «повседневную рутину, работу и заботу о теле». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mars:7', 'western', 'Марс в 7-м доме направляет энергию, связанную с темой Марса, в сферу «партнёрство, брак и открытые договорённости с другими». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mars:8', 'western', 'Марс в 8-м доме направляет энергию, связанную с темой Марса, в сферу «общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mars:9', 'western', 'Марс в 9-м доме направляет энергию, связанную с темой Марса, в сферу «мировоззрение, обучение высшего порядка и дальние горизонты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mars:10', 'western', 'Марс в 10-м доме направляет энергию, связанную с темой Марса, в сферу «карьеру, статус и публичную репутацию». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mars:11', 'western', 'Марс в 11-м доме направляет энергию, связанную с темой Марса, в сферу «дружеские сообщества, цели на будущее и коллективные проекты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:mars:12', 'western', 'Марс в 12-м доме направляет энергию, связанную с темой Марса, в сферу «уединение, внутреннюю работу и то, что обычно остаётся за кадром». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:jupiter:aries', 'western', 'Юпитер в знаке Овна проявляет рост через инициативу, скорость и прямое действие. Это сочетание задаёт индивидуальную окраску базовой темы Юпитера. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:jupiter:taurus', 'western', 'Юпитер в знаке Тельца проявляет рост через устойчивость, практичность и стремление к надёжной опоре. Это сочетание задаёт индивидуальную окраску базовой темы Юпитера. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:jupiter:gemini', 'western', 'Юпитер в знаке Близнецов проявляет рост через любопытство, гибкость ума и потребность в разнообразии. Это сочетание задаёт индивидуальную окраску базовой темы Юпитера. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:jupiter:cancer', 'western', 'Юпитер в знаке Рака проявляет рост через заботу, эмоциональную чуткость и привязанность к близким. Это сочетание задаёт индивидуальную окраску базовой темы Юпитера. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:jupiter:leo', 'western', 'Юпитер в знаке Льва проявляет рост через яркое самовыражение, щедрость и потребность быть увиденным. Это сочетание задаёт индивидуальную окраску базовой темы Юпитера. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:jupiter:virgo', 'western', 'Юпитер в знаке Девы проявляет рост через внимание к деталям, аналитичность и стремление быть полезным. Это сочетание задаёт индивидуальную окраску базовой темы Юпитера. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:jupiter:libra', 'western', 'Юпитер в знаке Весов проявляет рост через поиск баланса, эстетику и умение видеть чужую точку зрения. Это сочетание задаёт индивидуальную окраску базовой темы Юпитера. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:jupiter:scorpio', 'western', 'Юпитер в знаке Скорпиона проявляет рост через глубину, сосредоточенность и способность не отступать. Это сочетание задаёт индивидуальную окраску базовой темы Юпитера. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:jupiter:sagittarius', 'western', 'Юпитер в знаке Стрельца проявляет рост через оптимизм, широту взглядов и тягу к новому опыту. Это сочетание задаёт индивидуальную окраску базовой темы Юпитера. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:jupiter:capricorn', 'western', 'Юпитер в знаке Козерога проявляет рост через дисциплину, терпение и ориентацию на долгосрочный результат. Это сочетание задаёт индивидуальную окраску базовой темы Юпитера. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:jupiter:aquarius', 'western', 'Юпитер в знаке Водолея проявляет рост через независимость мышления, нестандартность и интерес к общему благу. Это сочетание задаёт индивидуальную окраску базовой темы Юпитера. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:jupiter:pisces', 'western', 'Юпитер в знаке Рыб проявляет рост через сочувствие, воображение и тонкую восприимчивость. Это сочетание задаёт индивидуальную окраску базовой темы Юпитера. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:jupiter:1', 'western', 'Юпитер в 1-м доме направляет энергию, связанную с темой Юпитера, в сферу «личность, внешнее проявление себя и то, как начинаются новые дела». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:jupiter:2', 'western', 'Юпитер в 2-м доме направляет энергию, связанную с темой Юпитера, в сферу «ресурсы, финансовую устойчивость и систему ценностей». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:jupiter:3', 'western', 'Юпитер в 3-м доме направляет энергию, связанную с темой Юпитера, в сферу «повседневное общение, обучение и ближайшее окружение». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:jupiter:4', 'western', 'Юпитер в 4-м доме направляет энергию, связанную с темой Юпитера, в сферу «дом, корни и внутреннюю опору семьи». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:jupiter:5', 'western', 'Юпитер в 5-м доме направляет энергию, связанную с темой Юпитера, в сферу «творческое самовыражение, романтику и радость проживания жизни». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:jupiter:6', 'western', 'Юпитер в 6-м доме направляет энергию, связанную с темой Юпитера, в сферу «повседневную рутину, работу и заботу о теле». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:jupiter:7', 'western', 'Юпитер в 7-м доме направляет энергию, связанную с темой Юпитера, в сферу «партнёрство, брак и открытые договорённости с другими». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:jupiter:8', 'western', 'Юпитер в 8-м доме направляет энергию, связанную с темой Юпитера, в сферу «общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:jupiter:9', 'western', 'Юпитер в 9-м доме направляет энергию, связанную с темой Юпитера, в сферу «мировоззрение, обучение высшего порядка и дальние горизонты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:jupiter:10', 'western', 'Юпитер в 10-м доме направляет энергию, связанную с темой Юпитера, в сферу «карьеру, статус и публичную репутацию». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:jupiter:11', 'western', 'Юпитер в 11-м доме направляет энергию, связанную с темой Юпитера, в сферу «дружеские сообщества, цели на будущее и коллективные проекты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:jupiter:12', 'western', 'Юпитер в 12-м доме направляет энергию, связанную с темой Юпитера, в сферу «уединение, внутреннюю работу и то, что обычно остаётся за кадром». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:saturn:aries', 'western', 'Сатурн в знаке Овна проявляет дисциплину через инициативу, скорость и прямое действие. Это сочетание задаёт индивидуальную окраску базовой темы Сатурна. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:saturn:taurus', 'western', 'Сатурн в знаке Тельца проявляет дисциплину через устойчивость, практичность и стремление к надёжной опоре. Это сочетание задаёт индивидуальную окраску базовой темы Сатурна. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:saturn:gemini', 'western', 'Сатурн в знаке Близнецов проявляет дисциплину через любопытство, гибкость ума и потребность в разнообразии. Это сочетание задаёт индивидуальную окраску базовой темы Сатурна. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:saturn:cancer', 'western', 'Сатурн в знаке Рака проявляет дисциплину через заботу, эмоциональную чуткость и привязанность к близким. Это сочетание задаёт индивидуальную окраску базовой темы Сатурна. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:saturn:leo', 'western', 'Сатурн в знаке Льва проявляет дисциплину через яркое самовыражение, щедрость и потребность быть увиденным. Это сочетание задаёт индивидуальную окраску базовой темы Сатурна. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:saturn:virgo', 'western', 'Сатурн в знаке Девы проявляет дисциплину через внимание к деталям, аналитичность и стремление быть полезным. Это сочетание задаёт индивидуальную окраску базовой темы Сатурна. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:saturn:libra', 'western', 'Сатурн в знаке Весов проявляет дисциплину через поиск баланса, эстетику и умение видеть чужую точку зрения. Это сочетание задаёт индивидуальную окраску базовой темы Сатурна. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:saturn:scorpio', 'western', 'Сатурн в знаке Скорпиона проявляет дисциплину через глубину, сосредоточенность и способность не отступать. Это сочетание задаёт индивидуальную окраску базовой темы Сатурна. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:saturn:sagittarius', 'western', 'Сатурн в знаке Стрельца проявляет дисциплину через оптимизм, широту взглядов и тягу к новому опыту. Это сочетание задаёт индивидуальную окраску базовой темы Сатурна. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:saturn:capricorn', 'western', 'Сатурн в знаке Козерога проявляет дисциплину через дисциплину, терпение и ориентацию на долгосрочный результат. Это сочетание задаёт индивидуальную окраску базовой темы Сатурна. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:saturn:aquarius', 'western', 'Сатурн в знаке Водолея проявляет дисциплину через независимость мышления, нестандартность и интерес к общему благу. Это сочетание задаёт индивидуальную окраску базовой темы Сатурна. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:saturn:pisces', 'western', 'Сатурн в знаке Рыб проявляет дисциплину через сочувствие, воображение и тонкую восприимчивость. Это сочетание задаёт индивидуальную окраску базовой темы Сатурна. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:saturn:1', 'western', 'Сатурн в 1-м доме направляет энергию, связанную с темой Сатурна, в сферу «личность, внешнее проявление себя и то, как начинаются новые дела». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:saturn:2', 'western', 'Сатурн в 2-м доме направляет энергию, связанную с темой Сатурна, в сферу «ресурсы, финансовую устойчивость и систему ценностей». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:saturn:3', 'western', 'Сатурн в 3-м доме направляет энергию, связанную с темой Сатурна, в сферу «повседневное общение, обучение и ближайшее окружение». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:saturn:4', 'western', 'Сатурн в 4-м доме направляет энергию, связанную с темой Сатурна, в сферу «дом, корни и внутреннюю опору семьи». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:saturn:5', 'western', 'Сатурн в 5-м доме направляет энергию, связанную с темой Сатурна, в сферу «творческое самовыражение, романтику и радость проживания жизни». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:saturn:6', 'western', 'Сатурн в 6-м доме направляет энергию, связанную с темой Сатурна, в сферу «повседневную рутину, работу и заботу о теле». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:saturn:7', 'western', 'Сатурн в 7-м доме направляет энергию, связанную с темой Сатурна, в сферу «партнёрство, брак и открытые договорённости с другими». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:saturn:8', 'western', 'Сатурн в 8-м доме направляет энергию, связанную с темой Сатурна, в сферу «общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:saturn:9', 'western', 'Сатурн в 9-м доме направляет энергию, связанную с темой Сатурна, в сферу «мировоззрение, обучение высшего порядка и дальние горизонты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:saturn:10', 'western', 'Сатурн в 10-м доме направляет энергию, связанную с темой Сатурна, в сферу «карьеру, статус и публичную репутацию». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:saturn:11', 'western', 'Сатурн в 11-м доме направляет энергию, связанную с темой Сатурна, в сферу «дружеские сообщества, цели на будущее и коллективные проекты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:saturn:12', 'western', 'Сатурн в 12-м доме направляет энергию, связанную с темой Сатурна, в сферу «уединение, внутреннюю работу и то, что обычно остаётся за кадром». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:uranus:aries', 'western', 'Уран в знаке Овна проявляет потребность в свободе через инициативу, скорость и прямое действие. Это сочетание задаёт индивидуальную окраску базовой темы Урана. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:uranus:taurus', 'western', 'Уран в знаке Тельца проявляет потребность в свободе через устойчивость, практичность и стремление к надёжной опоре. Это сочетание задаёт индивидуальную окраску базовой темы Урана. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:uranus:gemini', 'western', 'Уран в знаке Близнецов проявляет потребность в свободе через любопытство, гибкость ума и потребность в разнообразии. Это сочетание задаёт индивидуальную окраску базовой темы Урана. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:uranus:cancer', 'western', 'Уран в знаке Рака проявляет потребность в свободе через заботу, эмоциональную чуткость и привязанность к близким. Это сочетание задаёт индивидуальную окраску базовой темы Урана. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:uranus:leo', 'western', 'Уран в знаке Льва проявляет потребность в свободе через яркое самовыражение, щедрость и потребность быть увиденным. Это сочетание задаёт индивидуальную окраску базовой темы Урана. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:uranus:virgo', 'western', 'Уран в знаке Девы проявляет потребность в свободе через внимание к деталям, аналитичность и стремление быть полезным. Это сочетание задаёт индивидуальную окраску базовой темы Урана. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:uranus:libra', 'western', 'Уран в знаке Весов проявляет потребность в свободе через поиск баланса, эстетику и умение видеть чужую точку зрения. Это сочетание задаёт индивидуальную окраску базовой темы Урана. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:uranus:scorpio', 'western', 'Уран в знаке Скорпиона проявляет потребность в свободе через глубину, сосредоточенность и способность не отступать. Это сочетание задаёт индивидуальную окраску базовой темы Урана. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:uranus:sagittarius', 'western', 'Уран в знаке Стрельца проявляет потребность в свободе через оптимизм, широту взглядов и тягу к новому опыту. Это сочетание задаёт индивидуальную окраску базовой темы Урана. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:uranus:capricorn', 'western', 'Уран в знаке Козерога проявляет потребность в свободе через дисциплину, терпение и ориентацию на долгосрочный результат. Это сочетание задаёт индивидуальную окраску базовой темы Урана. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:uranus:aquarius', 'western', 'Уран в знаке Водолея проявляет потребность в свободе через независимость мышления, нестандартность и интерес к общему благу. Это сочетание задаёт индивидуальную окраску базовой темы Урана. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:uranus:pisces', 'western', 'Уран в знаке Рыб проявляет потребность в свободе через сочувствие, воображение и тонкую восприимчивость. Это сочетание задаёт индивидуальную окраску базовой темы Урана. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:uranus:1', 'western', 'Уран в 1-м доме направляет энергию, связанную с темой Урана, в сферу «личность, внешнее проявление себя и то, как начинаются новые дела». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:uranus:2', 'western', 'Уран в 2-м доме направляет энергию, связанную с темой Урана, в сферу «ресурсы, финансовую устойчивость и систему ценностей». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:uranus:3', 'western', 'Уран в 3-м доме направляет энергию, связанную с темой Урана, в сферу «повседневное общение, обучение и ближайшее окружение». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:uranus:4', 'western', 'Уран в 4-м доме направляет энергию, связанную с темой Урана, в сферу «дом, корни и внутреннюю опору семьи». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:uranus:5', 'western', 'Уран в 5-м доме направляет энергию, связанную с темой Урана, в сферу «творческое самовыражение, романтику и радость проживания жизни». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:uranus:6', 'western', 'Уран в 6-м доме направляет энергию, связанную с темой Урана, в сферу «повседневную рутину, работу и заботу о теле». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:uranus:7', 'western', 'Уран в 7-м доме направляет энергию, связанную с темой Урана, в сферу «партнёрство, брак и открытые договорённости с другими». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:uranus:8', 'western', 'Уран в 8-м доме направляет энергию, связанную с темой Урана, в сферу «общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:uranus:9', 'western', 'Уран в 9-м доме направляет энергию, связанную с темой Урана, в сферу «мировоззрение, обучение высшего порядка и дальние горизонты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:uranus:10', 'western', 'Уран в 10-м доме направляет энергию, связанную с темой Урана, в сферу «карьеру, статус и публичную репутацию». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:uranus:11', 'western', 'Уран в 11-м доме направляет энергию, связанную с темой Урана, в сферу «дружеские сообщества, цели на будущее и коллективные проекты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:uranus:12', 'western', 'Уран в 12-м доме направляет энергию, связанную с темой Урана, в сферу «уединение, внутреннюю работу и то, что обычно остаётся за кадром». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:neptune:aries', 'western', 'Нептун в знаке Овна проявляет воображение через инициативу, скорость и прямое действие. Это сочетание задаёт индивидуальную окраску базовой темы Нептуна. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:neptune:taurus', 'western', 'Нептун в знаке Тельца проявляет воображение через устойчивость, практичность и стремление к надёжной опоре. Это сочетание задаёт индивидуальную окраску базовой темы Нептуна. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:neptune:gemini', 'western', 'Нептун в знаке Близнецов проявляет воображение через любопытство, гибкость ума и потребность в разнообразии. Это сочетание задаёт индивидуальную окраску базовой темы Нептуна. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:neptune:cancer', 'western', 'Нептун в знаке Рака проявляет воображение через заботу, эмоциональную чуткость и привязанность к близким. Это сочетание задаёт индивидуальную окраску базовой темы Нептуна. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:neptune:leo', 'western', 'Нептун в знаке Льва проявляет воображение через яркое самовыражение, щедрость и потребность быть увиденным. Это сочетание задаёт индивидуальную окраску базовой темы Нептуна. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:neptune:virgo', 'western', 'Нептун в знаке Девы проявляет воображение через внимание к деталям, аналитичность и стремление быть полезным. Это сочетание задаёт индивидуальную окраску базовой темы Нептуна. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:neptune:libra', 'western', 'Нептун в знаке Весов проявляет воображение через поиск баланса, эстетику и умение видеть чужую точку зрения. Это сочетание задаёт индивидуальную окраску базовой темы Нептуна. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:neptune:scorpio', 'western', 'Нептун в знаке Скорпиона проявляет воображение через глубину, сосредоточенность и способность не отступать. Это сочетание задаёт индивидуальную окраску базовой темы Нептуна. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:neptune:sagittarius', 'western', 'Нептун в знаке Стрельца проявляет воображение через оптимизм, широту взглядов и тягу к новому опыту. Это сочетание задаёт индивидуальную окраску базовой темы Нептуна. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:neptune:capricorn', 'western', 'Нептун в знаке Козерога проявляет воображение через дисциплину, терпение и ориентацию на долгосрочный результат. Это сочетание задаёт индивидуальную окраску базовой темы Нептуна. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:neptune:aquarius', 'western', 'Нептун в знаке Водолея проявляет воображение через независимость мышления, нестандартность и интерес к общему благу. Это сочетание задаёт индивидуальную окраску базовой темы Нептуна. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:neptune:pisces', 'western', 'Нептун в знаке Рыб проявляет воображение через сочувствие, воображение и тонкую восприимчивость. Это сочетание задаёт индивидуальную окраску базовой темы Нептуна. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:neptune:1', 'western', 'Нептун в 1-м доме направляет энергию, связанную с темой Нептуна, в сферу «личность, внешнее проявление себя и то, как начинаются новые дела». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:neptune:2', 'western', 'Нептун в 2-м доме направляет энергию, связанную с темой Нептуна, в сферу «ресурсы, финансовую устойчивость и систему ценностей». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:neptune:3', 'western', 'Нептун в 3-м доме направляет энергию, связанную с темой Нептуна, в сферу «повседневное общение, обучение и ближайшее окружение». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:neptune:4', 'western', 'Нептун в 4-м доме направляет энергию, связанную с темой Нептуна, в сферу «дом, корни и внутреннюю опору семьи». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:neptune:5', 'western', 'Нептун в 5-м доме направляет энергию, связанную с темой Нептуна, в сферу «творческое самовыражение, романтику и радость проживания жизни». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:neptune:6', 'western', 'Нептун в 6-м доме направляет энергию, связанную с темой Нептуна, в сферу «повседневную рутину, работу и заботу о теле». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:neptune:7', 'western', 'Нептун в 7-м доме направляет энергию, связанную с темой Нептуна, в сферу «партнёрство, брак и открытые договорённости с другими». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:neptune:8', 'western', 'Нептун в 8-м доме направляет энергию, связанную с темой Нептуна, в сферу «общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:neptune:9', 'western', 'Нептун в 9-м доме направляет энергию, связанную с темой Нептуна, в сферу «мировоззрение, обучение высшего порядка и дальние горизонты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:neptune:10', 'western', 'Нептун в 10-м доме направляет энергию, связанную с темой Нептуна, в сферу «карьеру, статус и публичную репутацию». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:neptune:11', 'western', 'Нептун в 11-м доме направляет энергию, связанную с темой Нептуна, в сферу «дружеские сообщества, цели на будущее и коллективные проекты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:neptune:12', 'western', 'Нептун в 12-м доме направляет энергию, связанную с темой Нептуна, в сферу «уединение, внутреннюю работу и то, что обычно остаётся за кадром». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:pluto:aries', 'western', 'Плутон в знаке Овна проявляет глубинную трансформацию через инициативу, скорость и прямое действие. Это сочетание задаёт индивидуальную окраску базовой темы Плутона. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:pluto:taurus', 'western', 'Плутон в знаке Тельца проявляет глубинную трансформацию через устойчивость, практичность и стремление к надёжной опоре. Это сочетание задаёт индивидуальную окраску базовой темы Плутона. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:pluto:gemini', 'western', 'Плутон в знаке Близнецов проявляет глубинную трансформацию через любопытство, гибкость ума и потребность в разнообразии. Это сочетание задаёт индивидуальную окраску базовой темы Плутона. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:pluto:cancer', 'western', 'Плутон в знаке Рака проявляет глубинную трансформацию через заботу, эмоциональную чуткость и привязанность к близким. Это сочетание задаёт индивидуальную окраску базовой темы Плутона. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:pluto:leo', 'western', 'Плутон в знаке Льва проявляет глубинную трансформацию через яркое самовыражение, щедрость и потребность быть увиденным. Это сочетание задаёт индивидуальную окраску базовой темы Плутона. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:pluto:virgo', 'western', 'Плутон в знаке Девы проявляет глубинную трансформацию через внимание к деталям, аналитичность и стремление быть полезным. Это сочетание задаёт индивидуальную окраску базовой темы Плутона. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:pluto:libra', 'western', 'Плутон в знаке Весов проявляет глубинную трансформацию через поиск баланса, эстетику и умение видеть чужую точку зрения. Это сочетание задаёт индивидуальную окраску базовой темы Плутона. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:pluto:scorpio', 'western', 'Плутон в знаке Скорпиона проявляет глубинную трансформацию через глубину, сосредоточенность и способность не отступать. Это сочетание задаёт индивидуальную окраску базовой темы Плутона. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:pluto:sagittarius', 'western', 'Плутон в знаке Стрельца проявляет глубинную трансформацию через оптимизм, широту взглядов и тягу к новому опыту. Это сочетание задаёт индивидуальную окраску базовой темы Плутона. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:pluto:capricorn', 'western', 'Плутон в знаке Козерога проявляет глубинную трансформацию через дисциплину, терпение и ориентацию на долгосрочный результат. Это сочетание задаёт индивидуальную окраску базовой темы Плутона. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:pluto:aquarius', 'western', 'Плутон в знаке Водолея проявляет глубинную трансформацию через независимость мышления, нестандартность и интерес к общему благу. Это сочетание задаёт индивидуальную окраску базовой темы Плутона. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_sign:pluto:pisces', 'western', 'Плутон в знаке Рыб проявляет глубинную трансформацию через сочувствие, воображение и тонкую восприимчивость. Это сочетание задаёт индивидуальную окраску базовой темы Плутона. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:pluto:1', 'western', 'Плутон в 1-м доме направляет энергию, связанную с темой Плутона, в сферу «личность, внешнее проявление себя и то, как начинаются новые дела». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:pluto:2', 'western', 'Плутон в 2-м доме направляет энергию, связанную с темой Плутона, в сферу «ресурсы, финансовую устойчивость и систему ценностей». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:pluto:3', 'western', 'Плутон в 3-м доме направляет энергию, связанную с темой Плутона, в сферу «повседневное общение, обучение и ближайшее окружение». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:pluto:4', 'western', 'Плутон в 4-м доме направляет энергию, связанную с темой Плутона, в сферу «дом, корни и внутреннюю опору семьи». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:pluto:5', 'western', 'Плутон в 5-м доме направляет энергию, связанную с темой Плутона, в сферу «творческое самовыражение, романтику и радость проживания жизни». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:pluto:6', 'western', 'Плутон в 6-м доме направляет энергию, связанную с темой Плутона, в сферу «повседневную рутину, работу и заботу о теле». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:pluto:7', 'western', 'Плутон в 7-м доме направляет энергию, связанную с темой Плутона, в сферу «партнёрство, брак и открытые договорённости с другими». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:pluto:8', 'western', 'Плутон в 8-м доме направляет энергию, связанную с темой Плутона, в сферу «общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:pluto:9', 'western', 'Плутон в 9-м доме направляет энергию, связанную с темой Плутона, в сферу «мировоззрение, обучение высшего порядка и дальние горизонты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:pluto:10', 'western', 'Плутон в 10-м доме направляет энергию, связанную с темой Плутона, в сферу «карьеру, статус и публичную репутацию». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:pluto:11', 'western', 'Плутон в 11-м доме направляет энергию, связанную с темой Плутона, в сферу «дружеские сообщества, цели на будущее и коллективные проекты». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('planet_in_house:pluto:12', 'western', 'Плутон в 12-м доме направляет энергию, связанную с темой Плутона, в сферу «уединение, внутреннюю работу и то, что обычно остаётся за кадром». Именно здесь эта планета проявляется наиболее заметно в повседневной жизни.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('asc_in_sign:aries', 'western', 'Асцендент в знаке Овна формирует первое впечатление и стиль, в котором человек встречает новые ситуации через инициативу, скорость и прямое действие. Это «маска» и одновременно естественная манера включаться в мир — то, что видят окружающие раньше всего остального.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('asc_in_sign:taurus', 'western', 'Асцендент в знаке Тельца формирует первое впечатление и стиль, в котором человек встречает новые ситуации через устойчивость, практичность и стремление к надёжной опоре. Это «маска» и одновременно естественная манера включаться в мир — то, что видят окружающие раньше всего остального.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('asc_in_sign:gemini', 'western', 'Асцендент в знаке Близнецов формирует первое впечатление и стиль, в котором человек встречает новые ситуации через любопытство, гибкость ума и потребность в разнообразии. Это «маска» и одновременно естественная манера включаться в мир — то, что видят окружающие раньше всего остального.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('asc_in_sign:cancer', 'western', 'Асцендент в знаке Рака формирует первое впечатление и стиль, в котором человек встречает новые ситуации через заботу, эмоциональную чуткость и привязанность к близким. Это «маска» и одновременно естественная манера включаться в мир — то, что видят окружающие раньше всего остального.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('asc_in_sign:leo', 'western', 'Асцендент в знаке Льва формирует первое впечатление и стиль, в котором человек встречает новые ситуации через яркое самовыражение, щедрость и потребность быть увиденным. Это «маска» и одновременно естественная манера включаться в мир — то, что видят окружающие раньше всего остального.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('asc_in_sign:virgo', 'western', 'Асцендент в знаке Девы формирует первое впечатление и стиль, в котором человек встречает новые ситуации через внимание к деталям, аналитичность и стремление быть полезным. Это «маска» и одновременно естественная манера включаться в мир — то, что видят окружающие раньше всего остального.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('asc_in_sign:libra', 'western', 'Асцендент в знаке Весов формирует первое впечатление и стиль, в котором человек встречает новые ситуации через поиск баланса, эстетику и умение видеть чужую точку зрения. Это «маска» и одновременно естественная манера включаться в мир — то, что видят окружающие раньше всего остального.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('asc_in_sign:scorpio', 'western', 'Асцендент в знаке Скорпиона формирует первое впечатление и стиль, в котором человек встречает новые ситуации через глубину, сосредоточенность и способность не отступать. Это «маска» и одновременно естественная манера включаться в мир — то, что видят окружающие раньше всего остального.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('asc_in_sign:sagittarius', 'western', 'Асцендент в знаке Стрельца формирует первое впечатление и стиль, в котором человек встречает новые ситуации через оптимизм, широту взглядов и тягу к новому опыту. Это «маска» и одновременно естественная манера включаться в мир — то, что видят окружающие раньше всего остального.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('asc_in_sign:capricorn', 'western', 'Асцендент в знаке Козерога формирует первое впечатление и стиль, в котором человек встречает новые ситуации через дисциплину, терпение и ориентацию на долгосрочный результат. Это «маска» и одновременно естественная манера включаться в мир — то, что видят окружающие раньше всего остального.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('asc_in_sign:aquarius', 'western', 'Асцендент в знаке Водолея формирует первое впечатление и стиль, в котором человек встречает новые ситуации через независимость мышления, нестандартность и интерес к общему благу. Это «маска» и одновременно естественная манера включаться в мир — то, что видят окружающие раньше всего остального.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('asc_in_sign:pisces', 'western', 'Асцендент в знаке Рыб формирует первое впечатление и стиль, в котором человек встречает новые ситуации через сочувствие, воображение и тонкую восприимчивость. Это «маска» и одновременно естественная манера включаться в мир — то, что видят окружающие раньше всего остального.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:chiron:aries', 'karmic', 'Хирон в знаке Овна указывает на зону наиболее чувствительного, но и наиболее целительного опыта. Эта тема проявляется через стиль, свойственный Овна. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:chiron:taurus', 'karmic', 'Хирон в знаке Тельца указывает на зону наиболее чувствительного, но и наиболее целительного опыта. Эта тема проявляется через стиль, свойственный Тельца. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:chiron:gemini', 'karmic', 'Хирон в знаке Близнецов указывает на зону наиболее чувствительного, но и наиболее целительного опыта. Эта тема проявляется через стиль, свойственный Близнецов. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:chiron:cancer', 'karmic', 'Хирон в знаке Рака указывает на зону наиболее чувствительного, но и наиболее целительного опыта. Эта тема проявляется через стиль, свойственный Рака. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:chiron:leo', 'karmic', 'Хирон в знаке Льва указывает на зону наиболее чувствительного, но и наиболее целительного опыта. Эта тема проявляется через стиль, свойственный Льва. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:chiron:virgo', 'karmic', 'Хирон в знаке Девы указывает на зону наиболее чувствительного, но и наиболее целительного опыта. Эта тема проявляется через стиль, свойственный Девы. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:chiron:libra', 'karmic', 'Хирон в знаке Весов указывает на зону наиболее чувствительного, но и наиболее целительного опыта. Эта тема проявляется через стиль, свойственный Весов. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:chiron:scorpio', 'karmic', 'Хирон в знаке Скорпиона указывает на зону наиболее чувствительного, но и наиболее целительного опыта. Эта тема проявляется через стиль, свойственный Скорпиона. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:chiron:sagittarius', 'karmic', 'Хирон в знаке Стрельца указывает на зону наиболее чувствительного, но и наиболее целительного опыта. Эта тема проявляется через стиль, свойственный Стрельца. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:chiron:capricorn', 'karmic', 'Хирон в знаке Козерога указывает на зону наиболее чувствительного, но и наиболее целительного опыта. Эта тема проявляется через стиль, свойственный Козерога. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:chiron:aquarius', 'karmic', 'Хирон в знаке Водолея указывает на зону наиболее чувствительного, но и наиболее целительного опыта. Эта тема проявляется через стиль, свойственный Водолея. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:chiron:pisces', 'karmic', 'Хирон в знаке Рыб указывает на зону наиболее чувствительного, но и наиболее целительного опыта. Эта тема проявляется через стиль, свойственный Рыб. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:chiron:1', 'karmic', 'Хирон в 1-м доме концентрирует свою тему вокруг сферы «личность, внешнее проявление себя и то, как начинаются новые дела» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:chiron:2', 'karmic', 'Хирон в 2-м доме концентрирует свою тему вокруг сферы «ресурсы, финансовую устойчивость и систему ценностей» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:chiron:3', 'karmic', 'Хирон в 3-м доме концентрирует свою тему вокруг сферы «повседневное общение, обучение и ближайшее окружение» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:chiron:4', 'karmic', 'Хирон в 4-м доме концентрирует свою тему вокруг сферы «дом, корни и внутреннюю опору семьи» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:chiron:5', 'karmic', 'Хирон в 5-м доме концентрирует свою тему вокруг сферы «творческое самовыражение, романтику и радость проживания жизни» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:chiron:6', 'karmic', 'Хирон в 6-м доме концентрирует свою тему вокруг сферы «повседневную рутину, работу и заботу о теле» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:chiron:7', 'karmic', 'Хирон в 7-м доме концентрирует свою тему вокруг сферы «партнёрство, брак и открытые договорённости с другими» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:chiron:8', 'karmic', 'Хирон в 8-м доме концентрирует свою тему вокруг сферы «общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:chiron:9', 'karmic', 'Хирон в 9-м доме концентрирует свою тему вокруг сферы «мировоззрение, обучение высшего порядка и дальние горизонты» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:chiron:10', 'karmic', 'Хирон в 10-м доме концентрирует свою тему вокруг сферы «карьеру, статус и публичную репутацию» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:chiron:11', 'karmic', 'Хирон в 11-м доме концентрирует свою тему вокруг сферы «дружеские сообщества, цели на будущее и коллективные проекты» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:chiron:12', 'karmic', 'Хирон в 12-м доме концентрирует свою тему вокруг сферы «уединение, внутреннюю работу и то, что обычно остаётся за кадром» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:north_node:aries', 'karmic', 'Северный узел в знаке Овна указывает на направление осознанного роста. Эта тема проявляется через стиль, свойственный Овна. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:north_node:taurus', 'karmic', 'Северный узел в знаке Тельца указывает на направление осознанного роста. Эта тема проявляется через стиль, свойственный Тельца. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:north_node:gemini', 'karmic', 'Северный узел в знаке Близнецов указывает на направление осознанного роста. Эта тема проявляется через стиль, свойственный Близнецов. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:north_node:cancer', 'karmic', 'Северный узел в знаке Рака указывает на направление осознанного роста. Эта тема проявляется через стиль, свойственный Рака. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:north_node:leo', 'karmic', 'Северный узел в знаке Льва указывает на направление осознанного роста. Эта тема проявляется через стиль, свойственный Льва. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:north_node:virgo', 'karmic', 'Северный узел в знаке Девы указывает на направление осознанного роста. Эта тема проявляется через стиль, свойственный Девы. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:north_node:libra', 'karmic', 'Северный узел в знаке Весов указывает на направление осознанного роста. Эта тема проявляется через стиль, свойственный Весов. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:north_node:scorpio', 'karmic', 'Северный узел в знаке Скорпиона указывает на направление осознанного роста. Эта тема проявляется через стиль, свойственный Скорпиона. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:north_node:sagittarius', 'karmic', 'Северный узел в знаке Стрельца указывает на направление осознанного роста. Эта тема проявляется через стиль, свойственный Стрельца. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:north_node:capricorn', 'karmic', 'Северный узел в знаке Козерога указывает на направление осознанного роста. Эта тема проявляется через стиль, свойственный Козерога. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:north_node:aquarius', 'karmic', 'Северный узел в знаке Водолея указывает на направление осознанного роста. Эта тема проявляется через стиль, свойственный Водолея. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:north_node:pisces', 'karmic', 'Северный узел в знаке Рыб указывает на направление осознанного роста. Эта тема проявляется через стиль, свойственный Рыб. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:north_node:1', 'karmic', 'Северный узел в 1-м доме концентрирует свою тему вокруг сферы «личность, внешнее проявление себя и то, как начинаются новые дела» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:north_node:2', 'karmic', 'Северный узел в 2-м доме концентрирует свою тему вокруг сферы «ресурсы, финансовую устойчивость и систему ценностей» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:north_node:3', 'karmic', 'Северный узел в 3-м доме концентрирует свою тему вокруг сферы «повседневное общение, обучение и ближайшее окружение» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:north_node:4', 'karmic', 'Северный узел в 4-м доме концентрирует свою тему вокруг сферы «дом, корни и внутреннюю опору семьи» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:north_node:5', 'karmic', 'Северный узел в 5-м доме концентрирует свою тему вокруг сферы «творческое самовыражение, романтику и радость проживания жизни» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:north_node:6', 'karmic', 'Северный узел в 6-м доме концентрирует свою тему вокруг сферы «повседневную рутину, работу и заботу о теле» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:north_node:7', 'karmic', 'Северный узел в 7-м доме концентрирует свою тему вокруг сферы «партнёрство, брак и открытые договорённости с другими» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:north_node:8', 'karmic', 'Северный узел в 8-м доме концентрирует свою тему вокруг сферы «общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:north_node:9', 'karmic', 'Северный узел в 9-м доме концентрирует свою тему вокруг сферы «мировоззрение, обучение высшего порядка и дальние горизонты» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:north_node:10', 'karmic', 'Северный узел в 10-м доме концентрирует свою тему вокруг сферы «карьеру, статус и публичную репутацию» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:north_node:11', 'karmic', 'Северный узел в 11-м доме концентрирует свою тему вокруг сферы «дружеские сообщества, цели на будущее и коллективные проекты» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:north_node:12', 'karmic', 'Северный узел в 12-м доме концентрирует свою тему вокруг сферы «уединение, внутреннюю работу и то, что обычно остаётся за кадром» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:south_node:aries', 'karmic', 'Южный узел в знаке Овна указывает на привычную, комфортную территорию, которую полезно не превращать в единственную опору. Эта тема проявляется через стиль, свойственный Овна. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:south_node:taurus', 'karmic', 'Южный узел в знаке Тельца указывает на привычную, комфортную территорию, которую полезно не превращать в единственную опору. Эта тема проявляется через стиль, свойственный Тельца. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:south_node:gemini', 'karmic', 'Южный узел в знаке Близнецов указывает на привычную, комфортную территорию, которую полезно не превращать в единственную опору. Эта тема проявляется через стиль, свойственный Близнецов. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:south_node:cancer', 'karmic', 'Южный узел в знаке Рака указывает на привычную, комфортную территорию, которую полезно не превращать в единственную опору. Эта тема проявляется через стиль, свойственный Рака. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:south_node:leo', 'karmic', 'Южный узел в знаке Льва указывает на привычную, комфортную территорию, которую полезно не превращать в единственную опору. Эта тема проявляется через стиль, свойственный Льва. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:south_node:virgo', 'karmic', 'Южный узел в знаке Девы указывает на привычную, комфортную территорию, которую полезно не превращать в единственную опору. Эта тема проявляется через стиль, свойственный Девы. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:south_node:libra', 'karmic', 'Южный узел в знаке Весов указывает на привычную, комфортную территорию, которую полезно не превращать в единственную опору. Эта тема проявляется через стиль, свойственный Весов. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:south_node:scorpio', 'karmic', 'Южный узел в знаке Скорпиона указывает на привычную, комфортную территорию, которую полезно не превращать в единственную опору. Эта тема проявляется через стиль, свойственный Скорпиона. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:south_node:sagittarius', 'karmic', 'Южный узел в знаке Стрельца указывает на привычную, комфортную территорию, которую полезно не превращать в единственную опору. Эта тема проявляется через стиль, свойственный Стрельца. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:south_node:capricorn', 'karmic', 'Южный узел в знаке Козерога указывает на привычную, комфортную территорию, которую полезно не превращать в единственную опору. Эта тема проявляется через стиль, свойственный Козерога. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:south_node:aquarius', 'karmic', 'Южный узел в знаке Водолея указывает на привычную, комфортную территорию, которую полезно не превращать в единственную опору. Эта тема проявляется через стиль, свойственный Водолея. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:south_node:pisces', 'karmic', 'Южный узел в знаке Рыб указывает на привычную, комфортную территорию, которую полезно не превращать в единственную опору. Эта тема проявляется через стиль, свойственный Рыб. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:south_node:1', 'karmic', 'Южный узел в 1-м доме концентрирует свою тему вокруг сферы «личность, внешнее проявление себя и то, как начинаются новые дела» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:south_node:2', 'karmic', 'Южный узел в 2-м доме концентрирует свою тему вокруг сферы «ресурсы, финансовую устойчивость и систему ценностей» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:south_node:3', 'karmic', 'Южный узел в 3-м доме концентрирует свою тему вокруг сферы «повседневное общение, обучение и ближайшее окружение» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:south_node:4', 'karmic', 'Южный узел в 4-м доме концентрирует свою тему вокруг сферы «дом, корни и внутреннюю опору семьи» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:south_node:5', 'karmic', 'Южный узел в 5-м доме концентрирует свою тему вокруг сферы «творческое самовыражение, романтику и радость проживания жизни» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:south_node:6', 'karmic', 'Южный узел в 6-м доме концентрирует свою тему вокруг сферы «повседневную рутину, работу и заботу о теле» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:south_node:7', 'karmic', 'Южный узел в 7-м доме концентрирует свою тему вокруг сферы «партнёрство, брак и открытые договорённости с другими» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:south_node:8', 'karmic', 'Южный узел в 8-м доме концентрирует свою тему вокруг сферы «общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:south_node:9', 'karmic', 'Южный узел в 9-м доме концентрирует свою тему вокруг сферы «мировоззрение, обучение высшего порядка и дальние горизонты» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:south_node:10', 'karmic', 'Южный узел в 10-м доме концентрирует свою тему вокруг сферы «карьеру, статус и публичную репутацию» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:south_node:11', 'karmic', 'Южный узел в 11-м доме концентрирует свою тему вокруг сферы «дружеские сообщества, цели на будущее и коллективные проекты» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:south_node:12', 'karmic', 'Южный узел в 12-м доме концентрирует свою тему вокруг сферы «уединение, внутреннюю работу и то, что обычно остаётся за кадром» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:lilith:aries', 'karmic', 'Лилит в знаке Овна указывает на непризнанную часть личности, которая просит признания. Эта тема проявляется через стиль, свойственный Овна. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:lilith:taurus', 'karmic', 'Лилит в знаке Тельца указывает на непризнанную часть личности, которая просит признания. Эта тема проявляется через стиль, свойственный Тельца. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:lilith:gemini', 'karmic', 'Лилит в знаке Близнецов указывает на непризнанную часть личности, которая просит признания. Эта тема проявляется через стиль, свойственный Близнецов. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:lilith:cancer', 'karmic', 'Лилит в знаке Рака указывает на непризнанную часть личности, которая просит признания. Эта тема проявляется через стиль, свойственный Рака. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:lilith:leo', 'karmic', 'Лилит в знаке Льва указывает на непризнанную часть личности, которая просит признания. Эта тема проявляется через стиль, свойственный Льва. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:lilith:virgo', 'karmic', 'Лилит в знаке Девы указывает на непризнанную часть личности, которая просит признания. Эта тема проявляется через стиль, свойственный Девы. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:lilith:libra', 'karmic', 'Лилит в знаке Весов указывает на непризнанную часть личности, которая просит признания. Эта тема проявляется через стиль, свойственный Весов. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:lilith:scorpio', 'karmic', 'Лилит в знаке Скорпиона указывает на непризнанную часть личности, которая просит признания. Эта тема проявляется через стиль, свойственный Скорпиона. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:lilith:sagittarius', 'karmic', 'Лилит в знаке Стрельца указывает на непризнанную часть личности, которая просит признания. Эта тема проявляется через стиль, свойственный Стрельца. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:lilith:capricorn', 'karmic', 'Лилит в знаке Козерога указывает на непризнанную часть личности, которая просит признания. Эта тема проявляется через стиль, свойственный Козерога. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:lilith:aquarius', 'karmic', 'Лилит в знаке Водолея указывает на непризнанную часть личности, которая просит признания. Эта тема проявляется через стиль, свойственный Водолея. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:lilith:pisces', 'karmic', 'Лилит в знаке Рыб указывает на непризнанную часть личности, которая просит признания. Эта тема проявляется через стиль, свойственный Рыб. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:lilith:1', 'karmic', 'Лилит в 1-м доме концентрирует свою тему вокруг сферы «личность, внешнее проявление себя и то, как начинаются новые дела» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:lilith:2', 'karmic', 'Лилит в 2-м доме концентрирует свою тему вокруг сферы «ресурсы, финансовую устойчивость и систему ценностей» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:lilith:3', 'karmic', 'Лилит в 3-м доме концентрирует свою тему вокруг сферы «повседневное общение, обучение и ближайшее окружение» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:lilith:4', 'karmic', 'Лилит в 4-м доме концентрирует свою тему вокруг сферы «дом, корни и внутреннюю опору семьи» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:lilith:5', 'karmic', 'Лилит в 5-м доме концентрирует свою тему вокруг сферы «творческое самовыражение, романтику и радость проживания жизни» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:lilith:6', 'karmic', 'Лилит в 6-м доме концентрирует свою тему вокруг сферы «повседневную рутину, работу и заботу о теле» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:lilith:7', 'karmic', 'Лилит в 7-м доме концентрирует свою тему вокруг сферы «партнёрство, брак и открытые договорённости с другими» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:lilith:8', 'karmic', 'Лилит в 8-м доме концентрирует свою тему вокруг сферы «общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:lilith:9', 'karmic', 'Лилит в 9-м доме концентрирует свою тему вокруг сферы «мировоззрение, обучение высшего порядка и дальние горизонты» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:lilith:10', 'karmic', 'Лилит в 10-м доме концентрирует свою тему вокруг сферы «карьеру, статус и публичную репутацию» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:lilith:11', 'karmic', 'Лилит в 11-м доме концентрирует свою тему вокруг сферы «дружеские сообщества, цели на будущее и коллективные проекты» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:lilith:12', 'karmic', 'Лилит в 12-м доме концентрирует свою тему вокруг сферы «уединение, внутреннюю работу и то, что обычно остаётся за кадром» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:selena:aries', 'karmic', 'Селена в знаке Овна указывает на тонкую интуитивную чувствительность. Эта тема проявляется через стиль, свойственный Овна. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:selena:taurus', 'karmic', 'Селена в знаке Тельца указывает на тонкую интуитивную чувствительность. Эта тема проявляется через стиль, свойственный Тельца. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:selena:gemini', 'karmic', 'Селена в знаке Близнецов указывает на тонкую интуитивную чувствительность. Эта тема проявляется через стиль, свойственный Близнецов. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:selena:cancer', 'karmic', 'Селена в знаке Рака указывает на тонкую интуитивную чувствительность. Эта тема проявляется через стиль, свойственный Рака. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:selena:leo', 'karmic', 'Селена в знаке Льва указывает на тонкую интуитивную чувствительность. Эта тема проявляется через стиль, свойственный Льва. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:selena:virgo', 'karmic', 'Селена в знаке Девы указывает на тонкую интуитивную чувствительность. Эта тема проявляется через стиль, свойственный Девы. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:selena:libra', 'karmic', 'Селена в знаке Весов указывает на тонкую интуитивную чувствительность. Эта тема проявляется через стиль, свойственный Весов. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:selena:scorpio', 'karmic', 'Селена в знаке Скорпиона указывает на тонкую интуитивную чувствительность. Эта тема проявляется через стиль, свойственный Скорпиона. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:selena:sagittarius', 'karmic', 'Селена в знаке Стрельца указывает на тонкую интуитивную чувствительность. Эта тема проявляется через стиль, свойственный Стрельца. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:selena:capricorn', 'karmic', 'Селена в знаке Козерога указывает на тонкую интуитивную чувствительность. Эта тема проявляется через стиль, свойственный Козерога. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:selena:aquarius', 'karmic', 'Селена в знаке Водолея указывает на тонкую интуитивную чувствительность. Эта тема проявляется через стиль, свойственный Водолея. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_sign:selena:pisces', 'karmic', 'Селена в знаке Рыб указывает на тонкую интуитивную чувствительность. Эта тема проявляется через стиль, свойственный Рыб. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:selena:1', 'karmic', 'Селена в 1-м доме концентрирует свою тему вокруг сферы «личность, внешнее проявление себя и то, как начинаются новые дела» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:selena:2', 'karmic', 'Селена в 2-м доме концентрирует свою тему вокруг сферы «ресурсы, финансовую устойчивость и систему ценностей» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:selena:3', 'karmic', 'Селена в 3-м доме концентрирует свою тему вокруг сферы «повседневное общение, обучение и ближайшее окружение» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:selena:4', 'karmic', 'Селена в 4-м доме концентрирует свою тему вокруг сферы «дом, корни и внутреннюю опору семьи» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:selena:5', 'karmic', 'Селена в 5-м доме концентрирует свою тему вокруг сферы «творческое самовыражение, романтику и радость проживания жизни» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:selena:6', 'karmic', 'Селена в 6-м доме концентрирует свою тему вокруг сферы «повседневную рутину, работу и заботу о теле» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:selena:7', 'karmic', 'Селена в 7-м доме концентрирует свою тему вокруг сферы «партнёрство, брак и открытые договорённости с другими» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:selena:8', 'karmic', 'Селена в 8-м доме концентрирует свою тему вокруг сферы «общие ресурсы, глубокие трансформации и то, чем делятся с другими на глубоком уровне» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:selena:9', 'karmic', 'Селена в 9-м доме концентрирует свою тему вокруг сферы «мировоззрение, обучение высшего порядка и дальние горизонты» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:selena:10', 'karmic', 'Селена в 10-м доме концентрирует свою тему вокруг сферы «карьеру, статус и публичную репутацию» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:selena:11', 'karmic', 'Селена в 11-м доме концентрирует свою тему вокруг сферы «дружеские сообщества, цели на будущее и коллективные проекты» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('point_in_house:selena:12', 'karmic', 'Селена в 12-м доме концентрирует свою тему вокруг сферы «уединение, внутреннюю работу и то, что обычно остаётся за кадром» — именно там она разворачивается наиболее заметно.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:conjunction:chiron', 'karmic', 'Связка «Солнце — Хирон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:sextile:chiron', 'karmic', 'Связка «Солнце — Хирон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:square:chiron', 'karmic', 'Связка «Солнце — Хирон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:trine:chiron', 'karmic', 'Связка «Солнце — Хирон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:opposition:chiron', 'karmic', 'Связка «Солнце — Хирон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:conjunction:chiron', 'karmic', 'Связка «Луна — Хирон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:sextile:chiron', 'karmic', 'Связка «Луна — Хирон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:square:chiron', 'karmic', 'Связка «Луна — Хирон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:trine:chiron', 'karmic', 'Связка «Луна — Хирон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:opposition:chiron', 'karmic', 'Связка «Луна — Хирон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:conjunction:chiron', 'karmic', 'Связка «Меркурий — Хирон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:sextile:chiron', 'karmic', 'Связка «Меркурий — Хирон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:square:chiron', 'karmic', 'Связка «Меркурий — Хирон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:trine:chiron', 'karmic', 'Связка «Меркурий — Хирон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:opposition:chiron', 'karmic', 'Связка «Меркурий — Хирон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:conjunction:chiron', 'karmic', 'Связка «Венера — Хирон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:sextile:chiron', 'karmic', 'Связка «Венера — Хирон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:square:chiron', 'karmic', 'Связка «Венера — Хирон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:trine:chiron', 'karmic', 'Связка «Венера — Хирон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:opposition:chiron', 'karmic', 'Связка «Венера — Хирон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:conjunction:chiron', 'karmic', 'Связка «Марс — Хирон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:sextile:chiron', 'karmic', 'Связка «Марс — Хирон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:square:chiron', 'karmic', 'Связка «Марс — Хирон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:trine:chiron', 'karmic', 'Связка «Марс — Хирон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:opposition:chiron', 'karmic', 'Связка «Марс — Хирон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:conjunction:chiron', 'karmic', 'Связка «Юпитер — Хирон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:sextile:chiron', 'karmic', 'Связка «Юпитер — Хирон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:square:chiron', 'karmic', 'Связка «Юпитер — Хирон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:trine:chiron', 'karmic', 'Связка «Юпитер — Хирон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:opposition:chiron', 'karmic', 'Связка «Юпитер — Хирон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:conjunction:chiron', 'karmic', 'Связка «Сатурн — Хирон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:sextile:chiron', 'karmic', 'Связка «Сатурн — Хирон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:square:chiron', 'karmic', 'Связка «Сатурн — Хирон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:trine:chiron', 'karmic', 'Связка «Сатурн — Хирон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:opposition:chiron', 'karmic', 'Связка «Сатурн — Хирон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:conjunction:chiron', 'karmic', 'Связка «Уран — Хирон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:sextile:chiron', 'karmic', 'Связка «Уран — Хирон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:square:chiron', 'karmic', 'Связка «Уран — Хирон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:trine:chiron', 'karmic', 'Связка «Уран — Хирон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:opposition:chiron', 'karmic', 'Связка «Уран — Хирон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:conjunction:chiron', 'karmic', 'Связка «Нептун — Хирон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:sextile:chiron', 'karmic', 'Связка «Нептун — Хирон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:square:chiron', 'karmic', 'Связка «Нептун — Хирон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:trine:chiron', 'karmic', 'Связка «Нептун — Хирон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:opposition:chiron', 'karmic', 'Связка «Нептун — Хирон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:conjunction:chiron', 'karmic', 'Связка «Плутон — Хирон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:sextile:chiron', 'karmic', 'Связка «Плутон — Хирон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:square:chiron', 'karmic', 'Связка «Плутон — Хирон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:trine:chiron', 'karmic', 'Связка «Плутон — Хирон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:opposition:chiron', 'karmic', 'Связка «Плутон — Хирон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:conjunction:north_node', 'karmic', 'Связка «Солнце — Северный узел» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:sextile:north_node', 'karmic', 'Связка «Солнце — Северный узел» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:square:north_node', 'karmic', 'Связка «Солнце — Северный узел» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:trine:north_node', 'karmic', 'Связка «Солнце — Северный узел» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:opposition:north_node', 'karmic', 'Связка «Солнце — Северный узел» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:conjunction:north_node', 'karmic', 'Связка «Луна — Северный узел» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:sextile:north_node', 'karmic', 'Связка «Луна — Северный узел» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:square:north_node', 'karmic', 'Связка «Луна — Северный узел» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:trine:north_node', 'karmic', 'Связка «Луна — Северный узел» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:opposition:north_node', 'karmic', 'Связка «Луна — Северный узел» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:conjunction:north_node', 'karmic', 'Связка «Меркурий — Северный узел» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:sextile:north_node', 'karmic', 'Связка «Меркурий — Северный узел» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:square:north_node', 'karmic', 'Связка «Меркурий — Северный узел» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:trine:north_node', 'karmic', 'Связка «Меркурий — Северный узел» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:opposition:north_node', 'karmic', 'Связка «Меркурий — Северный узел» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:conjunction:north_node', 'karmic', 'Связка «Венера — Северный узел» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:sextile:north_node', 'karmic', 'Связка «Венера — Северный узел» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:square:north_node', 'karmic', 'Связка «Венера — Северный узел» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:trine:north_node', 'karmic', 'Связка «Венера — Северный узел» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:opposition:north_node', 'karmic', 'Связка «Венера — Северный узел» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:conjunction:north_node', 'karmic', 'Связка «Марс — Северный узел» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:sextile:north_node', 'karmic', 'Связка «Марс — Северный узел» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:square:north_node', 'karmic', 'Связка «Марс — Северный узел» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:trine:north_node', 'karmic', 'Связка «Марс — Северный узел» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:opposition:north_node', 'karmic', 'Связка «Марс — Северный узел» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:conjunction:north_node', 'karmic', 'Связка «Юпитер — Северный узел» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:sextile:north_node', 'karmic', 'Связка «Юпитер — Северный узел» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:square:north_node', 'karmic', 'Связка «Юпитер — Северный узел» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:trine:north_node', 'karmic', 'Связка «Юпитер — Северный узел» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:opposition:north_node', 'karmic', 'Связка «Юпитер — Северный узел» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:conjunction:north_node', 'karmic', 'Связка «Сатурн — Северный узел» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:sextile:north_node', 'karmic', 'Связка «Сатурн — Северный узел» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:square:north_node', 'karmic', 'Связка «Сатурн — Северный узел» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:trine:north_node', 'karmic', 'Связка «Сатурн — Северный узел» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:opposition:north_node', 'karmic', 'Связка «Сатурн — Северный узел» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:conjunction:north_node', 'karmic', 'Связка «Уран — Северный узел» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:sextile:north_node', 'karmic', 'Связка «Уран — Северный узел» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:square:north_node', 'karmic', 'Связка «Уран — Северный узел» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:trine:north_node', 'karmic', 'Связка «Уран — Северный узел» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:opposition:north_node', 'karmic', 'Связка «Уран — Северный узел» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:conjunction:north_node', 'karmic', 'Связка «Нептун — Северный узел» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:sextile:north_node', 'karmic', 'Связка «Нептун — Северный узел» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:square:north_node', 'karmic', 'Связка «Нептун — Северный узел» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:trine:north_node', 'karmic', 'Связка «Нептун — Северный узел» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:opposition:north_node', 'karmic', 'Связка «Нептун — Северный узел» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:conjunction:north_node', 'karmic', 'Связка «Плутон — Северный узел» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:sextile:north_node', 'karmic', 'Связка «Плутон — Северный узел» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:square:north_node', 'karmic', 'Связка «Плутон — Северный узел» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:trine:north_node', 'karmic', 'Связка «Плутон — Северный узел» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:opposition:north_node', 'karmic', 'Связка «Плутон — Северный узел» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:conjunction:lilith', 'karmic', 'Связка «Солнце — Лилит» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:sextile:lilith', 'karmic', 'Связка «Солнце — Лилит» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:square:lilith', 'karmic', 'Связка «Солнце — Лилит» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:trine:lilith', 'karmic', 'Связка «Солнце — Лилит» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:opposition:lilith', 'karmic', 'Связка «Солнце — Лилит» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:conjunction:lilith', 'karmic', 'Связка «Луна — Лилит» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:sextile:lilith', 'karmic', 'Связка «Луна — Лилит» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:square:lilith', 'karmic', 'Связка «Луна — Лилит» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:trine:lilith', 'karmic', 'Связка «Луна — Лилит» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:opposition:lilith', 'karmic', 'Связка «Луна — Лилит» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:conjunction:lilith', 'karmic', 'Связка «Меркурий — Лилит» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:sextile:lilith', 'karmic', 'Связка «Меркурий — Лилит» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:square:lilith', 'karmic', 'Связка «Меркурий — Лилит» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:trine:lilith', 'karmic', 'Связка «Меркурий — Лилит» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:opposition:lilith', 'karmic', 'Связка «Меркурий — Лилит» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:conjunction:lilith', 'karmic', 'Связка «Венера — Лилит» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:sextile:lilith', 'karmic', 'Связка «Венера — Лилит» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:square:lilith', 'karmic', 'Связка «Венера — Лилит» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:trine:lilith', 'karmic', 'Связка «Венера — Лилит» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:opposition:lilith', 'karmic', 'Связка «Венера — Лилит» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:conjunction:lilith', 'karmic', 'Связка «Марс — Лилит» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:sextile:lilith', 'karmic', 'Связка «Марс — Лилит» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:square:lilith', 'karmic', 'Связка «Марс — Лилит» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:trine:lilith', 'karmic', 'Связка «Марс — Лилит» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:opposition:lilith', 'karmic', 'Связка «Марс — Лилит» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:conjunction:lilith', 'karmic', 'Связка «Юпитер — Лилит» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:sextile:lilith', 'karmic', 'Связка «Юпитер — Лилит» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:square:lilith', 'karmic', 'Связка «Юпитер — Лилит» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:trine:lilith', 'karmic', 'Связка «Юпитер — Лилит» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:opposition:lilith', 'karmic', 'Связка «Юпитер — Лилит» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:conjunction:lilith', 'karmic', 'Связка «Сатурн — Лилит» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:sextile:lilith', 'karmic', 'Связка «Сатурн — Лилит» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:square:lilith', 'karmic', 'Связка «Сатурн — Лилит» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:trine:lilith', 'karmic', 'Связка «Сатурн — Лилит» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:opposition:lilith', 'karmic', 'Связка «Сатурн — Лилит» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:conjunction:lilith', 'karmic', 'Связка «Уран — Лилит» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:sextile:lilith', 'karmic', 'Связка «Уран — Лилит» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:square:lilith', 'karmic', 'Связка «Уран — Лилит» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:trine:lilith', 'karmic', 'Связка «Уран — Лилит» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:opposition:lilith', 'karmic', 'Связка «Уран — Лилит» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:conjunction:lilith', 'karmic', 'Связка «Нептун — Лилит» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:sextile:lilith', 'karmic', 'Связка «Нептун — Лилит» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:square:lilith', 'karmic', 'Связка «Нептун — Лилит» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:trine:lilith', 'karmic', 'Связка «Нептун — Лилит» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:opposition:lilith', 'karmic', 'Связка «Нептун — Лилит» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:conjunction:lilith', 'karmic', 'Связка «Плутон — Лилит» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:sextile:lilith', 'karmic', 'Связка «Плутон — Лилит» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:square:lilith', 'karmic', 'Связка «Плутон — Лилит» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:trine:lilith', 'karmic', 'Связка «Плутон — Лилит» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:opposition:lilith', 'karmic', 'Связка «Плутон — Лилит» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:conjunction:selena', 'karmic', 'Связка «Солнце — Селена» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:sextile:selena', 'karmic', 'Связка «Солнце — Селена» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:square:selena', 'karmic', 'Связка «Солнце — Селена» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:trine:selena', 'karmic', 'Связка «Солнце — Селена» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:opposition:selena', 'karmic', 'Связка «Солнце — Селена» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:conjunction:selena', 'karmic', 'Связка «Луна — Селена» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:sextile:selena', 'karmic', 'Связка «Луна — Селена» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:square:selena', 'karmic', 'Связка «Луна — Селена» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:trine:selena', 'karmic', 'Связка «Луна — Селена» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:opposition:selena', 'karmic', 'Связка «Луна — Селена» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:conjunction:selena', 'karmic', 'Связка «Меркурий — Селена» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:sextile:selena', 'karmic', 'Связка «Меркурий — Селена» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:square:selena', 'karmic', 'Связка «Меркурий — Селена» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:trine:selena', 'karmic', 'Связка «Меркурий — Селена» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:opposition:selena', 'karmic', 'Связка «Меркурий — Селена» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:conjunction:selena', 'karmic', 'Связка «Венера — Селена» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:sextile:selena', 'karmic', 'Связка «Венера — Селена» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:square:selena', 'karmic', 'Связка «Венера — Селена» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:trine:selena', 'karmic', 'Связка «Венера — Селена» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:opposition:selena', 'karmic', 'Связка «Венера — Селена» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:conjunction:selena', 'karmic', 'Связка «Марс — Селена» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:sextile:selena', 'karmic', 'Связка «Марс — Селена» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:square:selena', 'karmic', 'Связка «Марс — Селена» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:trine:selena', 'karmic', 'Связка «Марс — Селена» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:opposition:selena', 'karmic', 'Связка «Марс — Селена» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:conjunction:selena', 'karmic', 'Связка «Юпитер — Селена» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:sextile:selena', 'karmic', 'Связка «Юпитер — Селена» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:square:selena', 'karmic', 'Связка «Юпитер — Селена» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:trine:selena', 'karmic', 'Связка «Юпитер — Селена» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:opposition:selena', 'karmic', 'Связка «Юпитер — Селена» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:conjunction:selena', 'karmic', 'Связка «Сатурн — Селена» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:sextile:selena', 'karmic', 'Связка «Сатурн — Селена» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:square:selena', 'karmic', 'Связка «Сатурн — Селена» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:trine:selena', 'karmic', 'Связка «Сатурн — Селена» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:opposition:selena', 'karmic', 'Связка «Сатурн — Селена» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:conjunction:selena', 'karmic', 'Связка «Уран — Селена» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:sextile:selena', 'karmic', 'Связка «Уран — Селена» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:square:selena', 'karmic', 'Связка «Уран — Селена» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:trine:selena', 'karmic', 'Связка «Уран — Селена» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:opposition:selena', 'karmic', 'Связка «Уран — Селена» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:conjunction:selena', 'karmic', 'Связка «Нептун — Селена» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:sextile:selena', 'karmic', 'Связка «Нептун — Селена» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:square:selena', 'karmic', 'Связка «Нептун — Селена» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:trine:selena', 'karmic', 'Связка «Нептун — Селена» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:opposition:selena', 'karmic', 'Связка «Нептун — Селена» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:conjunction:selena', 'karmic', 'Связка «Плутон — Селена» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:sextile:selena', 'karmic', 'Связка «Плутон — Селена» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:square:selena', 'karmic', 'Связка «Плутон — Селена» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:trine:selena', 'karmic', 'Связка «Плутон — Селена» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:pluto:opposition:selena', 'karmic', 'Связка «Плутон — Селена» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:conjunction:moon', 'western', 'Связка «Солнце — Луна» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:sextile:moon', 'western', 'Связка «Солнце — Луна» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:square:moon', 'western', 'Связка «Солнце — Луна» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:trine:moon', 'western', 'Связка «Солнце — Луна» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:opposition:moon', 'western', 'Связка «Солнце — Луна» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:conjunction:mercury', 'western', 'Связка «Солнце — Меркурий» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:sextile:mercury', 'western', 'Связка «Солнце — Меркурий» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:square:mercury', 'western', 'Связка «Солнце — Меркурий» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:trine:mercury', 'western', 'Связка «Солнце — Меркурий» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:opposition:mercury', 'western', 'Связка «Солнце — Меркурий» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:conjunction:venus', 'western', 'Связка «Солнце — Венера» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:sextile:venus', 'western', 'Связка «Солнце — Венера» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:square:venus', 'western', 'Связка «Солнце — Венера» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:trine:venus', 'western', 'Связка «Солнце — Венера» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:opposition:venus', 'western', 'Связка «Солнце — Венера» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:conjunction:mars', 'western', 'Связка «Солнце — Марс» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:sextile:mars', 'western', 'Связка «Солнце — Марс» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:square:mars', 'western', 'Связка «Солнце — Марс» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:trine:mars', 'western', 'Связка «Солнце — Марс» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:opposition:mars', 'western', 'Связка «Солнце — Марс» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:conjunction:jupiter', 'western', 'Связка «Солнце — Юпитер» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:sextile:jupiter', 'western', 'Связка «Солнце — Юпитер» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:square:jupiter', 'western', 'Связка «Солнце — Юпитер» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:trine:jupiter', 'western', 'Связка «Солнце — Юпитер» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:opposition:jupiter', 'western', 'Связка «Солнце — Юпитер» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:conjunction:saturn', 'western', 'Связка «Солнце — Сатурн» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:sextile:saturn', 'western', 'Связка «Солнце — Сатурн» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:square:saturn', 'western', 'Связка «Солнце — Сатурн» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:trine:saturn', 'western', 'Связка «Солнце — Сатурн» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:opposition:saturn', 'western', 'Связка «Солнце — Сатурн» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:conjunction:uranus', 'western', 'Связка «Солнце — Уран» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:sextile:uranus', 'western', 'Связка «Солнце — Уран» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:square:uranus', 'western', 'Связка «Солнце — Уран» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:trine:uranus', 'western', 'Связка «Солнце — Уран» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:opposition:uranus', 'western', 'Связка «Солнце — Уран» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:conjunction:neptune', 'western', 'Связка «Солнце — Нептун» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:sextile:neptune', 'western', 'Связка «Солнце — Нептун» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:square:neptune', 'western', 'Связка «Солнце — Нептун» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:trine:neptune', 'western', 'Связка «Солнце — Нептун» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:opposition:neptune', 'western', 'Связка «Солнце — Нептун» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:conjunction:pluto', 'western', 'Связка «Солнце — Плутон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:sextile:pluto', 'western', 'Связка «Солнце — Плутон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:square:pluto', 'western', 'Связка «Солнце — Плутон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:trine:pluto', 'western', 'Связка «Солнце — Плутон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:sun:opposition:pluto', 'western', 'Связка «Солнце — Плутон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:conjunction:mercury', 'western', 'Связка «Луна — Меркурий» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:sextile:mercury', 'western', 'Связка «Луна — Меркурий» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:square:mercury', 'western', 'Связка «Луна — Меркурий» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:trine:mercury', 'western', 'Связка «Луна — Меркурий» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:opposition:mercury', 'western', 'Связка «Луна — Меркурий» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:conjunction:venus', 'western', 'Связка «Луна — Венера» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:sextile:venus', 'western', 'Связка «Луна — Венера» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:square:venus', 'western', 'Связка «Луна — Венера» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:trine:venus', 'western', 'Связка «Луна — Венера» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:opposition:venus', 'western', 'Связка «Луна — Венера» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:conjunction:mars', 'western', 'Связка «Луна — Марс» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:sextile:mars', 'western', 'Связка «Луна — Марс» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:square:mars', 'western', 'Связка «Луна — Марс» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:trine:mars', 'western', 'Связка «Луна — Марс» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:opposition:mars', 'western', 'Связка «Луна — Марс» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:conjunction:jupiter', 'western', 'Связка «Луна — Юпитер» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:sextile:jupiter', 'western', 'Связка «Луна — Юпитер» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:square:jupiter', 'western', 'Связка «Луна — Юпитер» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:trine:jupiter', 'western', 'Связка «Луна — Юпитер» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:opposition:jupiter', 'western', 'Связка «Луна — Юпитер» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:conjunction:saturn', 'western', 'Связка «Луна — Сатурн» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:sextile:saturn', 'western', 'Связка «Луна — Сатурн» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:square:saturn', 'western', 'Связка «Луна — Сатурн» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:trine:saturn', 'western', 'Связка «Луна — Сатурн» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:opposition:saturn', 'western', 'Связка «Луна — Сатурн» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:conjunction:uranus', 'western', 'Связка «Луна — Уран» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:sextile:uranus', 'western', 'Связка «Луна — Уран» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:square:uranus', 'western', 'Связка «Луна — Уран» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:trine:uranus', 'western', 'Связка «Луна — Уран» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:opposition:uranus', 'western', 'Связка «Луна — Уран» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:conjunction:neptune', 'western', 'Связка «Луна — Нептун» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:sextile:neptune', 'western', 'Связка «Луна — Нептун» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:square:neptune', 'western', 'Связка «Луна — Нептун» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:trine:neptune', 'western', 'Связка «Луна — Нептун» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:opposition:neptune', 'western', 'Связка «Луна — Нептун» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:conjunction:pluto', 'western', 'Связка «Луна — Плутон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:sextile:pluto', 'western', 'Связка «Луна — Плутон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:square:pluto', 'western', 'Связка «Луна — Плутон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:trine:pluto', 'western', 'Связка «Луна — Плутон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:moon:opposition:pluto', 'western', 'Связка «Луна — Плутон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:conjunction:venus', 'western', 'Связка «Меркурий — Венера» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:sextile:venus', 'western', 'Связка «Меркурий — Венера» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:square:venus', 'western', 'Связка «Меркурий — Венера» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:trine:venus', 'western', 'Связка «Меркурий — Венера» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:opposition:venus', 'western', 'Связка «Меркурий — Венера» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:conjunction:mars', 'western', 'Связка «Меркурий — Марс» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:sextile:mars', 'western', 'Связка «Меркурий — Марс» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:square:mars', 'western', 'Связка «Меркурий — Марс» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:trine:mars', 'western', 'Связка «Меркурий — Марс» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:opposition:mars', 'western', 'Связка «Меркурий — Марс» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:conjunction:jupiter', 'western', 'Связка «Меркурий — Юпитер» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:sextile:jupiter', 'western', 'Связка «Меркурий — Юпитер» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:square:jupiter', 'western', 'Связка «Меркурий — Юпитер» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:trine:jupiter', 'western', 'Связка «Меркурий — Юпитер» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:opposition:jupiter', 'western', 'Связка «Меркурий — Юпитер» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:conjunction:saturn', 'western', 'Связка «Меркурий — Сатурн» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:sextile:saturn', 'western', 'Связка «Меркурий — Сатурн» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:square:saturn', 'western', 'Связка «Меркурий — Сатурн» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:trine:saturn', 'western', 'Связка «Меркурий — Сатурн» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:opposition:saturn', 'western', 'Связка «Меркурий — Сатурн» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:conjunction:uranus', 'western', 'Связка «Меркурий — Уран» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:sextile:uranus', 'western', 'Связка «Меркурий — Уран» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:square:uranus', 'western', 'Связка «Меркурий — Уран» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:trine:uranus', 'western', 'Связка «Меркурий — Уран» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:opposition:uranus', 'western', 'Связка «Меркурий — Уран» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:conjunction:neptune', 'western', 'Связка «Меркурий — Нептун» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:sextile:neptune', 'western', 'Связка «Меркурий — Нептун» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:square:neptune', 'western', 'Связка «Меркурий — Нептун» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:trine:neptune', 'western', 'Связка «Меркурий — Нептун» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:opposition:neptune', 'western', 'Связка «Меркурий — Нептун» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:conjunction:pluto', 'western', 'Связка «Меркурий — Плутон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:sextile:pluto', 'western', 'Связка «Меркурий — Плутон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:square:pluto', 'western', 'Связка «Меркурий — Плутон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:trine:pluto', 'western', 'Связка «Меркурий — Плутон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mercury:opposition:pluto', 'western', 'Связка «Меркурий — Плутон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:conjunction:mars', 'western', 'Связка «Венера — Марс» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:sextile:mars', 'western', 'Связка «Венера — Марс» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:square:mars', 'western', 'Связка «Венера — Марс» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:trine:mars', 'western', 'Связка «Венера — Марс» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:opposition:mars', 'western', 'Связка «Венера — Марс» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:conjunction:jupiter', 'western', 'Связка «Венера — Юпитер» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:sextile:jupiter', 'western', 'Связка «Венера — Юпитер» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:square:jupiter', 'western', 'Связка «Венера — Юпитер» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:trine:jupiter', 'western', 'Связка «Венера — Юпитер» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:opposition:jupiter', 'western', 'Связка «Венера — Юпитер» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:conjunction:saturn', 'western', 'Связка «Венера — Сатурн» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:sextile:saturn', 'western', 'Связка «Венера — Сатурн» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:square:saturn', 'western', 'Связка «Венера — Сатурн» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:trine:saturn', 'western', 'Связка «Венера — Сатурн» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:opposition:saturn', 'western', 'Связка «Венера — Сатурн» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:conjunction:uranus', 'western', 'Связка «Венера — Уран» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:sextile:uranus', 'western', 'Связка «Венера — Уран» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:square:uranus', 'western', 'Связка «Венера — Уран» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:trine:uranus', 'western', 'Связка «Венера — Уран» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:opposition:uranus', 'western', 'Связка «Венера — Уран» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:conjunction:neptune', 'western', 'Связка «Венера — Нептун» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:sextile:neptune', 'western', 'Связка «Венера — Нептун» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:square:neptune', 'western', 'Связка «Венера — Нептун» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:trine:neptune', 'western', 'Связка «Венера — Нептун» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:opposition:neptune', 'western', 'Связка «Венера — Нептун» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:conjunction:pluto', 'western', 'Связка «Венера — Плутон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:sextile:pluto', 'western', 'Связка «Венера — Плутон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:square:pluto', 'western', 'Связка «Венера — Плутон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:trine:pluto', 'western', 'Связка «Венера — Плутон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:venus:opposition:pluto', 'western', 'Связка «Венера — Плутон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:conjunction:jupiter', 'western', 'Связка «Марс — Юпитер» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:sextile:jupiter', 'western', 'Связка «Марс — Юпитер» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:square:jupiter', 'western', 'Связка «Марс — Юпитер» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:trine:jupiter', 'western', 'Связка «Марс — Юпитер» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:opposition:jupiter', 'western', 'Связка «Марс — Юпитер» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:conjunction:saturn', 'western', 'Связка «Марс — Сатурн» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:sextile:saturn', 'western', 'Связка «Марс — Сатурн» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:square:saturn', 'western', 'Связка «Марс — Сатурн» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:trine:saturn', 'western', 'Связка «Марс — Сатурн» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:opposition:saturn', 'western', 'Связка «Марс — Сатурн» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:conjunction:uranus', 'western', 'Связка «Марс — Уран» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:sextile:uranus', 'western', 'Связка «Марс — Уран» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:square:uranus', 'western', 'Связка «Марс — Уран» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:trine:uranus', 'western', 'Связка «Марс — Уран» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:opposition:uranus', 'western', 'Связка «Марс — Уран» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:conjunction:neptune', 'western', 'Связка «Марс — Нептун» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:sextile:neptune', 'western', 'Связка «Марс — Нептун» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:square:neptune', 'western', 'Связка «Марс — Нептун» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:trine:neptune', 'western', 'Связка «Марс — Нептун» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:opposition:neptune', 'western', 'Связка «Марс — Нептун» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:conjunction:pluto', 'western', 'Связка «Марс — Плутон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:sextile:pluto', 'western', 'Связка «Марс — Плутон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:square:pluto', 'western', 'Связка «Марс — Плутон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:trine:pluto', 'western', 'Связка «Марс — Плутон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:mars:opposition:pluto', 'western', 'Связка «Марс — Плутон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:conjunction:saturn', 'western', 'Связка «Юпитер — Сатурн» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:sextile:saturn', 'western', 'Связка «Юпитер — Сатурн» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:square:saturn', 'western', 'Связка «Юпитер — Сатурн» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:trine:saturn', 'western', 'Связка «Юпитер — Сатурн» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:opposition:saturn', 'western', 'Связка «Юпитер — Сатурн» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:conjunction:uranus', 'western', 'Связка «Юпитер — Уран» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:sextile:uranus', 'western', 'Связка «Юпитер — Уран» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:square:uranus', 'western', 'Связка «Юпитер — Уран» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:trine:uranus', 'western', 'Связка «Юпитер — Уран» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:opposition:uranus', 'western', 'Связка «Юпитер — Уран» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:conjunction:neptune', 'western', 'Связка «Юпитер — Нептун» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:sextile:neptune', 'western', 'Связка «Юпитер — Нептун» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:square:neptune', 'western', 'Связка «Юпитер — Нептун» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:trine:neptune', 'western', 'Связка «Юпитер — Нептун» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:opposition:neptune', 'western', 'Связка «Юпитер — Нептун» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:conjunction:pluto', 'western', 'Связка «Юпитер — Плутон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:sextile:pluto', 'western', 'Связка «Юпитер — Плутон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:square:pluto', 'western', 'Связка «Юпитер — Плутон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:trine:pluto', 'western', 'Связка «Юпитер — Плутон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:jupiter:opposition:pluto', 'western', 'Связка «Юпитер — Плутон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:conjunction:uranus', 'western', 'Связка «Сатурн — Уран» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:sextile:uranus', 'western', 'Связка «Сатурн — Уран» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:square:uranus', 'western', 'Связка «Сатурн — Уран» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:trine:uranus', 'western', 'Связка «Сатурн — Уран» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:opposition:uranus', 'western', 'Связка «Сатурн — Уран» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:conjunction:neptune', 'western', 'Связка «Сатурн — Нептун» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:sextile:neptune', 'western', 'Связка «Сатурн — Нептун» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:square:neptune', 'western', 'Связка «Сатурн — Нептун» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:trine:neptune', 'western', 'Связка «Сатурн — Нептун» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:opposition:neptune', 'western', 'Связка «Сатурн — Нептун» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:conjunction:pluto', 'western', 'Связка «Сатурн — Плутон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:sextile:pluto', 'western', 'Связка «Сатурн — Плутон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:square:pluto', 'western', 'Связка «Сатурн — Плутон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:trine:pluto', 'western', 'Связка «Сатурн — Плутон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:saturn:opposition:pluto', 'western', 'Связка «Сатурн — Плутон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:conjunction:neptune', 'western', 'Связка «Уран — Нептун» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:sextile:neptune', 'western', 'Связка «Уран — Нептун» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:square:neptune', 'western', 'Связка «Уран — Нептун» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:trine:neptune', 'western', 'Связка «Уран — Нептун» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:opposition:neptune', 'western', 'Связка «Уран — Нептун» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:conjunction:pluto', 'western', 'Связка «Уран — Плутон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:sextile:pluto', 'western', 'Связка «Уран — Плутон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:square:pluto', 'western', 'Связка «Уран — Плутон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:trine:pluto', 'western', 'Связка «Уран — Плутон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:uranus:opposition:pluto', 'western', 'Связка «Уран — Плутон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:conjunction:pluto', 'western', 'Связка «Нептун — Плутон» образует аспект «соединение»: слияние энергий двух начал — они действуют как единое целое, усиливая друг друга. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:sextile:pluto', 'western', 'Связка «Нептун — Плутон» образует аспект «секстиль»: возможность, которая раскрывается, если ею сознательно воспользоваться. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:square:pluto', 'western', 'Связка «Нептун — Плутон» образует аспект «квадрат»: внутреннее напряжение, которое становится точкой роста при осознанной работе с ним. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:trine:pluto', 'western', 'Связка «Нептун — Плутон» образует аспект «трин»: лёгкий, почти врождённый поток — способность, которая проявляется без особых усилий. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('aspect:neptune:opposition:pluto', 'western', 'Связка «Нептун — Плутон» образует аспект «оппозиция»: полярность, которая ищет осознанного баланса, а не победы одной стороны над другой. Это создаёт устойчивый узор взаимодействия между темами обеих планет в характере.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:point_day', 'numerology', 'Аркан 1 («Маг») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:point_month', 'numerology', 'Аркан 1 («Маг») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:point_year', 'numerology', 'Аркан 1 («Маг») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:point_tasks', 'numerology', 'Аркан 1 («Маг») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:point_center', 'numerology', 'Аркан 1 («Маг») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:point_f1', 'numerology', 'Аркан 1 («Маг») в позиции «квадрант Ф1 октаграммы» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:point_f2', 'numerology', 'Аркан 1 («Маг») в позиции «квадрант Ф2 октаграммы» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:point_f3', 'numerology', 'Аркан 1 («Маг») в позиции «квадрант Ф3 октаграммы» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:point_f4', 'numerology', 'Аркан 1 («Маг») в позиции «квадрант Ф4 октаграммы» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:health_root', 'numerology', 'Аркан 1 («Маг») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:health_sacral', 'numerology', 'Аркан 1 («Маг») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:health_solar_plexus', 'numerology', 'Аркан 1 («Маг») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:health_heart', 'numerology', 'Аркан 1 («Маг») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:health_throat', 'numerology', 'Аркан 1 («Маг») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:health_third_eye', 'numerology', 'Аркан 1 («Маг») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:health_crown', 'numerology', 'Аркан 1 («Маг») в позиции «коронная чакра — духовность и смысл» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:purpose_personal', 'numerology', 'Аркан 1 («Маг») в позиции «личное предназначение» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:purpose_ancestral', 'numerology', 'Аркан 1 («Маг») в позиции «родовое предназначение» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:purpose_spiritual', 'numerology', 'Аркан 1 («Маг») в позиции «духовное предназначение» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:purpose_social', 'numerology', 'Аркан 1 («Маг») в позиции «социальное предназначение» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:relationship_line', 'numerology', 'Аркан 1 («Маг») в позиции «линия отношений» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:money_line', 'numerology', 'Аркан 1 («Маг») в позиции «денежная линия» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:age_period_1', 'numerology', 'Аркан 1 («Маг») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:age_period_2', 'numerology', 'Аркан 1 («Маг») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:age_period_3', 'numerology', 'Аркан 1 («Маг») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:age_period_4', 'numerology', 'Аркан 1 («Маг») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:age_period_5', 'numerology', 'Аркан 1 («Маг») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:age_period_6', 'numerology', 'Аркан 1 («Маг») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:age_period_7', 'numerology', 'Аркан 1 («Маг») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:1:age_period_8', 'numerology', 'Аркан 1 («Маг») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: инициатива, воля и умение использовать имеющиеся ресурсы. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:point_day', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:point_month', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:point_year', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:point_tasks', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:point_center', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:point_f1', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «квадрант Ф1 октаграммы» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:point_f2', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «квадрант Ф2 октаграммы» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:point_f3', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «квадрант Ф3 октаграммы» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:point_f4', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «квадрант Ф4 октаграммы» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:health_root', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:health_sacral', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:health_solar_plexus', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:health_heart', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:health_throat', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:health_third_eye', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:health_crown', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «коронная чакра — духовность и смысл» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:purpose_personal', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «личное предназначение» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:purpose_ancestral', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «родовое предназначение» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:purpose_spiritual', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «духовное предназначение» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:purpose_social', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «социальное предназначение» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:relationship_line', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «линия отношений» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:money_line', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «денежная линия» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:age_period_1', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:age_period_2', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:age_period_3', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:age_period_4', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:age_period_5', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:age_period_6', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:age_period_7', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:2:age_period_8', 'numerology', 'Аркан 2 («Верховная Жрица») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: интуиция, внутреннее знание и умение слушать тишину. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:point_day', 'numerology', 'Аркан 3 («Императрица») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:point_month', 'numerology', 'Аркан 3 («Императрица») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:point_year', 'numerology', 'Аркан 3 («Императрица») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:point_tasks', 'numerology', 'Аркан 3 («Императрица») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:point_center', 'numerology', 'Аркан 3 («Императрица») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:point_f1', 'numerology', 'Аркан 3 («Императрица») в позиции «квадрант Ф1 октаграммы» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:point_f2', 'numerology', 'Аркан 3 («Императрица») в позиции «квадрант Ф2 октаграммы» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:point_f3', 'numerology', 'Аркан 3 («Императрица») в позиции «квадрант Ф3 октаграммы» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:point_f4', 'numerology', 'Аркан 3 («Императрица») в позиции «квадрант Ф4 октаграммы» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:health_root', 'numerology', 'Аркан 3 («Императрица») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:health_sacral', 'numerology', 'Аркан 3 («Императрица») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:health_solar_plexus', 'numerology', 'Аркан 3 («Императрица») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:health_heart', 'numerology', 'Аркан 3 («Императрица») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:health_throat', 'numerology', 'Аркан 3 («Императрица») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:health_third_eye', 'numerology', 'Аркан 3 («Императрица») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:health_crown', 'numerology', 'Аркан 3 («Императрица») в позиции «коронная чакра — духовность и смысл» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:purpose_personal', 'numerology', 'Аркан 3 («Императрица») в позиции «личное предназначение» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:purpose_ancestral', 'numerology', 'Аркан 3 («Императрица») в позиции «родовое предназначение» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:purpose_spiritual', 'numerology', 'Аркан 3 («Императрица») в позиции «духовное предназначение» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:purpose_social', 'numerology', 'Аркан 3 («Императрица») в позиции «социальное предназначение» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:relationship_line', 'numerology', 'Аркан 3 («Императрица») в позиции «линия отношений» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:money_line', 'numerology', 'Аркан 3 («Императрица») в позиции «денежная линия» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:age_period_1', 'numerology', 'Аркан 3 («Императрица») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:age_period_2', 'numerology', 'Аркан 3 («Императрица») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:age_period_3', 'numerology', 'Аркан 3 («Императрица») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:age_period_4', 'numerology', 'Аркан 3 («Императрица») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:age_period_5', 'numerology', 'Аркан 3 («Императрица») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:age_period_6', 'numerology', 'Аркан 3 («Императрица») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:age_period_7', 'numerology', 'Аркан 3 («Императрица») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:3:age_period_8', 'numerology', 'Аркан 3 («Императрица») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: изобилие, забота и творческое созидание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:point_day', 'numerology', 'Аркан 4 («Император») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:point_month', 'numerology', 'Аркан 4 («Император») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:point_year', 'numerology', 'Аркан 4 («Император») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:point_tasks', 'numerology', 'Аркан 4 («Император») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:point_center', 'numerology', 'Аркан 4 («Император») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:point_f1', 'numerology', 'Аркан 4 («Император») в позиции «квадрант Ф1 октаграммы» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:point_f2', 'numerology', 'Аркан 4 («Император») в позиции «квадрант Ф2 октаграммы» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:point_f3', 'numerology', 'Аркан 4 («Император») в позиции «квадрант Ф3 октаграммы» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:point_f4', 'numerology', 'Аркан 4 («Император») в позиции «квадрант Ф4 октаграммы» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:health_root', 'numerology', 'Аркан 4 («Император») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:health_sacral', 'numerology', 'Аркан 4 («Император») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:health_solar_plexus', 'numerology', 'Аркан 4 («Император») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:health_heart', 'numerology', 'Аркан 4 («Император») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:health_throat', 'numerology', 'Аркан 4 («Император») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:health_third_eye', 'numerology', 'Аркан 4 («Император») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:health_crown', 'numerology', 'Аркан 4 («Император») в позиции «коронная чакра — духовность и смысл» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:purpose_personal', 'numerology', 'Аркан 4 («Император») в позиции «личное предназначение» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:purpose_ancestral', 'numerology', 'Аркан 4 («Император») в позиции «родовое предназначение» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:purpose_spiritual', 'numerology', 'Аркан 4 («Император») в позиции «духовное предназначение» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:purpose_social', 'numerology', 'Аркан 4 («Император») в позиции «социальное предназначение» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:relationship_line', 'numerology', 'Аркан 4 («Император») в позиции «линия отношений» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:money_line', 'numerology', 'Аркан 4 («Император») в позиции «денежная линия» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:age_period_1', 'numerology', 'Аркан 4 («Император») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:age_period_2', 'numerology', 'Аркан 4 («Император») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:age_period_3', 'numerology', 'Аркан 4 («Император») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:age_period_4', 'numerology', 'Аркан 4 («Император») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:age_period_5', 'numerology', 'Аркан 4 («Император») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:age_period_6', 'numerology', 'Аркан 4 («Император») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:age_period_7', 'numerology', 'Аркан 4 («Император») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:4:age_period_8', 'numerology', 'Аркан 4 («Император») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: структура, порядок и осознанная ответственность. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:point_day', 'numerology', 'Аркан 5 («Иерофант») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:point_month', 'numerology', 'Аркан 5 («Иерофант») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:point_year', 'numerology', 'Аркан 5 («Иерофант») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:point_tasks', 'numerology', 'Аркан 5 («Иерофант») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:point_center', 'numerology', 'Аркан 5 («Иерофант») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:point_f1', 'numerology', 'Аркан 5 («Иерофант») в позиции «квадрант Ф1 октаграммы» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:point_f2', 'numerology', 'Аркан 5 («Иерофант») в позиции «квадрант Ф2 октаграммы» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:point_f3', 'numerology', 'Аркан 5 («Иерофант») в позиции «квадрант Ф3 октаграммы» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:point_f4', 'numerology', 'Аркан 5 («Иерофант») в позиции «квадрант Ф4 октаграммы» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:health_root', 'numerology', 'Аркан 5 («Иерофант») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:health_sacral', 'numerology', 'Аркан 5 («Иерофант») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:health_solar_plexus', 'numerology', 'Аркан 5 («Иерофант») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:health_heart', 'numerology', 'Аркан 5 («Иерофант») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:health_throat', 'numerology', 'Аркан 5 («Иерофант») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:health_third_eye', 'numerology', 'Аркан 5 («Иерофант») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:health_crown', 'numerology', 'Аркан 5 («Иерофант») в позиции «коронная чакра — духовность и смысл» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:purpose_personal', 'numerology', 'Аркан 5 («Иерофант») в позиции «личное предназначение» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:purpose_ancestral', 'numerology', 'Аркан 5 («Иерофант») в позиции «родовое предназначение» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:purpose_spiritual', 'numerology', 'Аркан 5 («Иерофант») в позиции «духовное предназначение» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:purpose_social', 'numerology', 'Аркан 5 («Иерофант») в позиции «социальное предназначение» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:relationship_line', 'numerology', 'Аркан 5 («Иерофант») в позиции «линия отношений» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:money_line', 'numerology', 'Аркан 5 («Иерофант») в позиции «денежная линия» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:age_period_1', 'numerology', 'Аркан 5 («Иерофант») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:age_period_2', 'numerology', 'Аркан 5 («Иерофант») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:age_period_3', 'numerology', 'Аркан 5 («Иерофант») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:age_period_4', 'numerology', 'Аркан 5 («Иерофант») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:age_period_5', 'numerology', 'Аркан 5 («Иерофант») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:age_period_6', 'numerology', 'Аркан 5 («Иерофант») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:age_period_7', 'numerology', 'Аркан 5 («Иерофант») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:5:age_period_8', 'numerology', 'Аркан 5 («Иерофант») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: традиция, наставничество и передача опыта. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:point_day', 'numerology', 'Аркан 6 («Влюблённые») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:point_month', 'numerology', 'Аркан 6 («Влюблённые») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:point_year', 'numerology', 'Аркан 6 («Влюблённые») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:point_tasks', 'numerology', 'Аркан 6 («Влюблённые») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:point_center', 'numerology', 'Аркан 6 («Влюблённые») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:point_f1', 'numerology', 'Аркан 6 («Влюблённые») в позиции «квадрант Ф1 октаграммы» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:point_f2', 'numerology', 'Аркан 6 («Влюблённые») в позиции «квадрант Ф2 октаграммы» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:point_f3', 'numerology', 'Аркан 6 («Влюблённые») в позиции «квадрант Ф3 октаграммы» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:point_f4', 'numerology', 'Аркан 6 («Влюблённые») в позиции «квадрант Ф4 октаграммы» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:health_root', 'numerology', 'Аркан 6 («Влюблённые») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:health_sacral', 'numerology', 'Аркан 6 («Влюблённые») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:health_solar_plexus', 'numerology', 'Аркан 6 («Влюблённые») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:health_heart', 'numerology', 'Аркан 6 («Влюблённые») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:health_throat', 'numerology', 'Аркан 6 («Влюблённые») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:health_third_eye', 'numerology', 'Аркан 6 («Влюблённые») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:health_crown', 'numerology', 'Аркан 6 («Влюблённые») в позиции «коронная чакра — духовность и смысл» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:purpose_personal', 'numerology', 'Аркан 6 («Влюблённые») в позиции «личное предназначение» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:purpose_ancestral', 'numerology', 'Аркан 6 («Влюблённые») в позиции «родовое предназначение» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:purpose_spiritual', 'numerology', 'Аркан 6 («Влюблённые») в позиции «духовное предназначение» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:purpose_social', 'numerology', 'Аркан 6 («Влюблённые») в позиции «социальное предназначение» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:relationship_line', 'numerology', 'Аркан 6 («Влюблённые») в позиции «линия отношений» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:money_line', 'numerology', 'Аркан 6 («Влюблённые») в позиции «денежная линия» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:age_period_1', 'numerology', 'Аркан 6 («Влюблённые») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:age_period_2', 'numerology', 'Аркан 6 («Влюблённые») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:age_period_3', 'numerology', 'Аркан 6 («Влюблённые») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:age_period_4', 'numerology', 'Аркан 6 («Влюблённые») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:age_period_5', 'numerology', 'Аркан 6 («Влюблённые») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:age_period_6', 'numerology', 'Аркан 6 («Влюблённые») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:age_period_7', 'numerology', 'Аркан 6 («Влюблённые») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:6:age_period_8', 'numerology', 'Аркан 6 («Влюблённые») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: выбор, близость и согласование ценностей. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:point_day', 'numerology', 'Аркан 7 («Колесница») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:point_month', 'numerology', 'Аркан 7 («Колесница») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:point_year', 'numerology', 'Аркан 7 («Колесница») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:point_tasks', 'numerology', 'Аркан 7 («Колесница») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:point_center', 'numerology', 'Аркан 7 («Колесница») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:point_f1', 'numerology', 'Аркан 7 («Колесница») в позиции «квадрант Ф1 октаграммы» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:point_f2', 'numerology', 'Аркан 7 («Колесница») в позиции «квадрант Ф2 октаграммы» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:point_f3', 'numerology', 'Аркан 7 («Колесница») в позиции «квадрант Ф3 октаграммы» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:point_f4', 'numerology', 'Аркан 7 («Колесница») в позиции «квадрант Ф4 октаграммы» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:health_root', 'numerology', 'Аркан 7 («Колесница») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:health_sacral', 'numerology', 'Аркан 7 («Колесница») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:health_solar_plexus', 'numerology', 'Аркан 7 («Колесница») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:health_heart', 'numerology', 'Аркан 7 («Колесница») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:health_throat', 'numerology', 'Аркан 7 («Колесница») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:health_third_eye', 'numerology', 'Аркан 7 («Колесница») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:health_crown', 'numerology', 'Аркан 7 («Колесница») в позиции «коронная чакра — духовность и смысл» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:purpose_personal', 'numerology', 'Аркан 7 («Колесница») в позиции «личное предназначение» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:purpose_ancestral', 'numerology', 'Аркан 7 («Колесница») в позиции «родовое предназначение» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:purpose_spiritual', 'numerology', 'Аркан 7 («Колесница») в позиции «духовное предназначение» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:purpose_social', 'numerology', 'Аркан 7 («Колесница») в позиции «социальное предназначение» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:relationship_line', 'numerology', 'Аркан 7 («Колесница») в позиции «линия отношений» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:money_line', 'numerology', 'Аркан 7 («Колесница») в позиции «денежная линия» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:age_period_1', 'numerology', 'Аркан 7 («Колесница») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:age_period_2', 'numerology', 'Аркан 7 («Колесница») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:age_period_3', 'numerology', 'Аркан 7 («Колесница») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:age_period_4', 'numerology', 'Аркан 7 («Колесница») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:age_period_5', 'numerology', 'Аркан 7 («Колесница») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:age_period_6', 'numerology', 'Аркан 7 («Колесница») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:age_period_7', 'numerology', 'Аркан 7 («Колесница») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:7:age_period_8', 'numerology', 'Аркан 7 («Колесница») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: воля, целеустремлённость и движение вперёд. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:point_day', 'numerology', 'Аркан 8 («Сила») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:point_month', 'numerology', 'Аркан 8 («Сила») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:point_year', 'numerology', 'Аркан 8 («Сила») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:point_tasks', 'numerology', 'Аркан 8 («Сила») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:point_center', 'numerology', 'Аркан 8 («Сила») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:point_f1', 'numerology', 'Аркан 8 («Сила») в позиции «квадрант Ф1 октаграммы» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:point_f2', 'numerology', 'Аркан 8 («Сила») в позиции «квадрант Ф2 октаграммы» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:point_f3', 'numerology', 'Аркан 8 («Сила») в позиции «квадрант Ф3 октаграммы» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:point_f4', 'numerology', 'Аркан 8 («Сила») в позиции «квадрант Ф4 октаграммы» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:health_root', 'numerology', 'Аркан 8 («Сила») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:health_sacral', 'numerology', 'Аркан 8 («Сила») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:health_solar_plexus', 'numerology', 'Аркан 8 («Сила») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:health_heart', 'numerology', 'Аркан 8 («Сила») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:health_throat', 'numerology', 'Аркан 8 («Сила») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:health_third_eye', 'numerology', 'Аркан 8 («Сила») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:health_crown', 'numerology', 'Аркан 8 («Сила») в позиции «коронная чакра — духовность и смысл» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:purpose_personal', 'numerology', 'Аркан 8 («Сила») в позиции «личное предназначение» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:purpose_ancestral', 'numerology', 'Аркан 8 («Сила») в позиции «родовое предназначение» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:purpose_spiritual', 'numerology', 'Аркан 8 («Сила») в позиции «духовное предназначение» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:purpose_social', 'numerology', 'Аркан 8 («Сила») в позиции «социальное предназначение» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:relationship_line', 'numerology', 'Аркан 8 («Сила») в позиции «линия отношений» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:money_line', 'numerology', 'Аркан 8 («Сила») в позиции «денежная линия» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:age_period_1', 'numerology', 'Аркан 8 («Сила») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:age_period_2', 'numerology', 'Аркан 8 («Сила») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:age_period_3', 'numerology', 'Аркан 8 («Сила») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:age_period_4', 'numerology', 'Аркан 8 («Сила») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:age_period_5', 'numerology', 'Аркан 8 («Сила») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:age_period_6', 'numerology', 'Аркан 8 («Сила») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:age_period_7', 'numerology', 'Аркан 8 («Сила») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:8:age_period_8', 'numerology', 'Аркан 8 («Сила») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: внутренняя сила, мягкая настойчивость и самообладание. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:point_day', 'numerology', 'Аркан 9 («Отшельник») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:point_month', 'numerology', 'Аркан 9 («Отшельник») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:point_year', 'numerology', 'Аркан 9 («Отшельник») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:point_tasks', 'numerology', 'Аркан 9 («Отшельник») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:point_center', 'numerology', 'Аркан 9 («Отшельник») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:point_f1', 'numerology', 'Аркан 9 («Отшельник») в позиции «квадрант Ф1 октаграммы» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:point_f2', 'numerology', 'Аркан 9 («Отшельник») в позиции «квадрант Ф2 октаграммы» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:point_f3', 'numerology', 'Аркан 9 («Отшельник») в позиции «квадрант Ф3 октаграммы» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:point_f4', 'numerology', 'Аркан 9 («Отшельник») в позиции «квадрант Ф4 октаграммы» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:health_root', 'numerology', 'Аркан 9 («Отшельник») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:health_sacral', 'numerology', 'Аркан 9 («Отшельник») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:health_solar_plexus', 'numerology', 'Аркан 9 («Отшельник») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:health_heart', 'numerology', 'Аркан 9 («Отшельник») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:health_throat', 'numerology', 'Аркан 9 («Отшельник») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:health_third_eye', 'numerology', 'Аркан 9 («Отшельник») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:health_crown', 'numerology', 'Аркан 9 («Отшельник») в позиции «коронная чакра — духовность и смысл» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:purpose_personal', 'numerology', 'Аркан 9 («Отшельник») в позиции «личное предназначение» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:purpose_ancestral', 'numerology', 'Аркан 9 («Отшельник») в позиции «родовое предназначение» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:purpose_spiritual', 'numerology', 'Аркан 9 («Отшельник») в позиции «духовное предназначение» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:purpose_social', 'numerology', 'Аркан 9 («Отшельник») в позиции «социальное предназначение» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:relationship_line', 'numerology', 'Аркан 9 («Отшельник») в позиции «линия отношений» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:money_line', 'numerology', 'Аркан 9 («Отшельник») в позиции «денежная линия» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:age_period_1', 'numerology', 'Аркан 9 («Отшельник») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:age_period_2', 'numerology', 'Аркан 9 («Отшельник») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:age_period_3', 'numerology', 'Аркан 9 («Отшельник») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:age_period_4', 'numerology', 'Аркан 9 («Отшельник») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:age_period_5', 'numerology', 'Аркан 9 («Отшельник») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:age_period_6', 'numerology', 'Аркан 9 («Отшельник») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:age_period_7', 'numerology', 'Аркан 9 («Отшельник») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:9:age_period_8', 'numerology', 'Аркан 9 («Отшельник») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: поиск смысла, уединение и внутренний свет. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:point_day', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:point_month', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:point_year', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:point_tasks', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:point_center', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:point_f1', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «квадрант Ф1 октаграммы» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:point_f2', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «квадрант Ф2 октаграммы» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:point_f3', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «квадрант Ф3 октаграммы» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:point_f4', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «квадрант Ф4 октаграммы» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:health_root', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:health_sacral', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:health_solar_plexus', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:health_heart', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:health_throat', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:health_third_eye', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:health_crown', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «коронная чакра — духовность и смысл» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:purpose_personal', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «личное предназначение» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:purpose_ancestral', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «родовое предназначение» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:purpose_spiritual', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «духовное предназначение» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:purpose_social', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «социальное предназначение» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:relationship_line', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «линия отношений» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:money_line', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «денежная линия» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:age_period_1', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:age_period_2', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:age_period_3', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:age_period_4', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:age_period_5', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:age_period_6', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:age_period_7', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:10:age_period_8', 'numerology', 'Аркан 10 («Колесо Фортуны») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: цикличность, перемены и умение принимать поворот событий. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:point_day', 'numerology', 'Аркан 11 («Справедливость») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:point_month', 'numerology', 'Аркан 11 («Справедливость») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:point_year', 'numerology', 'Аркан 11 («Справедливость») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:point_tasks', 'numerology', 'Аркан 11 («Справедливость») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:point_center', 'numerology', 'Аркан 11 («Справедливость») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:point_f1', 'numerology', 'Аркан 11 («Справедливость») в позиции «квадрант Ф1 октаграммы» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:point_f2', 'numerology', 'Аркан 11 («Справедливость») в позиции «квадрант Ф2 октаграммы» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:point_f3', 'numerology', 'Аркан 11 («Справедливость») в позиции «квадрант Ф3 октаграммы» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:point_f4', 'numerology', 'Аркан 11 («Справедливость») в позиции «квадрант Ф4 октаграммы» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:health_root', 'numerology', 'Аркан 11 («Справедливость») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:health_sacral', 'numerology', 'Аркан 11 («Справедливость») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:health_solar_plexus', 'numerology', 'Аркан 11 («Справедливость») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:health_heart', 'numerology', 'Аркан 11 («Справедливость») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:health_throat', 'numerology', 'Аркан 11 («Справедливость») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:health_third_eye', 'numerology', 'Аркан 11 («Справедливость») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:health_crown', 'numerology', 'Аркан 11 («Справедливость») в позиции «коронная чакра — духовность и смысл» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:purpose_personal', 'numerology', 'Аркан 11 («Справедливость») в позиции «личное предназначение» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:purpose_ancestral', 'numerology', 'Аркан 11 («Справедливость») в позиции «родовое предназначение» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:purpose_spiritual', 'numerology', 'Аркан 11 («Справедливость») в позиции «духовное предназначение» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:purpose_social', 'numerology', 'Аркан 11 («Справедливость») в позиции «социальное предназначение» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:relationship_line', 'numerology', 'Аркан 11 («Справедливость») в позиции «линия отношений» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:money_line', 'numerology', 'Аркан 11 («Справедливость») в позиции «денежная линия» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:age_period_1', 'numerology', 'Аркан 11 («Справедливость») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:age_period_2', 'numerology', 'Аркан 11 («Справедливость») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:age_period_3', 'numerology', 'Аркан 11 («Справедливость») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:age_period_4', 'numerology', 'Аркан 11 («Справедливость») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:age_period_5', 'numerology', 'Аркан 11 («Справедливость») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:age_period_6', 'numerology', 'Аркан 11 («Справедливость») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:age_period_7', 'numerology', 'Аркан 11 («Справедливость») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:11:age_period_8', 'numerology', 'Аркан 11 («Справедливость») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: баланс, честность перед собой и причинно-следственные связи. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:point_day', 'numerology', 'Аркан 12 («Повешенный») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:point_month', 'numerology', 'Аркан 12 («Повешенный») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:point_year', 'numerology', 'Аркан 12 («Повешенный») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:point_tasks', 'numerology', 'Аркан 12 («Повешенный») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:point_center', 'numerology', 'Аркан 12 («Повешенный») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:point_f1', 'numerology', 'Аркан 12 («Повешенный») в позиции «квадрант Ф1 октаграммы» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:point_f2', 'numerology', 'Аркан 12 («Повешенный») в позиции «квадрант Ф2 октаграммы» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:point_f3', 'numerology', 'Аркан 12 («Повешенный») в позиции «квадрант Ф3 октаграммы» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:point_f4', 'numerology', 'Аркан 12 («Повешенный») в позиции «квадрант Ф4 октаграммы» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:health_root', 'numerology', 'Аркан 12 («Повешенный») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:health_sacral', 'numerology', 'Аркан 12 («Повешенный») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:health_solar_plexus', 'numerology', 'Аркан 12 («Повешенный») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:health_heart', 'numerology', 'Аркан 12 («Повешенный») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:health_throat', 'numerology', 'Аркан 12 («Повешенный») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:health_third_eye', 'numerology', 'Аркан 12 («Повешенный») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:health_crown', 'numerology', 'Аркан 12 («Повешенный») в позиции «коронная чакра — духовность и смысл» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:purpose_personal', 'numerology', 'Аркан 12 («Повешенный») в позиции «личное предназначение» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:purpose_ancestral', 'numerology', 'Аркан 12 («Повешенный») в позиции «родовое предназначение» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:purpose_spiritual', 'numerology', 'Аркан 12 («Повешенный») в позиции «духовное предназначение» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:purpose_social', 'numerology', 'Аркан 12 («Повешенный») в позиции «социальное предназначение» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:relationship_line', 'numerology', 'Аркан 12 («Повешенный») в позиции «линия отношений» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:money_line', 'numerology', 'Аркан 12 («Повешенный») в позиции «денежная линия» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:age_period_1', 'numerology', 'Аркан 12 («Повешенный») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:age_period_2', 'numerology', 'Аркан 12 («Повешенный») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:age_period_3', 'numerology', 'Аркан 12 («Повешенный») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:age_period_4', 'numerology', 'Аркан 12 («Повешенный») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:age_period_5', 'numerology', 'Аркан 12 («Повешенный») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:age_period_6', 'numerology', 'Аркан 12 («Повешенный») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:age_period_7', 'numerology', 'Аркан 12 («Повешенный») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:12:age_period_8', 'numerology', 'Аркан 12 («Повешенный») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: смена ракурса, пауза и новый взгляд на привычное. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:point_day', 'numerology', 'Аркан 13 («Смерть») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:point_month', 'numerology', 'Аркан 13 («Смерть») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:point_year', 'numerology', 'Аркан 13 («Смерть») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:point_tasks', 'numerology', 'Аркан 13 («Смерть») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:point_center', 'numerology', 'Аркан 13 («Смерть») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:point_f1', 'numerology', 'Аркан 13 («Смерть») в позиции «квадрант Ф1 октаграммы» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:point_f2', 'numerology', 'Аркан 13 («Смерть») в позиции «квадрант Ф2 октаграммы» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:point_f3', 'numerology', 'Аркан 13 («Смерть») в позиции «квадрант Ф3 октаграммы» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:point_f4', 'numerology', 'Аркан 13 («Смерть») в позиции «квадрант Ф4 октаграммы» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:health_root', 'numerology', 'Аркан 13 («Смерть») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:health_sacral', 'numerology', 'Аркан 13 («Смерть») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:health_solar_plexus', 'numerology', 'Аркан 13 («Смерть») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:health_heart', 'numerology', 'Аркан 13 («Смерть») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:health_throat', 'numerology', 'Аркан 13 («Смерть») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:health_third_eye', 'numerology', 'Аркан 13 («Смерть») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:health_crown', 'numerology', 'Аркан 13 («Смерть») в позиции «коронная чакра — духовность и смысл» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:purpose_personal', 'numerology', 'Аркан 13 («Смерть») в позиции «личное предназначение» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:purpose_ancestral', 'numerology', 'Аркан 13 («Смерть») в позиции «родовое предназначение» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:purpose_spiritual', 'numerology', 'Аркан 13 («Смерть») в позиции «духовное предназначение» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:purpose_social', 'numerology', 'Аркан 13 («Смерть») в позиции «социальное предназначение» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:relationship_line', 'numerology', 'Аркан 13 («Смерть») в позиции «линия отношений» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:money_line', 'numerology', 'Аркан 13 («Смерть») в позиции «денежная линия» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:age_period_1', 'numerology', 'Аркан 13 («Смерть») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:age_period_2', 'numerology', 'Аркан 13 («Смерть») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:age_period_3', 'numerology', 'Аркан 13 («Смерть») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:age_period_4', 'numerology', 'Аркан 13 («Смерть») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:age_period_5', 'numerology', 'Аркан 13 («Смерть») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:age_period_6', 'numerology', 'Аркан 13 («Смерть») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:age_period_7', 'numerology', 'Аркан 13 («Смерть») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:13:age_period_8', 'numerology', 'Аркан 13 («Смерть») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: завершение одного этапа и высвобождение места для нового. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:point_day', 'numerology', 'Аркан 14 («Умеренность») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:point_month', 'numerology', 'Аркан 14 («Умеренность») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:point_year', 'numerology', 'Аркан 14 («Умеренность») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:point_tasks', 'numerology', 'Аркан 14 («Умеренность») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:point_center', 'numerology', 'Аркан 14 («Умеренность») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:point_f1', 'numerology', 'Аркан 14 («Умеренность») в позиции «квадрант Ф1 октаграммы» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:point_f2', 'numerology', 'Аркан 14 («Умеренность») в позиции «квадрант Ф2 октаграммы» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:point_f3', 'numerology', 'Аркан 14 («Умеренность») в позиции «квадрант Ф3 октаграммы» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:point_f4', 'numerology', 'Аркан 14 («Умеренность») в позиции «квадрант Ф4 октаграммы» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:health_root', 'numerology', 'Аркан 14 («Умеренность») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:health_sacral', 'numerology', 'Аркан 14 («Умеренность») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:health_solar_plexus', 'numerology', 'Аркан 14 («Умеренность») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:health_heart', 'numerology', 'Аркан 14 («Умеренность») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:health_throat', 'numerology', 'Аркан 14 («Умеренность») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:health_third_eye', 'numerology', 'Аркан 14 («Умеренность») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:health_crown', 'numerology', 'Аркан 14 («Умеренность») в позиции «коронная чакра — духовность и смысл» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:purpose_personal', 'numerology', 'Аркан 14 («Умеренность») в позиции «личное предназначение» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:purpose_ancestral', 'numerology', 'Аркан 14 («Умеренность») в позиции «родовое предназначение» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:purpose_spiritual', 'numerology', 'Аркан 14 («Умеренность») в позиции «духовное предназначение» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:purpose_social', 'numerology', 'Аркан 14 («Умеренность») в позиции «социальное предназначение» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:relationship_line', 'numerology', 'Аркан 14 («Умеренность») в позиции «линия отношений» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:money_line', 'numerology', 'Аркан 14 («Умеренность») в позиции «денежная линия» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:age_period_1', 'numerology', 'Аркан 14 («Умеренность») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:age_period_2', 'numerology', 'Аркан 14 («Умеренность») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:age_period_3', 'numerology', 'Аркан 14 («Умеренность») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:age_period_4', 'numerology', 'Аркан 14 («Умеренность») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:age_period_5', 'numerology', 'Аркан 14 («Умеренность») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:age_period_6', 'numerology', 'Аркан 14 («Умеренность») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:age_period_7', 'numerology', 'Аркан 14 («Умеренность») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:14:age_period_8', 'numerology', 'Аркан 14 («Умеренность») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: баланс, интеграция противоположностей и терпение. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:point_day', 'numerology', 'Аркан 15 («Дьявол») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:point_month', 'numerology', 'Аркан 15 («Дьявол») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:point_year', 'numerology', 'Аркан 15 («Дьявол») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:point_tasks', 'numerology', 'Аркан 15 («Дьявол») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:point_center', 'numerology', 'Аркан 15 («Дьявол») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:point_f1', 'numerology', 'Аркан 15 («Дьявол») в позиции «квадрант Ф1 октаграммы» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:point_f2', 'numerology', 'Аркан 15 («Дьявол») в позиции «квадрант Ф2 октаграммы» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:point_f3', 'numerology', 'Аркан 15 («Дьявол») в позиции «квадрант Ф3 октаграммы» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:point_f4', 'numerology', 'Аркан 15 («Дьявол») в позиции «квадрант Ф4 октаграммы» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:health_root', 'numerology', 'Аркан 15 («Дьявол») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:health_sacral', 'numerology', 'Аркан 15 («Дьявол») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:health_solar_plexus', 'numerology', 'Аркан 15 («Дьявол») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:health_heart', 'numerology', 'Аркан 15 («Дьявол») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:health_throat', 'numerology', 'Аркан 15 («Дьявол») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:health_third_eye', 'numerology', 'Аркан 15 («Дьявол») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:health_crown', 'numerology', 'Аркан 15 («Дьявол») в позиции «коронная чакра — духовность и смысл» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:purpose_personal', 'numerology', 'Аркан 15 («Дьявол») в позиции «личное предназначение» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:purpose_ancestral', 'numerology', 'Аркан 15 («Дьявол») в позиции «родовое предназначение» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:purpose_spiritual', 'numerology', 'Аркан 15 («Дьявол») в позиции «духовное предназначение» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:purpose_social', 'numerology', 'Аркан 15 («Дьявол») в позиции «социальное предназначение» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:relationship_line', 'numerology', 'Аркан 15 («Дьявол») в позиции «линия отношений» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:money_line', 'numerology', 'Аркан 15 («Дьявол») в позиции «денежная линия» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:age_period_1', 'numerology', 'Аркан 15 («Дьявол») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:age_period_2', 'numerology', 'Аркан 15 («Дьявол») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:age_period_3', 'numerology', 'Аркан 15 («Дьявол») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:age_period_4', 'numerology', 'Аркан 15 («Дьявол») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:age_period_5', 'numerology', 'Аркан 15 («Дьявол») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:age_period_6', 'numerology', 'Аркан 15 («Дьявол») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:age_period_7', 'numerology', 'Аркан 15 («Дьявол») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:15:age_period_8', 'numerology', 'Аркан 15 («Дьявол») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: зависимости, ограничивающие привязанности и работа с тенью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:point_day', 'numerology', 'Аркан 16 («Башня») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:point_month', 'numerology', 'Аркан 16 («Башня») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:point_year', 'numerology', 'Аркан 16 («Башня») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:point_tasks', 'numerology', 'Аркан 16 («Башня») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:point_center', 'numerology', 'Аркан 16 («Башня») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:point_f1', 'numerology', 'Аркан 16 («Башня») в позиции «квадрант Ф1 октаграммы» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:point_f2', 'numerology', 'Аркан 16 («Башня») в позиции «квадрант Ф2 октаграммы» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:point_f3', 'numerology', 'Аркан 16 («Башня») в позиции «квадрант Ф3 октаграммы» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:point_f4', 'numerology', 'Аркан 16 («Башня») в позиции «квадрант Ф4 октаграммы» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:health_root', 'numerology', 'Аркан 16 («Башня») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:health_sacral', 'numerology', 'Аркан 16 («Башня») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:health_solar_plexus', 'numerology', 'Аркан 16 («Башня») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:health_heart', 'numerology', 'Аркан 16 («Башня») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:health_throat', 'numerology', 'Аркан 16 («Башня») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:health_third_eye', 'numerology', 'Аркан 16 («Башня») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:health_crown', 'numerology', 'Аркан 16 («Башня») в позиции «коронная чакра — духовность и смысл» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:purpose_personal', 'numerology', 'Аркан 16 («Башня») в позиции «личное предназначение» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:purpose_ancestral', 'numerology', 'Аркан 16 («Башня») в позиции «родовое предназначение» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:purpose_spiritual', 'numerology', 'Аркан 16 («Башня») в позиции «духовное предназначение» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:purpose_social', 'numerology', 'Аркан 16 («Башня») в позиции «социальное предназначение» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:relationship_line', 'numerology', 'Аркан 16 («Башня») в позиции «линия отношений» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:money_line', 'numerology', 'Аркан 16 («Башня») в позиции «денежная линия» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:age_period_1', 'numerology', 'Аркан 16 («Башня») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:age_period_2', 'numerology', 'Аркан 16 («Башня») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:age_period_3', 'numerology', 'Аркан 16 («Башня») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:age_period_4', 'numerology', 'Аркан 16 («Башня») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:age_period_5', 'numerology', 'Аркан 16 («Башня») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:age_period_6', 'numerology', 'Аркан 16 («Башня») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:age_period_7', 'numerology', 'Аркан 16 («Башня») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:16:age_period_8', 'numerology', 'Аркан 16 («Башня») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: внезапные перемены, разрушающие то, что уже не служит росту. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:point_day', 'numerology', 'Аркан 17 («Звезда») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:point_month', 'numerology', 'Аркан 17 («Звезда») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:point_year', 'numerology', 'Аркан 17 («Звезда») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:point_tasks', 'numerology', 'Аркан 17 («Звезда») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:point_center', 'numerology', 'Аркан 17 («Звезда») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:point_f1', 'numerology', 'Аркан 17 («Звезда») в позиции «квадрант Ф1 октаграммы» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:point_f2', 'numerology', 'Аркан 17 («Звезда») в позиции «квадрант Ф2 октаграммы» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:point_f3', 'numerology', 'Аркан 17 («Звезда») в позиции «квадрант Ф3 октаграммы» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:point_f4', 'numerology', 'Аркан 17 («Звезда») в позиции «квадрант Ф4 октаграммы» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:health_root', 'numerology', 'Аркан 17 («Звезда») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:health_sacral', 'numerology', 'Аркан 17 («Звезда») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:health_solar_plexus', 'numerology', 'Аркан 17 («Звезда») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:health_heart', 'numerology', 'Аркан 17 («Звезда») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:health_throat', 'numerology', 'Аркан 17 («Звезда») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:health_third_eye', 'numerology', 'Аркан 17 («Звезда») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:health_crown', 'numerology', 'Аркан 17 («Звезда») в позиции «коронная чакра — духовность и смысл» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:purpose_personal', 'numerology', 'Аркан 17 («Звезда») в позиции «личное предназначение» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:purpose_ancestral', 'numerology', 'Аркан 17 («Звезда») в позиции «родовое предназначение» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:purpose_spiritual', 'numerology', 'Аркан 17 («Звезда») в позиции «духовное предназначение» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:purpose_social', 'numerology', 'Аркан 17 («Звезда») в позиции «социальное предназначение» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:relationship_line', 'numerology', 'Аркан 17 («Звезда») в позиции «линия отношений» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:money_line', 'numerology', 'Аркан 17 («Звезда») в позиции «денежная линия» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:age_period_1', 'numerology', 'Аркан 17 («Звезда») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:age_period_2', 'numerology', 'Аркан 17 («Звезда») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:age_period_3', 'numerology', 'Аркан 17 («Звезда») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:age_period_4', 'numerology', 'Аркан 17 («Звезда») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:age_period_5', 'numerology', 'Аркан 17 («Звезда») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:age_period_6', 'numerology', 'Аркан 17 («Звезда») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:age_period_7', 'numerology', 'Аркан 17 («Звезда») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:17:age_period_8', 'numerology', 'Аркан 17 («Звезда») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: надежда, вдохновение и вера в лучшее. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:point_day', 'numerology', 'Аркан 18 («Луна») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:point_month', 'numerology', 'Аркан 18 («Луна») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:point_year', 'numerology', 'Аркан 18 («Луна») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:point_tasks', 'numerology', 'Аркан 18 («Луна») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:point_center', 'numerology', 'Аркан 18 («Луна») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:point_f1', 'numerology', 'Аркан 18 («Луна») в позиции «квадрант Ф1 октаграммы» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:point_f2', 'numerology', 'Аркан 18 («Луна») в позиции «квадрант Ф2 октаграммы» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:point_f3', 'numerology', 'Аркан 18 («Луна») в позиции «квадрант Ф3 октаграммы» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:point_f4', 'numerology', 'Аркан 18 («Луна») в позиции «квадрант Ф4 октаграммы» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:health_root', 'numerology', 'Аркан 18 («Луна») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:health_sacral', 'numerology', 'Аркан 18 («Луна») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:health_solar_plexus', 'numerology', 'Аркан 18 («Луна») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:health_heart', 'numerology', 'Аркан 18 («Луна») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:health_throat', 'numerology', 'Аркан 18 («Луна») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:health_third_eye', 'numerology', 'Аркан 18 («Луна») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:health_crown', 'numerology', 'Аркан 18 («Луна») в позиции «коронная чакра — духовность и смысл» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:purpose_personal', 'numerology', 'Аркан 18 («Луна») в позиции «личное предназначение» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:purpose_ancestral', 'numerology', 'Аркан 18 («Луна») в позиции «родовое предназначение» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:purpose_spiritual', 'numerology', 'Аркан 18 («Луна») в позиции «духовное предназначение» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:purpose_social', 'numerology', 'Аркан 18 («Луна») в позиции «социальное предназначение» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:relationship_line', 'numerology', 'Аркан 18 («Луна») в позиции «линия отношений» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:money_line', 'numerology', 'Аркан 18 («Луна») в позиции «денежная линия» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:age_period_1', 'numerology', 'Аркан 18 («Луна») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:age_period_2', 'numerology', 'Аркан 18 («Луна») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:age_period_3', 'numerology', 'Аркан 18 («Луна») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:age_period_4', 'numerology', 'Аркан 18 («Луна») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:age_period_5', 'numerology', 'Аркан 18 («Луна») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:age_period_6', 'numerology', 'Аркан 18 («Луна») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:age_period_7', 'numerology', 'Аркан 18 («Луна») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:18:age_period_8', 'numerology', 'Аркан 18 («Луна») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: подсознание, интуиция и работа с неопределённостью. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:point_day', 'numerology', 'Аркан 19 («Солнце») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:point_month', 'numerology', 'Аркан 19 («Солнце») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:point_year', 'numerology', 'Аркан 19 («Солнце») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:point_tasks', 'numerology', 'Аркан 19 («Солнце») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:point_center', 'numerology', 'Аркан 19 («Солнце») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:point_f1', 'numerology', 'Аркан 19 («Солнце») в позиции «квадрант Ф1 октаграммы» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:point_f2', 'numerology', 'Аркан 19 («Солнце») в позиции «квадрант Ф2 октаграммы» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:point_f3', 'numerology', 'Аркан 19 («Солнце») в позиции «квадрант Ф3 октаграммы» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:point_f4', 'numerology', 'Аркан 19 («Солнце») в позиции «квадрант Ф4 октаграммы» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:health_root', 'numerology', 'Аркан 19 («Солнце») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:health_sacral', 'numerology', 'Аркан 19 («Солнце») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:health_solar_plexus', 'numerology', 'Аркан 19 («Солнце») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:health_heart', 'numerology', 'Аркан 19 («Солнце») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:health_throat', 'numerology', 'Аркан 19 («Солнце») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:health_third_eye', 'numerology', 'Аркан 19 («Солнце») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:health_crown', 'numerology', 'Аркан 19 («Солнце») в позиции «коронная чакра — духовность и смысл» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:purpose_personal', 'numerology', 'Аркан 19 («Солнце») в позиции «личное предназначение» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:purpose_ancestral', 'numerology', 'Аркан 19 («Солнце») в позиции «родовое предназначение» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:purpose_spiritual', 'numerology', 'Аркан 19 («Солнце») в позиции «духовное предназначение» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:purpose_social', 'numerology', 'Аркан 19 («Солнце») в позиции «социальное предназначение» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:relationship_line', 'numerology', 'Аркан 19 («Солнце») в позиции «линия отношений» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:money_line', 'numerology', 'Аркан 19 («Солнце») в позиции «денежная линия» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:age_period_1', 'numerology', 'Аркан 19 («Солнце») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:age_period_2', 'numerology', 'Аркан 19 («Солнце») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:age_period_3', 'numerology', 'Аркан 19 («Солнце») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:age_period_4', 'numerology', 'Аркан 19 («Солнце») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:age_period_5', 'numerology', 'Аркан 19 («Солнце») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:age_period_6', 'numerology', 'Аркан 19 («Солнце») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:age_period_7', 'numerology', 'Аркан 19 («Солнце») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:19:age_period_8', 'numerology', 'Аркан 19 («Солнце») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: радость, ясность и открытая жизненная энергия. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:point_day', 'numerology', 'Аркан 20 («Суд») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:point_month', 'numerology', 'Аркан 20 («Суд») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:point_year', 'numerology', 'Аркан 20 («Суд») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:point_tasks', 'numerology', 'Аркан 20 («Суд») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:point_center', 'numerology', 'Аркан 20 («Суд») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:point_f1', 'numerology', 'Аркан 20 («Суд») в позиции «квадрант Ф1 октаграммы» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:point_f2', 'numerology', 'Аркан 20 («Суд») в позиции «квадрант Ф2 октаграммы» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:point_f3', 'numerology', 'Аркан 20 («Суд») в позиции «квадрант Ф3 октаграммы» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:point_f4', 'numerology', 'Аркан 20 («Суд») в позиции «квадрант Ф4 октаграммы» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:health_root', 'numerology', 'Аркан 20 («Суд») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:health_sacral', 'numerology', 'Аркан 20 («Суд») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:health_solar_plexus', 'numerology', 'Аркан 20 («Суд») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:health_heart', 'numerology', 'Аркан 20 («Суд») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:health_throat', 'numerology', 'Аркан 20 («Суд») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:health_third_eye', 'numerology', 'Аркан 20 («Суд») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:health_crown', 'numerology', 'Аркан 20 («Суд») в позиции «коронная чакра — духовность и смысл» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:purpose_personal', 'numerology', 'Аркан 20 («Суд») в позиции «личное предназначение» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:purpose_ancestral', 'numerology', 'Аркан 20 («Суд») в позиции «родовое предназначение» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:purpose_spiritual', 'numerology', 'Аркан 20 («Суд») в позиции «духовное предназначение» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:purpose_social', 'numerology', 'Аркан 20 («Суд») в позиции «социальное предназначение» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:relationship_line', 'numerology', 'Аркан 20 («Суд») в позиции «линия отношений» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:money_line', 'numerology', 'Аркан 20 («Суд») в позиции «денежная линия» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:age_period_1', 'numerology', 'Аркан 20 («Суд») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:age_period_2', 'numerology', 'Аркан 20 («Суд») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:age_period_3', 'numerology', 'Аркан 20 («Суд») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:age_period_4', 'numerology', 'Аркан 20 («Суд») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:age_period_5', 'numerology', 'Аркан 20 («Суд») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:age_period_6', 'numerology', 'Аркан 20 («Суд») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:age_period_7', 'numerology', 'Аркан 20 («Суд») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:20:age_period_8', 'numerology', 'Аркан 20 («Суд») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: переосмысление опыта и подведение промежуточных итогов. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:point_day', 'numerology', 'Аркан 21 («Мир») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:point_month', 'numerology', 'Аркан 21 («Мир») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:point_year', 'numerology', 'Аркан 21 («Мир») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:point_tasks', 'numerology', 'Аркан 21 («Мир») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:point_center', 'numerology', 'Аркан 21 («Мир») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:point_f1', 'numerology', 'Аркан 21 («Мир») в позиции «квадрант Ф1 октаграммы» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:point_f2', 'numerology', 'Аркан 21 («Мир») в позиции «квадрант Ф2 октаграммы» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:point_f3', 'numerology', 'Аркан 21 («Мир») в позиции «квадрант Ф3 октаграммы» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:point_f4', 'numerology', 'Аркан 21 («Мир») в позиции «квадрант Ф4 октаграммы» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:health_root', 'numerology', 'Аркан 21 («Мир») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:health_sacral', 'numerology', 'Аркан 21 («Мир») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:health_solar_plexus', 'numerology', 'Аркан 21 («Мир») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:health_heart', 'numerology', 'Аркан 21 («Мир») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:health_throat', 'numerology', 'Аркан 21 («Мир») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:health_third_eye', 'numerology', 'Аркан 21 («Мир») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:health_crown', 'numerology', 'Аркан 21 («Мир») в позиции «коронная чакра — духовность и смысл» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:purpose_personal', 'numerology', 'Аркан 21 («Мир») в позиции «личное предназначение» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:purpose_ancestral', 'numerology', 'Аркан 21 («Мир») в позиции «родовое предназначение» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:purpose_spiritual', 'numerology', 'Аркан 21 («Мир») в позиции «духовное предназначение» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:purpose_social', 'numerology', 'Аркан 21 («Мир») в позиции «социальное предназначение» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:relationship_line', 'numerology', 'Аркан 21 («Мир») в позиции «линия отношений» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:money_line', 'numerology', 'Аркан 21 («Мир») в позиции «денежная линия» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:age_period_1', 'numerology', 'Аркан 21 («Мир») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:age_period_2', 'numerology', 'Аркан 21 («Мир») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:age_period_3', 'numerology', 'Аркан 21 («Мир») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:age_period_4', 'numerology', 'Аркан 21 («Мир») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:age_period_5', 'numerology', 'Аркан 21 («Мир») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:age_period_6', 'numerology', 'Аркан 21 («Мир») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:age_period_7', 'numerology', 'Аркан 21 («Мир») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:21:age_period_8', 'numerology', 'Аркан 21 («Мир») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: целостность, завершение цикла и чувство исполненности. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:point_day', 'numerology', 'Аркан 22 («Шут») в позиции «личные качества и таланты (точка «День»)» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:point_month', 'numerology', 'Аркан 22 («Шут») в позиции «родовая задача по материнской линии (точка «Месяц»)» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:point_year', 'numerology', 'Аркан 22 («Шут») в позиции «родовая задача по отцовской линии (точка «Год»)» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:point_tasks', 'numerology', 'Аркан 22 («Шут») в позиции «главная жизненная задача (точка «Задачи»)» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:point_center', 'numerology', 'Аркан 22 («Шут») в позиции «зона комфорта (центр октаграммы)» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:point_f1', 'numerology', 'Аркан 22 («Шут») в позиции «квадрант Ф1 октаграммы» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:point_f2', 'numerology', 'Аркан 22 («Шут») в позиции «квадрант Ф2 октаграммы» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:point_f3', 'numerology', 'Аркан 22 («Шут») в позиции «квадрант Ф3 октаграммы» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:point_f4', 'numerology', 'Аркан 22 («Шут») в позиции «квадрант Ф4 октаграммы» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:health_root', 'numerology', 'Аркан 22 («Шут») в позиции «корневая чакра — опора и жизненная сила» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:health_sacral', 'numerology', 'Аркан 22 («Шут») в позиции «сакральная чакра — энергия и чувственность» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:health_solar_plexus', 'numerology', 'Аркан 22 («Шут») в позиции «чакра солнечного сплетения — воля и самооценка» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:health_heart', 'numerology', 'Аркан 22 («Шут») в позиции «сердечная чакра — эмоции и отношения» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:health_throat', 'numerology', 'Аркан 22 («Шут») в позиции «горловая чакра — самовыражение и коммуникация» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:health_third_eye', 'numerology', 'Аркан 22 («Шут») в позиции «чакра третьего глаза — интуиция и ясность» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:health_crown', 'numerology', 'Аркан 22 («Шут») в позиции «коронная чакра — духовность и смысл» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:purpose_personal', 'numerology', 'Аркан 22 («Шут») в позиции «личное предназначение» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:purpose_ancestral', 'numerology', 'Аркан 22 («Шут») в позиции «родовое предназначение» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:purpose_spiritual', 'numerology', 'Аркан 22 («Шут») в позиции «духовное предназначение» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:purpose_social', 'numerology', 'Аркан 22 («Шут») в позиции «социальное предназначение» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:relationship_line', 'numerology', 'Аркан 22 («Шут») в позиции «линия отношений» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:money_line', 'numerology', 'Аркан 22 («Шут») в позиции «денежная линия» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:age_period_1', 'numerology', 'Аркан 22 («Шут») в позиции «возрастной период №1 (9-летний цикл)» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:age_period_2', 'numerology', 'Аркан 22 («Шут») в позиции «возрастной период №2 (9-летний цикл)» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:age_period_3', 'numerology', 'Аркан 22 («Шут») в позиции «возрастной период №3 (9-летний цикл)» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:age_period_4', 'numerology', 'Аркан 22 («Шут») в позиции «возрастной период №4 (9-летний цикл)» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:age_period_5', 'numerology', 'Аркан 22 («Шут») в позиции «возрастной период №5 (9-летний цикл)» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:age_period_6', 'numerology', 'Аркан 22 («Шут») в позиции «возрастной период №6 (9-летний цикл)» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:age_period_7', 'numerology', 'Аркан 22 («Шут») в позиции «возрастной период №7 (9-летний цикл)» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('arcanum:22:age_period_8', 'numerology', 'Аркан 22 («Шут») в позиции «возрастной период №8 (9-летний цикл)» раскрывает тему: спонтанность, новое начало и открытость непредсказуемому. В матрице судьбы это указывает на качества и ресурсы, доступные именно в этой зоне. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:life_path:1', 'numerology', 'Число жизненного пути, равное 1, указывает на лидерство, самостоятельность и готовность идти первым. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:life_path:2', 'numerology', 'Число жизненного пути, равное 2, указывает на дипломатичность, чуткость к партнёру и умение слышать другого. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:life_path:3', 'numerology', 'Число жизненного пути, равное 3, указывает на творческое самовыражение, общительность и лёгкость в коммуникации. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:life_path:4', 'numerology', 'Число жизненного пути, равное 4, указывает на надёжность, структурность и способность строить прочный фундамент. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:life_path:5', 'numerology', 'Число жизненного пути, равное 5, указывает на тягу к свободе, переменам и разнообразному опыту. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:life_path:6', 'numerology', 'Число жизненного пути, равное 6, указывает на заботу, ответственность за близких и стремление к гармонии в доме. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:life_path:7', 'numerology', 'Число жизненного пути, равное 7, указывает на аналитичность, склонность к уединённому размышлению и духовному поиску. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:life_path:8', 'numerology', 'Число жизненного пути, равное 8, указывает на практическую реализацию, работу с ресурсами и здоровые амбиции. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:life_path:9', 'numerology', 'Число жизненного пути, равное 9, указывает на гуманизм, широкий взгляд на мир и умение завершать начатое. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:life_path:11', 'numerology', 'Число жизненного пути, равное 11, указывает на обострённую интуицию и способность вдохновлять других (мастер-число). Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:life_path:22', 'numerology', 'Число жизненного пути, равное 22, указывает на масштабное практическое созидание — «мастер-строитель» (мастер-число). Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:expression:1', 'numerology', 'Число выражения, равное 1, указывает на лидерство, самостоятельность и готовность идти первым. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:expression:2', 'numerology', 'Число выражения, равное 2, указывает на дипломатичность, чуткость к партнёру и умение слышать другого. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:expression:3', 'numerology', 'Число выражения, равное 3, указывает на творческое самовыражение, общительность и лёгкость в коммуникации. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:expression:4', 'numerology', 'Число выражения, равное 4, указывает на надёжность, структурность и способность строить прочный фундамент. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:expression:5', 'numerology', 'Число выражения, равное 5, указывает на тягу к свободе, переменам и разнообразному опыту. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:expression:6', 'numerology', 'Число выражения, равное 6, указывает на заботу, ответственность за близких и стремление к гармонии в доме. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:expression:7', 'numerology', 'Число выражения, равное 7, указывает на аналитичность, склонность к уединённому размышлению и духовному поиску. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:expression:8', 'numerology', 'Число выражения, равное 8, указывает на практическую реализацию, работу с ресурсами и здоровые амбиции. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:expression:9', 'numerology', 'Число выражения, равное 9, указывает на гуманизм, широкий взгляд на мир и умение завершать начатое. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:expression:11', 'numerology', 'Число выражения, равное 11, указывает на обострённую интуицию и способность вдохновлять других (мастер-число). Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:expression:22', 'numerology', 'Число выражения, равное 22, указывает на масштабное практическое созидание — «мастер-строитель» (мастер-число). Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:soul:1', 'numerology', 'Число души, равное 1, указывает на лидерство, самостоятельность и готовность идти первым. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:soul:2', 'numerology', 'Число души, равное 2, указывает на дипломатичность, чуткость к партнёру и умение слышать другого. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:soul:3', 'numerology', 'Число души, равное 3, указывает на творческое самовыражение, общительность и лёгкость в коммуникации. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:soul:4', 'numerology', 'Число души, равное 4, указывает на надёжность, структурность и способность строить прочный фундамент. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:soul:5', 'numerology', 'Число души, равное 5, указывает на тягу к свободе, переменам и разнообразному опыту. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:soul:6', 'numerology', 'Число души, равное 6, указывает на заботу, ответственность за близких и стремление к гармонии в доме. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:soul:7', 'numerology', 'Число души, равное 7, указывает на аналитичность, склонность к уединённому размышлению и духовному поиску. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:soul:8', 'numerology', 'Число души, равное 8, указывает на практическую реализацию, работу с ресурсами и здоровые амбиции. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:soul:9', 'numerology', 'Число души, равное 9, указывает на гуманизм, широкий взгляд на мир и умение завершать начатое. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:soul:11', 'numerology', 'Число души, равное 11, указывает на обострённую интуицию и способность вдохновлять других (мастер-число). Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:soul:22', 'numerology', 'Число души, равное 22, указывает на масштабное практическое созидание — «мастер-строитель» (мастер-число). Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personality:1', 'numerology', 'Число личности, равное 1, указывает на лидерство, самостоятельность и готовность идти первым. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personality:2', 'numerology', 'Число личности, равное 2, указывает на дипломатичность, чуткость к партнёру и умение слышать другого. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personality:3', 'numerology', 'Число личности, равное 3, указывает на творческое самовыражение, общительность и лёгкость в коммуникации. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personality:4', 'numerology', 'Число личности, равное 4, указывает на надёжность, структурность и способность строить прочный фундамент. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Понимание этой особенности помогает мягче обходиться с собой и использовать её как ресурс.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personality:5', 'numerology', 'Число личности, равное 5, указывает на тягу к свободе, переменам и разнообразному опыту. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personality:6', 'numerology', 'Число личности, равное 6, указывает на заботу, ответственность за близких и стремление к гармонии в доме. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personality:7', 'numerology', 'Число личности, равное 7, указывает на аналитичность, склонность к уединённому размышлению и духовному поиску. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personality:8', 'numerology', 'Число личности, равное 8, указывает на практическую реализацию, работу с ресурсами и здоровые амбиции. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personality:9', 'numerology', 'Число личности, равное 9, указывает на гуманизм, широкий взгляд на мир и умение завершать начатое. Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personality:11', 'numerology', 'Число личности, равное 11, указывает на обострённую интуицию и способность вдохновлять других (мастер-число). Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это одна из граней личности, которую можно развивать в свою пользу.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personality:22', 'numerology', 'Число личности, равное 22, указывает на масштабное практическое созидание — «мастер-строитель» (мастер-число). Это одна из ключевых чисел нумерологического портрета, которая проявляется в разных сферах жизни. Это не приговор, а склонность — то, как она проявится, во многом зависит от осознанного выбора.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_year:1', 'numerology', 'Персональный год 1 — это начало нового цикла — время закладывать намерения. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_year:2', 'numerology', 'Персональный год 2 — это период сотрудничества, терпения и внимания к деталям отношений. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_year:3', 'numerology', 'Персональный год 3 — это время самовыражения, общения и лёгкости в коммуникации. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_year:4', 'numerology', 'Персональный год 4 — это период труда, наведения порядка и укрепления фундамента. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_year:5', 'numerology', 'Персональный год 5 — это время перемен, движения и расширения границ привычного. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_year:6', 'numerology', 'Персональный год 6 — это период заботы о доме, близких и внутренней гармонии. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_year:7', 'numerology', 'Персональный год 7 — это время паузы, анализа и обращения к внутренним ресурсам. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_year:8', 'numerology', 'Персональный год 8 — это период видимых результатов и работы с материальной стороной жизни. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_year:9', 'numerology', 'Персональный год 9 — это время подведения итогов, завершения цикла и освобождения от лишнего. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_month:1', 'numerology', 'Персональный месяц 1 — это начало нового цикла — время закладывать намерения. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_month:2', 'numerology', 'Персональный месяц 2 — это период сотрудничества, терпения и внимания к деталям отношений. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_month:3', 'numerology', 'Персональный месяц 3 — это время самовыражения, общения и лёгкости в коммуникации. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_month:4', 'numerology', 'Персональный месяц 4 — это период труда, наведения порядка и укрепления фундамента. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_month:5', 'numerology', 'Персональный месяц 5 — это время перемен, движения и расширения границ привычного. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_month:6', 'numerology', 'Персональный месяц 6 — это период заботы о доме, близких и внутренней гармонии. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_month:7', 'numerology', 'Персональный месяц 7 — это время паузы, анализа и обращения к внутренним ресурсам. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_month:8', 'numerology', 'Персональный месяц 8 — это период видимых результатов и работы с материальной стороной жизни. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_month:9', 'numerology', 'Персональный месяц 9 — это время подведения итогов, завершения цикла и освобождения от лишнего. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_day:1', 'numerology', 'Персональный день 1 — это начало нового цикла — время закладывать намерения. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_day:2', 'numerology', 'Персональный день 2 — это период сотрудничества, терпения и внимания к деталям отношений. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_day:3', 'numerology', 'Персональный день 3 — это время самовыражения, общения и лёгкости в коммуникации. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_day:4', 'numerology', 'Персональный день 4 — это период труда, наведения порядка и укрепления фундамента. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_day:5', 'numerology', 'Персональный день 5 — это время перемен, движения и расширения границ привычного. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_day:6', 'numerology', 'Персональный день 6 — это период заботы о доме, близких и внутренней гармонии. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_day:7', 'numerology', 'Персональный день 7 — это время паузы, анализа и обращения к внутренним ресурсам. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_day:8', 'numerology', 'Персональный день 8 — это период видимых результатов и работы с материальной стороной жизни. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:personal_day:9', 'numerology', 'Персональный день 9 — это время подведения итогов, завершения цикла и освобождения от лишнего. Числа циклов показывают общий фон периода, а не конкретные события.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_cell:character', 'numerology', 'Ячейка психоматрицы «Характер» отражает силу воли и то, насколько последовательно человек идёт к цели. Количество цифр в ячейке — лишь ориентир для саморефлексии, а не жёсткий диагноз.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_cell:energy', 'numerology', 'Ячейка психоматрицы «Энергия» отражает жизненную энергию, работоспособность и запас сил. Количество цифр в ячейке — лишь ориентир для саморефлексии, а не жёсткий диагноз.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_cell:interest', 'numerology', 'Ячейка психоматрицы «Интерес» отражает любознательность, широту интересов и склонность к обучению. Количество цифр в ячейке — лишь ориентир для саморефлексии, а не жёсткий диагноз.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_cell:health', 'numerology', 'Ячейка психоматрицы «Здоровье» отражает устойчивость организма и то, как быстро восстанавливаются силы. Количество цифр в ячейке — лишь ориентир для саморефлексии, а не жёсткий диагноз.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_cell:logic', 'numerology', 'Ячейка психоматрицы «Логика» отражает аналитическое мышление и способность выстраивать причинно-следственные связи. Количество цифр в ячейке — лишь ориентир для саморефлексии, а не жёсткий диагноз.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_cell:labor', 'numerology', 'Ячейка психоматрицы «Труд» отражает трудолюбие, практичность и готовность доводить дело до конца. Количество цифр в ячейке — лишь ориентир для саморефлексии, а не жёсткий диагноз.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_cell:luck', 'numerology', 'Ячейка психоматрицы «Удача» отражает интуитивную удачливость и умение оказываться в нужном месте вовремя. Количество цифр в ячейке — лишь ориентир для саморефлексии, а не жёсткий диагноз.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_cell:duty', 'numerology', 'Ячейка психоматрицы «Долг» отражает чувство ответственности перед собой и близкими. Количество цифр в ячейке — лишь ориентир для саморефлексии, а не жёсткий диагноз.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_cell:memory', 'numerology', 'Ячейка психоматрицы «Память» отражает память о прошлом опыте и умение опираться на него. Количество цифр в ячейке — лишь ориентир для саморефлексии, а не жёсткий диагноз.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_line:row_1', 'numerology', 'Сочетание чисел по позиции «row_1» психоматрицы показывает, как соответствующие качества взаимно усиливают или уравновешивают друг друга.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_line:row_2', 'numerology', 'Сочетание чисел по позиции «row_2» психоматрицы показывает, как соответствующие качества взаимно усиливают или уравновешивают друг друга.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_line:row_3', 'numerology', 'Сочетание чисел по позиции «row_3» психоматрицы показывает, как соответствующие качества взаимно усиливают или уравновешивают друг друга.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_line:col_1', 'numerology', 'Сочетание чисел по позиции «col_1» психоматрицы показывает, как соответствующие качества взаимно усиливают или уравновешивают друг друга.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_line:col_2', 'numerology', 'Сочетание чисел по позиции «col_2» психоматрицы показывает, как соответствующие качества взаимно усиливают или уравновешивают друг друга.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_line:col_3', 'numerology', 'Сочетание чисел по позиции «col_3» психоматрицы показывает, как соответствующие качества взаимно усиливают или уравновешивают друг друга.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_line:diag_main', 'numerology', 'Сочетание чисел по позиции «diag_main» психоматрицы показывает, как соответствующие качества взаимно усиливают или уравновешивают друг друга.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';

INSERT INTO "interpretation_chunks" ("key", "tradition", "text", "quality", "version")
VALUES ('numerology:matrix_line:diag_anti', 'numerology', 'Сочетание чисел по позиции «diag_anti» психоматрицы показывает, как соответствующие качества взаимно усиливают или уравновешивают друг друга.', 'draft', 1)
ON CONFLICT ("key") DO UPDATE SET
  "tradition" = EXCLUDED."tradition",
  "text" = EXCLUDED."text",
  "version" = EXCLUDED."version",
  "updated_at" = now()
WHERE "interpretation_chunks"."quality" = 'draft';
