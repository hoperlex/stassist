-- stones — датасет камней Ф6 (75 карточек).
-- СГЕНЕРИРОВАНО: tools/gen-stones.ts. НЕ редактировать руками — перегенерировать `pnpm data:stones`.
-- Идемпотентно: ON CONFLICT ("slug") DO UPDATE ТОЛЬКО пока status='draft' (не затирает
-- ручную редактуру, см. §6 конвенций реализации).

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('ametist', 'Аметист', 'Аметист — разновидность кварца фиолетового цвета, окраска связана с примесью железа. В традиции камень чаще всего используют как талисман для гармонии и спокойствия, для мудрости и интуиции, для здоровья. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['фиолетовый']::text[], ARRAY['pisces','aquarius','virgo']::text[], ARRAY['jupiter','neptune']::text[], '[{"sign":"gemini","decadeIndex":1},{"sign":"leo","decadeIndex":2},{"sign":"libra","decadeIndex":3},{"sign":"capricorn","decadeIndex":1},{"sign":"pisces","decadeIndex":2}]'::jsonb, ARRAY[9,10,17,18]::integer[], ARRAY['health_crown']::text[], ARRAY['harmony','wisdom','health']::text[], 'считается подходящим для успокоения и медитации.', NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('citrin', 'Цитрин', 'Цитрин — жёлтая разновидность кварца, натуральный цитрин встречается реже, чем термообработанный аметист. В традиции камень чаще всего используют как талисман на деньги и достаток, для карьеры и успеха, на удачу. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['жёлтый']::text[], ARRAY['gemini','leo']::text[], ARRAY['sun','mercury']::text[], '[{"sign":"aries","decadeIndex":2},{"sign":"taurus","decadeIndex":1},{"sign":"gemini","decadeIndex":3},{"sign":"cancer","decadeIndex":2},{"sign":"virgo","decadeIndex":1},{"sign":"virgo","decadeIndex":3},{"sign":"scorpio","decadeIndex":2},{"sign":"sagittarius","decadeIndex":1},{"sign":"capricorn","decadeIndex":3},{"sign":"aquarius","decadeIndex":2}]'::jsonb, ARRAY[1,6,8,19]::integer[], ARRAY['health_solar_plexus']::text[], ARRAY['money','career','luck']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('rozovyj-kvarc', 'Розовый кварц', 'Розовый кварц — розовая разновидность кварца, окраска связана с примесями титана/марганца. В традиции камень чаще всего используют как талисман на любовь и отношения, для гармонии и спокойствия. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['розовый']::text[], ARRAY['taurus','libra']::text[], ARRAY['venus']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"cancer","decadeIndex":1},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":3},{"sign":"aquarius","decadeIndex":1}]'::jsonb, ARRAY[3,5,11]::integer[], ARRAY['health_heart']::text[], ARRAY['love','harmony']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('dymchatyj-kvarc', 'Дымчатый кварц (раухтопаз)', 'Дымчатый кварц (раухтопаз) — бурая/серая разновидность кварца, окраска — результат природного облучения. В традиции камень чаще всего используют как талисман защита от негатива, для карьеры и успеха. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['коричневый','серый']::text[], ARRAY['capricorn','scorpio']::text[], ARRAY['saturn']::text[], '[{"sign":"taurus","decadeIndex":3},{"sign":"leo","decadeIndex":1},{"sign":"libra","decadeIndex":2},{"sign":"sagittarius","decadeIndex":3},{"sign":"pisces","decadeIndex":1}]'::jsonb, ARRAY[13,15,21]::integer[], ARRAY['health_root']::text[], ARRAY['protection','career']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('gornyj-hrustal', 'Горный хрусталь', 'Горный хрусталь — бесцветная прозрачная разновидность кварца. В традиции камень чаще всего используют как талисман для мудрости и интуиции, для гармонии и спокойствия. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['бесцветный']::text[], ARRAY['aries']::text[], ARRAY['sun','moon']::text[], '[{"sign":"aries","decadeIndex":2},{"sign":"taurus","decadeIndex":2},{"sign":"gemini","decadeIndex":3},{"sign":"cancer","decadeIndex":3},{"sign":"virgo","decadeIndex":1},{"sign":"libra","decadeIndex":1},{"sign":"scorpio","decadeIndex":2},{"sign":"sagittarius","decadeIndex":2},{"sign":"capricorn","decadeIndex":3},{"sign":"aquarius","decadeIndex":3}]'::jsonb, ARRAY[2,4,19]::integer[], ARRAY['health_crown']::text[], ARRAY['wisdom','harmony']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('tigrovyj-glaz', 'Тигровый глаз', 'Тигровый глаз — кварц с шелковистым отливом (эффект «кошачьего глаза»), образуется при замещении крокидолита. В традиции камень чаще всего используют как талисман для карьеры и успеха, защита от негатива, на удачу. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['жёлтый','коричневый']::text[], ARRAY['leo','capricorn']::text[], ARRAY['sun','mars']::text[], '[{"sign":"aries","decadeIndex":1},{"sign":"aries","decadeIndex":2},{"sign":"gemini","decadeIndex":2},{"sign":"gemini","decadeIndex":3},{"sign":"leo","decadeIndex":3},{"sign":"virgo","decadeIndex":1},{"sign":"scorpio","decadeIndex":1},{"sign":"scorpio","decadeIndex":2},{"sign":"capricorn","decadeIndex":2},{"sign":"capricorn","decadeIndex":3},{"sign":"pisces","decadeIndex":3}]'::jsonb, ARRAY[8,15,16,19]::integer[], ARRAY['health_root','health_solar_plexus']::text[], ARRAY['career','protection','luck']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('avantyurin-zelenyj', 'Авантюрин зелёный', 'Авантюрин зелёный — кварцит с вкраплениями слюды/фуксита, дающими характерный блеск. В традиции камень чаще всего используют как талисман на удачу, на деньги и достаток. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['зелёный']::text[], ARRAY['aries']::text[], ARRAY['mercury']::text[], '[{"sign":"taurus","decadeIndex":1},{"sign":"cancer","decadeIndex":2},{"sign":"virgo","decadeIndex":3},{"sign":"sagittarius","decadeIndex":1},{"sign":"aquarius","decadeIndex":2}]'::jsonb, ARRAY[1,4]::integer[], ARRAY['health_heart']::text[], ARRAY['luck','money']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('avantyurin-sinij', 'Авантюрин синий', 'Авантюрин синий — редкая синяя разновидность авантюрина с вкраплениями дюмортьерита/крокидолита. В традиции камень чаще всего используют как талисман для мудрости и интуиции, защита от негатива. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['синий']::text[], ARRAY[]::text[], ARRAY['saturn']::text[], '[{"sign":"taurus","decadeIndex":3},{"sign":"leo","decadeIndex":1},{"sign":"libra","decadeIndex":2},{"sign":"sagittarius","decadeIndex":3},{"sign":"pisces","decadeIndex":1}]'::jsonb, ARRAY[21]::integer[], ARRAY['health_third_eye']::text[], ARRAY['wisdom','protection']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('serdolik', 'Сердолик (карнеол)', 'Сердолик (карнеол) — оранжево-красная разновидность халцедона. В традиции камень чаще всего используют как талисман для карьеры и успеха, на удачу, для здоровья. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['оранжевый','красный']::text[], ARRAY['leo','virgo']::text[], ARRAY['sun']::text[], '[{"sign":"aries","decadeIndex":2},{"sign":"gemini","decadeIndex":3},{"sign":"virgo","decadeIndex":1},{"sign":"scorpio","decadeIndex":2},{"sign":"capricorn","decadeIndex":3}]'::jsonb, ARRAY[8,9,19]::integer[], ARRAY['health_root','health_sacral']::text[], ARRAY['career','luck','health']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('agat', 'Агат', 'Агат — слоистая полосчатая разновидность халцедона. В традиции камень чаще всего используют как талисман для гармонии и спокойствия, защита от негатива. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['серый','полосчатый']::text[], ARRAY['gemini','virgo']::text[], ARRAY['mercury']::text[], '[{"sign":"taurus","decadeIndex":1},{"sign":"cancer","decadeIndex":2},{"sign":"virgo","decadeIndex":3},{"sign":"sagittarius","decadeIndex":1},{"sign":"aquarius","decadeIndex":2}]'::jsonb, ARRAY[1,6,9]::integer[], ARRAY['health_root']::text[], ARRAY['harmony','protection']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('oniks', 'Оникс', 'Оникс — однотонная чёрная (или чёрно-белая полосчатая) разновидность халцедона. В традиции камень чаще всего используют как талисман защита от негатива, для карьеры и успеха. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['чёрный']::text[], ARRAY['leo','capricorn']::text[], ARRAY['saturn']::text[], '[{"sign":"taurus","decadeIndex":3},{"sign":"leo","decadeIndex":1},{"sign":"libra","decadeIndex":2},{"sign":"sagittarius","decadeIndex":3},{"sign":"pisces","decadeIndex":1}]'::jsonb, ARRAY[8,15,21]::integer[], ARRAY['health_root']::text[], ARRAY['protection','career']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('yashma-krasnaya', 'Яшма красная', 'Яшма красная — непрозрачная плотная микрозернистая разновидность кварца (халцедон/кварцит) с высоким содержанием оксидов железа. В традиции камень чаще всего используют как талисман защита от негатива, для здоровья. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['красный']::text[], ARRAY['scorpio']::text[], ARRAY['mars']::text[], '[{"sign":"aries","decadeIndex":1},{"sign":"gemini","decadeIndex":2},{"sign":"leo","decadeIndex":3},{"sign":"scorpio","decadeIndex":1},{"sign":"capricorn","decadeIndex":2},{"sign":"pisces","decadeIndex":3}]'::jsonb, ARRAY[13,16]::integer[], ARRAY['health_root']::text[], ARRAY['protection','health']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('yashma-zelenaya', 'Яшма зелёная', 'Яшма зелёная — непрозрачная микрозернистая кварцевая порода, зелёный оттенок дают силикаты железа. В традиции камень чаще всего используют как талисман для здоровья, для гармонии и спокойствия. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['зелёный']::text[], ARRAY['virgo']::text[], ARRAY['venus']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"cancer","decadeIndex":1},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":3},{"sign":"aquarius","decadeIndex":1}]'::jsonb, ARRAY[3,9]::integer[], ARRAY['health_heart']::text[], ARRAY['health','harmony']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('hrizopraz', 'Хризопраз', 'Хризопраз — яблочно-зелёная разновидность халцедона, окраска связана с примесью никеля. В традиции камень чаще всего используют как талисман на любовь и отношения, на удачу. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['зелёный']::text[], ARRAY['taurus']::text[], ARRAY['venus']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"cancer","decadeIndex":1},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":3},{"sign":"aquarius","decadeIndex":1}]'::jsonb, ARRAY[3,5]::integer[], ARRAY['health_heart']::text[], ARRAY['love','luck']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('almaz', 'Алмаз', 'Алмаз — кристаллическая форма углерода, самый твёрдый природный минерал (10 по шкале Мооса). В традиции камень чаще всего используют как талисман защита от негатива, для карьеры и успеха. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['бесцветный']::text[], ARRAY['aries','leo']::text[], ARRAY['venus','sun']::text[], '[{"sign":"aries","decadeIndex":2},{"sign":"aries","decadeIndex":3},{"sign":"gemini","decadeIndex":3},{"sign":"cancer","decadeIndex":1},{"sign":"virgo","decadeIndex":1},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":2},{"sign":"scorpio","decadeIndex":3},{"sign":"capricorn","decadeIndex":3},{"sign":"aquarius","decadeIndex":1}]'::jsonb, ARRAY[3,4,8,19]::integer[], ARRAY['health_crown']::text[], ARRAY['protection','career']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('rubin', 'Рубин', 'Рубин — красная разновидность корунда, окраска — от примеси хрома. В традиции камень чаще всего используют как талисман для карьеры и успеха, на удачу, защита от негатива. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['красный']::text[], ARRAY['leo']::text[], ARRAY['sun']::text[], '[{"sign":"aries","decadeIndex":2},{"sign":"gemini","decadeIndex":3},{"sign":"virgo","decadeIndex":1},{"sign":"scorpio","decadeIndex":2},{"sign":"capricorn","decadeIndex":3}]'::jsonb, ARRAY[8,19]::integer[], ARRAY['health_root']::text[], ARRAY['career','luck','protection']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('sapfir-sinij', 'Сапфир синий', 'Сапфир синий — синяя разновидность корунда, окраска — от примесей железа и титана. В традиции камень чаще всего используют как талисман для мудрости и интуиции, для карьеры и успеха. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['синий']::text[], ARRAY['virgo','libra']::text[], ARRAY['saturn']::text[], '[{"sign":"taurus","decadeIndex":3},{"sign":"leo","decadeIndex":1},{"sign":"libra","decadeIndex":2},{"sign":"sagittarius","decadeIndex":3},{"sign":"pisces","decadeIndex":1}]'::jsonb, ARRAY[9,11,21]::integer[], ARRAY['health_third_eye']::text[], ARRAY['wisdom','career']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('sapfir-zheltyj', 'Сапфир жёлтый', 'Сапфир жёлтый — жёлтая разновидность корунда. В традиции камень чаще всего используют как талисман на деньги и достаток, для мудрости и интуиции. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['жёлтый']::text[], ARRAY['sagittarius']::text[], ARRAY['jupiter']::text[], '[{"sign":"gemini","decadeIndex":1},{"sign":"leo","decadeIndex":2},{"sign":"libra","decadeIndex":3},{"sign":"capricorn","decadeIndex":1},{"sign":"pisces","decadeIndex":2}]'::jsonb, ARRAY[10,14]::integer[], ARRAY['health_solar_plexus']::text[], ARRAY['money','wisdom']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('izumrud', 'Изумруд', 'Изумруд — зелёная разновидность берилла, окраска — от примеси хрома/ванадия. В традиции камень чаще всего используют как талисман для мудрости и интуиции, на любовь и отношения, для гармонии и спокойствия. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['зелёный']::text[], ARRAY['taurus','cancer']::text[], ARRAY['mercury','venus']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"taurus","decadeIndex":1},{"sign":"cancer","decadeIndex":1},{"sign":"cancer","decadeIndex":2},{"sign":"virgo","decadeIndex":2},{"sign":"virgo","decadeIndex":3},{"sign":"scorpio","decadeIndex":3},{"sign":"sagittarius","decadeIndex":1},{"sign":"aquarius","decadeIndex":1},{"sign":"aquarius","decadeIndex":2}]'::jsonb, ARRAY[1,3,5,7]::integer[], ARRAY['health_heart']::text[], ARRAY['wisdom','love','harmony']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('aleksandrit', 'Александрит', 'Александрит — разновидность хризоберилла, меняющая цвет при разном освещении (эффект александрита). Отдельные детали этого факта требуют проверки заказчиком/редакцией перед публичным запуском. В традиции камень чаще всего используют как талисман на удачу, для гармонии и спокойствия. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['зелёный','красный']::text[], ARRAY['gemini']::text[], ARRAY['mercury']::text[], '[{"sign":"taurus","decadeIndex":1},{"sign":"cancer","decadeIndex":2},{"sign":"virgo","decadeIndex":3},{"sign":"sagittarius","decadeIndex":1},{"sign":"aquarius","decadeIndex":2}]'::jsonb, ARRAY[1,6]::integer[], ARRAY['health_root','health_heart']::text[], ARRAY['luck','harmony']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('topaz-goluboj', 'Топаз голубой', 'Топаз голубой — голубая разновидность топаза (природная либо облагороженная облучением/нагревом). В традиции камень чаще всего используют как талисман для мудрости и интуиции, для карьеры и успеха. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['голубой']::text[], ARRAY['sagittarius']::text[], ARRAY['jupiter']::text[], '[{"sign":"gemini","decadeIndex":1},{"sign":"leo","decadeIndex":2},{"sign":"libra","decadeIndex":3},{"sign":"capricorn","decadeIndex":1},{"sign":"pisces","decadeIndex":2}]'::jsonb, ARRAY[10,14]::integer[], ARRAY['health_throat']::text[], ARRAY['wisdom','career']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('topaz-zolotistyj', 'Топаз золотистый (империал)', 'Топаз золотистый (империал) — редкая золотисто-оранжевая разновидность топаза. В традиции камень чаще всего используют как талисман на деньги и достаток, для карьеры и успеха. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['золотистый','оранжевый']::text[], ARRAY['sagittarius']::text[], ARRAY['sun']::text[], '[{"sign":"aries","decadeIndex":2},{"sign":"gemini","decadeIndex":3},{"sign":"virgo","decadeIndex":1},{"sign":"scorpio","decadeIndex":2},{"sign":"capricorn","decadeIndex":3}]'::jsonb, ARRAY[14,19]::integer[], ARRAY['health_sacral','health_solar_plexus']::text[], ARRAY['money','career']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('akvamarin', 'Аквамарин', 'Аквамарин — голубовато-зелёная разновидность берилла. В традиции камень чаще всего используют как талисман для мудрости и интуиции, для гармонии и спокойствия, для здоровья. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['голубой']::text[], ARRAY['pisces','aries']::text[], ARRAY['neptune','moon']::text[], '[{"sign":"taurus","decadeIndex":2},{"sign":"cancer","decadeIndex":3},{"sign":"libra","decadeIndex":1},{"sign":"sagittarius","decadeIndex":2},{"sign":"aquarius","decadeIndex":3}]'::jsonb, ARRAY[2,4,18]::integer[], ARRAY['health_throat']::text[], ARRAY['wisdom','harmony','health']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('turmalin-rozovyj', 'Турмалин розовый (рубеллит)', 'Турмалин розовый (рубеллит) — розово-малиновая разновидность турмалина. В традиции камень чаще всего используют как талисман на любовь и отношения. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['розовый']::text[], ARRAY['libra']::text[], ARRAY['venus']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"cancer","decadeIndex":1},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":3},{"sign":"aquarius","decadeIndex":1}]'::jsonb, ARRAY[3,11]::integer[], ARRAY['health_heart']::text[], ARRAY['love']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('turmalin-zelenyj', 'Турмалин зелёный (верделит)', 'Турмалин зелёный (верделит) — зелёная разновидность турмалина. В традиции камень чаще всего используют как талисман на деньги и достаток, для здоровья. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['зелёный']::text[], ARRAY['taurus']::text[], ARRAY['venus']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"cancer","decadeIndex":1},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":3},{"sign":"aquarius","decadeIndex":1}]'::jsonb, ARRAY[3,5]::integer[], ARRAY['health_heart']::text[], ARRAY['money','health']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('turmalin-chernyj', 'Турмалин чёрный (шерл)', 'Турмалин чёрный (шерл) — самая распространённая разновидность турмалина, богатая железом. В традиции камень чаще всего используют как талисман защита от негатива. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['чёрный']::text[], ARRAY['capricorn']::text[], ARRAY['saturn']::text[], '[{"sign":"taurus","decadeIndex":3},{"sign":"leo","decadeIndex":1},{"sign":"libra","decadeIndex":2},{"sign":"sagittarius","decadeIndex":3},{"sign":"pisces","decadeIndex":1}]'::jsonb, ARRAY[15,21]::integer[], ARRAY['health_root']::text[], ARRAY['protection']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('peridot', 'Перидот (хризолит)', 'Перидот (хризолит) — ювелирная разновидность минерала оливина. В традиции камень чаще всего используют как талисман на деньги и достаток, для гармонии и спокойствия. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['зелёный']::text[], ARRAY['libra','virgo']::text[], ARRAY['venus']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"cancer","decadeIndex":1},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":3},{"sign":"aquarius","decadeIndex":1}]'::jsonb, ARRAY[3,9,11]::integer[], ARRAY['health_heart']::text[], ARRAY['money','harmony']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('granat-almandin', 'Гранат альмандин', 'Гранат альмандин — железисто-алюминиевая разновидность граната, самая распространённая ювелирная. В традиции камень чаще всего используют как талисман защита от негатива, для карьеры и успеха. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['красный','бордовый']::text[], ARRAY['capricorn','aquarius']::text[], ARRAY['mars']::text[], '[{"sign":"aries","decadeIndex":1},{"sign":"gemini","decadeIndex":2},{"sign":"leo","decadeIndex":3},{"sign":"scorpio","decadeIndex":1},{"sign":"capricorn","decadeIndex":2},{"sign":"pisces","decadeIndex":3}]'::jsonb, ARRAY[15,16,17]::integer[], ARRAY['health_root']::text[], ARRAY['protection','career']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('granat-pirop', 'Гранат пироп', 'Гранат пироп — магниево-алюминиевая разновидность граната глубокого красного цвета. В традиции камень чаще всего используют как талисман защита от негатива, на удачу. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['красный']::text[], ARRAY['scorpio']::text[], ARRAY['mars']::text[], '[{"sign":"aries","decadeIndex":1},{"sign":"gemini","decadeIndex":2},{"sign":"leo","decadeIndex":3},{"sign":"scorpio","decadeIndex":1},{"sign":"capricorn","decadeIndex":2},{"sign":"pisces","decadeIndex":3}]'::jsonb, ARRAY[13,16]::integer[], ARRAY['health_root']::text[], ARRAY['protection','luck']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('opal-belyj', 'Опал белый', 'Опал белый — аморфный гидратированный кремнезём с характерной радужной игрой цвета (опалесценцией). В традиции камень чаще всего используют как талисман на любовь и отношения, на удачу. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['белый','радужный']::text[], ARRAY['libra','pisces']::text[], ARRAY['venus']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"cancer","decadeIndex":1},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":3},{"sign":"aquarius","decadeIndex":1}]'::jsonb, ARRAY[3,11,18]::integer[], ARRAY['health_crown']::text[], ARRAY['love','luck']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('opal-ognennyj', 'Опал огненный', 'Опал огненный — прозрачная-полупрозрачная оранжево-красная разновидность опала. В традиции камень чаще всего используют как талисман для карьеры и успеха, на удачу. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['оранжевый','красный']::text[], ARRAY['leo']::text[], ARRAY['sun']::text[], '[{"sign":"aries","decadeIndex":2},{"sign":"gemini","decadeIndex":3},{"sign":"virgo","decadeIndex":1},{"sign":"scorpio","decadeIndex":2},{"sign":"capricorn","decadeIndex":3}]'::jsonb, ARRAY[8,19]::integer[], ARRAY['health_root','health_sacral']::text[], ARRAY['career','luck']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('lunnyj-kamen', 'Лунный камень (адуляр)', 'Лунный камень (адуляр) — разновидность полевого шпата (ортоклаза) с характерным сине-белым переливом (адуляресценцией). В традиции камень чаще всего используют как талисман на любовь и отношения, для гармонии и спокойствия. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['белый','голубоватый']::text[], ARRAY['cancer','pisces']::text[], ARRAY['moon']::text[], '[{"sign":"taurus","decadeIndex":2},{"sign":"cancer","decadeIndex":3},{"sign":"libra","decadeIndex":1},{"sign":"sagittarius","decadeIndex":2},{"sign":"aquarius","decadeIndex":3}]'::jsonb, ARRAY[2,7,18]::integer[], ARRAY['health_throat','health_crown']::text[], ARRAY['love','harmony']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('solnechnyj-kamen', 'Солнечный камень (гелиолит)', 'Солнечный камень (гелиолит) — разновидность полевого шпата с металлическим блеском от включений гематита/гётита. В традиции камень чаще всего используют как талисман для карьеры и успеха, на удачу. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['оранжевый','золотистый']::text[], ARRAY['leo']::text[], ARRAY['sun']::text[], '[{"sign":"aries","decadeIndex":2},{"sign":"gemini","decadeIndex":3},{"sign":"virgo","decadeIndex":1},{"sign":"scorpio","decadeIndex":2},{"sign":"capricorn","decadeIndex":3}]'::jsonb, ARRAY[8,19]::integer[], ARRAY['health_sacral','health_solar_plexus']::text[], ARRAY['career','luck']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('labradorit', 'Лабрадорит', 'Лабрадорит — разновидность полевого шпата с характерной радужной иризацией (лабрадоресценцией). В традиции камень чаще всего используют как талисман защита от негатива, для мудрости и интуиции. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['серый','синий']::text[], ARRAY['scorpio']::text[], ARRAY['saturn','uranus']::text[], '[{"sign":"taurus","decadeIndex":3},{"sign":"leo","decadeIndex":1},{"sign":"libra","decadeIndex":2},{"sign":"sagittarius","decadeIndex":3},{"sign":"pisces","decadeIndex":1}]'::jsonb, ARRAY[13,21]::integer[], ARRAY['health_root','health_third_eye']::text[], ARRAY['protection','wisdom']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('malahit', 'Малахит', 'Малахит — карбонат меди, узнаваемый по концентрическим зелёным полосам. В традиции камень чаще всего используют как талисман защита от негатива, на деньги и достаток. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['зелёный']::text[], ARRAY['scorpio','capricorn']::text[], ARRAY['venus','pluto']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"cancer","decadeIndex":1},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":3},{"sign":"aquarius","decadeIndex":1}]'::jsonb, ARRAY[3,13,15]::integer[], ARRAY['health_heart']::text[], ARRAY['protection','money']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('biryuza', 'Бирюза', 'Бирюза — непрозрачный фосфат меди и алюминия, окраска — от меди. В традиции камень чаще всего используют как талисман защита от негатива, для карьеры и успеха, на удачу. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['голубой','бирюзовый']::text[], ARRAY['sagittarius']::text[], ARRAY['jupiter']::text[], '[{"sign":"gemini","decadeIndex":1},{"sign":"leo","decadeIndex":2},{"sign":"libra","decadeIndex":3},{"sign":"capricorn","decadeIndex":1},{"sign":"pisces","decadeIndex":2}]'::jsonb, ARRAY[10,14]::integer[], ARRAY['health_throat']::text[], ARRAY['protection','career','luck']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('lazurit', 'Лазурит (ляпис-лазурь)', 'Лазурит (ляпис-лазурь) — глубоко-синяя порода на основе минерала лазурита, часто с вкраплениями пирита. В традиции камень чаще всего используют как талисман для мудрости и интуиции, защита от негатива. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['синий']::text[], ARRAY['sagittarius']::text[], ARRAY['jupiter','saturn']::text[], '[{"sign":"taurus","decadeIndex":3},{"sign":"gemini","decadeIndex":1},{"sign":"leo","decadeIndex":1},{"sign":"leo","decadeIndex":2},{"sign":"libra","decadeIndex":2},{"sign":"libra","decadeIndex":3},{"sign":"sagittarius","decadeIndex":3},{"sign":"capricorn","decadeIndex":1},{"sign":"pisces","decadeIndex":1},{"sign":"pisces","decadeIndex":2}]'::jsonb, ARRAY[10,14,21]::integer[], ARRAY['health_third_eye']::text[], ARRAY['wisdom','protection']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('sodalit', 'Содалит', 'Содалит — минерал группы содалита, синий с белыми прожилками кальцита. В традиции камень чаще всего используют как талисман для мудрости и интуиции, для гармонии и спокойствия. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['синий']::text[], ARRAY['sagittarius']::text[], ARRAY['jupiter']::text[], '[{"sign":"gemini","decadeIndex":1},{"sign":"leo","decadeIndex":2},{"sign":"libra","decadeIndex":3},{"sign":"capricorn","decadeIndex":1},{"sign":"pisces","decadeIndex":2}]'::jsonb, ARRAY[10,14]::integer[], ARRAY['health_third_eye']::text[], ARRAY['wisdom','harmony']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('obsidian', 'Обсидиан', 'Обсидиан — вулканическое стекло, образуется при быстром остывании лавы. В традиции камень чаще всего используют как талисман защита от негатива. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['чёрный']::text[], ARRAY['scorpio','sagittarius']::text[], ARRAY['pluto','saturn']::text[], '[{"sign":"taurus","decadeIndex":3},{"sign":"leo","decadeIndex":1},{"sign":"libra","decadeIndex":2},{"sign":"sagittarius","decadeIndex":3},{"sign":"pisces","decadeIndex":1}]'::jsonb, ARRAY[13,14,21]::integer[], ARRAY['health_root']::text[], ARRAY['protection']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('gematit', 'Гематит', 'Гематит — оксид железа с характерным металлическим блеском. В традиции камень чаще всего используют как талисман защита от негатива, для карьеры и успеха. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['серый','чёрный']::text[], ARRAY['aries','aquarius']::text[], ARRAY['mars','saturn']::text[], '[{"sign":"aries","decadeIndex":1},{"sign":"taurus","decadeIndex":3},{"sign":"gemini","decadeIndex":2},{"sign":"leo","decadeIndex":1},{"sign":"leo","decadeIndex":3},{"sign":"libra","decadeIndex":2},{"sign":"scorpio","decadeIndex":1},{"sign":"sagittarius","decadeIndex":3},{"sign":"capricorn","decadeIndex":2},{"sign":"pisces","decadeIndex":1},{"sign":"pisces","decadeIndex":3}]'::jsonb, ARRAY[4,16,17,21]::integer[], ARRAY['health_root']::text[], ARRAY['protection','career']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('pirit', 'Пирит', 'Пирит — дисульфид железа с металлическим золотистым блеском («золото дураков»). В традиции камень чаще всего используют как талисман на деньги и достаток, защита от негатива. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['золотистый']::text[], ARRAY['leo']::text[], ARRAY['sun','mars']::text[], '[{"sign":"aries","decadeIndex":1},{"sign":"aries","decadeIndex":2},{"sign":"gemini","decadeIndex":2},{"sign":"gemini","decadeIndex":3},{"sign":"leo","decadeIndex":3},{"sign":"virgo","decadeIndex":1},{"sign":"scorpio","decadeIndex":1},{"sign":"scorpio","decadeIndex":2},{"sign":"capricorn","decadeIndex":2},{"sign":"capricorn","decadeIndex":3},{"sign":"pisces","decadeIndex":3}]'::jsonb, ARRAY[8,16,19]::integer[], ARRAY['health_solar_plexus']::text[], ARRAY['money','protection']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('nefrit', 'Нефрит', 'Нефрит — плотный минерал-агрегат (актинолит-тремолитовый ряд), одна из двух пород, называемых «нефритом». Отдельные детали этого факта требуют проверки заказчиком/редакцией перед публичным запуском. В традиции камень чаще всего используют как талисман для здоровья, для гармонии и спокойствия, на удачу. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['зелёный']::text[], ARRAY['taurus','libra']::text[], ARRAY['venus']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"cancer","decadeIndex":1},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":3},{"sign":"aquarius","decadeIndex":1}]'::jsonb, ARRAY[3,5,11]::integer[], ARRAY['health_heart']::text[], ARRAY['health','harmony','luck']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('zhadeit', 'Жадеит', 'Жадеит — пироксеновый минерал, вторая порода, называемая «нефритом» в быту (ювелирный «императорский жад»). Отдельные детали этого факта требуют проверки заказчиком/редакцией перед публичным запуском. В традиции камень чаще всего используют как талисман на удачу, на деньги и достаток. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['зелёный']::text[], ARRAY['taurus']::text[], ARRAY['venus']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"cancer","decadeIndex":1},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":3},{"sign":"aquarius","decadeIndex":1}]'::jsonb, ARRAY[3,5]::integer[], ARRAY['health_heart']::text[], ARRAY['luck','money']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('rodonit', 'Родонит', 'Родонит — силикат марганца с характерными чёрными прожилками (оксиды марганца). В традиции камень чаще всего используют как талисман на любовь и отношения, защита от негатива. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['розовый','малиновый']::text[], ARRAY['taurus']::text[], ARRAY['mars','venus']::text[], '[{"sign":"aries","decadeIndex":1},{"sign":"aries","decadeIndex":3},{"sign":"gemini","decadeIndex":2},{"sign":"cancer","decadeIndex":1},{"sign":"leo","decadeIndex":3},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":1},{"sign":"scorpio","decadeIndex":3},{"sign":"capricorn","decadeIndex":2},{"sign":"aquarius","decadeIndex":1},{"sign":"pisces","decadeIndex":3}]'::jsonb, ARRAY[3,5,16]::integer[], ARRAY['health_heart']::text[], ARRAY['love','protection']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('charoit', 'Чароит', 'Чароит — силикатный минерал сиреневых оттенков, известное месторождение — река Чара (Россия). В традиции камень чаще всего используют как талисман для мудрости и интуиции, защита от негатива. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['фиолетовый']::text[], ARRAY['scorpio']::text[], ARRAY['pluto']::text[], '[]'::jsonb, ARRAY[13]::integer[], ARRAY['health_crown']::text[], ARRAY['wisdom','protection']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('shungit', 'Шунгит', 'Шунгит — углеродсодержащая порода (месторождение — Карелия, Россия). В традиции камень чаще всего используют как талисман защита от негатива, для здоровья. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['чёрный']::text[], ARRAY['scorpio']::text[], ARRAY['saturn']::text[], '[{"sign":"taurus","decadeIndex":3},{"sign":"leo","decadeIndex":1},{"sign":"libra","decadeIndex":2},{"sign":"sagittarius","decadeIndex":3},{"sign":"pisces","decadeIndex":1}]'::jsonb, ARRAY[13,21]::integer[], ARRAY['health_root']::text[], ARRAY['protection','health']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('yantar', 'Янтарь', 'Янтарь — окаменевшая ископаемая смола хвойных деревьев (не минерал в строгом смысле). В традиции камень чаще всего используют как талисман для здоровья, на удачу, защита от негатива. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['жёлтый','оранжевый']::text[], ARRAY['leo']::text[], ARRAY['sun']::text[], '[{"sign":"aries","decadeIndex":2},{"sign":"gemini","decadeIndex":3},{"sign":"virgo","decadeIndex":1},{"sign":"scorpio","decadeIndex":2},{"sign":"capricorn","decadeIndex":3}]'::jsonb, ARRAY[8,19]::integer[], ARRAY['health_sacral','health_solar_plexus']::text[], ARRAY['health','luck','protection']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('zhemchug', 'Жемчуг', 'Жемчуг — органогенное образование (карбонат кальция) в раковинах моллюсков, не минерал. В традиции камень чаще всего используют как талисман на любовь и отношения, для гармонии и спокойствия. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['белый','кремовый']::text[], ARRAY['cancer']::text[], ARRAY['moon']::text[], '[{"sign":"taurus","decadeIndex":2},{"sign":"cancer","decadeIndex":3},{"sign":"libra","decadeIndex":1},{"sign":"sagittarius","decadeIndex":2},{"sign":"aquarius","decadeIndex":3}]'::jsonb, ARRAY[2,7]::integer[], ARRAY['health_crown']::text[], ARRAY['love','harmony']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('korall-krasnyj', 'Коралл красный', 'Коралл красный — известковый скелет колониальных морских полипов, не минерал. В традиции камень чаще всего используют как талисман защита от негатива, для здоровья. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['красный']::text[], ARRAY['scorpio']::text[], ARRAY['mars']::text[], '[{"sign":"aries","decadeIndex":1},{"sign":"gemini","decadeIndex":2},{"sign":"leo","decadeIndex":3},{"sign":"scorpio","decadeIndex":1},{"sign":"capricorn","decadeIndex":2},{"sign":"pisces","decadeIndex":3}]'::jsonb, ARRAY[13,16]::integer[], ARRAY['health_root']::text[], ARRAY['protection','health']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('koshachij-glaz', 'Кошачий глаз (хризоберилл)', 'Кошачий глаз (хризоберилл) — разновидность хризоберилла с эффектом «кошачьего глаза» (шелковистая полоса блика). В традиции камень чаще всего используют как талисман защита от негатива, на удачу. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['жёлто-зелёный']::text[], ARRAY['gemini']::text[], ARRAY['mercury']::text[], '[{"sign":"taurus","decadeIndex":1},{"sign":"cancer","decadeIndex":2},{"sign":"virgo","decadeIndex":3},{"sign":"sagittarius","decadeIndex":1},{"sign":"aquarius","decadeIndex":2}]'::jsonb, ARRAY[1,6]::integer[], ARRAY['health_solar_plexus']::text[], ARRAY['protection','luck']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('cirkon', 'Циркон', 'Циркон — силикат циркония, один из старейших минералов земной коры. В традиции камень чаще всего используют как талисман для мудрости и интуиции, для карьеры и успеха. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['бесцветный','голубой']::text[], ARRAY['sagittarius']::text[], ARRAY['jupiter']::text[], '[{"sign":"gemini","decadeIndex":1},{"sign":"leo","decadeIndex":2},{"sign":"libra","decadeIndex":3},{"sign":"capricorn","decadeIndex":1},{"sign":"pisces","decadeIndex":2}]'::jsonb, ARRAY[10,14]::integer[], ARRAY['health_throat','health_crown']::text[], ARRAY['wisdom','career']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('shpinel', 'Шпинель', 'Шпинель — оксид магния и алюминия, исторически часто путали с рубином. В традиции камень чаще всего используют как талисман для карьеры и успеха, защита от негатива. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['красный','розовый']::text[], ARRAY['leo']::text[], ARRAY['mars']::text[], '[{"sign":"aries","decadeIndex":1},{"sign":"gemini","decadeIndex":2},{"sign":"leo","decadeIndex":3},{"sign":"scorpio","decadeIndex":1},{"sign":"capricorn","decadeIndex":2},{"sign":"pisces","decadeIndex":3}]'::jsonb, ARRAY[8,16]::integer[], ARRAY['health_root','health_heart']::text[], ARRAY['career','protection']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('tanzanit', 'Танзанит', 'Танзанит — синевато-фиолетовая разновидность минерала цоизита, месторождение — только Танзания. Отдельные детали этого факта требуют проверки заказчиком/редакцией перед публичным запуском. В традиции камень чаще всего используют как талисман для мудрости и интуиции, для гармонии и спокойствия. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['синий','фиолетовый']::text[], ARRAY['sagittarius']::text[], ARRAY['jupiter']::text[], '[{"sign":"gemini","decadeIndex":1},{"sign":"leo","decadeIndex":2},{"sign":"libra","decadeIndex":3},{"sign":"capricorn","decadeIndex":1},{"sign":"pisces","decadeIndex":2}]'::jsonb, ARRAY[10,14]::integer[], ARRAY['health_third_eye','health_crown']::text[], ARRAY['wisdom','harmony']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('iolit', 'Иолит (кордиерит)', 'Иолит (кордиерит) — силикатный минерал с выраженным плеохроизмом (меняет цвет в зависимости от угла обзора). Отдельные детали этого факта требуют проверки заказчиком/редакцией перед публичным запуском. В традиции камень чаще всего используют как талисман для мудрости и интуиции. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['синий','фиолетовый']::text[], ARRAY['sagittarius']::text[], ARRAY['jupiter']::text[], '[{"sign":"gemini","decadeIndex":1},{"sign":"leo","decadeIndex":2},{"sign":"libra","decadeIndex":3},{"sign":"capricorn","decadeIndex":1},{"sign":"pisces","decadeIndex":2}]'::jsonb, ARRAY[10,14]::integer[], ARRAY['health_third_eye','health_crown']::text[], ARRAY['wisdom']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('kianit', 'Кианит (дистен)', 'Кианит (дистен) — силикат алюминия с анизотропной твёрдостью (разной по разным направлениям кристалла). В традиции камень чаще всего используют как талисман для гармонии и спокойствия, для мудрости и интуиции. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['синий']::text[], ARRAY['libra','taurus']::text[], ARRAY['venus']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"cancer","decadeIndex":1},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":3},{"sign":"aquarius","decadeIndex":1}]'::jsonb, ARRAY[3,5,11]::integer[], ARRAY['health_third_eye']::text[], ARRAY['harmony','wisdom']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('ametrin', 'Аметрин', 'Аметрин — кварц, сочетающий в одном кристалле зоны аметиста и цитрина. В традиции камень чаще всего используют как талисман для гармонии и спокойствия, на деньги и достаток. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['фиолетовый','жёлтый']::text[], ARRAY['libra']::text[], ARRAY['venus','mercury']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"taurus","decadeIndex":1},{"sign":"cancer","decadeIndex":1},{"sign":"cancer","decadeIndex":2},{"sign":"virgo","decadeIndex":2},{"sign":"virgo","decadeIndex":3},{"sign":"scorpio","decadeIndex":3},{"sign":"sagittarius","decadeIndex":1},{"sign":"aquarius","decadeIndex":1},{"sign":"aquarius","decadeIndex":2}]'::jsonb, ARRAY[1,3,11]::integer[], ARRAY['health_solar_plexus','health_crown']::text[], ARRAY['harmony','money']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('praziolit', 'Празиолит', 'Празиолит — зелёная разновидность кварца, чаще всего получается термообработкой аметиста. В традиции камень чаще всего используют как талисман для здоровья, для гармонии и спокойствия. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['зелёный']::text[], ARRAY['virgo']::text[], ARRAY['mercury']::text[], '[{"sign":"taurus","decadeIndex":1},{"sign":"cancer","decadeIndex":2},{"sign":"virgo","decadeIndex":3},{"sign":"sagittarius","decadeIndex":1},{"sign":"aquarius","decadeIndex":2}]'::jsonb, ARRAY[1,9]::integer[], ARRAY['health_heart']::text[], ARRAY['health','harmony']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('geliotrop', 'Гелиотроп (кровавик)', 'Гелиотроп (кровавик) — тёмно-зелёная разновидность халцедона с красными вкраплениями оксида железа. В традиции камень чаще всего используют как талисман защита от негатива, для здоровья. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['зелёный','красный']::text[], ARRAY['aries','pisces']::text[], ARRAY['mars']::text[], '[{"sign":"aries","decadeIndex":1},{"sign":"gemini","decadeIndex":2},{"sign":"leo","decadeIndex":3},{"sign":"scorpio","decadeIndex":1},{"sign":"capricorn","decadeIndex":2},{"sign":"pisces","decadeIndex":3}]'::jsonb, ARRAY[4,16,18]::integer[], ARRAY['health_root','health_heart']::text[], ARRAY['protection','health']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('flyuorit', 'Флюорит', 'Флюорит — фторид кальция, один из самых разнообразных по окраске минералов. В традиции камень чаще всего используют как талисман для мудрости и интуиции, для гармонии и спокойствия. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['фиолетовый','зелёный']::text[], ARRAY['pisces','capricorn']::text[], ARRAY['neptune']::text[], '[]'::jsonb, ARRAY[15,18]::integer[], ARRAY['health_heart','health_crown']::text[], ARRAY['wisdom','harmony']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('selenit', 'Селенит', 'Селенит — прозрачная волокнистая разновидность гипса с шелковистым блеском. В традиции камень чаще всего используют как талисман для гармонии и спокойствия, защита от негатива. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['белый']::text[], ARRAY['cancer','taurus']::text[], ARRAY['moon']::text[], '[{"sign":"taurus","decadeIndex":2},{"sign":"cancer","decadeIndex":3},{"sign":"libra","decadeIndex":1},{"sign":"sagittarius","decadeIndex":2},{"sign":"aquarius","decadeIndex":3}]'::jsonb, ARRAY[2,5,7]::integer[], ARRAY['health_crown']::text[], ARRAY['harmony','protection']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('kalcit-oranzhevyj', 'Кальцит оранжевый', 'Кальцит оранжевый — карбонат кальция, один из самых распространённых минералов земной коры. В традиции камень чаще всего используют как талисман для карьеры и успеха, на удачу. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['оранжевый']::text[], ARRAY['leo']::text[], ARRAY['sun']::text[], '[{"sign":"aries","decadeIndex":2},{"sign":"gemini","decadeIndex":3},{"sign":"virgo","decadeIndex":1},{"sign":"scorpio","decadeIndex":2},{"sign":"capricorn","decadeIndex":3}]'::jsonb, ARRAY[8,19]::integer[], ARRAY['health_sacral']::text[], ARRAY['career','luck']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('apatit-sinij', 'Апатит синий', 'Апатит синий — фосфатный минерал, синяя ювелирная разновидность. В традиции камень чаще всего используют как талисман для мудрости и интуиции, для карьеры и успеха. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['синий']::text[], ARRAY['gemini']::text[], ARRAY['mercury']::text[], '[{"sign":"taurus","decadeIndex":1},{"sign":"cancer","decadeIndex":2},{"sign":"virgo","decadeIndex":3},{"sign":"sagittarius","decadeIndex":1},{"sign":"aquarius","decadeIndex":2}]'::jsonb, ARRAY[1,6]::integer[], ARRAY['health_third_eye']::text[], ARRAY['wisdom','career']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('morganit', 'Морганит', 'Морганит — розовая разновидность берилла, окраска — от примеси марганца. В традиции камень чаще всего используют как талисман на любовь и отношения. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['розовый']::text[], ARRAY['taurus']::text[], ARRAY['venus']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"cancer","decadeIndex":1},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":3},{"sign":"aquarius","decadeIndex":1}]'::jsonb, ARRAY[3,5]::integer[], ARRAY['health_heart']::text[], ARRAY['love']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('kuncit', 'Кунцит', 'Кунцит — розово-сиреневая разновидность минерала сподумена. В традиции камень чаще всего используют как талисман на любовь и отношения, для гармонии и спокойствия. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['розовый','сиреневый']::text[], ARRAY['taurus','libra']::text[], ARRAY['venus']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"cancer","decadeIndex":1},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":3},{"sign":"aquarius","decadeIndex":1}]'::jsonb, ARRAY[3,5,11]::integer[], ARRAY['health_heart','health_third_eye']::text[], ARRAY['love','harmony']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('govlit', 'Говлит белый', 'Говлит белый — борат кальция с характерным сетчатым узором прожилок, часто окрашивается для имитации бирюзы. В традиции камень чаще всего используют как талисман для гармонии и спокойствия, для здоровья. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['белый']::text[], ARRAY['virgo']::text[], ARRAY['mercury']::text[], '[{"sign":"taurus","decadeIndex":1},{"sign":"cancer","decadeIndex":2},{"sign":"virgo","decadeIndex":3},{"sign":"sagittarius","decadeIndex":1},{"sign":"aquarius","decadeIndex":2}]'::jsonb, ARRAY[1,9]::integer[], ARRAY['health_crown']::text[], ARRAY['harmony','health']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('magnezit', 'Магнезит', 'Магнезит — карбонат магния. В традиции камень чаще всего используют как талисман для гармонии и спокойствия. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['белый']::text[], ARRAY['virgo']::text[], ARRAY['mercury']::text[], '[{"sign":"taurus","decadeIndex":1},{"sign":"cancer","decadeIndex":2},{"sign":"virgo","decadeIndex":3},{"sign":"sagittarius","decadeIndex":1},{"sign":"aquarius","decadeIndex":2}]'::jsonb, ARRAY[1,9]::integer[], ARRAY['health_crown']::text[], ARRAY['harmony']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('sugilit', 'Сугилит', 'Сугилит — редкий силикатный минерал насыщенно-фиолетового цвета. В традиции камень чаще всего используют как талисман для мудрости и интуиции, защита от негатива. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['фиолетовый']::text[], ARRAY['pisces']::text[], ARRAY['neptune','uranus']::text[], '[]'::jsonb, ARRAY[18]::integer[], ARRAY['health_crown']::text[], ARRAY['wisdom','protection']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('unakit', 'Унакит', 'Унакит — метаморфическая порода, смесь эпидота (зелёный) и полевого шпата (розовый). В традиции камень чаще всего используют как талисман для здоровья, для гармонии и спокойствия. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['зелёный','розовый']::text[], ARRAY['scorpio']::text[], ARRAY['mars','venus']::text[], '[{"sign":"aries","decadeIndex":1},{"sign":"aries","decadeIndex":3},{"sign":"gemini","decadeIndex":2},{"sign":"cancer","decadeIndex":1},{"sign":"leo","decadeIndex":3},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":1},{"sign":"scorpio","decadeIndex":3},{"sign":"capricorn","decadeIndex":2},{"sign":"aquarius","decadeIndex":1},{"sign":"pisces","decadeIndex":3}]'::jsonb, ARRAY[3,13,16]::integer[], ARRAY['health_heart']::text[], ARRAY['health','harmony']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('lepidolit', 'Лепидолит', 'Лепидолит — литиевая слюда сиреневого цвета. В традиции камень чаще всего используют как талисман для гармонии и спокойствия. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['сиреневый']::text[], ARRAY['libra']::text[], ARRAY['venus']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"cancer","decadeIndex":1},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":3},{"sign":"aquarius","decadeIndex":1}]'::jsonb, ARRAY[3,11]::integer[], ARRAY['health_third_eye']::text[], ARRAY['harmony']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('zmeevik', 'Змеевик (серпентин)', 'Змеевик (серпентин) — группа силикатных минералов с рисунком, напоминающим змеиную кожу. В традиции камень чаще всего используют как талисман защита от негатива, для здоровья. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['зелёный']::text[], ARRAY['gemini','virgo']::text[], ARRAY['mercury']::text[], '[{"sign":"taurus","decadeIndex":1},{"sign":"cancer","decadeIndex":2},{"sign":"virgo","decadeIndex":3},{"sign":"sagittarius","decadeIndex":1},{"sign":"aquarius","decadeIndex":2}]'::jsonb, ARRAY[1,6,9]::integer[], ARRAY['health_heart']::text[], ARRAY['protection','health']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('agat-mohovyj', 'Агат моховый', 'Агат моховый — разновидность халцедона с включениями хлорита/роговой обманки, напоминающими мох. В традиции камень чаще всего используют как талисман для гармонии и спокойствия, для здоровья. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['зелёный']::text[], ARRAY['virgo']::text[], ARRAY['mercury','venus']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"taurus","decadeIndex":1},{"sign":"cancer","decadeIndex":1},{"sign":"cancer","decadeIndex":2},{"sign":"virgo","decadeIndex":2},{"sign":"virgo","decadeIndex":3},{"sign":"scorpio","decadeIndex":3},{"sign":"sagittarius","decadeIndex":1},{"sign":"aquarius","decadeIndex":1},{"sign":"aquarius","decadeIndex":2}]'::jsonb, ARRAY[1,3,9]::integer[], ARRAY['health_heart']::text[], ARRAY['harmony','health']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('agat-ognennyj', 'Агат огненный', 'Агат огненный — разновидность халцедона с иризацией в тёплых тонах. В традиции камень чаще всего используют как талисман защита от негатива, для карьеры и успеха. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['красный','оранжевый']::text[], ARRAY['aries']::text[], ARRAY['mars']::text[], '[{"sign":"aries","decadeIndex":1},{"sign":"gemini","decadeIndex":2},{"sign":"leo","decadeIndex":3},{"sign":"scorpio","decadeIndex":1},{"sign":"capricorn","decadeIndex":2},{"sign":"pisces","decadeIndex":3}]'::jsonb, ARRAY[4,16]::integer[], ARRAY['health_root','health_sacral']::text[], ARRAY['protection','career']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('geliodor', 'Гелиодор', 'Гелиодор — золотисто-жёлтая разновидность берилла. В традиции камень чаще всего используют как талисман для карьеры и успеха, на удачу. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['жёлтый']::text[], ARRAY['leo']::text[], ARRAY['sun']::text[], '[{"sign":"aries","decadeIndex":2},{"sign":"gemini","decadeIndex":3},{"sign":"virgo","decadeIndex":1},{"sign":"scorpio","decadeIndex":2},{"sign":"capricorn","decadeIndex":3}]'::jsonb, ARRAY[8,19]::integer[], ARRAY['health_solar_plexus']::text[], ARRAY['career','luck']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('hrizokolla', 'Хризоколла', 'Хризоколла — силикат меди, часто сопутствует малахиту и бирюзе в медных месторождениях. В традиции камень чаще всего используют как талисман для гармонии и спокойствия, для здоровья. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['бирюзовый','синий']::text[], ARRAY['taurus']::text[], ARRAY['venus']::text[], '[{"sign":"aries","decadeIndex":3},{"sign":"cancer","decadeIndex":1},{"sign":"virgo","decadeIndex":2},{"sign":"scorpio","decadeIndex":3},{"sign":"aquarius","decadeIndex":1}]'::jsonb, ARRAY[3,5]::integer[], ARRAY['health_throat','health_third_eye']::text[], ARRAY['harmony','health']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';

INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")
VALUES ('azurit', 'Азурит', 'Азурит — карбонат меди насыщенно-синего цвета, часто сопутствует малахиту. В традиции камень чаще всего используют как талисман для мудрости и интуиции, защита от негатива. По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.', ARRAY['синий']::text[], ARRAY['sagittarius']::text[], ARRAY['jupiter']::text[], '[{"sign":"gemini","decadeIndex":1},{"sign":"leo","decadeIndex":2},{"sign":"libra","decadeIndex":3},{"sign":"capricorn","decadeIndex":1},{"sign":"pisces","decadeIndex":2}]'::jsonb, ARRAY[10,14]::integer[], ARRAY['health_third_eye']::text[], ARRAY['wisdom','protection']::text[], NULL, NULL, 'draft')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "properties_md" = EXCLUDED."properties_md",
  "colors" = EXCLUDED."colors",
  "zodiac_signs" = EXCLUDED."zodiac_signs",
  "planets" = EXCLUDED."planets",
  "decades" = EXCLUDED."decades",
  "arcana" = EXCLUDED."arcana",
  "chakras" = EXCLUDED."chakras",
  "purposes" = EXCLUDED."purposes",
  "updated_at" = now()
WHERE "stones"."status" = 'draft';
