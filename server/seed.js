const config = require('../dbconfig')
const User = require('./models/user');
const Project = require('./models/project');
const Message = require('./models/messages');
const Contact = require('./models/contact');
const bcrypt = require('bcrypt');

// ***********************************
// Force create table & seed the Admin
// ***********************************

// Project.drop().then(()=>{
//     User.drop().then(()=>{
//         User.sync({force:true}).then(()=>{
//             bcrypt.genSalt().then((s)=>{
//                 let hashedPassword = bcrypt.hashSync(config.password, s)
//                 User.create({ username: 'Admin', password: hashedPassword, salt: s, isAdmin: true}).then((admin)=>{
//                     admin.save()
//                 })
//             }).then(()=>{
//                 Project.sync({force:true})
//                 .then(()=>{
//                     Project.create({title: "My first project", description:"Nice descriptions ha?", user_id: 1})
//                 })
//             })
//         }).then(()=>{
//             // Test Project owner (User association)
//             Project.findById(1, {include: [User]}).then((pj)=>{
//                 console.log('********************')
//                 console.log('Project belongs to: ', pj.User.username)
//                 console.log('********************')
//             }).then(()=>{
//                 // Test User projects (Project association)
//                 User.findById(1, {include: 'projects'}).then((user)=>{
//                     user.projects.forEach((p)=>{
//                         console.log('********************')
//                         console.log(p.id, p.title, p.description)
//                         console.log('********************')
//                     })
//                 })
//             })
//         })
//     })
// }).catch((e)=>{
//     console.error(e)
// })


// *********************************************
// Contacts & Messages Force create table & seed 
// *********************************************
// Message.drop().then(()=>{
//     Contact.drop()
//     .then(()=>{
//         Contact.sync({force:true})
//         .then(()=>{
//             Contact.create({
//                 name: 'First Contact',
//                 email: 'test@test.com',
//                 phone: '0526777777',
//                 company: 'Testing INC'
//             })
//         }).then(()=>{
//             Message.sync({force:true})
//             .then(()=>{
//                 Message.create({content: "ITS MEE MARIOOO!"})
//             })
//         })
//     })
//     .catch(e => {
//         console.error(e);
//     })
// });









