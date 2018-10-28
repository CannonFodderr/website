const router = require('express').Router();
const middleware = require('../middleware/auth');
const sanitizer = require('../middleware/sanitizer');
const Job = require('../models/job');

// New Job Form
router.get('/admin/jobs/new',middleware.isAdmin, (req, res)=>{
    res.render('./jobs/new', { title: `Add New Job`, csrf: req.csrfToken(), user: req.user });
});

// ADD New Job
router.post('/admin/jobs', middleware.isAdmin, (req, res)=>{
    let sanitized = sanitizer.sanitizeBody(req)
    let features = sanitized.features.trim().split(';')
    let newJob = {
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
        console.log(createdJob);
        res.redirect('/admin/jobs');
    })
    .catch(e => {
        console.error(e);
        res.redirect('/admin/jobs');
    })
});

// View all Jobs
router.get('/admin/jobs', middleware.isAdmin, (req, res)=>{
    console.log(req.user)
    Job.findAll()
    .then((allJobs)=>{
        res.render('./jobs/all', {title: 'All Jobs', jobs: allJobs, user: req.user })
    })
    .catch(e => {
        console.error(e);
        res.redirect('/admin');
    })
})
// Edit Job Form
router.get('/admin/jobs/:jobId/edit', middleware.isAdmin, (req, res)=>{
    Job.findById(req.params.jobId)
    .then((foundJob)=>{
        console.log(foundJob);
        res.render('./jobs/edit', {title: `Edit ${foundJob.title}`, job:foundJob, user: req.user, csrf: req.csrfToken() })
    })
    .catch(e => {
        console.error(e);
        res.redirect('/admin/jobs')
    })
})
// Job Update Route
router.put('/admin/jobs/:jobId', middleware.isAdmin, (req, res)=>{
    let sanitized = sanitizer.sanitizeBody(req)
    let features = req.body.features.trim().split(';')
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
        console.log(updatedJob);
        res.redirect('/admin/jobs')
    })
    .catch(e => {
        console.error(e);
        res.redirect('/admin/job/:jobId/edit')
    })
});

router.delete('/admin/jobs/:jobId', middleware.isAdmin, (req, res)=>{
    Job.findById(req.params.jobId)
    .then((foundJob)=>{
        console.log("DELETING JOB:", foundJob)
        foundJob.destroy();
        res.redirect('/admin/jobs');
    })
    .catch(e => {
        console.error(e);
        res.redirect('/admin/jobs');
    })
})
module.exports = router;