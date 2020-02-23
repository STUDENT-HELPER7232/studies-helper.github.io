const staticCacheName = 'site-static-v1';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/index.js',
  '/js/materialize.js',
  '/js/materialize.min.js',
  '/js/app.js',
  '/css/index.css',
  '/css/materialdesignicons.css',
  '/css/materialdesignicons.css.map',
  '/css/materialdesignicons.min.css',
  '/css/materialdesignicons.min.css.map',
  '/css/materialize.css',
  '/css/materialize.min.css',
  '/images/beehive-9.webp',
  '/images/history-9.webp',
  '/images/science-9.webp',
  '/images/geo-9.webp',
  '/images/civics-9.webp',
  '/images/main-9.webp',
  '/images/economics-9.webp',
  '/json/books.json',
  'https://fonts.googleapis.com/css?family=Saira+Semi+Condensed:500,600,700',
];
// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});
// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});
// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});