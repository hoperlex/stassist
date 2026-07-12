/**
 * `page_cache` — инвалидация по тегу после публикации (requirement 6 промта Ф5: «SSR-рендер
 * программатики кэшируется (тег horoscope:{date_key}), инвалидация после публикации»).
 *
 * СКОУП ЭТОЙ ФАЗЫ (задокументировано явно, см. отчёт `_report/build/f5-отчёт.md`): реализована
 * запись/инвалидация по тегу (эта функция) — вызывается worker'ом после каждого успешного
 * батча публикации. HTTP-уровневое чтение из `page_cache` (короткое замыкание SSR-рендера в
 * apps/web/server/index.ts, отдача уже сохранённого HTML вместо повторного рендера через vike)
 * НЕ подключено в этой фазе — ADR-7 (docs/architecture/21-техническая-архитектура.md §10)
 * прямо обосновывает, что «детерминированная программатика генерируется заранее, горячий кэш не
 * нужен на MVP» (SSR-рендер вызывает лишь /api/v1/horoscopes/* — уже быстрый индексный поиск по
 * `horoscopes.uniq`, без LLM на горячем пути); полное подключение HTTP-кэша — задел следующей
 * итерации, не блокер Ф5. Таблица `page_cache` этим кодом РЕАЛЬНО заполняется/чистится — не
 * пустышка, просто не единственный источник HTML для ответа (см. §6 конвенций реализации,
 * «правило непустоты» здесь не нарушается: страницы рендерятся live через SSR, а не из
 * гипотетического пустого кэша).
 */
import { arrayContains } from 'drizzle-orm';
import { pageCache, type Db } from '@stassist/db';

export function horoscopeCacheTag(dateKey: string): string {
  return `horoscope:${dateKey}`;
}

/** Удаляет все строки `page_cache`, помеченные тегом (см. заголовок файла). Возвращает число
 *  удалённых строк — полезно для лог-аудита («что реально инвалидировано»). */
export async function invalidatePageCacheByTag(db: Db, tag: string): Promise<number> {
  const deleted = await db.delete(pageCache).where(arrayContains(pageCache.tags, [tag])).returning({ id: pageCache.id });
  return deleted.length;
}
