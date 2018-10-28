const router = require('express').Router()
const middleware = require('../middleware/auth');
const Tech = require('../models/tech');
const sanitizer = require('../middleware/sanitizer');

router.get('/admin/tech/new',middleware.isAdmin, (req, res)=>{
    res.render('tech/new', {title: 'Add Technology', csrf: req.csrfToken(), user: req.user })
});

router.post('/admin/tech', middleware.isAdmin, (req, res)=>{
    let sanitized = sanitizer.sanitizeBody(req);
    let data = {
        title: sanitized.title,
        img: sanitized.img,
        link: sanitized.link
    }
    Tech.create(data)
    .then((createdTech)=>{
        console.log("Created new tech: ", createdTech);
        res.redirect('/admin');
    })
    .catch(e => {
        console.error(e);
        res.redirect('/admin/tech');
    })
});


module.exports = router;