const cloudinary = require('cloudinary');
const env = require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const getCloudUrl = (file, reqUserId) => {
    return new Promise((resolve, reject)=> {
        cloudinary.v2.uploader.upload_stream({folder: `cv/${reqUserId}/images`}, (err, result)=>{
            if(err){
                console.error(err)
                reject(null, err)
            } else {
                resolve(result)
            }
        }).end(file.buffer)
        
    }).catch(e => console.error(e))
}

module.exports = getCloudUrl