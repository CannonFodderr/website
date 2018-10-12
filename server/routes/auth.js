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
    res.render('./admin/control', {user: req.user});
});


router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
});

module.exports = router