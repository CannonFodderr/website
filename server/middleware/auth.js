

module.exports = {
    isAdmin(req, res, next){
        if (req.user && req.user != 'undefined' && req.user.isAdmin){
            return next();
        }
        return res.redirect('/admin')
    },
    isLoggedIn(req, res, next){
        if(req.user && req.user != 'undefined'){
            return next();
        }
        return res.redirect('back');
    }
}


