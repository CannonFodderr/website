'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Jobs', 'features', {
      type: Sequelize.ARRAY({ type: Sequelize.STRING })
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Jobs', 'features')
  }
};
