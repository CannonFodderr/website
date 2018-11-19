const router = require('express').Router();
const User = require('../models/user');
const Op = require('sequelize').Op;
const sanitizer = require('express-sanitizer');

// Search profiles
router.get('/profile', (req, res)=> {
    if(!req.query.search){
        User.findAll({order: [['id', 'asc']]})
        .then((allUsers)=>{
            res.render('cv/all', {users: allUsers, title: "All Users"})
        })
    } else {
        let query = req.sanitize(req.query.search)
        User.findAll({where: {[Op.or]:[{username:{[Op.like]: `%${query}%`}}, {firstName:  {[Op.like]: `%${query}%`}}, {lastName:  {[Op.like]: `%${query}%`}}, {email:  {[Op.like]: `%${query}%`}}]}, order: [['id', 'asc']]})
        .then((foundUsers)=>{
            res.render('cv/all', {users: foundUsers, title: "Found Users"})
        })
        .catch(e => {
            console.error(e);
            res.send(e);
        })
    }
})


// View CV
router.get('/profile/:userId/cv', (req, res)=>{
    User.find({where: { id: req.params.userId },include: ['jobs'], order: [['jobs', 'start_date', 'DESC']]})
    .then((user)=>{
        res.render('cv/view', { title: `${user.firstName} ${user.lastName} - CV`, jobs: user.jobs, user:user, bio:user.bio });
    })
    .catch(e => {
        console.error(e);
        res.redirect('/')
    })
});

router.get('/profile/:userId/print', (req, res)=>{
    User.find({where: { id: req.params.userId },include: ['jobs'], order: [['jobs', 'start_date', 'DESC']]})
    .then((user)=>{
        res.render('cv/print', { title: `${user.firstName} ${user.lastName} - CV`, jobs: user.jobs, user:user, bio:user.bio });
    })
    .catch(e => {
        console.error(e);
        res.redirect('/')
    })
})

module.exports = router;