/**
 * Ретраи с экспоненциальной задержкой + джиттером (см. f4-промт req.1). Инъекция `sleep`/`jitter`
 * — для unit-тестов без реального ожидания.
 */
export interface RetryOptions {
  retries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  /** Возвращает число в [0,1) — по умолчанию Math.random. */
  jitter?: () => number;
  sleep?: (ms: number) => Promise<void>;
}

export async function withRetry<T>(fn: () => Promise<T>, opts: RetryOptions = {}): Promise<T> {
  const retries = opts.retries ?? 2;
  const base = opts.baseDelayMs ?? 200;
  const max = opts.maxDelayMs ?? 2000;
  const jitter = opts.jitter ?? Math.random;
  const sleep = opts.sleep ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));

  let lastErr: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt === retries) break;
      const delay = Math.min(max, base * 2 ** attempt) * (0.5 + jitter() * 0.5);
      await sleep(delay);
    }
  }
  throw lastErr;
}
