let cacheName = 'v1-cache';
let assetsToCache = [
    '/',
    'index.html',
    'main.js',
    'sw.js'
]
self.addEventListener("install", e => {
    console.log("Service Worker berhasil diinstall.");

    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            cache.addAll(assetsToCache);
            console.log("Berhasil membuat cache asset di local storage.");
        })
    )

    skipWaiting();
})


let respond = new Response("Hallo Hengkermannn")
self.addEventListener("fetch", e => {
    let cloneRequest = e.request.clone();

    e.respondWith(
        fetch(e.request.clone()).then(r => {
            cloneResponse = r.clone();

            caches.open(cacheName).then(cache => {
                cache.put(cloneRequest, cloneResponse)
            })

            return r
        })
        .catch(async function() {
            let cache = await caches.open(cacheName)
            return cache.match(e.request)
        })
    )
})