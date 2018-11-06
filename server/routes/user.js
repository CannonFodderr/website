const router = require('express').Router()
const passport = require('passport');
const User = require('../models/user');
const middleware = require('../middleware/auth');
const csrfMiddleware = require('../middleware/csurf');
const Message = require('../models/messages');
const Contact = require('../models/contact');
const bcrypt = require('bcrypt');
const sanitizer = require('../middleware/sanitizer');

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
router.put('/user/:userId/', middleware.isLoggedIn, (req, res) => {
    let sanitized = sanitizer.sanitizeBody(req)
    sanitized.bio = sanitized.bio.replace(/\r?\n/g, '<br />');
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