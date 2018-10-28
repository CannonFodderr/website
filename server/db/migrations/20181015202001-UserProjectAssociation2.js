'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Projects', {
      title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      }
    });
    queryInterface.addColumn('Users', 'projects', {
      assosiate: (models) => {
        User.hasMany(models.Project, {
            foreignKey: 'owner'
        });
    },
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Projects')
    queryInterface.removeColumn('Users', 'projects')
  }
};
