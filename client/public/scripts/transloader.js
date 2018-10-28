window.addEventListener('load', ()=>{
    let wrapper = document.getElementsByClassName('trans-load-wrapper');
    wrapper[0].classList.add('hide');
    setTimeout(()=>{
        wrapper[0].style.display = "none";
    }, 1000)
})