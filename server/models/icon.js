const Sequelize = require('sequelize');
const db = require('../db/connect');


const Icon = db.define('Icons', {
    title: {
        type: Sequelize.STRING,
    },
    code: {
        type: Sequelize.STRING
    },
    phrase: {
        type: Sequelize.STRING
    }
},{
    timestamps: false,
    underscored:true
});


module.exports = Icon