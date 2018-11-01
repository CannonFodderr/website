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
        event.respondWith(
            caches.match(event.request).then(function(resp) {
                console.log(resp)
                return resp || fetch(event.request).then(function(response) {
                    return caches.open('v1').then(function(cache) {
                        cache.put(event.request, response.clone());
                        return response;
                    });  
                });
            })
            );
        });