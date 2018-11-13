'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Projects', 'order', {
      type: Sequelize.INTEGER,
      defaultValue: 999
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Projects', 'order')
  }
};
