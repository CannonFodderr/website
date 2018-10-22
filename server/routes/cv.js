const router = require('express').Router();
const middleware = require('../middleware/auth');
const Job = require('../models/job');

// View CV
router.get('/cv', (req, res)=>{
    Job.findAll()
    .then((allJobs)=>{
        res.render('cv/view', { title: `${process.env.OWNER} - CV`, jobs: allJobs });
    })
});




module.exports = router;