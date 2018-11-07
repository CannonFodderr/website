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
    uploadCleanup: (req) => {
        if(fs.existsSync(`server/uploads/${req.user.id}`)){
            fs.removeSync(`server/uploads/${req.user.id}`);
        }
    }
}

module.exports = fsMiddleware;