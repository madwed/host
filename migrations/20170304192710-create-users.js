'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      first_name: Sequelize.TEXT,
      last_name: Sequelize.TEXT,
      email: Sequelize.TEXT,
      google_id: Sequelize.TEXT,
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
