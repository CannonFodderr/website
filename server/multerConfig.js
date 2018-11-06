// Multer
const multer = require('multer');
const fileFilter =  (req, file, cb) => {
    let authorizedExt = new RegExp((/\.(gif|jpg|jpeg|tiff|png)$/i));
    if(!authorizedExt.test(file.originalname)){
        return cb(new Error('Only image files allowed...'))
    }
    cb(null, true);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `server/uploads/${req.user.id}/`)
    },
    filename: (req, file, cb) => {
        let ext = file.originalname.split((/\.(gif|jpg|jpeg|tiff|png)$/i))
        cb(null, `${req.user.username}-${file.fieldname}.${ext[1]}`)
    },
});

module.exports = multer({storage: storage, fileFilter: fileFilter});  