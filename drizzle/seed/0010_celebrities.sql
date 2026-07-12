-- celebrities — стартовый малый набор Ф7 (20 записей, verified:false у всех).
-- СГЕНЕРИРОВАНО: tools/gen-celebrities.ts. НЕ редактировать руками — перегенерировать `pnpm data:celebrities`.
-- Остальные персоны (до сотни) — задача заказчика/редакции через POST /api/v1/celebrities/import
-- (см. tools/data/celebrities-import-template.csv) — агент их не выдумывает (§8 конвенций).
-- Идемпотентно: ON CONFLICT ("slug") DO UPDATE (структурные demo-данные, не редакционный контент).

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Альберт Эйнштейн', 'albert-eynshteyn', '{"date":"1879-03-14","time":null,"timeUnknown":true,"placeName":"Ульм, Германия","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует)."}'::jsonb, 'наука')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Вольфганг Амадей Моцарт', 'volfgang-amadey-motsart', '{"date":"1756-01-27","time":null,"timeUnknown":true,"placeName":"Зальцбург, Австрия","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует)."}'::jsonb, 'музыка')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Леонардо да Винчи', 'leonardo-da-vinchi', '{"date":"1452-04-15","time":null,"timeUnknown":true,"placeName":"Винчи, Италия","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует)."}'::jsonb, 'искусство')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Исаак Ньютон', 'isaak-nyuton', '{"date":"1643-01-04","time":null,"timeUnknown":true,"placeName":"Вулсторп, Англия","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует). Дата — по григорианскому календарю; по юлианскому (действовавшему в Англии тогда) — 25 декабря 1642."}'::jsonb, 'наука')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Уильям Шекспир', 'uilyam-shekspir', '{"date":"1564-04-23","time":null,"timeUnknown":true,"placeName":"Стратфорд-апон-Эйвон, Англия","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует). Точная дата рождения не задокументирована — традиционно принято 23 апреля 1564; достоверно известна лишь дата крещения (26 апреля 1564)."}'::jsonb, 'литература')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Марк Твен', 'mark-tven', '{"date":"1835-11-30","time":null,"timeUnknown":true,"placeName":"Флорида, Миссури, США","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует)."}'::jsonb, 'литература')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Александр Пушкин', 'aleksandr-pushkin', '{"date":"1799-06-06","time":null,"timeUnknown":true,"placeName":"Москва, Россия","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует). Дата — по новому стилю; по юлианскому календарю, действовавшему в России тогда, — 26 мая 1799."}'::jsonb, 'литература')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Лев Толстой', 'lev-tolstoy', '{"date":"1828-09-09","time":null,"timeUnknown":true,"placeName":"Ясная Поляна, Россия","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует). Дата — по новому стилю; по юлианскому календарю — 28 августа 1828."}'::jsonb, 'литература')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Фёдор Достоевский', 'fedor-dostoevskiy', '{"date":"1821-11-11","time":null,"timeUnknown":true,"placeName":"Москва, Россия","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует). Дата — по новому стилю; по юлианскому календарю — 30 октября 1821."}'::jsonb, 'литература')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Мария Кюри', 'mariya-kyuri', '{"date":"1867-11-07","time":null,"timeUnknown":true,"placeName":"Варшава, Польша","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует)."}'::jsonb, 'наука')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Чарльз Дарвин', 'charlz-darvin', '{"date":"1809-02-12","time":null,"timeUnknown":true,"placeName":"Шрусбери, Англия","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует)."}'::jsonb, 'наука')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Людвиг ван Бетховен', 'lyudvig-van-bethoven', '{"date":"1770-12-16","time":null,"timeUnknown":true,"placeName":"Бонн, Германия","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует). Точная дата рождения не задокументирована — известна дата крещения (17 декабря 1770), день рождения традиционно принимается за 16 декабря."}'::jsonb, 'музыка')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Уинстон Черчилль', 'uinston-cherchill', '{"date":"1874-11-30","time":null,"timeUnknown":true,"placeName":"Бленхеймский дворец, Англия","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует)."}'::jsonb, 'история')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Махатма Ганди', 'mahatma-gandi', '{"date":"1869-10-02","time":null,"timeUnknown":true,"placeName":"Порбандар, Индия","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует)."}'::jsonb, 'история')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Фрида Кало', 'frida-kalo', '{"date":"1907-07-06","time":null,"timeUnknown":true,"placeName":"Мехико, Мексика","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует). Сама Фрида Кало иногда указывала 1910 год (год начала Мексиканской революции) — историки принимают 1907 как фактический."}'::jsonb, 'искусство')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Никола Тесла', 'nikola-tesla', '{"date":"1856-07-10","time":null,"timeUnknown":true,"placeName":"Смилян, Австрийская империя (ныне Хорватия)","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует)."}'::jsonb, 'наука')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Стивен Хокинг', 'stiven-hoking', '{"date":"1942-01-08","time":null,"timeUnknown":true,"placeName":"Оксфорд, Англия","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует)."}'::jsonb, 'наука')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Уолт Дисней', 'uolt-disney', '{"date":"1901-12-05","time":null,"timeUnknown":true,"placeName":"Чикаго, США","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует)."}'::jsonb, 'кино')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Джейн Остин', 'dzheyn-ostin', '{"date":"1775-12-16","time":null,"timeUnknown":true,"placeName":"Стивентон, Англия","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует)."}'::jsonb, 'литература')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();

INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")
VALUES ('Агата Кристи', 'agata-kristi', '{"date":"1890-09-15","time":null,"timeUnknown":true,"placeName":"Торки, Англия","lat":null,"lon":null,"tzId":null,"rodden":"unknown","source":"Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.","verified":false,"note":"Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует)."}'::jsonb, 'литература')
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "birth_data" = EXCLUDED."birth_data",
  "category" = EXCLUDED."category",
  "updated_at" = now();
