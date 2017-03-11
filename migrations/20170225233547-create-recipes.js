'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('recipes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      activeTime: Sequelize.TEXT,
      description: Sequelize.TEXT,
      favorite: Sequelize.BOOLEAN,
      imageUrl: Sequelize.TEXT,
      note: Sequelize.TEXT,
      originalUrl: Sequelize.TEXT,
      servings: Sequelize.TEXT,
      source: Sequelize.TEXT,
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      totalTime: Sequelize.TEXT,
      userId: {
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
