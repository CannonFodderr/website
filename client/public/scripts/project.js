console.log("Project Script")
let deleteButtons = document.querySelectorAll('.del-btn');

deleteButtons.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        if(!confirm("WARNING! This will delete the project, are you sure?")){
            return e.preventDefault()
        }
    })
})