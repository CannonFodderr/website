const fs = require('fs')


const fsMiddleware = {
    preUpload: (req, res, next) => {
        if(!fs.existsSync(`server/uploads/${req.user.id}`)){
            fs.mkdirSync(`server/uploads/${req.user.id}`)
            return next()
        }
        return next()
    }
}

module.exports = fsMiddleware;