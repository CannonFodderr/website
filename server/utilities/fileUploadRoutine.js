const testUploads = require('./bufferImgRegexVerify');
const getCloudUrl = require('./cloudinary');

const checkGetUrl = async (req) => {
    let imgUrls = {};
    let uploadedFiles = [];
    let fileKeys = Object.keys(req.files);
    fileKeys.forEach(function(key) {
        uploadedFiles.push(req.files[key]);
    });
    
    let cloudinaryUrls = await new Promise((resolve, reject)=>{
        uploadedFiles.forEach((uploadedFile, index)=>{
            console.log("All files:", uploadedFile)
            testUploads(uploadedFile[0].buffer).then((result)=>{
                if(result !== true){
                    req.flash('failure', 'File check failed')
                    console.error(new Error("File check failed"))
                    resolve(false)
                } else {
                    getCloudUrl(uploadedFile[0], req.user.id).then((data)=> {
                        if(uploadedFile[0].fieldname === 'avatar'){
                            imgUrls.avatar = data.secure_url;
                        } else if(uploadedFile[0].fieldname === 'cover'){
                            imgUrls.cover_image = data.secure_url;
                        }
                        if(index === uploadedFiles.length -1) {
                            resolve(imgUrls)
                        }
                    })
                }
            }) 
        })
    }).then((allUrls)=>{
        console.log(allUrls)
        return imgUrls
    })
    .catch(e => { console.error(e)})
    console.log()
    return cloudinaryUrls;
}

module.exports = checkGetUrl;