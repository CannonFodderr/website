const router = require('express').Router()
const utilities = require('../utilities/auth');
const Tech = require('../models/tech');
const sanitizer = require('../utilities/sanitizer');

// New tech form
router.get('/admin/tech/new',utilities.isAdmin, (req, res)=>{
    res.render('tech/new', {title: 'Add Technology', csrf: req.csrfToken(), user: req.user })
});

// Create new tech
router.post('/admin/tech', utilities.isAdmin, (req, res)=>{
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
// View all tech
router.get('/admin/tech', utilities.isAdmin, (req, res) =>{
    Tech.findAll()
    .then((allTech)=>{
        res.render('tech/all', {title: 'All Technologies', csrf: req.csrfToken(), user: req.user, allTech:allTech })
    })
    .catch(e => {
        console.error(e);
        res.redirect('back');
    })
})

// Edit tech form
router.get('/admin/tech/:techId', utilities.isAdmin, (req, res)=>{
    Tech.findById(req.params.techId)
    .then((foundTech)=>{
        res.render('tech/edit', {title: `Edit ${foundTech.title}`, csrf: req.csrfToken(), user: req.user, tech:foundTech })
    })
    .catch(e => {
        console.error(e);
        res.redirect('back');
    })
})
// Update tech route
router.put('/admin/tech/:techId', utilities.isAdmin, (req, res)=>{
    let sanitized = sanitizer.sanitizeBody(req);
    Tech.update(sanitized, {where: {id: req.params.techId}})
    .then(()=>{
        res.redirect('/admin/tech');
    })
    .catch(e => {
        console.error(e);
        res.redirect('back');
    })
})

module.exports = router;