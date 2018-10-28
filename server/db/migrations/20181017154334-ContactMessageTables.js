'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Contacts', {
      id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
      name: {
          type: Sequelize.TEXT,
          allowNull: false,
          unique: true,
          validate: {
              is: /^[a-zA-Z\_\-]+$/i,
          }
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
              isEmail: true
          }
      },
      phone: {
          type: Sequelize.STRING
      },
      company: {
          type: Sequelize.STRING
      }
  },{
      underscored: true
  })

    queryInterface.createTable('Messages', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      content: {
          type: Sequelize.TEXT
      },
  }, {
      underscored:true
  })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Contacts');
    queryInterface.dropTable('Messages');
  }
};
