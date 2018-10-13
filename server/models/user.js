const config = require('../../dbconfig');
const passportLocalSequelize = require('passport-local-sequelize');
const Sequelize = require('sequelize');
const sq = require('../db/connect');


const User = sq.define('User', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    username: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[a-z0-9\_\-]+$/i,
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    birthday: Sequelize.DATE,
    salt: Sequelize.STRING
});

passportLocalSequelize.attachToUser(User, {
    usernameField: 'nick',
    hashField: config.hashField,
    saltField: config.saltField
});

module.exports = User;