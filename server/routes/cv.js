const router = require('express').Router();
const User = require('../models/user');

// View CV
router.get('/profile/:userId/cv', (req, res)=>{
    User.find({where: { id: req.params.userId }, include: ['jobs']})
    .then((user)=>{
        res.render('cv/view', { title: `${user.firstName} ${user.lastName} - CV`, jobs: user.jobs, user:user, bio:user.bio, csrf: req.csrfToken() });
    })
    .catch(e => {
        console.error(e);
        res.redirect('/')
    })
});

module.exports = router;