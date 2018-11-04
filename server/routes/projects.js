const router = require('express').Router()
const middleware = require('../middleware/auth');
const Project = require('../models/project');
const Tech = require('../models/tech');
const Icon = require('../models/icon');
const User = require('../models/user');

// Visitor Views
// ALL PROJECTS
router.get('/projects', (req, res)=>{
    if(req.query.category){
        Project.findAll({ where: { category: req.query.category }, include: [Icon]}).then((foundProjects)=>{
            return res.render('./projects/all', { projects: foundProjects, title: `${req.query.category} projects` })
        })
    } else {
        Project.findAll({include: [Icon]}).then((allProjects)=>{
            return res.render('./projects/all', { projects: allProjects, title: `All projects` })
        })
    }
});
// VIEW PROJECT
router.get('/projects/:projectid', (req, res)=>{
    Project.findById(req.params.projectid, 
        {include: [Icon, Tech]})
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
    // User Views
    router.get('/user/:id/projects', middleware.isLoggedIn, (req, res)=>{
        User.findById(req.user.id, {include: ['projects']})
        .then((user)=>{
            console.log(user)
            res.render('./projects/userGrid', {projects: user.projects, title: `User Projects`, user: user})
        })
        .catch(e => {
            console.error(e);
            res.redirect('back');
        })
    })
    
    router.get('/user/:id/projects/new',middleware.isLoggedIn, (req, res)=>{
        res.render('./projects/new', {csrf: req.csrfToken(), title: 'New project', user: req.user})
    })
    
    
    router.post('/user/:id/projects', middleware.isLoggedIn, (req, res)=>{
        let features = req.body.features.trim().split(';')
        let filteredFeats = features.filter(feat => feat.length > 0);
        let newProject = {
            title: req.body.title,
            description: req.body.desc,
            features: filteredFeats,
            category: req.body.category,
            img: req.body.img,
            link: req.body.link,
            live_demo: req.body.demo,
            content: req.body.content,
            user_id: req.user.id
        }
        Project.create(newProject)
        .then((createdProject)=>{
            res.redirect(`/user/${req.user.id}/projects`)
        })
        .catch((e)=>{
            console.error(e);
            res.redirect('back')
        })
    });
    // Project Edit Routes
    router.get('/user/:id/projects/:projectid/edit', middleware.isLoggedIn, (req, res)=>{
        Project.findById(req.params.projectid, {include: [Icon, Tech, User]})
        .then((project)=>{
            console.log(project)
            let projectTechs = []
            project.Technologies.forEach((tech)=>{
                projectTechs.push(tech.dataValues.id)
            });
            Icon.findAll().then((icons)=>{
                Tech.findAll().then((allTech)=>{
                    res.render('./projects/edit', 
                    {project:project, csrf:req.csrfToken(), title: `Edit ${project.title}`, icons: icons, techs: allTech, projectTechs: projectTechs, user: project.User });
                })
            })
        })
        .catch(e =>{ 
            console.log(e)
            res. redirect(`/user/${req.user.id}/projects`)
        })
    });
    
    router.put('/user/:id/projects/:projectid', middleware.isLoggedIn, (req, res)=>{
        let features = req.body.features.trim().split(';')
        let filteredFeats = features.filter(feat => feat.length > 0);
        let updateData = {
            title: req.body.title,
            features: filteredFeats,
            description: req.body.desc,
            category: req.body.category,
            img: req.body.img,
            link: req.body.link,
            live_demo: req.body.demo,
            icon_id: req.body.icon,
            content: req.body.content,
        }
        Project.update(updateData, {where: {
            id: req.params.projectid
        }})
        .then(()=>{
            Project.findById(req.params.projectid, {include: [Tech]})
            .then((project)=>{
                let techIds = []
                if (req.body.tech != undefined && typeof(req.body.tech) == 'array'){
                    req.body.tech.forEach((t)=>{
                        techIds.push(Number(t));
                    })
                }
                let projectTechs = []
                project.Technologies.forEach((tech)=>{
                    projectTechs.push(tech.dataValues.id)
                });
                project.removeTechnologies(projectTechs).then(()=>{
                    project.addTechnologies(req.body.tech).then(()=>{
                        res.redirect(`/user/${req.user.id}/projects`);
                    })
                })
            })
        })
        .catch(e => {
            console.log(e);
            res.redirect(`/user/${req.user.id}/projects`);
        })
    })
    
    router.delete('/user/:id/projects/:projectid', middleware.isLoggedIn, (req, res)=>{
        Project.findById(req.params.projectid)
        .then((project)=>{
            if(project.user_id != req.user.id){
                console.log("Matching Failed, You can only delete projects you created...")
                return res.redirect('/logout')
            }
            console.log(`PROJECT DELETED: ${project} by ${req.user.username}`);
            project.destroy();
            res.redirect('/user')
        })
        .catch(e => {
            console.error(e)
            res.redirect('/user')
        })
    });
    
    
    
    module.exports = router