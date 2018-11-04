const router = require('express').Router();

// 404 route
router.get('*', (req, res)=>{
    res.render('404', {title: '404 Page'})
});


module.exports = router;