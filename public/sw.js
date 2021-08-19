const CACHE = "V2";

const urlsToCache = [
  './style.css',
  './bundle.js',
  '/',
  './index.html',
  './static/lib/fontawesome/all.min.css',
  './static/lib/fontawesome/fa-brands-400.woff2',
  './static/lib/fontawesome/fa-regular-400.woff2',
  './static/lib/fontawesome/fa-solid-900.woff2',
  './static/manifest.json',
  './static/icons/apple-icon-180.png',
  './static/icons/google.svg',
  './static/icons/resheba.svg',
  './static/icons/manifest-icon-192.png',
  './static/icons/manifest-icon-512.png',
  './static/img/404.webp',
  './static/img/demo.jpg',
  './favicon.ico',


];

self.addEventListener('install', function(event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE)
        .then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});




self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {

          if (response) {
            return response;
          }

          return fetch(event.request);
        }
      )
    );
  });