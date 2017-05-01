'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('recipes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      active_time: Sequelize.TEXT,
      description: Sequelize.TEXT,
      favorite: Sequelize.BOOLEAN,
      image_url: Sequelize.TEXT,
      note: Sequelize.TEXT,
      original_url: Sequelize.TEXT,
      servings: Sequelize.TEXT,
      source: Sequelize.TEXT,
      title: Sequelize.TEXT,
      total_time: Sequelize.TEXT,
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('recipes');
  }
};
