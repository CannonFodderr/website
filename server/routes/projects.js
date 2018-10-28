const router = require('express').Router()
const middleware = require('../middleware/auth');
const Project = require('../models/project');
const Tech = require('../models/tech');
const Icon = require('../models/icon');

// Visitor Views
router.get('/projects', (req, res)=>{
    if(req.query.category){
        Project.findAll({ where: { category: req.query.category }, include: [{model: Icon}]}).then((foundProjects)=>{
            console.log(foundProjects)
            return res.render('./projects/all', { projects: foundProjects, title: `${req.query.category} projects` })
        })
    } else {
        Project.findAll({include: [{model: Icon}]}).then((allProjects)=>{
            return res.render('./projects/all', { projects: allProjects, title: `All projects` })
        })
    }
})
// VIEW PROJECT
router.get('/projects/:projectid', (req, res)=>{
    Project.findById(req.params.projectid, 
        {include: [{model: Icon}]})
        .then((project)=>{
            if (project && project.Icon != null) {
                res.render('./projects/details', {title: project.title, project:project, icon: project.Icon.dataValues })
            } else{
                res.render('./projects/details', {title: project.title, project:project, icon: null })
            }
        }).catch(e => {
            console.error(e);
            res.redirect('/projects');
        })
    })
    // Admin Views
    router.get('/admin/projects', middleware.isAdmin, (req, res)=>{
        Project.findAll()
        .then((allProjects)=>{
            res.render('./projects/adminGrid', {projects: allProjects, title: 'All Projects', user: req.user})
        })
    })
    
    router.get('/admin/projects/new',middleware.isAdmin, (req, res)=>{
        res.render('./projects/new', {csrf: req.csrfToken(), title: 'New project', user: req.user})
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
            Icon.findAll().then((icons)=>{
                Tech.findAll().then((allTech)=>{
                    res.render('./projects/edit', 
                    {project:project, csrf:req.csrfToken(), title: `Edit ${project.title}`, icons: icons, techs: allTech, user: req.user });
                })
            })
        })
        .catch(e =>{ 
            console.log(e)
            res. redirect('/admin')
        })
    });
    
    router.put('/admin/projects/:projectid', middleware.isAdmin, (req, res)=>{
        let features = req.body.features.trim().split(';')
        console.log(req.body)
        let filteredFeats = features.filter(feat => feat.length > 0);
        let updateData = {
            title: req.body.title,
            features: filteredFeats,
            description: req.body.desc,
            category: req.body.category,
            img: req.body.img,
            link: req.body.link,
            icon_id: req.body.icon,
            content: req.body.content,
        }
        Project.update(updateData, {where: {
            id: req.params.projectid
        }})
        .then(()=>{
            Project.findById(req.params.projectid)
            .then((project)=>{
                res.redirect('/admin');
            })
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
    });
    
    
    
    module.exports = router