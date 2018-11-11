const router = require('express').Router();
const User = require('../models/user');
const Op = require('sequelize').Op;

// Search profiles
router.get('/profile', (req, res)=> {
    let query = req.query.search
    console.log(query);
    User.findAll({where: {[Op.or]:[{username: query}, {firstName: query}, {lastName: query}]}})
    .then((foundUsers)=>{
        console.log(foundUsers);
        res.send("Users Found")
    })
    .catch(e => {
        console.error(e);
        res.send(e);
    })
    
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