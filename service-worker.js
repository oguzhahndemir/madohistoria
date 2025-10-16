// service-worker.js
const CACHE_NAME = 'mado-menu-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx', // This represents the main JS bundle in this setup
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

const imageDomains = [
    'images.jacca.com',
    'www.mado.com.tr',
    'cdnjs.cloudflare.com', // For flag icons
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Failed to cache urls on install:', err);
      })
  );
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // Cache-first strategy for images
  if (imageDomains.some(domain => requestUrl.hostname.includes(domain))) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }
  
  // Network falling back to cache for other requests
  event.respondWith(
    fetch(event.request).catch(() => {
        return caches.match(event.request).then(response => {
            if (response) {
                return response;
            }
            // Optional: return a fallback offline page if nothing is cached
        });
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});