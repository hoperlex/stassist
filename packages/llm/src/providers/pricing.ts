/**
 * Приблизительные цены LLM-провайдеров (микро-рубли... нет — микро-USD на 1 токен), только для
 * `ai_reports.cost_micros` (учёт стоимости, НЕ биллинг-grade точность — см. §1 незыблемых правил:
 * агент не выдумывает внешние факты, но здесь это ЯВНО помечено «приблизительно, сверить перед
 * продом», а не тихо угадано). costMicros = round(tokensIn/1e6 * inputPerMTokUsd*1e6 + ...).
 *
 * Источник: платформенная документация Anthropic на дату реализации Ф4 (12.07.2026) — модель
 * `claude-sonnet-5`: $3.00 / MTok вход, $15.00 / MTok выход (после интро-периода, который
 * заканчивается 31.08.2026 и даёт $2/$10). OpenRouter/YandexGPT/GigaChat — цены меняются часто и
 * недоступны офлайн; заведены заглушки с comment «требует сверки», costMicros будет 0, пока не
 * заполнено реальным прайсом (не фабрикуем цифры не из документации).
 */
export interface ProviderPricing {
  /** USD за 1 млн входных токенов. */
  inputPerMTokUsd: number;
  /** USD за 1 млн выходных токенов. */
  outputPerMTokUsd: number;
}

/** Курс USD→RUB для перевода в micros (условных "микро-рублей", 1 рубль = 1_000_000 micros) —
 *  ПРИБЛИЗИТЕЛЬНЫЙ, для внутреннего учёта затрат, не для бухгалтерии. Обновляется вручную. */
export const USD_TO_RUB_APPROX = 90;

export const PROVIDER_PRICING: Record<string, ProviderPricing> = {
  anthropic: { inputPerMTokUsd: 3.0, outputPerMTokUsd: 15.0 },
  // Требует сверки на момент подключения реального ключа — оставлено 0, чтобы не фабриковать цифры.
  openrouter: { inputPerMTokUsd: 0, outputPerMTokUsd: 0 },
  yandexgpt: { inputPerMTokUsd: 0, outputPerMTokUsd: 0 },
  gigachat: { inputPerMTokUsd: 0, outputPerMTokUsd: 0 },
  stub: { inputPerMTokUsd: 0, outputPerMTokUsd: 0 },
};

/** Возвращает стоимость в микро-рублях (округлено), 0 для неизвестного провайдера/стаба. */
export function estimateCostMicros(provider: string, tokensIn: number, tokensOut: number): number {
  const pricing = PROVIDER_PRICING[provider] ?? { inputPerMTokUsd: 0, outputPerMTokUsd: 0 };
  const usd = (tokensIn / 1_000_000) * pricing.inputPerMTokUsd + (tokensOut / 1_000_000) * pricing.outputPerMTokUsd;
  return Math.round(usd * USD_TO_RUB_APPROX * 1_000_000);
}
