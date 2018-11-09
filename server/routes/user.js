const router = require('express').Router()
const passport = require('passport');
const User = require('../models/user');
const middleware = require('../middleware/auth');
const csrfMiddleware = require('../middleware/csurf');
const fsMiddleware = require('../middleware/uploads');
const bcrypt = require('bcrypt');
const sanitizer = require('../middleware/sanitizer');
const uploadImage = require('../multerConfig');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// User ROUTES
router.get('/user', middleware.isLoggedIn, (req, res) => {
    res.redirect(`/user/${req.user.id}`);
});

// View User Edit Form
router.get('/user/:userId/',middleware.isLoggedIn, (req, res) => {
    User.findById(req.params.userId).then((user) => {
        res.render('./user/editProfile', {
            user: user,
            bio: user.bio.replace(/<br\s*[\/]?>/gi, "\n"),
            title: 'Edit profile',
            csrf: req.csrfToken()
        })
    }).catch((e) => {
        console.error(e)
        res.redirect('/user');
    })
});

// Update User
router.put('/user/:userId/', middleware.isOwner, uploadImage.state('mem').fields([{name: 'avatar', maxCount: 1}, {name: 'cover', maxCount: 1}]), (req, res) => {
    const testUploads = (buffer) => {
        return new Promise((resolve, reject)=>{
            console.log("GOT TO FS")
            let fileString = buffer.toString('utf8')
            let imgRegex = new RegExp(/JFIF|PNG|JPEG/)
            let regIndex = imgRegex.exec(fileString);
            let imgRegexRepeats = fileString.split(imgRegex).length;
            if(!regIndex || imgRegexRepeats > 2 || regIndex.index > 6){
                reject("userid: " + req.user.id + " - Uploaded BAD file! " + file.originalname)
            } else {
                resolve("File is O.K.")
            }
        })
    }
    const getCloudUrl = (file) => {
        return new Promise((resolve, reject)=> {
            cloudinary.v2.uploader.upload_stream({folder: `cv/${req.user.id}/images`}, (err, result)=>{
                if(err){
                    console.error(err)
                    reject(err)
                } else {
                    resolve(result)
                }
            }).end(file.buffer)
            
        })
    }
    let sanitized = sanitizer.sanitizeBody(req)
    const updateUser = () => {
        sanitized.bio = sanitized.bio.replace(/\r?\n/g, '<br />');
        console.log(sanitized)
        User.update(sanitized, {
            where: {
                id: req.user.id
            }
        })
        .then(() => {
            res.redirect(`/user/${req.params.userId}`);
        })
        .catch((e) => {
            console.error('Failed to updated: ', e);
        })
    }
    const checkGetUrl = async () => {
        let uploadedFiles = [];
        let fileKeys = Object.keys(req.files);
        fileKeys.forEach(function(key) {
            uploadedFiles.push(req.files[key]);
        });
        let uploadDone = await new Promise((resolve, reject)=>{
            uploadedFiles.forEach((uploadedFile, index)=>{
                testUploads(uploadedFile[0].buffer).then((result)=>{
                    console.log("FS CHECK: ", result)
                    getCloudUrl(uploadedFile[0]).then((data)=> {
                        console.log("FROM Cloudinary: ", data)
                        if(uploadedFile[0].fieldname === 'avatar'){
                            sanitized.avatar = data.secure_url;
                        } else if(uploadedFile[0].fieldname === 'cover'){
                            sanitized.cover_image = data.secure_url;
                        }
                        if(index === uploadedFiles.length -1) resolve(true)
                    })
                }) 
            })
        })
        .catch(e => { console.error(e)})
        console.log(uploadDone)
        return uploadDone;
    }
    if(Object.keys(req.files).length == 0){
        updateUser()
    }
    checkGetUrl().then((isDone)=>{
        console.log(isDone);
        if(isDone === true){
            updateUser()
        }
    })
    
    
    
});
// User Education
router.get('/user/:userId/education', middleware.isOwner, (req, res)=>{
    User.findById(req.user.id)
    .then((foundUser)=>{
        res.render('./user/education', {
            title: 'Add Education',
            csrf: req.csrfToken(),
            user: foundUser
        })
    })
    
})
router.put('/user/:userId/education', middleware.isOwner, (req, res)=>{
    User.findById(req.user.id)
    .then((foundUser)=>{
        let sanitizedBody = sanitizer.sanitizeBody(req);
        let eduFeatures = [];
        if(sanitizedBody.features){
            let featuresArr = sanitizedBody.features.trim().split(';');
            featuresArr.forEach((feat)=>{
                if(feat.length > 1){
                    eduFeatures.push(feat);
                }
            })
        }
        foundUser.education = eduFeatures;
        foundUser.save();
        res.redirect('back')
    })
    .catch(e => {
        console.log(e);
        res.redirect('back') 
    })   
})
// User skills
router.get('/user/:userId/skills', middleware.isOwner, (req, res)=>{
    User.findById(req.user.id)
    .then((foundUser)=>{
        res.render('./user/skills', {
            title: 'Add Skills',
            csrf: req.csrfToken(),
            user: foundUser
        })
    })
    
})
router.put('/user/:userId/skills', middleware.isOwner, (req, res)=>{
    User.findById(req.user.id)
    .then((foundUser)=>{
        let sanitizedBody = sanitizer.sanitizeBody(req);
        let skillFeatures = [];
        if(sanitizedBody.features){
            let featuresArr = sanitizedBody.features.trim().split(';');
            featuresArr.forEach((feat)=>{
                if(feat.length > 1){
                    skillFeatures.push(feat);
                }
            })
        }
        foundUser.skills = skillFeatures;
        foundUser.save();
        res.redirect('back')
    })
    .catch(e => {
        console.log(e);
        res.redirect('back') 
    })   
})
// New User Form
router.get('/register', (req, res) => {
    res.render('./user/newProfile', {title: 'Register new profile', csrf: req.csrfToken() })
});
// Register new user
router.post('/register', (req, res) => {
    if (req.body.password && req.body.username) {
        let sanitizedData = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }
        bcrypt.genSalt()
        .then((s) => {
            let hashed = bcrypt.hashSync(sanitizedData.password, s)
            User.create({
                username: sanitizedData.username,
                email: sanitizedData.email,
                password: hashed,
                salt: s
            })
            .then((newUser) => {
                console.log(`Created new user: ${sanitizedData.username}`);
                return res.redirect('/login');
            })
        }).catch(e => {
            console.error(e);
            return res.redirect('/login');
        })
    }
    
});

// LOG IN/OUT
router.get('/login', csrfMiddleware, (req, res) => {
    res.render('./user/userLogin', {
        csrf: req.csrfToken(),
        title: 'Login'
    })
});

// oAUTH GOOGLE
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'https://mail.google.com/'] }));

router.get('/login/google/callback', passport.authenticate('google', { failureRedirect: '/login'}),
(req, res) => {
    res.redirect(`/user/${req.user.id}/projects`);
}
);


// AUTH LOCAL
router.post('/login', csrfMiddleware, passport.authenticate('local', {
    successRedirect: `/user`,
    failureRedirect: '/login'
}));

router.get('/logout', (req, res) => {
    if (req.user) {
        console.log(`Loggin out: ${req.user.username}`)
        req.logout();
    }
    res.redirect('/');
});


module.exports = router