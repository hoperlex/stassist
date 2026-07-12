/**
 * Общий fetch-хелпер для реальных LLM-адаптеров: таймаут через AbortController, инъекция
 * `fetchImpl` для unit-тестов без сети (см. паттерн `NominatimGeocoder` в packages/shared/src/
 * ports/geocoder.ts — тот же приём: fetchImpl?: typeof fetch в конструкторе).
 */
export interface FetchJsonOptions {
  url: string;
  headers: Record<string, string>;
  body: unknown;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

export class LlmHttpError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'LlmHttpError';
  }
}

export async function postJson<T>(opts: FetchJsonOptions): Promise<T> {
  const impl = opts.fetchImpl ?? fetch;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), opts.timeoutMs ?? 30_000);
  try {
    const res = await impl(opts.url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...opts.headers },
      body: JSON.stringify(opts.body),
      signal: controller.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new LlmHttpError(`HTTP ${res.status}: ${text.slice(0, 500)}`, res.status);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}
