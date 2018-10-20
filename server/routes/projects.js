const router = require('express').Router()
const middleware = require('../middleware/auth');
const Project = require('../models/project');
// New Project routes
router.get('/projects', (req, res)=>{
    if(req.query.category){
        Project.findAll({ where: {category: req.query.category }}).then((foundProjects)=>{
        return res.render('./projects/all', { projects: foundProjects, title: `${req.query.category} projects` })
        })
    } else {
        Project.findAll().then((allProjects)=>{
        return res.render('./projects/all', { projects: allProjects, title: `All projects` })
        })
    }
})


router.get('/admin/projects/new',middleware.isAdmin, (req, res)=>{
    res.render('./projects/new', {csrf: req.csrfToken(), title: 'New project'})
})


router.post('/admin/projects', middleware.isAdmin, (req, res)=>{
    let features = req.body.features.trim().split(';')
    let filteredFeats = features.filter(feat => feat.length > 0);
    let newProject = {
        title: req.body.title,
        description: req.body.desc,
        features: filteredFeats,
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
        console.log(project.features);
        res.render('./projects/edit', {project:project, csrf:req.csrfToken(), title: `Edit ${project.title}`, features: project.features });
    })
    .catch(e =>{ 
        console.log(e)
        res. redirect('/admin')
    })
});

router.put('/admin/projects/:projectid', middleware.isAdmin, (req, res)=>{
    let features = req.body.features.trim().split(';')
    let filteredFeats = features.filter(feat => feat.length > 0);
    let updateData = {
        title: req.body.title,
        features: filteredFeats,
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
        console.log(project.features);
        res.redirect('/admin');
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