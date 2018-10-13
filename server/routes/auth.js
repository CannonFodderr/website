const router = require('express').Router()
const passport = require('passport');
const User = require('../models/user');
const middleware = require('../middleware/auth');

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
    console.log(req.body);
    User.update({username: req.body.username, email: req.body.email, birthday:req.body.birthday, phone:req.body.phone}, {where:{id:req.params.id}})
    .then(()=>{
        User.findById(req.params.id).then((user)=>{
            res.render('./admin/editProfile', {user: user})
        })
    })
    
});

// LOG IN/OUT
router.get('/login', (req, res) => {
    res.render('./admin/adminLogin')
});

router.post('/login', passport.authenticate('local', {
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