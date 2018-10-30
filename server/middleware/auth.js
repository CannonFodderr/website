module.exports = {
    isAdmin(req, res, next) {
        // Check Local Strategy
        if (req.user && req.user != 'undefined' && req.user.isAdmin) {
            console.log(req.user)
            return next();
        // Check Google oAuth2
        } else if (req.user && req.user[0].googleId != null && req.user[0].isAdmin == true){
            console.log(req.user)
            return next();
        }
        // Login failed
        return res.redirect('/login');
    },
    isLoggedIn(req, res, next) {
        if (req.user && req.user != 'undefined') {
            return next();
        }
        return res.redirect('back');
    },
}