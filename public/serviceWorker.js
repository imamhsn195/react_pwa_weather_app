const cacheName = "version-1";
const cacheAssets = [
    '.',
    './index.html',
    './offline.html'
];
const self = this;

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log("Opened cache file is " + cacheName)
            cache.addAll(cacheAssets);
        })
        .catch("Cache file not opened")
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then( () =>{
            return fetch(e.request)
                .catch(() => caches.match('offline.html'))
        })
        
    );

});

self.addEventListener('activate', event => {
    const cacheAssetList = [];
    cacheAssetList.push(cacheName);
    event.waitUntil(
        caches.keys()
        .then(cacheNames => Promise.all(
            cacheNames.map(name => {
                if(!cacheAssetList.includes(name)) return caches.delete(name)
            })
        ))
    )
});

