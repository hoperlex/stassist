/**
 * Оффлайн data-step: наполняет `celebrities` МАЛЫМ стартовым набором ЯВНО общеизвестных
 * исторических фигур (см. §8 конвенций реализации — «список celebrities агент не выдумывает»,
 * findings f7.md MAJOR [content-provenance]).
 *
 * Методология (честно, ничего не придумано):
 *  - Отобраны 20 фигур, чья ДАТА рождения — общеизвестный энциклопедический факт (не требующий
 *    закрытого источника вроде Astro-Databank), сознательно БЕЗ ныне живущих политических фигур
 *    (юридическая чувствительность).
 *  - ВРЕМЯ рождения НЕ проставляется агентом (`time: null, timeUnknown: true, rodden: 'unknown'`)
 *    — это ровно та часть данных, где расхождения между источниками велики и без сверки с
 *    Astro-Databank/подобной базой её было бы недобросовестно фабриковать.
 *  - Координаты места (`lat`/`lon`/`tzId`) НЕ проставляются агентом — city-level геокодинг тоже
 *    требует внешнего источника; вместо выдумки — честный `null` (галерея это уважает: карточка
 *    показывает факт рождения текстом, но `hasEnoughDataToCompute=false`, честный empty-state
 *    вместо расчёта — см. промт Ф7: «Галерея/синастрия работают на том, что есть, с честным
 *    empty-state»).
 *  - `verified: false` на КАЖДОЙ записи — требует проверки заказчиком перед коммерческим
 *    использованием (юридическая ответственность за фактическую точность — на заказчике).
 *  - Для дат, где есть историческая неоднозначность (юлианский/григорианский календарь, точная
 *    дата не задокументирована и т.п.) — `note` объясняет её явно, не молчит.
 *
 * ОСТАЛЬНЫЕ ~80 персон (до сотни, упомянутых в промте) — НЕ выдумываются: вместо этого дан
 * МЕХАНИЗМ импорта (`POST /api/v1/celebrities/import`, роль admin, CSV по `celebrityCsvRowSchema`)
 * + плейсхолдер-шаблон `tools/data/celebrities-import-template.csv` с буквальными
 * `{{ЗАПОЛНИТ ЗАКАЗЧИК}}` — заказчик/редакция заполняют реальные проверенные записи.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CELEBRITY_PLACEHOLDER, type CelebrityBirthData } from '@stassist/shared';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_OUT_PATH = path.join(__dirname, 'data', 'celebrities.json');
const SEED_OUT_PATH = path.join(__dirname, '..', 'drizzle', 'seed', '0010_celebrities.sql');
const CSV_TEMPLATE_OUT_PATH = path.join(__dirname, 'data', 'celebrities-import-template.csv');

interface CelebritySeed {
  name: string;
  slug: string;
  category: string;
  birthData: CelebrityBirthData;
}

const COMMON_SOURCE = 'Общеизвестный энциклопедический факт (справочные издания/Wikipedia) — не сверено с Astro-Databank агентом.';
const COMMON_NOTE =
  'Требует проверки заказчиком/редакцией перед коммерческим использованием. Время рождения и координаты места ' +
  'намеренно не проставлены агентом (см. §8 конвенций реализации — риск точности, агент не фабрикует).';

const CELEBRITIES: readonly CelebritySeed[] = [
  { name: 'Альберт Эйнштейн', slug: 'albert-eynshteyn', category: 'наука', birthData: { date: '1879-03-14', time: null, timeUnknown: true, placeName: 'Ульм, Германия', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE } },
  { name: 'Вольфганг Амадей Моцарт', slug: 'volfgang-amadey-motsart', category: 'музыка', birthData: { date: '1756-01-27', time: null, timeUnknown: true, placeName: 'Зальцбург, Австрия', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE } },
  { name: 'Леонардо да Винчи', slug: 'leonardo-da-vinchi', category: 'искусство', birthData: { date: '1452-04-15', time: null, timeUnknown: true, placeName: 'Винчи, Италия', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE } },
  { name: 'Исаак Ньютон', slug: 'isaak-nyuton', category: 'наука', birthData: { date: '1643-01-04', time: null, timeUnknown: true, placeName: 'Вулсторп, Англия', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE + ' Дата — по григорианскому календарю; по юлианскому (действовавшему в Англии тогда) — 25 декабря 1642.' } },
  { name: 'Уильям Шекспир', slug: 'uilyam-shekspir', category: 'литература', birthData: { date: '1564-04-23', time: null, timeUnknown: true, placeName: 'Стратфорд-апон-Эйвон, Англия', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE + ' Точная дата рождения не задокументирована — традиционно принято 23 апреля 1564; достоверно известна лишь дата крещения (26 апреля 1564).' } },
  { name: 'Марк Твен', slug: 'mark-tven', category: 'литература', birthData: { date: '1835-11-30', time: null, timeUnknown: true, placeName: 'Флорида, Миссури, США', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE } },
  { name: 'Александр Пушкин', slug: 'aleksandr-pushkin', category: 'литература', birthData: { date: '1799-06-06', time: null, timeUnknown: true, placeName: 'Москва, Россия', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE + ' Дата — по новому стилю; по юлианскому календарю, действовавшему в России тогда, — 26 мая 1799.' } },
  { name: 'Лев Толстой', slug: 'lev-tolstoy', category: 'литература', birthData: { date: '1828-09-09', time: null, timeUnknown: true, placeName: 'Ясная Поляна, Россия', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE + ' Дата — по новому стилю; по юлианскому календарю — 28 августа 1828.' } },
  { name: 'Фёдор Достоевский', slug: 'fedor-dostoevskiy', category: 'литература', birthData: { date: '1821-11-11', time: null, timeUnknown: true, placeName: 'Москва, Россия', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE + ' Дата — по новому стилю; по юлианскому календарю — 30 октября 1821.' } },
  { name: 'Мария Кюри', slug: 'mariya-kyuri', category: 'наука', birthData: { date: '1867-11-07', time: null, timeUnknown: true, placeName: 'Варшава, Польша', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE } },
  { name: 'Чарльз Дарвин', slug: 'charlz-darvin', category: 'наука', birthData: { date: '1809-02-12', time: null, timeUnknown: true, placeName: 'Шрусбери, Англия', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE } },
  { name: 'Людвиг ван Бетховен', slug: 'lyudvig-van-bethoven', category: 'музыка', birthData: { date: '1770-12-16', time: null, timeUnknown: true, placeName: 'Бонн, Германия', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE + ' Точная дата рождения не задокументирована — известна дата крещения (17 декабря 1770), день рождения традиционно принимается за 16 декабря.' } },
  { name: 'Уинстон Черчилль', slug: 'uinston-cherchill', category: 'история', birthData: { date: '1874-11-30', time: null, timeUnknown: true, placeName: 'Бленхеймский дворец, Англия', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE } },
  { name: 'Махатма Ганди', slug: 'mahatma-gandi', category: 'история', birthData: { date: '1869-10-02', time: null, timeUnknown: true, placeName: 'Порбандар, Индия', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE } },
  { name: 'Фрида Кало', slug: 'frida-kalo', category: 'искусство', birthData: { date: '1907-07-06', time: null, timeUnknown: true, placeName: 'Мехико, Мексика', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE + ' Сама Фрида Кало иногда указывала 1910 год (год начала Мексиканской революции) — историки принимают 1907 как фактический.' } },
  { name: 'Никола Тесла', slug: 'nikola-tesla', category: 'наука', birthData: { date: '1856-07-10', time: null, timeUnknown: true, placeName: 'Смилян, Австрийская империя (ныне Хорватия)', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE } },
  { name: 'Стивен Хокинг', slug: 'stiven-hoking', category: 'наука', birthData: { date: '1942-01-08', time: null, timeUnknown: true, placeName: 'Оксфорд, Англия', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE } },
  { name: 'Уолт Дисней', slug: 'uolt-disney', category: 'кино', birthData: { date: '1901-12-05', time: null, timeUnknown: true, placeName: 'Чикаго, США', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE } },
  { name: 'Джейн Остин', slug: 'dzheyn-ostin', category: 'литература', birthData: { date: '1775-12-16', time: null, timeUnknown: true, placeName: 'Стивентон, Англия', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE } },
  { name: 'Агата Кристи', slug: 'agata-kristi', category: 'литература', birthData: { date: '1890-09-15', time: null, timeUnknown: true, placeName: 'Торки, Англия', lat: null, lon: null, tzId: null, rodden: 'unknown', source: COMMON_SOURCE, verified: false, note: COMMON_NOTE } },
];

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}
function sqlJsonb(value: unknown): string {
  return `${sqlString(JSON.stringify(value))}::jsonb`;
}

function buildSeedSql(records: readonly CelebritySeed[]): string {
  const lines: string[] = [
    `-- celebrities — стартовый малый набор Ф7 (${records.length} записей, verified:false у всех).`,
    '-- СГЕНЕРИРОВАНО: tools/gen-celebrities.ts. НЕ редактировать руками — перегенерировать `pnpm data:celebrities`.',
    '-- Остальные персоны (до сотни) — задача заказчика/редакции через POST /api/v1/celebrities/import',
    '-- (см. tools/data/celebrities-import-template.csv) — агент их не выдумывает (§8 конвенций).',
    '-- Идемпотентно: ON CONFLICT ("slug") DO UPDATE (структурные demo-данные, не редакционный контент).',
    '',
  ];
  for (const r of records) {
    lines.push(
      `INSERT INTO "celebrities" ("name", "slug", "birth_data", "category")`,
      `VALUES (${sqlString(r.name)}, ${sqlString(r.slug)}, ${sqlJsonb(r.birthData)}, ${sqlString(r.category)})`,
      `ON CONFLICT ("slug") DO UPDATE SET`,
      `  "name" = EXCLUDED."name",`,
      `  "birth_data" = EXCLUDED."birth_data",`,
      `  "category" = EXCLUDED."category",`,
      `  "updated_at" = now();`,
      '',
    );
  }
  return lines.join('\n');
}

function buildCsvTemplate(): string {
  const header = 'name,slug,category,wikiUrl,date,time,timeUnknown,placeName,lat,lon,tzId,rodden,source,verified,note';
  const placeholderRow = [
    CELEBRITY_PLACEHOLDER, CELEBRITY_PLACEHOLDER, CELEBRITY_PLACEHOLDER, '', CELEBRITY_PLACEHOLDER, '',
    'true', CELEBRITY_PLACEHOLDER, '', '', '', 'unknown', CELEBRITY_PLACEHOLDER, 'false', CELEBRITY_PLACEHOLDER,
  ].join(',');
  const exampleRow = [
    'Пример: Николай Коперник', 'primer-kopernik', 'наука', '', '1473-02-19', '', 'true',
    'Торунь, Польша', '', '', '', 'unknown', 'Пример строки — замените реальными проверенными данными', 'false', 'Пример формата, не реальная запись для импорта',
  ].join(',');
  return [header, placeholderRow, exampleRow].join('\n') + '\n';
}

async function main(): Promise<void> {
  const uniqueSlugs = new Set(CELEBRITIES.map((r) => r.slug));
  if (uniqueSlugs.size !== CELEBRITIES.length) throw new Error('gen-celebrities: обнаружены дублирующиеся slug');

  await mkdir(path.dirname(DATA_OUT_PATH), { recursive: true });
  await writeFile(DATA_OUT_PATH, JSON.stringify(CELEBRITIES, null, 2) + '\n', 'utf8');
  await writeFile(SEED_OUT_PATH, buildSeedSql(CELEBRITIES), 'utf8');
  await writeFile(CSV_TEMPLATE_OUT_PATH, buildCsvTemplate(), 'utf8');

  console.log(`Записано ${CELEBRITIES.length} знаменитостей (verified:false) → ${DATA_OUT_PATH} и ${SEED_OUT_PATH}`);
  console.log(`Шаблон CSV-импорта → ${CSV_TEMPLATE_OUT_PATH}`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
