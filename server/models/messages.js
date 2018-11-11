const Sequelize = require('sequelize');
const sq = require('../db/connect');

const Message = sq.define('Message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    destination_id: {
        type: Sequelize.INTEGER
    },
    content: {
        type: Sequelize.TEXT
    },
}, {
    underscored:true,
});


module.exports = Message;