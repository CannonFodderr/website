const router = require('express').Router()
const passport = require('passport');
const User = require('../models/user');
const middleware = require('../middleware/auth');
const csrfMiddleware = require('../middleware/csurf');
const Message = require('../models/messages');
const Contact = require('../models/contact');
const bcrypt = require('bcrypt');
const sanitizer = require('../middleware/sanitizer');

// ADMIN ROUTES
router.get('/admin', middleware.isAdmin, (req, res) => {
    res.redirect('/admin/messages')
});

// View Admin Edit Form
router.get('/admin/:id/edit', (req, res) => {
    User.findById(req.params.id).then((user) => {
        res.render('./admin/editProfile', {
            user: user,
            title: 'Edit profile',
            csrf: req.csrfToken()
        })
    }).catch((e) => {
        console.error(e)
        res.redirect('/admin');
    })
});

// Update Admin
router.put('/admin/:id/', middleware.isAdmin, (req, res) => {
    let sanitized = sanitizer.sanitizeBody(req)
    User.update(sanitized, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            User.findById(req.params.id).then((user) => {
                res.render('./admin/editProfile', {
                    user: user,
                    title: 'Edit profile',
                    csrf: req.csrfToken()
                })
            })
        }).catch((e) => {
            console.error('Failed to updated: ', e);
        })

});
// Register new admin
router.post('/admin/register', (req, res) => {
    if (req.body.password && req.body.username) {
        let sanitizedData = {
            username: req.body.username,
            password: req.body.password
        }
        bcrypt.genSalt()
            .then((s) => {
                let hashed = bcrypt.hashSync(sanitizedData.password, s)
                User.create({
                        username: sanitizedData.username,
                        password: hashed,
                        salt: s
                    })
                    .then((newAdmin) => {
                        newAdmin.save();
                        return res.redirect('/login');
                    })
            })
    }
    return res.redirect('/login');
});

// LOG IN/OUT
router.get('/login', csrfMiddleware, (req, res) => {
    res.render('./admin/adminLogin', {
        csrf: req.csrfToken(),
        title: 'Login'
    })
});

router.post('/login', csrfMiddleware, passport.authenticate('local', {
    successRedirect: '/admin/messages',
    failureRedirect: '/admin'
}));

router.get('/logout',middleware.isLoggedIn, (req, res) => {
    if (req.user) {
        console.log('Loggin out: ', req.user.username)
        req.logout();
    }
    res.redirect('/');
});


module.exports = router