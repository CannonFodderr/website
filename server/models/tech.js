const db = require('../db/connect');
const Sequelize = require('sequelize');

const Tech = db.define('Technologies', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    },
    link: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    }
},{
    underscored: true,
    timestamps: false
})

module.exports = Tech;