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
        limits: { fileSize: 1000000, files: 2},
    }).fields( [{name: 'avatar', maxCount: 1}, {name: 'cover', maxCount: 1}])(req, res, (err)=>{
        if (err instanceof multer.MulterError) {
            console.error(err.message)
            req.flash('failure', err.message)
            res.redirect(`/user/${req.user.id}`);
        } else if (err) {
            console.error(err)
            req.flash('failure', err.message)
            res.redirect(`/user/${req.user.id}`);
        } else{
            req.flash('success', 'Profile updated!')
            next();
        }
    })
}

