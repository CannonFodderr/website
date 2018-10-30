const User = require('../models/user');

module.exports = {
    isAdmin(req, res, next) {
        // Check Local Strategy
        if (req.user && req.user != 'undefined' && req.user.isAdmin === true) {
            return next();
        } 
        // Check Google oAuth2
        else if (req.user && req.user.provider === 'google' && req.user.id != null){
            User.find({where: {googleId: req.user.id }})
            .then((foundUser)=>{
                if(foundUser.isAdmin == true){
                    foundUser.update({googleId: req.user.id})
                    return next();
                }
            })
            .catch(e => {
                console.error(e);
            })
        } else {
            // Login failed
            return res.redirect('/login');
        }
        
    },
    isLoggedIn(req, res, next) {
        if (req.user && req.user != 'undefined') {
            return next();
        }
        return res.redirect('back');
    },
}