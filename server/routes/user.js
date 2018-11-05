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
    console.log(req.user)
    res.redirect("/user/"+ req.user.id + "/edit")
});

// View User Edit Form
router.get('/user/:id/edit',middleware.isLoggedIn, (req, res) => {
    User.findById(req.params.id).then((user) => {
        res.render('./user/editProfile', {
            user: user,
            title: 'Edit profile',
            csrf: req.csrfToken()
        })
    }).catch((e) => {
        console.error(e)
        res.redirect('/user');
    })
});

// Update User
router.put('/user/:id/', middleware.isLoggedIn, (req, res) => {
    let sanitized = sanitizer.sanitizeBody(req)
    User.update(sanitized, {
            where: {
                id: req.user.id
            }
        })
        .then(() => {
            User.findById(req.params.id).then((user) => {
                res.render('./user/editProfile', {
                    user: user,
                    title: 'Edit profile',
                    csrf: req.csrfToken()
                })
            })
        }).catch((e) => {
            console.error('Failed to updated: ', e);
        })

});
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
        res.redirect('/user/<%= req.user.id %>/projects');
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