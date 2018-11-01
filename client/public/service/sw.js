if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('/service/sw.js', {scope: '/service/'})
    .then((reg)=>{
        console.log('Registration succeeded. Scope is ' + reg.scope);
    })
    .catch(e => {
        console.error('Registration failed with ' + e)
    })
}