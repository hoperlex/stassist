/**
 * Клиент REST API кабинета (`/api/v1/*`). Access-токен держим в памяти процесса вкладки +
 * дублируем в `sessionStorage` (переживает обновление страницы, не переживает закрытие вкладки —
 * разумный компромисс для SPA без долгоживущего клиентского хранилища секретов). Refresh-токен —
 * httpOnly cookie, эта обёртка его не видит и не должна.
 *
 * CSRF: перед КАЖДЫМ state-changing запросом читаем `csrf_token` cookie (не httpOnly — специально
 * читаема отсюда, см. apps/api/src/auth/cookies.ts) и дублируем в заголовке `x-csrf-token`
 * (double-submit, см. apps/api/src/auth/csrf.ts). Так проверка проходит даже для эндпоинтов, не
 * работающих через access-токен (`/auth/refresh`, `/auth/logout`).
 *
 * На 401 (кроме уже-повторного запроса и самого /auth/refresh) — одна попытка тихого
 * `/auth/refresh` и повтор исходного запроса.
 */

const API_BASE = '/api/v1';
const ACCESS_TOKEN_STORAGE_KEY = 'stassist.accessToken';

let accessTokenMemory: string | null = null;

export function setAccessToken(token: string | null): void {
  accessTokenMemory = token;
  if (typeof window === 'undefined') return;
  if (token) window.sessionStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  else window.sessionStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function getAccessToken(): string | null {
  if (accessTokenMemory) return accessTokenMemory;
  if (typeof window !== 'undefined') {
    accessTokenMemory = window.sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  }
  return accessTokenMemory;
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = new RegExp(`(?:^|; )${name}=([^;]*)`).exec(document.cookie);
  return match ? decodeURIComponent(match[1]!) : null;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string | undefined;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

const STATE_CHANGING_METHODS = new Set(['POST', 'PATCH', 'PUT', 'DELETE']);

async function parseErrorMessage(res: Response, fallback: string): Promise<{ message: string; code?: string }> {
  try {
    const body = (await res.json()) as { error?: { message?: string; code?: string } };
    return { message: body.error?.message ?? fallback, code: body.error?.code };
  } catch {
    return { message: fallback };
  }
}

async function tryRefresh(): Promise<boolean> {
  const csrf = readCookie('csrf_token');
  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: csrf ? { 'x-csrf-token': csrf } : {},
  });
  if (!res.ok) return false;
  const body = (await res.json()) as { accessToken: string };
  setAccessToken(body.accessToken);
  return true;
}

async function request<T>(path: string, options: RequestInit = {}, isRetry = false): Promise<T> {
  const method = (options.method ?? 'GET').toUpperCase();
  const headers = new Headers(options.headers);
  if (options.body) headers.set('Content-Type', 'application/json');
  const token = getAccessToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (STATE_CHANGING_METHODS.has(method)) {
    const csrf = readCookie('csrf_token');
    if (csrf) headers.set('x-csrf-token', csrf);
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, method, headers, credentials: 'include' });

  if (res.status === 401 && !isRetry && path !== '/auth/refresh') {
    const refreshed = await tryRefresh();
    if (refreshed) return request<T>(path, options, true);
  }

  if (!res.ok) {
    const { message, code } = await parseErrorMessage(res, `Ошибка запроса (${res.status})`);
    throw new ApiError(res.status, message, code);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const api = {
  get: <T>(path: string): Promise<T> => request<T>(path),
  post: <T>(path: string, body?: unknown): Promise<T> =>
    request<T>(path, { method: 'POST', body: body === undefined ? undefined : JSON.stringify(body) }),
  patch: <T>(path: string, body?: unknown): Promise<T> =>
    request<T>(path, { method: 'PATCH', body: body === undefined ? undefined : JSON.stringify(body) }),
  delete: <T>(path: string, body?: unknown): Promise<T> =>
    request<T>(path, { method: 'DELETE', body: body === undefined ? undefined : JSON.stringify(body) }),
};
