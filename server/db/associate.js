const User = require('../models/user');
const Project = require('../models/project');
const Contact = require('../models/contact');
const Message = require('../models/messages');
const Icon = require('../models/icon');
const  db = require('./connect');

Project.belongsTo(User);
Project.belongsToMany(Icon, {through: 'projectIcons'});
Icon.belongsToMany(Project, {through: 'projectIcons'});
User.hasMany(Project, {as: 'projects'});
Contact.belongsTo(User);
User.hasMany(Contact, {as: 'contacts'});
Message.belongsTo(Contact);
Contact.hasMany(Message, {as: 'messages'});

db.sync().then(()=>{
    // User.findById(1, {include: ['projects', 'contacts']}).then((user)=>{
    //     console.log(user.contacts[0].name)
    //     console.log(user.projects)
    // })
    // Project.update({features: db.fn('array_append', db.col('features'), "Third Feature")}, {where: {'id': 6}})
    // Project.findById(6).then((project)=>{
    //     console.log(project.features.forEach((f)=>{
    //         console.log(f)
    //     }))
    // })
}).catch(e => { console.error(e) })

