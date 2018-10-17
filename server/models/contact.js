const db = require('../db/connect');
const Sequelize = require('sequelize');


const Contact = db.define('Contact', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: Sequelize.STRING
    },
    company: {
        type: Sequelize.STRING
    }
},{
    underscored: true
});

module.exports = Contact;