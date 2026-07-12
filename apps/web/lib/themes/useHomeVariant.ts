import { useCallback, useEffect, useState } from 'react';
import { isVariantId, type VariantId } from './variants.js';

const STORAGE_KEY = 'zx-home-variant';

/**
 * Активный вариант оформления главной. SSR и первый клиентский рендер всегда «light» («Небесный
 * свет» — тема сайта по умолчанию); так гидратация совпадает и SEO-версия — целевой дизайн.
 * Сохранённый выбор применяется уже после монтирования (useEffect), без гидратационного рассинхрона.
 */
export function useHomeVariant(): { variant: VariantId; choose: (v: VariantId) => void } {
  const [variant, setVariant] = useState<VariantId>('light');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isVariantId(saved)) setVariant(saved);
    } catch {
      /* localStorage недоступен — остаёмся на «existing» */
    }
  }, []);

  const choose = useCallback((v: VariantId) => {
    setVariant(v);
    try {
      window.localStorage.setItem(STORAGE_KEY, v);
    } catch {
      /* игнорируем — переключение всё равно применится в рамках сессии */
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return { variant, choose };
}
