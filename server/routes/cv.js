const router = require('express').Router();
const User = require('../models/user');
const Op = require('sequelize').Op;
const sanitizer = require('express-sanitizer');

// Search profiles
router.get('/profile', (req, res)=> {
    if(!req.query.search){
        User.findAll()
        .then((allUsers)=>{
            res.render('cv/all', {users: allUsers, user: req.user, csrf: req.csrfToken(), title: "All Users"})
        })
    } else {
        let query = req.sanitize(req.query.search)
        User.findAll({where: {[Op.or]:[{username:{[Op.like]: `%${query}%`}}, {firstName:  {[Op.like]: `%${query}%`}}, {lastName:  {[Op.like]: `%${query}%`}}, {email:  {[Op.like]: `%${query}%`}}]}})
    .then((foundUsers)=>{
        res.render('cv/all', {users: foundUsers, user: req.user, csrf: req.csrfToken(), title: "Found Users"})
    })
    .catch(e => {
        console.error(e);
        res.send(e);
    })
    }
})


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