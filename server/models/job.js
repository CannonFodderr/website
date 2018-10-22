const Sequelize = require('sequelize');
const db = require('../db/connect');


const Job = db.define('Job', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique:true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
    },
    content: {
        type: Sequelize.TEXT,
    },
    company: {
        type: Sequelize.STRING,
    },
    features: {
        type: Sequelize.ARRAY({ type:Sequelize.STRING })
    },
    start_date: {
        type: Sequelize.DATEONLY,
        validate: {
            isDate: true
        }
    },
    end_date: {
        type: Sequelize.DATEONLY,
        validate: {
            isDate: true
        }
    },
},{
    underscored:true
});


module.exports = Job;