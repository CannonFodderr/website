const router = require('express').Router()
const utilities = require('../utilities/auth');
const Tech = require('../models/tech');
const sanitizer = require('../utilities/sanitizer');

// New tech form
router.get('/user/tech/new',utilities.isAdmin, (req, res)=>{
    res.render('tech/new', {title: 'Add Technology' })
});

// Create new tech
router.post('/user/tech', utilities.isAdmin, (req, res)=>{
    let sanitized = sanitizer.sanitizeBody(req);
    let data = {
        title: sanitized.title,
        img: sanitized.img,
        link: sanitized.link
    }
    Tech.create(data)
    .then((createdTech)=>{
        console.log("Created new tech: ", createdTech);
        res.redirect(`/user/${req.user.id}`);
    })
    .catch(e => {
        console.error(e);
        res.redirect('/user/tech');
    })
});
// View all tech
router.get('/user/:userId/tech', utilities.isAdmin, (req, res) =>{
    Tech.findAll()
    .then((allTech)=>{
        res.render('tech/all', {title: 'All Technologies', allTech:allTech })
    })
    .catch(e => {
        console.error(e);
        res.redirect('back');
    })
})

// Edit tech form
router.get('/user/tech/:techId', utilities.isAdmin, (req, res)=>{
    Tech.findById(req.params.techId)
    .then((foundTech)=>{
        res.render('tech/edit', {title: `Edit ${foundTech.title}`, tech:foundTech })
    })
    .catch(e => {
        console.error(e);
        res.redirect('back');
    })
})
// Update tech route
router.put('/user/tech/:techId', utilities.isAdmin, (req, res)=>{
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