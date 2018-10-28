'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Messages', 'created_at', Sequelize.DATE)
    queryInterface.addColumn('Messages', 'updated_at', Sequelize.DATE)
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Messages', 'created_at')
    queryInterface.removeColumn('Messages', 'updated_at')
  }
};
