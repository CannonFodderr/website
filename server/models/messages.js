const Sequelize = require('sequelize');
const sq = require('../db/connect');

const Message = sq.define('Message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    author: {
        type: Sequelize.TEXT,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
    },
    content: {
        type: Sequelize.TEXT
    },
    onDelete: 'cascade'
});

module.exports = Message;