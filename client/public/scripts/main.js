window.isUpdateAvailable = new Promise((resolve, reject)=>{
    if ('serviceWorker' in navigator ){    
        navigator.serviceWorker.register('/sw.js', {scope: '/'})
        .then((reg)=>{
            console.log('NEW SW REGISTERED')
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
    var x = document.getElementById("messageToast");
    x.innerHTML = "Update is available  <button class='btn btn-danger'>Refresh</button>"
    x.addEventListener('click', ()=>{
        refreshPage(reg)
    });
    x.className = "show";
    setTimeout(() => { x.className = x.className.replace("show", ""); }, 10000);
    return
    
})

window.onload = () => {
    let wrapper = document.getElementsByClassName('load-wrapper');
    if(wrapper.length > 0){
        wrapper[0].classList.add('hide');
        setTimeout(()=>{
            wrapper[0].style.display = "none";
        }, 500)
    }
}


refreshPage = (reg) =>{
    reg.waiting.postMessage('skipWaiting');
    return window.location.reload()
}