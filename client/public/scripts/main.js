if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then((reg)=>{
        
    })
    .catch(e => {
        console.error('Registration failed with ' + e)
    })
}



window.onload = () => {
    let wrapper = document.getElementsByClassName('load-wrapper');
    if(wrapper.length > 0){
        wrapper[0].classList.add('hide');
        setTimeout(()=>{
            wrapper[0].style.display = "none";
        }, 500)
    }
}