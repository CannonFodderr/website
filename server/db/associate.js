const User = require('../models/user');
const Project = require('../models/project');
const Contact = require('../models/contact');
const Message = require('../models/messages');
const Icon = require('../models/icon');
const Job = require('../models/job');
const Tech = require('../models/tech');
const  db = require('./connect');



Icon.hasMany(Project, {foreignKey: 'icon_id', as: 'icons'});
Project.belongsTo(Icon);
Project.belongsTo(User);
User.hasMany(Project, {as: 'projects'});
Contact.belongsTo(User);
User.hasMany(Contact, {as: 'contacts'});
Message.belongsTo(Contact);
Contact.hasMany(Message, {as: 'messages'});
Tech.belongsToMany(Project, {through: 'ProjectTech'});
Project.belongsToMany(Tech, {through: 'ProjectTech'});

Project.sync({})
.then(()=>{
    Tech.sync({})
}).then(()=>{
    db.sync().then(()=>{
        console.log("DB SYNC O.K.")
    })
})
.catch(e => { console.error(e)})

// db.sync().then(()=>{
//     console.log("DB SYNC O.K.")
// }).catch(e => { console.error(e) })

