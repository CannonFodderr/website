const User = require('../models/user');

module.exports = {
    isAdmin(req, res, next) {
        // Check Local Strategy
        if (req.user && req.user != 'undefined' && req.user.isAdmin === true) {
            return next();
        } 
        req.flash('failure', "Permission denied");
        return res.redirect('/login');        
    },
    isLoggedIn(req, res, next) {
        if (req.user && req.user != 'undefined') {
            return next();
        }
        req.flash('failure', "Please login first")
        return res.redirect('/login');
    },
    isOwner(req, res, next){
        if(req.user && req.user.id == req.params.userId){
            return next();
        }
        req.flash('failure', "Sorry, you can't edit that")
        return res.redirect('/logout');
    }
}