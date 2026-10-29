// Offline shell: caches the app, data, locales and fonts. Audio/video are bundled with the
// device and served from the same origin; they are not precached (large, and range requests).
const CACHE = 'pbc-shell-v2';
const SHELL = ['./', 'index.html', 'css/styles.css', 'manifest.webmanifest', 'assets/logo.png',
  'js/app.js', 'js/core.js', 'js/art.js', 'js/player.js', 'js/home.js', 'js/sound.js', 'js/hydration.js', 'js/move.js', 'js/learn.js',
  'data/tracks.json', 'data/videos.json', 'data/learn.json', 'data/facts.json', 'data/hydration-rules.json', 'locales/index.json',
  ...['en', 'hi', 'kn', 'ta', 'ml', 'te', 'mr', 'gu', 'as', 'or', 'bn', 'pa', 'ur'].map((c) => `locales/${c}.json`)];

self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || req.headers.has('range')) return; // let media range requests hit the network/disk
  const url = new URL(req.url);
  if (/\.(mp3|mp4|webm)$/.test(url.pathname)) return;
  // network-first for same-origin (so edits to locales/data show up), cache fallback offline; cache-first for fonts
  if (url.origin === location.origin) {
    e.respondWith(fetch(req, { cache: 'no-cache' }).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; }).catch(() => caches.match(req)));
  } else {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; })));
  }
});
