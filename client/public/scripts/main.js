// PWA
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Install prompt button
        var installBtn = document.getElementById("install-btn-wrapper");
        var toastRefresh = document.getElementById("messageToast");
        setTimeout(()=>{
            installBtn.innerHTML = "<button class='btn btn-primary install-btn'>Install App</button>"
            installBtn.addEventListener('click', (e)=>{
                installBtn.className = installBtn.className.repeat("show", "");
                installPrompt()
            })
            installBtn.className = "show"
        }, 2000);
        // Install prompt notification
        setTimeout(()=>{
            
            toastRefresh.innerHTML = "USE APP  <button class='btn btn-primary install-btn'>INSTALL</button>"
            toastRefresh.addEventListener('click', (e)=>{
                toastRefresh.className = toastRefresh.className.replace("show", "");
                installPrompt()
            });
            toastRefresh.className = "show";
            return setTimeout(() => { toastRefresh.className = toastRefresh.className.replace("show", ""); }, 10000);
        }, 10000)
});
// Check if PWA app installed
window.addEventListener('appinstalled', (evt) => {
    app.logEvent('a2hs', 'installed');
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

installPrompt = () => {
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
}

showNotification = (data) => {
    
    if(data.active){
        var refreshBtn = document.getElementById("messageToast");
        refreshBtn.innerHTML = "New version is available  <button class='btn btn-danger refresh-btn'>Refresh</button>"
        refreshBtn.addEventListener('click', ()=>{
            notifySW(data)
        });
        refreshBtn.className = "show";
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