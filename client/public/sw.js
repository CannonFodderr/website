STATICFILESLIST = () => {
    staticFiles = [
        'images/fav.png',
        '/images/sound.jpg',
        '/images/webdev.jpg',
        '/images/ecommerce.jpg',
        '/stylesheets/main.css',
        '/',
        '/cv',
        '/projects'
    ]
    return staticFiles
}


self.addEventListener('install', (e)=>{
    e.waitUntil(
        caches.open('v1')
        .then((cache) => {
            return cache.addAll(STATICFILESLIST())
        })
        .catch(e => {
            console.warn(e);
        })
    )
})
    
self.addEventListener('fetch', function(event) {
    var autherizedExt = new RegExp('bootstrap|fontawesome|googleapis')
    if (event.request.method != 'GET') {
        return
    } else {
        event.respondWith(
            caches.match(event.request).then(function(resp) {
                // Test if in static files list
                if(event.request.url.indexOf(STATICFILESLIST()) !== -1){
                    caches.match(event.request.url).then((cachedData)=>{
                        if(cachedData != 'undefined'){
                            fetch(event.request).then((serverData)=>{
                                // Test of ETAGS don't match
                                let x = serverData.headers.get('ETag')
                                let y = cachedData.headers.get('ETag')
                                if(x != y){
                                    caches.open('v1').then((cache)=>{
                                        // Update old cache
                                        cache.put(event.request, serverData.clone())
                                        return serverData
                                    })
                                }
                                return cachedData
                            })
                        }             
                    })
                }
                // Check if EXTERNAL resource exsists in cache if not fetch
                if(autherizedExt.test(event.request.url)){
                    return resp || fetch(event.request).then(function(response) {
                        return caches.open('v1').then(function(cache) {
                            cache.put(event.request, response.clone());
                            return response;
                        });  
                    });
                }
                return fetch(event.request).then(function(response) {
                    return response;
                });  
            })
        );
    }
});

// Listen for messages from clients
self.addEventListener('message', messageEvent => {
    if (messageEvent.data === 'skipWaiting'){
        swSkipWait()
        self.clients.matchAll()
        .then((clients)=>{   
            clients.forEach((client)=>{
                client.postMessage('refresh')
            })
        })
    };
});

async function swSkipWait() {
    await skipWaiting()
}

