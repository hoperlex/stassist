/**
 * Антидубляж зачинов (см. требование 1 промта Ф5: «запрет повторов зачинов из последних 7
 * выпусков — передавать список зачинов»; находку [полнота] «механизм антидубляжа не
 * специфицирован» в _work/build/findings/f5.md). Зачин — нормализованное первое предложение
 * (или первые ~60 символов) текста; сравнение — по нормализованной форме (без учёта регистра/
 * пробелов), а не побайтовое.
 */
import { createHash } from 'node:crypto';

const ZACHIN_MAX_CHARS = 80;

/** Нормализованный зачин текста — используется и для антидубляж-проверки, и для скрипта-верификации
 *  «зачины одного знака за 7 дней не повторяются» (см. раздел «Верификация» промта Ф5). */
export function extractZachin(text: string): string {
  const firstSentenceEnd = text.indexOf('.');
  const raw = firstSentenceEnd > 0 && firstSentenceEnd <= ZACHIN_MAX_CHARS ? text.slice(0, firstSentenceEnd) : text.slice(0, ZACHIN_MAX_CHARS);
  return raw.trim().toLowerCase().replace(/\s+/g, ' ');
}

function hashIndex(seed: string, mod: number): number {
  if (mod <= 0) throw new Error('hashIndex: mod должен быть положительным');
  const digest = createHash('sha256').update(seed).digest();
  return digest[0]! % mod;
}

/**
 * Выбирает вариант зачина из `variants` (уже готовые тексты открывающего предложения, НЕ просто
 * ключевые слова), детерминированно по `seed`, но с ротацией мимо коллизий с `recentZachins`
 * (нормализованные зачины последних 7 выпусков того же (scope,sign,period,topic,humor)). Если ВСЕ
 * варианты уже встречались недавно (короткий банк, длинная история) — честно возвращает
 * стартовый вариант по хэшу, не бросает исключение (лучше повтор раз в N выпусков, чем падение
 * пайплайна).
 */
export function pickOpeningVariant(seed: string, variants: readonly string[], recentZachins: readonly string[]): string {
  if (variants.length === 0) throw new Error('pickOpeningVariant: пустой список вариантов');
  const recentSet = new Set(recentZachins.map((z) => z.trim().toLowerCase().replace(/\s+/g, ' ')));
  const startIdx = hashIndex(seed, variants.length);
  for (let i = 0; i < variants.length; i++) {
    const candidate = variants[(startIdx + i) % variants.length]!;
    if (!recentSet.has(extractZachin(candidate))) return candidate;
  }
  return variants[startIdx]!;
}
