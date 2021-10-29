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
    e.respondWith(
        caches.open(cacheName)
        .then(cache => {
            return cache.match(e.request).then(response => {
                if (response) {
                    return response
                }

                let cloneRequest = e.request.clone();
                return fetch(e.request)
                    .then(
                        r => {
                            let cloneResponse = r.clone()
                            console.log(r.status);
                            if (r.status != 404) {
                                // console.log("Request berhasil");
                                caches.open(cacheName)
                                    .then(cache => {
                                        cache.put(cloneRequest, cloneResponse);
                                    })

                                return r;

                            } else {
                                // console.log('Request e gagal mas');
                                return fetch("http://localhost:5500/fallback.html");
                            }
                        },
                        e => console.log(e)
                    );
            })
        })
    )
})