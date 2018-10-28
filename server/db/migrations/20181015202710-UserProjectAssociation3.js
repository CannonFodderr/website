'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Projects', {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [10,150]
        }
      },
      body: {
        type: Sequelize.TEXT,
      },
      author: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Projects')
  }
};
