const router = require('express').Router()
const passport = require('passport');
const User = require('../models/user');
const middleware = require('../middleware/auth');
const csrfMiddleware = require('../middleware/csurf');
const bcrypt = require('bcrypt');

// ADMIN ROUTES
router.get('/admin', middleware.isAdmin, (req, res) => {
    User.findById(req.user.id, {include: ['projects']}).then((user)=>{
        res.render('./admin/control', {
            user: req.user,
            projects: user.projects
        });
    })
    
});
// Admin Edit
router.get('/admin/:id/edit', (req, res) => {
    User.findById(req.params.id).then((user) => {
        res.render('./admin/editProfile', {
            user: user,
            csrf: req.csrfToken()
        })
    }).catch((e) => {
        console.error(e)
        res.redirect('/admin');
    })
});

router.post('/admin/:id/edit', middleware.isAdmin, (req, res) => {
    User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            User.findById(req.params.id).then((user) => {
                res.render('./admin/editProfile', {
                    user: user,
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
        bcrypt.genSalt()
            .then((s) => {
                let hashed = bcrypt.hashSync(req.body.password, s)
                User.create({
                        username: req.body.username,
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
        csrf: req.csrfToken()
    })
});

router.post('/login', csrfMiddleware, passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin'
}));

router.get('/logout', (req, res) => {
    if (req.user) {
        console.log('Loggin out: ', req.user.username)
        req.logout();
    }
    res.redirect('/');
});


module.exports = router