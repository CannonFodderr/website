const User = require('../models/user');
const Project = require('../models/project');
const Contact = require('../models/contact');
const Message = require('../models/messages');

Project.belongsTo(User);
User.hasMany(Project, {as: 'projects'});
Message.belongsTo(Contact)
Contact.hasMany(Message, {as: 'messages'});
