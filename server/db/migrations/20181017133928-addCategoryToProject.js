'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Projects', 'category', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Dev',
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Projects', 'category')
  }
};
