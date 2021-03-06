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
    facebookId: {
        type: Sequelize.BIGINT
    },
    username: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
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
        type: Sequelize.ARRAY({ type: Sequelize.STRING })
    },
    education: {
        type: Sequelize.ARRAY({ type: Sequelize.STRING })
    },
    cover_image:{
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    },
    avatar: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
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