const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/offline', // Agrega otras rutas que quieras cachear
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('push', (event) => {
    const data = JSON.parse(event.data.text());
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.message,
            icon: '/vercel-192x192.png', // Asegúrate de que la ruta sea correcta
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                if (clientList.length > 0) {
                    let client = clientList.find((client) => client.focused) || clientList[0];
                    client.focus();
                } else {
                    clients.openWindow('/');
                }
            })
    );
});
