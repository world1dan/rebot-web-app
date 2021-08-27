const CACHE = "7";

const urlsToCache = [
  'style.css',
  'bundle.js',
  '/',
  'static/lib/fontawesome/all.min.css',
  'static/lib/fontawesome/fa-brands-400.woff2',
  'static/lib/fontawesome/fa-regular-400.woff2',
  'static/lib/fontawesome/fa-solid-900.woff2',
  'static/manifest.json',
  'static/icons/apple-icon-180.png',
  'static/icons/google.svg',
  'static/icons/resheba.svg',
  'static/icons/manifest-icon-192.png',
  'static/icons/manifest-icon-512.png',
  'static/img/404.webp',
  'static/img/demo.jpg',
  'favicon.ico',
];


self.addEventListener('install', function(event) {

    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener('activate', () => {
	caches.keys().then((keys) => {
		if (!keys.includes(CACHE)) {
			caches.open(CACHE).then((cache) => {
				console.log('Update cache');
				return cache.addAll(urlsToCache);
			})
		}

		keys.map((key) => {
			if (key != CACHE) {
				caches.delete(key);
			}
		})
	})
})







async function getResponse(request) {
	const responce = await caches.match(request);
	return responce || fetch(request);
}

self.addEventListener('fetch', (event) => {
	event.respondWith(getResponse(event.request));
});
