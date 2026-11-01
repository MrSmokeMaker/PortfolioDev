/**
 * Portfolio OS 3.1 Service Worker
 * Offline Cache & High-Speed Asset Stashing
 */

const CACHE_NAME = 'portfolio-os-v3.3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './index-v2.html',
  './index-v3.html',
  './fintech.html',
  './fintech-v2.html',
  './fintech-v3.html',
  './saas.html',
  './saas-v2.html',
  './saas-v3.html',
  './medtech.html',
  './medtech-v2.html',
  './medtech-v3.html',
  './audio.html',
  './audio-v2.html',
  './audio-v3.html',
  './gallery.html',
  './gallery-v2.html',
  './gallery-v3.html',
  './craft.html',
  './craft-v2.html',
  './craft-v3.html',
  './404.html',
  './assets/css/tokens.css',
  './assets/css/main.css',
  './assets/css/cyber-v2.css',
  './assets/css/apex-v3.css',
  './assets/css/fintech.css',
  './assets/css/fintech-v2.css',
  './assets/css/saas.css',
  './assets/css/saas-v2.css',
  './assets/css/medtech.css',
  './assets/css/medtech-v2.css',
  './assets/css/audio.css',
  './assets/css/audio-v2.css',
  './assets/css/gallery.css',
  './assets/css/gallery-v2.css',
  './assets/css/craft.css',
  './assets/css/craft-v2.css',
  './assets/tokens/figma-tokens.json',
  './assets/js/main.js',
  './assets/js/tilt.js',
  './assets/js/i18n.js',
  './assets/js/webgl-core.js',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Only cache GET requests to local origin
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cachedResp) => {
      if (cachedResp) {
        // Return cached, refresh in background
        fetch(e.request).then((networkResp) => {
          if (networkResp && networkResp.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, networkResp));
          }
        }).catch(() => {});
        return cachedResp;
      }
      return fetch(e.request).then((networkResp) => {
        if (networkResp && networkResp.status === 200) {
          const respClone = networkResp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, respClone));
        }
        return networkResp;
      });
    }).catch(() => {
      if (e.request.destination === 'document') {
        return caches.match('./index.html');
      }
    })
  );
});
