let deleteButtons = document.querySelectorAll('.del-btn');
let addFeatureBtn = document.getElementById('add-feature');
let featureList = document.getElementById('feature-list');
let featureInput = document.getElementById('add-feature-input');
let featuresSubmit = document.getElementById('featuresInput');

featureList.addEventListener('mouseover', ()=>{
    let allFeatures = document.querySelectorAll('.delete-feature-icon');
    allFeatures.forEach((item)=>{
        item.addEventListener('click', (e)=>{
            featureInput.value='';
            FeaturesToInput()
            item.parentNode.remove();
        })
    })
})


addFeatureBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let newFeature = featureInput.value
    if(newFeature.length > 1){
        featureList.innerHTML += `<li class="list-group-item feature-item"><i class="fas fa-trash delete-feature-icon text-danger"></i>${newFeature.trim()}</li>`
        featureInput.value = '';
        FeaturesToInput();
    };
});

function FeaturesToInput(){
    featuresSubmit.value = "";
    let featureString = "";
    featureList.childNodes.forEach((li)=>{
        if(li.textContent.trim().length > 0){
            featureString += `${li.textContent.trim()};`;
        }
    });
    featuresSubmit.value = featureString;
}



deleteButtons.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        if(!confirm("WARNING! are you sure you want to DELETE?")){
            return e.preventDefault()
        }
    })
});