const router = require('express').Router();
const Job = require('../models/job');
const User = require('../models/user');
const Project = require('../models/project');

// View CV
router.get('/cv', (req, res)=>{
    User.find({include: ['projects'], where: { username: 'Admin'}})
    .then((user)=>{
        let bio = user.bio;
        Job.findAll({order: [["start_date", "DESC"]]})
        .then((allJobs)=>{
            res.render('cv/view', { title: `${user.firstName} ${user.lastName} - CV`, jobs: allJobs, user:user, bio:bio, csrf: req.csrfToken() });
        })
    })
    .catch(e => {
        console.error(e);
        res.redirect('/')
    })
});

module.exports = router;