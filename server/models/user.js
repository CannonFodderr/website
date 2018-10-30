const env = require('dotenv').config();
const passportLocalSequelize = require('passport-local-sequelize');
const Sequelize = require('sequelize');
const db = require('../db/connect');

const User = db.define('User', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    googleId: {
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
    skills: {
        type: Sequelize.ARRAY({type: Sequelize.STRING })
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