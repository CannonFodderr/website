const router = require('express').Router();
const middleware = require('../middleware/auth');
const sanitizer = require('../middleware/sanitizer');
const Job = require('../models/job');

// View CV
router.get('/admin/jobs/new',middleware.isAdmin, (req, res)=>{
    res.render('./jobs/new', { title: `Add New Job`, csrf: req.csrfToken() });
});

router.post('/admin/jobs', middleware.isAdmin, (req, res)=>{
    let sanitized = sanitizer.sanitizeBody(req)
    let newJob = {
        title: sanitized.title,
        description: sanitized.description,
        company: sanitized.company,
        start_date: sanitized.startDate,
        end_date: sanitized.endDate,
        content: sanitized.content
    };
    Job.create(newJob)
    .then((createdJob)=>{
        console.log(createdJob);
        res.redirect('/admin');
    })
    .catch(e => {
        console.error(e);
        res.redirect('/admin');
    })
})


module.exports = router;