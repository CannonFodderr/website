const router = require('express').Router()
const middleware = require('../middleware/auth');
const Project = require('../models/project');
// New Project routes
router.get('/admin/projects/new',middleware.isAdmin, (req, res)=>{
    res.render('./projects/new', {csrf: req.csrfToken()})
})


router.post('/admin/projects', middleware.isAdmin, (req, res)=>{
    console.log(req.body)
    let newProject = {
        title: req.body.title,
        description: req.body.desc,
        category: req.body.category,
        img: req.body.img,
        link: req.body.link,
        content: req.body.content,
        user_id: req.user.id
    }
    Project.create(newProject)
    .then((createdProject)=>{
        console.log(createdProject);
        res.redirect('/admin')
    })
    .catch((e)=>{
        console.error(e);
        res.redirect('back')
    })
});
// Project Edit Routes
router.get('/admin/projects/:projectid/edit', middleware.isAdmin, (req, res)=>{
    Project.findById(req.params.projectid)
    .then((project)=>{
        res.render('./projects/edit', {project:project, csrf:req.csrfToken()});
    })
    .catch(e =>{ 
        console.log(e)
        res. redirect('/admin')
    })
});

router.put('/admin/projects/:projectid', middleware.isAdmin, (req, res)=>{
    let updateData = {
        title: req.body.title,
        description: req.body.desc,
        category: req.body.category,
        img: req.body.img,
        link: req.body.link,
        content: req.body.content,
    }
    Project.update(updateData, {where: {
        id: req.params.projectid
    }})
    .then((project)=>{
        project.update(updateData);
        project.save();
        res.redirect('/admin')
    })
    .catch(e => {
        console.log(e);
        res.redirect('/admin');
    })
})

router.delete('/admin/projects/:projectid', middleware.isAdmin, (req, res)=>{
    Project.findById(req.params.projectid)
    .then((project)=>{
        if(project.user_id != req.user.id){
            console.log("Matching Failed, You can only delete projects you created...")
            return res.redirect('/logout')
        }
        console.log(`PROJECT DELETED: ${project} by ${req.user.username}`);
        project.destroy();
        res.redirect('/admin')
    })
    .catch(e => {
        console.error(e)
        res.redirect('/admin')
    })
})
module.exports = router