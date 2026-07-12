/*
 * Service worker «Зодиакум» — свой, без зависимостей. Стратегия под SSR-сайт:
 *  - навигации (HTML) — network-first, оффлайн-фолбэк /offline.html. HTML НИКОГДА не precache-first,
 *    иначе пользователь увидит устаревшие SSR-страницы;
 *  - /assets/* (хэшированные, иммутабельные) — cache-first;
 *  - иконки/манифест (стабильные имена) — stale-while-revalidate;
 *  - /api/* и cross-origin — не трогаем (авторизация по cookie, динамика).
 * При смене поведения кэша поднимаем VERSION → activate чистит старые кэши. Раздаётся с no-cache
 * (см. apps/web/server/index.ts), поэтому обновление подхватывается на следующем заходе.
 */
const VERSION = 'v1';
const CACHE = `zx-static-${VERSION}`;
const OFFLINE_URL = '/offline.html';
const PRECACHE = [OFFLINE_URL, '/favicon.svg', '/icon-192.png', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

function cachePut(request, response) {
  if (response && response.ok) {
    const copy = response.clone();
    caches.open(CACHE).then((cache) => cache.put(request, copy));
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // сторонние источники — как есть
  if (url.pathname.startsWith('/api/')) return; // API не кэшируем

  // SSR-навигации: сеть в приоритете, при офлайне — оффлайн-страница. HTML не берём из precache.
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_URL, { cacheName: CACHE })));
    return;
  }

  // Иммутабельные хэшированные ассеты — из кэша, иначе из сети (и в кэш).
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(caches.match(request).then((hit) => hit || fetch(request).then((res) => cachePut(request, res))));
    return;
  }

  // Прочие статические файлы (иконки/манифест) — stale-while-revalidate.
  event.respondWith(
    caches.match(request).then((hit) => {
      const fromNet = fetch(request)
        .then((res) => cachePut(request, res))
        .catch(() => hit);
      return hit || fromNet;
    }),
  );
});
