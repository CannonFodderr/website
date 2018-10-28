'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Messages', {
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
    onDelete: cascade
    },
    {
      engine: 'postgres',    // default: 'InnoDB'
      charset: 'utf-8',   // default: null
      schema: 'public'     // default: public, PostgreSQL only.
    }
    )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Messages')
  }
};
