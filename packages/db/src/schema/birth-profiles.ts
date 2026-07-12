/**
 * birth_profiles — профили рождения (см. docs/architecture/22-модель-данных.md §2). Поля,
 * помеченные 🔒 в модели данных, шифруются на уровне приложения (AES-256-GCM, версия ключа в
 * шифртексте — см. packages/shared/src/crypto/pd-cipher.ts) ДО записи в БД: в столбцах лежит
 * непрозрачный шифртекст (base64), а не исходные значения. Суффикс `Enc` в имени TS-поля и
 * `_enc` в имени колонки — явный маркер «это шифртекст, не читай напрямую».
 *
 * `lat`/`lon` шифруются как текстовое представление числа (а не `doublePrecision`) — колонка
 * обязана быть текстовой, т.к. хранит шифртекст, а не число.
 */
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { birthProfileKindEnum } from './enums.js';
import { users } from './users.js';

export const birthProfiles = pgTable('birth_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  label: text('label').notNull(),
  kind: birthProfileKindEnum('kind').notNull().default('self'),

  /** 🔒 Шифртекст даты рождения (ISO 'YYYY-MM-DD'). */
  birthDateEnc: text('birth_date_enc').notNull(),
  /** 🔒 Шифртекст времени рождения (ISO 'HH:mm:ss'), null при `timeUnknown`. */
  birthTimeEnc: text('birth_time_enc'),
  timeUnknown: boolean('time_unknown').notNull().default(false),
  /** 🔒 Шифртекст названия места (как ввёл/выбрал пользователь). */
  placeNameEnc: text('place_name_enc').notNull(),
  /** 🔒 Шифртекст широты (текстовое представление числа). */
  latEnc: text('lat_enc').notNull(),
  /** 🔒 Шифртекст долготы (текстовое представление числа). */
  lonEnc: text('lon_enc').notNull(),
  /** IANA tz на момент рождения — НЕ шифруется (нужен для расчётов и не является чувствительным
   *  само по себе без даты/места, которые уже зашифрованы). */
  tzId: text('tz_id').notNull(),

  gender: text('gender'),
  notes: text('notes'),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
