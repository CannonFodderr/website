'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Projects', 'live_demo', {
      type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Projects', 'live_demo')
  }
};
