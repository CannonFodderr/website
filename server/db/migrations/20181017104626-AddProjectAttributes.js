'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Projects', 'content', {
      type: Sequelize.TEXT,
    });
    queryInterface.addColumn('Projects', 'img', {
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      }
    });
    queryInterface.addColumn('Projects', 'link', {
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Projects', 'content')
    queryInterface.removeColumn('Projects', 'img')
    queryInterface.removeColumn('Projects', 'link')
  }
};
