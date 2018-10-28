const Sequelize = require('sequelize');
const sq = require('../db/connect');

const Message = sq.define('Message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: Sequelize.TEXT
    },
}, {
    underscored:true,
});


module.exports = Message;