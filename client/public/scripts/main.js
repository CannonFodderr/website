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
})

showNotification = (sw) => {
    var x = document.getElementById("messageToast");
    x.innerHTML = "New version is available  <button class='btn btn-danger refresh-btn'>Refresh</button>"
    x.addEventListener('click', ()=>{
        notifySW(sw)
    });
    x.className = "show";
    // setTimeout(() => { x.className = x.className.replace("show", ""); }, 10000);
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