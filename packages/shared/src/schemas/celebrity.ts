/**
 * Знаменитости (Ф7, M8.4 + программатический SEO-кластер `/karta/{celebrity}`, см. docs/
 * architecture/22-модель-данных.md §2, docs/roadmap/31-конвенции-реализации.md §8: «список 100
 * персон celebrities с датами рождения — агент НЕ выдумывает»). `birthData` (jsonb) хранит
 * ПУБЛИЧНЫЕ (не 🔒, не ПД частного лица) данные + метку достоверности:
 *  - `rodden` — рейтинг достоверности Astro-Databank (AA = свидетельство о рождении, A = цитата
 *    самой персоны/семьи, B = биография без источника, C = нет данных времени, DD = спорные
 *    данные, `unknown` — время не установлено этим агентом);
 *  - `verified` — ПРОШЁЛ ли факт человеческую проверку заказчиком/редакцией ПЕРЕД коммерческим
 *    использованием (см. §8 конвенций) — агент проставляет `false` даже для дат, которые считает
 *    общеизвестными, т.к. финальная юридическая/фактическая ответственность — за заказчиком;
 *  - `source` — откуда взята дата (текстовая атрибуция, не кликабельный аффилиат-трекинг).
 */
import { z } from 'zod';

export const CELEBRITY_RODDEN_RATINGS = ['AA', 'A', 'B', 'C', 'DD', 'unknown'] as const;
export const celebrityRoddenRatingSchema = z.enum(CELEBRITY_RODDEN_RATINGS);
export type CelebrityRoddenRating = z.infer<typeof celebrityRoddenRatingSchema>;

/** `date`/`time` — гражданские ISO-строки (`YYYY-MM-DD`/`HH:mm`), НЕ шифруются (публичные данные
 *  общественной фигуры, см. заголовок celebrities.ts). `time`/`lat`/`lon` — null, пока не заполнено
 *  (плейсхолдер `{{ЗАПОЛНИТ ЗАКАЗЧИК}}` — см. tools/gen-celebrities.ts). */
export const celebrityBirthDataSchema = z.object({
  date: z.string().nullable(),
  time: z.string().nullable(),
  timeUnknown: z.boolean().default(true),
  placeName: z.string().nullable(),
  lat: z.number().nullable(),
  lon: z.number().nullable(),
  tzId: z.string().nullable(),
  rodden: celebrityRoddenRatingSchema.default('unknown'),
  /** Свободный текст источника (напр. «Wikipedia, дата рождения — общеизвестный факт») ИЛИ
   *  буквально `{{ЗАПОЛНИТ ЗАКАЗЧИК}}` для не заполненных агентом карточек. */
  source: z.string().nullable(),
  verified: z.boolean().default(false),
  /** Заметка редакции/агента — почему verified=false, что именно нужно перепроверить. */
  note: z.string().nullable(),
});
export type CelebrityBirthData = z.infer<typeof celebrityBirthDataSchema>;

export const celebrityResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  birthData: celebrityBirthDataSchema.nullable(),
  category: z.string().nullable(),
  wikiUrl: z.string().nullable(),
  /** true — есть достаточно данных (дата + место), чтобы что-то посчитать (может быть без часов —
   *  тогда честная деградация «без домов», как и для обычных профилей, см. doc 20 §M0). */
  hasEnoughDataToCompute: z.boolean(),
});
export type CelebrityResponse = z.infer<typeof celebrityResponseSchema>;

export const celebrityListQuerySchema = z.object({
  category: z.string().optional(),
  q: z.string().min(1).max(100).optional(),
  // max=1000 — sitemap.xml запрашивает весь каталог одним вызовом (см. doc-комментарий
  // wiki.ts limit — тот же найденный smoke-тестом баг).
  limit: z.coerce.number().int().min(1).max(1000).default(60),
});
export type CelebrityListQuery = z.infer<typeof celebrityListQuerySchema>;

export const celebrityListResponseSchema = z.object({ items: z.array(celebrityResponseSchema), total: z.number().int() });
export type CelebrityListResponse = z.infer<typeof celebrityListResponseSchema>;

/** Строка CSV-импорта (req. «механизм импорта админ/CSV», см. tools/import-celebrities-csv.ts +
 *  apps/api routes/celebrities.ts `POST /import`, роль admin). Колонки — плоские (CSV-friendly). */
export const celebrityCsvRowSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().optional(),
  wikiUrl: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  timeUnknown: z.coerce.boolean().default(true),
  placeName: z.string().optional(),
  lat: z.coerce.number().optional(),
  lon: z.coerce.number().optional(),
  tzId: z.string().optional(),
  rodden: celebrityRoddenRatingSchema.default('unknown'),
  source: z.string().optional(),
  verified: z.coerce.boolean().default(false),
  note: z.string().optional(),
});
export type CelebrityCsvRow = z.infer<typeof celebrityCsvRowSchema>;

export const celebrityImportRequestSchema = z.object({ csv: z.string().min(1) });
export type CelebrityImportRequest = z.infer<typeof celebrityImportRequestSchema>;

export const celebrityImportResponseSchema = z.object({
  inserted: z.number().int(),
  updated: z.number().int(),
  errors: z.array(z.object({ row: z.number().int(), message: z.string() })),
});
export type CelebrityImportResponse = z.infer<typeof celebrityImportResponseSchema>;

/** Плейсхолдер-строка CSV — заказчик заполняет реальные данные (см. §8 конвенций реализации). */
export const CELEBRITY_PLACEHOLDER = '{{ЗАПОЛНИТ ЗАКАЗЧИК}}';
