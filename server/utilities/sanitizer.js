const sanitizer = {
    sanitizeBody: (req) =>{
        let sanitizedData = {}
        for(var key in req.body){
            sanitizedData[key] = req.sanitize(req.body[key])
        }
        return sanitizedData
    }
}

module.exports = sanitizer