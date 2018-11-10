const router = require('express').Router()
const passport = require('passport');
const csrfMiddleware = require('../utilities/csurf');

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