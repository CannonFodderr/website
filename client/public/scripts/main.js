console.log('Connected!');



window.addEventListener('load', ()=>{
    let wrapper = document.getElementsByClassName('load-wrapper');
    wrapper[0].classList.add('hide');
    setTimeout(()=>{
        wrapper[0].style.display = "none";
    }, 2000)
})