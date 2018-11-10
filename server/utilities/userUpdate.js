
const sanitizer = require('./sanitizer');
const User = require('../models/user');

const updateUser = async (req, imgsUrls) => {
    console.log("FROM UPDATE FUNC:", imgsUrls)
    let sanitized = sanitizer.sanitizeBody(req)
    if(imgsUrls !== null){
        if(imgsUrls.avatar){
            sanitized.avatar = imgsUrls.avatar
        }
        if(imgsUrls.cover_image){
            sanitized.cover_image = imgsUrls.cover_image
        } 
    }
    sanitized.bio = sanitized.bio.replace(/\r?\n/g, '<br />');
    User.update(sanitized, {
        where: {
            id: req.user.id
        }
    })
    .then(() => {
        console.log("User updated")
    })
    .catch((e) => {
        console.error('Failed to updated: ', e);
    })
}
module.exports = updateUser