let deleteButtons = document.querySelectorAll('.del-btn');
let addFeatureBtn = document.getElementById('add-feature');
let featureList = document.getElementById('feature-list');
let featureInput = document.getElementById('add-feature-input');
let featuresSubmit = document.getElementById('featuresInput');

if(featureList){
    featureList.addEventListener('mouseover', ()=>{
        let allFeatures = document.querySelectorAll('.delete-feature-icon');
        allFeatures.forEach((item)=>{
            item.addEventListener('click', (e)=>{
                featureInput.value='';
                let itemToRemove = item.parentNode.parentNode.parentNode;
                FeaturesToInput()
                itemToRemove.remove();
            })
        })
        let currentInputs = document.querySelectorAll('.feature-input');
        currentInputs.forEach((item)=>{
            item.addEventListener('change', ()=>{
                FeaturesToInput()
            })
        })
    });
}
if(addFeatureBtn){
    addFeatureBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        let newFeature = featureInput.value
        if(newFeature.length > 1){
            featureList.innerHTML += `<div class="input-group input-group-block"><div class="input-group-prepend"><span class="input-group-text text-light bg-dark" id="basic-addon1"><i class="fas fa-trash delete-feature-icon text-danger"></i></span></div><li class="list-group-item user-feature-item"></i><input class="form-control feature-input" type="text" value="${newFeature}"></li></div>`
            featureInput.value = '';
            FeaturesToInput();
        };
    });
}
function FeaturesToInput(){
    featuresSubmit.value = "";
    let featureString = "";
    let currentFeatures = document.querySelectorAll('.feature-input');
    currentFeatures.forEach((feat)=>{
        if(feat.value.trim().length > 0){
            featureString += `${feat.value.trim()};`;
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