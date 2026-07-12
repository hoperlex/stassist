/**
 * calc_presets — расчётные пресеты (см. docs/architecture/22-модель-данных.md §2). `userId=null`
 * — системный пресет (виден всем, засеян в Ф2, см. src/seed/system-calc-presets.ts). `bodies`/
 * `orbs` — jsonb, форма соответствует `bodySetSchema`/`orbsConfigSchema` из
 * packages/shared/src/schemas/chart.ts (единый источник правды для формы данных, но НЕ для
 * значений по умолчанию — сид Ф2 задаёт их явно, см. src/seed).
 */
import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { ayanamshaEnum, aspectSetEnum, houseSystemEnum, zodiacTypeEnum } from './enums.js';
import { users } from './users.js';

export const calcPresets = pgTable('calc_presets', {
  id: uuid('id').primaryKey().defaultRandom(),
  /** null = системный пресет, виден и используется всеми пользователями. */
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  /** Стабильный код ТОЛЬКО у системных пресетов (идемпотентный ключ сида, см. src/seed) —
   *  у пользовательских пресетов всегда null (Postgres допускает несколько NULL в UNIQUE). */
  code: text('code').unique(),
  name: text('name').notNull(),
  zodiac: zodiacTypeEnum('zodiac').notNull().default('tropical'),
  ayanamsha: ayanamshaEnum('ayanamsha'),
  houseSystem: houseSystemEnum('house_system').notNull().default('placidus'),
  /** Соответствует `bodySetSchema` (packages/shared): trueNode/trueLilith/selena/chiron. */
  bodies: jsonb('bodies').notNull(),
  /** Соответствует `orbsConfigSchema` (packages/shared): byAspect/byBody. */
  orbs: jsonb('orbs').notNull(),
  aspectSet: aspectSetEnum('aspect_set').notNull().default('major_minor'),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
