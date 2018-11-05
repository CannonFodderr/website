// PWA
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    showNotification(e)
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
    // Install prompt button
    if(data.type === "beforeinstallprompt"){
        var installBtn = document.getElementById("install-btn-wrapper");
        setTimeout(()=>{
            installBtn.innerHTML = "<button class='btn btn-primary install-btn'>Install App</button>"
            installBtn.addEventListener('click', (e)=>{
                installBtn.className = installBtn.className.repeat("show", "");
                installPrompt()
            })
            installBtn.className = "show"
        }, 2000);
        // Install prompt notification
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            setTimeout(()=>{
                var toastRefresh = document.getElementById("messageToast");
                toastRefresh.innerHTML = "<button class='btn btn-primary install-btn'>INSTALL APP</button>"
                toastRefresh.addEventListener('click', (e)=>{
                    toastRefresh.className = toastRefresh.className.replace("show", "");
                    installPrompt()
                });
                toastRefresh.className = "show";
                return setTimeout(() => { toastRefresh.className = toastRefresh.className.replace("show", ""); }, 10000);
            }, 15000)
        }
    }
    if(data.active){
        var x = document.getElementById("messageToast");
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
    let wrapper = document.getElementById('load-wrapper');
    if(wrapper){
        wrapper.classList.add('hide');
        setTimeout(()=>{
            wrapper.style.display = "none";
        }, 500)
    }
    let transWrapper = document.getElementById('trans-load-wrapper');
    if(transWrapper){
        transWrapper.classList.add('hide');
        setTimeout(()=>{
            transWrapper.style.display = "none";
        }, 1000)
    }
}

console.log('%c░░░░░░░░░░░░░░░░░\n░░░░░▀▄░░░▄▀░░░░░\n░░░░▄█▀███▀█▄░░░░\n░░░█▀███████▀█░░░\n░░░█░█▀▀▀▀▀█░█░░░\n░░░░░░▀▀░▀▀░░░░░░\n░░░░░░░░░░░░░░░░░\n  Hello Invader! ', 'color: green;background:black; font-size:30px; padding:0;margin:0')