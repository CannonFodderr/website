const router = require('express').Router()
const passport = require('passport');
const User = require('../models/user');
const middleware = require('../middleware/auth');
const csrfMiddleware = require('../middleware/csurf');

// ADMIN ROUTES
router.get('/admin', middleware.isAdmin, (req, res)=>{
    res.render('./admin/control', { user: req.user });
});

router.get('/admin/:id/edit', (req, res)=>{
    User.findById(req.params.id).then((user)=>{
        res.render('./admin/editProfile', {user:user})
    }).catch((e)=>{
        console.error(e)
        res.redirect('/admin');
    })
});

router.post('/admin/:id/edit', middleware.isAdmin, (req, res)=>{
    User.update(req.body, {where:{id:req.params.id}})
    .then(()=>{
        User.findById(req.params.id).then((user)=>{
            res.render('./admin/editProfile', {user: user})
        })
    }).catch((e)=>{
        console.error('Failed to updated: ', e);
    })
    
});

// LOG IN/OUT
router.get('/login',csrfMiddleware, (req, res) => {
    res.render('./admin/adminLogin', { csrf: req.csrfToken() })
});

router.post('/login',csrfMiddleware, passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin'
}));

router.get('/logout', (req, res)=>{
    if (req.user){
        console.log('Loggin out: ', req.user.username)
        req.logout();
    }
    res.redirect('/');
});

module.exports = router