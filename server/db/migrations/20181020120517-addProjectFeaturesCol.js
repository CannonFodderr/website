'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Projects', 'features', Sequelize.ARRAY({ type: Sequelize.STRING }));
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Projects', 'features')
  }
};
