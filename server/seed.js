const config = require('../dbconfig')
const User = require('./models/user');
const Project = require('./models/project');
const Message = require('./models/messages');
const Icon = require('./models/icon');
const Contact = require('./models/contact');
const bcrypt = require('bcrypt');

// ***********************************
// Force create table & seed the Admin
// ***********************************
User.sync({force:true}).then(()=>{
    bcrypt.genSalt().then((s)=>{
        let hashedPassword = bcrypt.hashSync(config.password, s)
        User.create({ username: 'Admin', password: hashedPassword, salt: s, isAdmin: true}).then((admin)=>{
            admin.save()
        })
    }).then(()=>{
        Project.sync({force:true})
        .then(()=>{
            Project.create({title: "My first project", description:"Nice descriptions ha?", user_id: 1})
        })
    })
})


// *********************************************
// Contacts & Messages Force create table & seed 
// *********************************************
// Message.drop().then(()=>{
//     Contact.drop()
//     .then(()=>{
//         Contact.sync({force:true})
//         .then(()=>{
//             Contact.create({
//                 name: 'Super Mario',
//                 email: 'test@test.com',
//                 phone: '0526777777',
//                 company: 'Testing INC',
//                 user_id: 1
//             })
//         }).then(()=>{
//             Message.sync({force:true})
//             .then(()=>{
//                 Message.create({content: "ITS MEE MARIOOO!", contact_id: 1})
//             })
//         })
//     })
//     .catch(e => {
//         console.error(e);
//     })
// });


// Icon.sync({force:true}).then((e)=>{
//     Icon.create({title:'GitHub', code: '<i class="fab fa-github-square"></i>', phrase: 'git it'})
//     .catch((e)=>{
//         console.error(e)
//     })
// })



// Icon.findById(1).then((icon)=>{
//     Project.findById(1).then((project)=>{
//         project.addIcon(icon, {through: {project_id: project.id, IconId: 1 }})
//         console.log(project.projectIcons);
//     })
// })
// .catch(e => {
//     console.error(e);
// })








