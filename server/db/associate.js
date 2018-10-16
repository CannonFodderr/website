const User = require('../models/user');
const Project = require('../models/project');


Project.belongsTo(User);
User.hasMany(Project, {as: 'projects'});