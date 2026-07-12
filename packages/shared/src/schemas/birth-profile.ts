/**
 * Zod-схемы профилей рождения, геокодинга и расчётных пресетов — см. docs/architecture/
 * 22-модель-данных.md §2. `birthProfileInputSchema` намеренно принимает УЖЕ разрешённое место
 * (`place`: placeName/lat/lon/tzId), а не сырой текстовый запрос — геокодинг идёт отдельным
 * шагом через `GET /api/v1/geocode/suggest` (обёртка над Geocoder-портом + geocode_cache),
 * пользователь выбирает вариант из автодополнения (AntD AutoComplete), и уже выбранный результат
 * отправляется вместе с формой профиля. Это же поле используется для «фоллбэка ручного ввода
 * координат» (находка f2.md [geocoding]) — форма просто позволяет отредактировать `place`
 * руками, если автодополнение не нашло нужный вариант.
 */
import { z } from 'zod';

export const birthProfileKindSchema = z.enum(['self', 'other', 'celebrity']);
export type BirthProfileKind = z.infer<typeof birthProfileKindSchema>;

/** Зеркало `GeocodeResult` (ports/geocoder.ts) как zod-схема — контракт API-эндпоинта geocode. */
export const geocodeResultSchema = z.object({
  placeName: z.string().min(1),
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  tzId: z.string().min(1),
});
export type GeocodeResultDto = z.infer<typeof geocodeResultSchema>;

export const geocodeSuggestQuerySchema = z.object({
  q: z.string().trim().min(2, 'Минимум 2 символа'),
});
export type GeocodeSuggestQuery = z.infer<typeof geocodeSuggestQuerySchema>;

export const geocodeSuggestResponseSchema = z.array(geocodeResultSchema);

const birthDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Ожидается формат ГГГГ-ММ-ДД');
const birthTimeSchema = z
  .string()
  .regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Ожидается формат ЧЧ:ММ');

export const birthProfileInputSchema = z
  .object({
    label: z.string().trim().min(1, 'Укажите название профиля').max(100),
    kind: birthProfileKindSchema.default('self'),
    birthDate: birthDateSchema,
    birthTime: birthTimeSchema.optional(),
    timeUnknown: z.boolean().default(false),
    place: geocodeResultSchema,
    /** Расчётный пресет для натальной карты профиля — если не задан, берётся системный дефолт
     *  ('modern_western', см. packages/db/src/seed/system-calc-presets.ts). */
    presetId: z.string().uuid().optional(),
    gender: z.string().trim().max(50).optional(),
    notes: z.string().trim().max(2000).optional(),
  })
  .refine((d) => d.timeUnknown || Boolean(d.birthTime), {
    message: 'Укажите время рождения или отметьте «время неизвестно»',
    path: ['birthTime'],
  });
export type BirthProfileInput = z.infer<typeof birthProfileInputSchema>;

/** То, что API отдаёт владельцу профиля — уже РАСШИФРОВАННЫЕ 🔒-поля (см. crypto/pd-cipher.ts). */
export const birthProfileResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  label: z.string(),
  kind: birthProfileKindSchema,
  birthDate: z.string(),
  birthTime: z.string().nullable(),
  timeUnknown: z.boolean(),
  placeName: z.string(),
  lat: z.number(),
  lon: z.number(),
  tzId: z.string(),
  gender: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type BirthProfileResponse = z.infer<typeof birthProfileResponseSchema>;

// ---------------------------------------------------------------------------------------------
// 152-ФЗ: согласия
// ---------------------------------------------------------------------------------------------

export const consentKindSchema = z.enum(['pd_processing', 'marketing']);
export type ConsentKind = z.infer<typeof consentKindSchema>;

export const consentGrantRequestSchema = z.object({
  kind: consentKindSchema,
});
export type ConsentGrantRequest = z.infer<typeof consentGrantRequestSchema>;

export const consentResponseSchema = z.object({
  id: z.string().uuid(),
  kind: consentKindSchema,
  docVersion: z.string(),
  grantedAt: z.string(),
  revokedAt: z.string().nullable(),
});
export type ConsentResponse = z.infer<typeof consentResponseSchema>;

// ---------------------------------------------------------------------------------------------
// Расчётные пресеты
// ---------------------------------------------------------------------------------------------

export const calcPresetRecordSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().nullable(),
  name: z.string(),
  isSystem: z.boolean(),
});
export type CalcPresetRecord = z.infer<typeof calcPresetRecordSchema>;
