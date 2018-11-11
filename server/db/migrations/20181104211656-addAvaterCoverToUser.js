'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'cover_image', {
      type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    })
    queryInterface.addColumn('Users', 'avatar', {
      type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'cover_image')
    queryInterface.removeColumn('Users', 'avatar')
  }
};
