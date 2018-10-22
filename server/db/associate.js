const User = require('../models/user');
const Project = require('../models/project');
const Contact = require('../models/contact');
const Message = require('../models/messages');
const Icon = require('../models/icon');
const Job = require('../models/job');
const  db = require('./connect');

Icon.hasMany(Project, {foreignKey: 'icon_id', as: 'icons'});
Project.belongsTo(Icon);
Project.belongsTo(User);
User.hasMany(Project, {as: 'projects'});
Contact.belongsTo(User);
User.hasMany(Contact, {as: 'contacts'});
Message.belongsTo(Contact);
Contact.hasMany(Message, {as: 'messages'});

// Icon.sync({force:true})
// .then(()=>{
//     Project.sync({force:true})
//     .then(()=>{
//         db.sync()
//         .catch(e => { console.error(e) })
//     })
// })


db.sync().then(()=>{
    
}).catch(e => { console.error(e) })

