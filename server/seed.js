const config = require('../dbconfig')
const User = require('./models/user');
const Project = require('./models/project');
const bcrypt = require('bcrypt');

// ***********************************
// Force create table & seed the Admin
// ***********************************
// clear Table
// User.destroy({
//     where: {'username': 'Admin'}
// });

// // Create table and seed first Admin
// Project.drop();
// User.drop();


// User.sync({force:true}).then(()=>{
//     bcrypt.genSalt().then((s)=>{
//         let hashedPassword = bcrypt.hashSync(config.password, s)
//         User.create({ username: 'Admin', password: hashedPassword, salt: s, isAdmin: true}).then((admin)=>{
//             admin.save()
//         })
//     }).then(()=>{
//         Project.sync({force:true})
//         .then(()=>{
//             Project.create({title: "My first project", description:"Nice descriptions ha?", user_id: 1})
//         })
//     })
// });

// Project.create({title:"Best Project eveeeer", description: "Actually before was better", user_id:1})

Project.findById(1, {include: [User]}).then((pj)=>{
    console.log('Project belongs to: ', pj.User.username)
})

User.findById(1, {include: 'projects'}).then((user)=>{
    user.projects.forEach((p)=>{
        console.log(p.id, p.title, p.description)
    })
})


