// Multer
const multer = require('multer');

module.exports = (req, res, next) => {
    multer({storage: multer.memoryStorage(),
        fileFilter: (req, file, cb) => {
            let authorizedExt = new RegExp((/\.(gif|jpg|jpeg|tiff|png)$/i));
            if(!authorizedExt.test(file.originalname)){
                return cb(null, false)
            }
            cb(null, true)
        }, 
        limits: { fileSize: 500000},
        onerror: (err, next) => {
            console.log("From multer uploader: ", err)
            next(err)
        }
    }).fields( [{name: 'avatar', maxCount: 1}, {name: 'cover', maxCount: 1}])(req, res, (err)=>{
        if (err instanceof multer.MulterError) {
            console.log(err.message)
            req.flash('Error', err.message)
            res.redirect(`/user/${req.user.id}`)
        } else if (err) {
            console.log(err)
            req.flash('Error', err.message)
            res.redirect(`/user/${req.user.id}`)
        } else{
            next()
        }
    })
}

