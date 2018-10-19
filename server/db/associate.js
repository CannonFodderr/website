const User = require('../models/user');
const Project = require('../models/project');
const Contact = require('../models/contact');
const Message = require('../models/messages');
const  db = require('./connect');

Project.belongsTo(User);
User.hasMany(Project, {as: 'projects'});
Contact.belongsTo(User);
User.hasMany(Contact, {as: 'contacts'});
Message.belongsTo(Contact);
Contact.hasMany(Message, {as: 'messages'});


db.sync().then(()=>{
    User.findById(1, {include: ['projects', 'contacts']}).then((user)=>{
        console.log(user.contacts[0].name)
        console.log(user.projects)
    })
}).catch(e => { console.error(e) })

