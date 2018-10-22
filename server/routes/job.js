const router = require('express').Router();
const middleware = require('../middleware/auth');

// View CV
router.get('/admin/jobs/new',middleware.isAdmin, (req, res)=>{
    res.render('./jobs/new', { title: `Add New Job`, csrf: req.csrfToken() });
});




module.exports = router;