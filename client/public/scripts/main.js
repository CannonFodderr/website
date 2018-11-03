// PWA
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    showNotification(e)
});

// SERVICE WORKER
window.isUpdateAvailable = new Promise((resolve, reject)=>{
    if ('serviceWorker' in navigator ){    
        navigator.serviceWorker.register('/sw.js', {scope: '/'})
        .then((reg)=>{
            reg.onupdatefound = () =>{
                const installingWorker = reg.installing;
                installingWorker.onstatechange = () =>{
                    switch (installingWorker.state) {
                        case 'installed':
                        if(navigator.serviceWorker.controller){
                            resolve(reg)
                        } else {
                            resolve(false)
                        }
                        break;
                    }
                }
            }
        })
        .catch(e => {
            console.error('Service Worker Error ' + e)
        })
    }
})

window['isUpdateAvailable']
.then(reg => {
    return showNotification(reg)
})

navigator.serviceWorker.addEventListener('message', (msg)=>{
    if(msg.data === 'refresh') window.location.reload()
});

window.addEventListener('appinstalled', (evt) => {
    app.logEvent('a2hs', 'installed');
});

showNotification = (data) => {
    var x = document.getElementById("messageToast");
    if(data.type === "beforeinstallprompt"){
        setTimeout(()=>{
            x.innerHTML = "Best Expirience  <button class='btn btn-primary refresh-btn'>Install Web App</button>"
            x.addEventListener('click', (e)=>{
                x.className = x.className.replace("show", "");
                deferredPrompt.prompt()
                deferredPrompt.userChoice
                .then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('Installing PWA...');
                    } else {
                        console.log('Dismissed');
                    }
                    deferredPrompt = null;
                });
            });
            x.className = "show";
            return setTimeout(() => { x.className = x.className.replace("show", ""); }, 10000);
        }, 5000)
        
    }
    if(data.active){
        x.innerHTML = "New version is available  <button class='btn btn-danger refresh-btn'>Refresh</button>"
        x.addEventListener('click', ()=>{
            notifySW(data)
        });
        x.className = "show";
    }
    
    
}
notifySW = (reg) =>{
    reg.waiting.postMessage('skipWaiting');
}

let filterForm = document.getElementById('projects-filter-form')

if (filterForm){
    filterForm.addEventListener('submit', (e)=>{
        e.preventDefault();
    })
}

// LOADING SCREEN
window.onload = () => {
    let wrapper = document.getElementsByClassName('load-wrapper');
    if(wrapper.length > 0){
        wrapper[0].classList.add('hide');
        setTimeout(()=>{
            wrapper[0].style.display = "none";
        }, 500)
    }
}