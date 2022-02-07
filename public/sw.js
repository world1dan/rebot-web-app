const appFiles = [
    'style.css',
    'bundle.js',
    '/',
    'index.html',
    'static/lib/fontawesome/all.min.css',
    'static/lib/fontawesome/fa-regular-400.woff2',
    'static/icons/manifest-icon-192.png',
    'static/lib/fontawesome/fa-solid-900.woff2',
    'static/manifest.json',
    'static/img/bio.jpg',
    'static/img/engwb.jpg',
    'static/img/geo.jpg',
    'static/img/him.jpg',
    'static/img/phis.jpg',
    'favicon.ico',
]

self.addEventListener('install', function (event) {
    event.waitUntil(runUpdater())
})

async function cacheFirst(request) {
    const responce = await caches.match(request)
    return responce ?? fetch(request)
}

self.addEventListener('fetch', (event) => {
    const request = event.request
    const url = new URL(request.url)
    const sameOrigin = url.origin == location.origin

    const responce = sameOrigin ? cacheFirst(request) : fetch(request)

    event.respondWith(responce)
})

self.addEventListener('message', async (e) => {
    const type = e.data.type

    console.info('SW: Recieved message: ' + type)

    if (type === 'run-updater') {
        runUpdater()
    }
})

const sendMessage = async (message) => {
    const clients = await self.clients.matchAll({
        includeUncontrolled: true,
    })

    if (clients?.[0]) {
        clients[0].postMessage(message)
    }

    console.info('SW: Sended message: ' + message.type)
}

const needUpdate = async () => {
    const headers = new Headers()
    headers.append('pragma', 'no-cache')
    headers.append('cache-control', 'no-cache')

    const responce = await fetch('updates.json', {
        method: 'GET',
        headers,
    })

    const manifest = await responce.json()

    const cachesKeys = await caches.keys()
    const hasUpdate = !cachesKeys.includes(manifest.version)

    return hasUpdate ? manifest.version : false
}

const updateCache = async (targetVersion) => {
    const cachesKeys = await caches.keys()

    cachesKeys.forEach((key) => {
        if (key != targetVersion) {
            caches.delete(key)
        }
    })

    caches.open(targetVersion).then((cache) => {
        return cache.addAll(appFiles).then(() => {
            console.info(`SW: Updated to ${targetVersion}`)
        })
    })
}

const runUpdater = async () => {
    const update = await needUpdate()

    console.info(
        `SW: ${update ? `Update found: ${update}` : 'no update found'}`
    )

    if (update) {
        await updateCache(update)
        sendMessage({ type: 'update-complete' })
    } else {
        sendMessage({ type: 'no-update-found' })
    }
}
