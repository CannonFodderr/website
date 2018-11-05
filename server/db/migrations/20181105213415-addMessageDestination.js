'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Messages', 'destination_id', {
      type: Sequelize.INTEGER
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Messages', 'destination_id')
  }
};
