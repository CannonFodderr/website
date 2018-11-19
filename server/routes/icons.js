const router = require('express').Router()
const Icon = require('../models/icon');
const utilities = require('../utilities/auth');
const sanitizer = require('../utilities/sanitizer');

// New Icon form
router.get('/user/:userId/icons/new',utilities.isAdmin, (req, res)=>{
    res.render('icons/new', { title: 'Add Icon'})
})
// Create new icon
router.post('/user/:userId/icons',utilities.isAdmin, (req, res)=>{
    let sanitized = sanitizer.sanitizeBody(req)
    Icon.findOrCreate(
        {where: { title: sanitized.title }, 
        defaults: { code: sanitized.code, phrase: sanitized.phrase }})
        .then((createdIcon)=>{
            console.log("CREATED NEW ICON:", createdIcon);
            res.redirect(`/user/${req.user.id}/icons`);
        })
        .catch(e => {
            console.error(e);
            res.redirect(`/user/${req.user.id}/icons/new`);
        })
})

module.exports = router;