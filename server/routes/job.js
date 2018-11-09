const router = require('express').Router();
const utilities = require('../utilities/auth');
const sanitizer = require('../utilities/sanitizer');
const Job = require('../models/job');

// New Job Form
router.get('/user/:userId/jobs/new',utilities.isLoggedIn, (req, res)=>{
    res.render('./jobs/new', { title: `Add New Job`, csrf: req.csrfToken(), user: req.user });
});

// ADD New Job
router.post('/user/:userId/jobs', utilities.isLoggedIn, (req, res)=>{
    let sanitized = sanitizer.sanitizeBody(req)
    let features = null;
    if(sanitized.features){
        features = sanitized.features.trim().split(';')
    }
    let newJob = {
        user_id: req.user.id,
        title: sanitized.title,
        description: sanitized.description,
        company: sanitized.company,
        features: features,
        start_date: sanitized.startDate,
        end_date: sanitized.endDate,
        content: sanitized.content
    };
    Job.create(newJob)
    .then((createdJob)=>{
        res.redirect(`/user/${req.user.id}/jobs`);
    })
    .catch(e => {
        console.error(e);
        res.redirect(`/user/${req.user.id}/jobs/new`);
    })
});

// View all Jobs
router.get('/user/:userId/jobs', utilities.isLoggedIn, (req, res)=>{
    Job.findAll({ where: {user_id: req.user.id }})
    .then((allJobs)=>{
        res.render('./jobs/all', {title: 'All Jobs', jobs: allJobs, user: req.user })
    })
    .catch(e => {
        console.error(e);
        res.redirect('/user');
    })
})
// Edit Job Form
router.get('/user/:userId/jobs/:jobId/edit', utilities.isOwner, (req, res)=>{
    Job.findById(req.params.jobId)
    .then((foundJob)=>{
        res.render('./jobs/edit', {title: `Edit ${foundJob.title}`, job:foundJob, user: req.user, csrf: req.csrfToken() })
    })
    .catch(e => {
        console.error(e);
        res.redirect(`/user/${ req.params.userId }/jobs`)
    })
})
// Job Update Route
router.put('/user/:userId/jobs/:jobId', utilities.isOwner, (req, res)=>{
    let sanitized = sanitizer.sanitizeBody(req)
    let features = sanitized.features.trim().split(';')
    let updateData = {
        title: sanitized.title,
        description: sanitized.description,
        company: sanitized.company,
        features: features,
        start_date: sanitized.startDate,
        end_date: sanitized.endDate,
        content: sanitized.content
    };
    Job.update(updateData, {where: { id: req.params.jobId}})
    .then((updatedJob)=>{
        res.redirect(`/user/${req.user.userId}/jobs`)
    })
    .catch(e => {
        console.error(e);
        res.redirect(`/user/${req.user.userId}/job/:jobId/edit`)
    })
});

router.delete('/user/:userId/jobs/:jobId', utilities.isOwner, (req, res)=>{
    Job.findById(req.params.jobId)
    .then((foundJob)=>{
        console.log("DELETING JOB:", foundJob)
        foundJob.destroy();
        res.redirect(`/user/${req.user.userId}/jobs`);
    })
    .catch(e => {
        console.error(e);
        res.redirect('/admin/jobs');
    })
})
module.exports = router;