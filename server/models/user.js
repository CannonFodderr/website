// const config = require('../../dbconfig');
const passportLocalSequelize = require('passport-local-sequelize');
const Sequelize = require('sequelize');
const db = require('../db/connect');

const User = db.define('User', {
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
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.TEXT
    },
    birthday: Sequelize.DATEONLY,
    bio: {
        type: Sequelize.TEXT,
    },
    salt: Sequelize.STRING,
},
{
    underscored:true
});

passportLocalSequelize.attachToUser(User, {
    usernameField: 'username',
    hashField: 'password',
    saltField: 'salt',
});

module.exports = User;