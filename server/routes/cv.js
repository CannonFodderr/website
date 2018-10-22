const router = require('express').Router();
const middleware = require('../middleware/auth');

// View CV
router.get('/cv', (req, res)=>{
    res.render('cv/view', { title: `${process.env.OWNER} - CV` });
});




module.exports = router;