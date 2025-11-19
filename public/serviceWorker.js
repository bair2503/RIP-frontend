const CACHE_NAME = 'calculator-v1';
const urlsToCache = [
    '/RIP-frontend/',
    '/RIP-frontend/index.html',
    '/RIP-frontend/static/js/bundle.js',
    '/RIP-frontend/static/css/main.css'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    // Для HTTPS запросов
    if (event.request.url.startsWith('https://')) {
        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
                )
        );
    }
});