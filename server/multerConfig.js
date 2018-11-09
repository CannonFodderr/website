// Multer
const multer = require('multer');

const multerImageSetup = {
    fileFilter: () => {
        return fileFilter =  (req, file, cb) => {
            let authorizedExt = new RegExp((/\.(gif|jpg|jpeg|tiff|png)$/i));
            if(!authorizedExt.test(file.originalname)){
                return cb(null, false)
            }
            cb(null, true);
        }
    },
    imageFileName: () => {
        return filename = (req, file, cb) => {
            let ext = file.originalname.split((/\.(gif|jpg|jpeg|tiff|png)$/i))
            cb(null, `${req.user.username}-${file.fieldname}.${ext[1]}`)
        }
    },
    localStorage: () => {
        return multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, `server/uploads/${req.user.id}/`)
            },
            filename: multerImageSetup.imageFileName(), 
        });
    },
    memoryStorage: () => {
        return  memStorage = multer.memoryStorage({
            filename: multerImageSetup.imageFileName()
        });
    },
    state: (storageState) => {
        let storage = multerImageSetup.localStorage()
        if(storageState === 'mem'){
            storage = multerImageSetup.memoryStorage()
        }
        return multer({storage: storage, fileFilter: multerImageSetup.fileFilter(), limits: { fileSize: 500000}});
    },
}




module.exports = multerImageSetup