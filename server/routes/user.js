const router = require('express').Router()
const User = require('../models/user');
const middleware = require('../utilities/auth');
const bcrypt = require('bcrypt');
const sanitizer = require('../utilities/sanitizer');
const uploadImage = require('../utilities/multerMemUploader');
const updateUser = require('../utilities/userUpdate');
const checkGetUrl = require('../utilities/fileUploadRoutine');


// User ROUTES
router.get('/user', middleware.isLoggedIn, (req, res) => {
    res.redirect(`/user/${req.user.id}`);
});

// View User Edit Form
router.get('/user/:userId/',middleware.isLoggedIn, (req, res) => {
    User.findById(req.params.userId).then((user) => {
        let bio = "";
        if(user.bio){
            user.bio.replace(/<br\s*[\/]?>/gi, "\n")
        }
        res.render('./user/editProfile', {
            user: user,
            bio: bio,
            title: 'Edit profile',
            csrf: req.csrfToken(),
            flash: req.flash()
        })
    }).catch((e) => {
        console.error(e)
        res.redirect('back');
    })
});

// Update User
router.put('/user/:userId/', middleware.isOwner, uploadImage, (req, res) => {
    // IF USER UPLOADED A FILE RUN TESTS
    if(Object.keys(req.files).length > 0){
        checkGetUrl(req)
        .then((imgUrls)=>{
            if(Object.keys(req.files).length === Object.keys(imgUrls).length){
                console.log("Before update: ", imgUrls);
                updateUser(req, imgUrls)
                .then(()=>{
                    res.redirect(`/user/${req.params.userId}`);
                })
            } else {
                req.flash('faliure', 'Sorry, unable to update');
                res.redirect('back')
            }
        })
        // IF NOT UPDATE USER
    } else {
        console.log("No uploaded files found")
        updateUser(req, null)
        .then(()=>{
            res.redirect(`/user/${req.params.userId}`);
        })
    }
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
    
});
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
    res.render('./user/newProfile', {title: 'GET YOUR CV', csrf: req.csrfToken(), flash: req.flash() })
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
            }).catch(e => {    
                console.error(e);
                req.flash('faliure', `Error, ${e.path} : ${e.value}`)
                res.redirect('/register');
            });
        }).catch(e => {
            console.error(e);
            return res.redirect('/login');
        })
    }
});




module.exports = router