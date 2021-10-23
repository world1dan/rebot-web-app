const CACHE = "1"


const CacheUtilSWUpdate = [
    "style.css",
    "bundle.js",
    "/",
    "index.html",
    "static/lib/fontawesome/all.min.css",
    "static/lib/fontawesome/fa-regular-400.woff2",
    "static/icons/manifest-icon-192.png",
    "static/lib/fontawesome/fa-solid-900.woff2",
    "static/manifest.json",
    "static/icons/google.svg",
    "static/icons/resheba.svg",
    "static/img/404.webp",
    "static/img/bio.webp",
    "static/img/engwb.webp",
    "static/img/geo.webp",
    "static/img/him.webp",
    "static/img/phis.webp",
    "favicon.ico"
]


const CacheUtilSoftUpdate = [
    "style.css",
    "bundle.js",
    "/",
]


self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.keys().then((keys) => {
            if (!keys.includes(CACHE)) {
                caches.open(CACHE).then((cache) => {
                    return cache.addAll(CacheUtilSWUpdate)
                })
            }
            keys.map((key) => {
                if (key != CACHE) {
                    caches.delete(key)
                }
            })
        })
    )
})



async function cacheFirst(request) {
    const responce = await caches.match(request)
    return responce ?? fetch(request)
}

self.addEventListener("fetch", (event) => {
    const request = event.request
    const url = new URL(request.url)
    const sameOrigin = url.origin == location.origin

    const responce = sameOrigin ? cacheFirst(request) : fetch(request)

    event.respondWith(responce)
})





const sendMessage = async (message) => {
    const clients = await self.clients.matchAll()
    
    if (clients?.[0]) {
        clients[0].postMessage(message)
    }

    console.info("SW: Sended message: " + message.type)
}

async function softUpdate() {
    caches.open(CACHE).then((cache) => {
        return cache.addAll(CacheUtilSoftUpdate).then(() => {
            sendMessage({ type: "soft-update-complete"})
        })
    })
}

self.addEventListener("message", (e) => {
    const type = e.data.type

    console.info("SW: Recieved message: " + type)

    if (type === "do-soft-update") {
        softUpdate()
    }
})
