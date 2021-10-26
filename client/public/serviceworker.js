const CACHE_NAME = "version-1"
const urlsToCache = ['index.html', 'offline.html']

const self = this //this represents the service worker

//Install service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache')

                return cache.addAll(urlsToCache)
            })
    )
})

// Listen for requests
self.addEventListener('fetch', (event) => {
   // respond with this when we notice a fetch request
   event.respondWith(
       caches.match(event.request)
        .then(() => {
            return fetch(event.request) // If this fails, there is no internet connection
                .catch(() => caches.match('offline.html')) // if we cannot fetch some resources
        })
    
   )
})

// Activate the service worker
self.addEventListener('activate', (event) => {
    //remove all the previous caches and store the new ones
    const cacheWhitelist = []
    cacheWhitelist.push(CACHE_NAME)

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            })
        ))
    )
})