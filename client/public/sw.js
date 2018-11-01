self.addEventListener('install', (e)=>{
    e.waitUntil(
        caches.open('v1')
        .then((cache) => {
            return cache.addAll([
                '/stylesheets/main.css',
                '/images/fav.png',
                '/images/grit.png',
                '/images/sound.jpg',
                '/images/webdev.jpg',
                '/images/ecommerce.jpg',
                
            ])
        })
        .catch(e => {
            console.warn(e);
        })
        )
    })
    
self.addEventListener('fetch', function(event) {
    var ignoreRequests = new RegExp('(http|https):\/\/(localhost:[0-9]+|[a-zA-Z0-9.]+)\/(admin|projects)?')
    let ignoreRoute = ignoreRequests.test(event.request.url)
    if (event.request.method != 'GET' || ignoreRoute) {
        return 
    }
    event.respondWith(
        caches.match(event.request).then(function(resp) {
            return resp || fetch(event.request).then(function(response) {
                return caches.open('v1').then(function(cache) {
                    cache.put(event.request, response.clone());
                    return response;
                });  
            });
        })
        );
    });