const db = require('../db/connect');
const Sequelize = require('sequelize')

const Project = db.define('Project', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 150]
        }
    },
    description: {
        type: Sequelize.TEXT
    },
    content: {
        type: Sequelize.TEXT
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
            isUrl:true
        }
    },
    icon_id: {
        type: Sequelize.INTEGER
    },
    live_demo: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Web Development',
    },
    features: {
        type: Sequelize.ARRAY({ type: Sequelize.STRING })
    },
    order: {
        type: Sequelize.INTEGER,
        defaultValue: 999
    }
}, {
    underscored: true,
})

module.exports = Project