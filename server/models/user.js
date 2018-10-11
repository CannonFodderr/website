const config = require('../../dbconfig');
const passportLocalSequelize = require('passport-local-sequelize');
const Sequelize = require('sequelize');
const sq = require('../db/connect');

const User = sq.define('User', {
    age: Sequelize.INTEGER,
    myhash: Sequelize.STRING,
    mysalt: Sequelize.STRING
});

passportLocalSequelize.attachToUser(User, {
    usernameField: 'nick',
    hashField: config.hashField,
    saltField: config.saltField
});

module.exports = User;