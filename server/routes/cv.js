const router = require('express').Router();
const middleware = require('../middleware/auth');
const Job = require('../models/job');
const User = require('../models/user');

// View CV
router.get('/cv', (req, res)=>{
    User.find({where: { username: 'Admin'}})
    .then((user)=>{
        console.log(user.bio)
        let bio = user.bio
        console.log(bio)
        Job.findAll()
        .then((allJobs)=>{
            res.render('cv/view', { title: `${process.env.OWNER} - CV`, jobs: allJobs, user:user, bio:bio });
        })
    })
    .catch(e => {
        console.error(e);
        res.redirect('/')
    })
    
});




module.exports = router;