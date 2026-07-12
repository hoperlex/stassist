/**
 * Fetch-обёртка для SSR data-хуков (`+data.ts`), выполняется ТОЛЬКО на сервере (см. docs/
 * architecture/21-техническая-архитектура.md §2: `web` SSR и `api` — разные процессы; `web`
 * никогда не трогает БД напрямую, только через REST `/api/v1/*` — так же, как клиентский
 * `lib/api-client.ts`, но без cookies/CSRF/токенов: анонимные калькуляторы не требуют авторизации).
 */
import { loadConfig } from '@stassist/shared';

export class ServerApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ServerApiError';
  }
}

export async function serverApiGet<T>(path: string): Promise<T> {
  const config = loadConfig();
  const res = await fetch(`${config.apiUrl}/api/v1${path}`);
  if (!res.ok) {
    throw new ServerApiError(res.status, `GET ${path} → ${res.status}`);
  }
  return (await res.json()) as T;
}
