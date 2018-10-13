const router = require('express').Router()
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');
const middleware = require('../middleware/auth');

// ROUTES
router.get('/admin', (req, res)=>{
    res.render('adminLogin')
});

router.post('/admin', passport.authenticate('local', {
    successRedirect: '/admin/cp',
    failureRedirect: '/admin'
}));

router.get('/admin/cp', middleware.isAdmin, (req, res)=>{
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
    console.log(req.body);
    User.update({username: req.body.username, email: req.body.email, birthday:req.body.birthday, phone:req.body.phone}, {where:{'id':req.params.id}})
    .then(()=>{
        User.findById(req.params.id).then((user)=>{
            res.render('./admin/editProfile', {user: user})
        })
    })
    
});

router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
});

module.exports = router