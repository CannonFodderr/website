// const fs = require('fs')
const fs = require('fs-extra');

const fsMiddleware = {
    preUpload: (req, res, next) => {
        if(!fs.existsSync(`server/uploads/${req.user.id}`)){
            fs.mkdirSync(`server/uploads/${req.user.id}`)
            return next()
        }
        return next()
    },
    uploadCleanup: (dirPath) => {
        fs.remove(dirPath)
        .then(() => {console.log("Removed DIR: ", dirPath)})
        .catch(e => {console.error(e)});
    }
}

module.exports = fsMiddleware;