self.addEventListener('install', (e)=>{
    e.waitUntil(
        caches.open('v1')
        .then((cache) => {
            return cache.addAll([
                '/images/sound.jpg',
                '/images/webdev.jpg',
                '/images/ecommerce.jpg',
                '/stylesheets/main.css',
            ])
        })
        .catch(e => {
            console.warn(e);
        })
        )
    })
    
    self.addEventListener('fetch', function(event) {
        var staticFiles = new RegExp('main.css')
        var ignoreRequests = new RegExp('(http|https):\/\/(localhost:[0-9]+|[a-zA-Z0-9.]+)\/(admin|projects)')
        let ignoreRoute = ignoreRequests.test(event.request.url)
        if (event.request.method != 'GET' || ignoreRoute) {
            return 
        }
        event.respondWith(
            caches.match(event.request).then(function(resp) {
                if(staticFiles.test(event.request.url)){
                    caches.match(event.request.url).then((cachedData)=>{
                        if(cachedData != 'undefined'){
                            fetch(event.request).then((serverData)=>{
                                let x = serverData.headers.get('ETag')
                                let y = cachedData.headers.get('ETag')
                                if(x != y){
                                    caches.open('v1').then((cache)=>{
                                        cache.put(event.request, serverData.clone())
                                        console.log("Updated old cache")
                                        return serverData
                                    })
                                }
                                return cachedData
                            })
                        }             
                    })
                }
                return resp || fetch(event.request).then(function(response) {
                    return caches.open('v1').then(function(cache) {
                        cache.put(event.request, response.clone());
                        return response;
                    });  
                });
            })
            );
        });
        

self.addEventListener('message', messageEvent => {
    setTimeout(()=>{
        console.log('gotMessage', messageEvent)
    }, 5000)
    if (messageEvent.data === 'skipWaiting') return skipWaiting();
});