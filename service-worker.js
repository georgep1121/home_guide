const CACHE_NAME = "home-guide-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./app.js",
  "./data.json",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// INSTALL → precache shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// ACTIVATE → cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH → smart strategy
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // HTML navigation → always serve app shell
  if (req.mode === "navigate") {
    event.respondWith(fetch("./index.html").catch(() => caches.match("./index.html")));
    return;
  }

  // data.json → stale-while-revalidate
  if (req.url.includes("data.json")) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // default → cache-first
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});

async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);

  const networkPromise = fetch(req).then((res) => {
    cache.put(req, res.clone());
    return res;
  });

  return cached || networkPromise;
}
