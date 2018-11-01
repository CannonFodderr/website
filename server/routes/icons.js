const router = require('express').Router()
const Icon = require('../models/icon');
const middleware = require('../middleware/auth');
const sanitizer = require('../middleware/sanitizer');

// New Icon form
router.get('/admin/icons/new',middleware.isAdmin, (req, res)=>{
    res.render('icons/new', { title: 'Add Icon', csrf: req.csrfToken(), user: req.user})
})
// Create new icon
router.post('/admin/icons',middleware.isAdmin, (req, res)=>{
    let sanitized = sanitizer.sanitizeBody(req)
    console.log(sanitized);
    Icon.findOrCreate(
        {where: { title: sanitized.title }, 
        defaults: { code: sanitized.code, phrase: sanitized.phrase }})
        .then((createdIcon)=>{
            console.log("CREATED NEW ICON", createdIcon);
            res.redirect('/admin');
        })
        .catch(e => {
            console.error(e);
            res.redirect('/admin/icons/new');
        })
})

module.exports = router;