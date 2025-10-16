const CACHE_VERSION = 'mado-menu-cache-v3';
const CACHE_NAME = `${CACHE_VERSION}`;

// The service worker scope always ends with a trailing slash and reflects the base path that the
// application is served from (e.g. "/" for local dev or "/repo/" on GitHub Pages).
const BASE_PATH = new URL(self.registration.scope).pathname;
const OFFLINE_FALLBACK = `${BASE_PATH}index.html`;

const PRECACHE_URLS = [
  BASE_PATH,
  OFFLINE_FALLBACK,
  `${BASE_PATH}manifest.json`,
];

const imageDomains = [
  'images.jacca.com',
  'www.mado.com.tr',
  'cdnjs.cloudflare.com',
];

self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .catch(error => {
        console.error('Failed to precache resources:', error);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          return undefined;
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (imageDomains.some(domain => requestUrl.hostname.includes(domain))) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  if (requestUrl.origin === self.location.origin) {
    if (event.request.mode === 'navigate') {
      event.respondWith(networkFirstWithOfflineFallback(event.request));
      return;
    }

    if (requestUrl.pathname.startsWith(BASE_PATH)) {
      event.respondWith(staleWhileRevalidate(event.request));
    }
  }
});

function cacheFirst(request) {
  return caches.match(request).then(cachedResponse => {
    if (cachedResponse) {
      return cachedResponse;
    }

    return fetch(request).then(networkResponse => {
      return caches.open(CACHE_NAME).then(cache => {
        cache.put(request, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}

function staleWhileRevalidate(request) {
  return caches.match(request).then(cachedResponse => {
    const fetchPromise = fetch(request)
      .then(networkResponse => {
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, networkResponse.clone());
        });
        return networkResponse;
      })
      .catch(() => cachedResponse);

    return cachedResponse || fetchPromise;
  });
}

function networkFirstWithOfflineFallback(request) {
  return fetch(request)
    .then(response => {
      const responseClone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
      return response;
    })
    .catch(() => caches.match(request).then(match => match || caches.match(OFFLINE_FALLBACK)));
}
