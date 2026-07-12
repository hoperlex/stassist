/**
 * Оффлайн data-step (см. §4 конвенций реализации): генерирует committed SQL-сид системных
 * расчётных пресетов (`calc_presets.user_id IS NULL`) из единственного источника правды —
 * `packages/db/src/seed/system-calc-presets.ts` (значения bodies/orbs берутся из констант
 * astro-core, см. комментарий в этом файле). Пишет `drizzle/seed/0001_system_calc_presets.sql`
 * (коммитится в репозиторий) — идемпотентно (`ON CONFLICT ("code") DO UPDATE`), безопасно
 * запускать повторно.
 *
 * НЕ часть build/test:unit/CI-гейта — отдельная команда `pnpm data:seed-calc-presets`.
 * Применение к живой БД — `pnpm db:seed` (tools/db-seed.ts, отдельно от миграций).
 *
 * ВАЖНО: запускается через `node --experimental-strip-types`, а НЕ через `tsx` (в отличие от
 * остальных tools/*.ts). Находка при реализации: `tsx` глобально хукает резолюцию модулей и
 * применяет `paths` из БЛИЖАЙШЕГО к резолвящемуся ФАЙЛУ tsconfig.json (не к точке входа) — при
 * импорте `@stassist/db` → `@stassist/astro-core` он находит `packages/db/tsconfig.json` и
 * подменяет собранный `dist` astro-core на его `src`, из-за чего `astronomy-engine` (CJS/ESM
 * dual-package) резолвится некорректно (`AE.Body` оказывается `undefined`). Простой `node`
 * (без tsx) резолвит `@stassist/db` штатно через `node_modules` → `dist` каждого пакета — тот же
 * путь, что использует прод-рантайм apps/api/apps/worker — поэтому пакеты (`@stassist/shared`,
 * `@stassist/astro-core`, `@stassist/db`) должны быть СОБРАНЫ перед запуском (см. `package.json`
 * скрипт `data:seed-calc-presets` — сначала `pnpm --filter … build`, потом сам скрипт).
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SYSTEM_CALC_PRESETS } from '@stassist/db';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, '..', 'drizzle', 'seed', '0001_system_calc_presets.sql');

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

function sqlJsonb(value: unknown): string {
  return `${sqlString(JSON.stringify(value))}::jsonb`;
}

function sqlNullableEnum(value: string | null): string {
  return value === null ? 'NULL' : sqlString(value);
}

function buildSql(): string {
  const lines: string[] = [
    '-- Системные расчётные пресеты (calc_presets.user_id IS NULL) — Ф2, doc 20 «Границы MVP» M0/M5.',
    '-- СГЕНЕРИРОВАНО: tools/seed-calc-presets.ts из packages/db/src/seed/system-calc-presets.ts.',
    '-- НЕ редактировать руками — перегенерировать `pnpm data:seed-calc-presets`.',
    '-- Идемпотентно: повторный прогон обновляет параметры существующих системных пресетов по code.',
    '',
  ];
  for (const preset of SYSTEM_CALC_PRESETS) {
    lines.push(
      `INSERT INTO "calc_presets" ("user_id", "code", "name", "zodiac", "ayanamsha", "house_system", "bodies", "orbs", "aspect_set")`,
      `VALUES (NULL, ${sqlString(preset.code)}, ${sqlString(preset.name)}, ${sqlString(preset.zodiac)}, ${sqlNullableEnum(preset.ayanamsha)}, ${sqlString(preset.houseSystem)}, ${sqlJsonb(preset.bodies)}, ${sqlJsonb(preset.orbs)}, ${sqlString(preset.aspectSet)})`,
      `ON CONFLICT ("code") DO UPDATE SET`,
      `  "name" = EXCLUDED."name",`,
      `  "zodiac" = EXCLUDED."zodiac",`,
      `  "ayanamsha" = EXCLUDED."ayanamsha",`,
      `  "house_system" = EXCLUDED."house_system",`,
      `  "bodies" = EXCLUDED."bodies",`,
      `  "orbs" = EXCLUDED."orbs",`,
      `  "aspect_set" = EXCLUDED."aspect_set",`,
      `  "updated_at" = now();`,
      '',
    );
  }
  return lines.join('\n');
}

async function main(): Promise<void> {
  const sql = buildSql();
  await mkdir(path.dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, sql, 'utf8');
  console.log(`Записано ${SYSTEM_CALC_PRESETS.length} системных пресетов → ${OUT_PATH}`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
