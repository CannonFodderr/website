const config = require('../dbconfig')
const User = require('./models/user');
const Project = require('./models/project');
const bcrypt = require('bcrypt');

// ***********************************
// Force create table & seed the Admin
// ***********************************

// Drop Tables
Project.drop().then(()=>{
    User.drop().then(()=>{
        // Create new Users table
        User.sync({force:true}).then(()=>{
            // Encrypt password
            bcrypt.genSalt().then((s)=>{
                let hashedPassword = bcrypt.hashSync(config.password, s)
                // Create new User
                User.create({ username: 'Admin', password: hashedPassword, salt: s, isAdmin: true}).then((admin)=>{
                    admin.save()
                })
            }).then(()=>{
                // Create new Projects table
                Project.sync({force:true})
                .then(()=>{
                    // Create new project and add
                    Project.create({title: "My first project", description:"Nice descriptions ha?", user_id: 1})
                })
            })
        }).then(()=>{
            // Test Project owner (User association)
            Project.findById(1, {include: [User]}).then((pj)=>{
                console.log('********************')
                console.log('Project belongs to: ', pj.User.username)
                console.log('********************')
            }).then(()=>{
                // Test User projects (Project association)
                User.findById(1, {include: 'projects'}).then((user)=>{
                    user.projects.forEach((p)=>{
                        console.log('********************')
                        console.log(p.id, p.title, p.description)
                        console.log('********************')
                    })
                })
            })
        })
    })
}).catch((e)=>{
    console.error(e)
})





// Project.create({title:"Best Project eveeeer", description: "Actually before was better", user_id:1})






