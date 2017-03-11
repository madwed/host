'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('ingredientSets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      recipeId: {
        type: Sequelize.UUID,
        references: {
          model: 'recipes',
          key: 'id',
        },
      },
      displayOrder: Sequelize.INTEGER,
      title: Sequelize.TEXT,
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('ingredientSets');
  }
};
