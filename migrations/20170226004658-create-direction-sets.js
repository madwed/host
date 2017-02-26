'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('directionSets', {
      id: { type: Sequelize.UUID, primaryKey: true },
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
    return queryInterface.dropTable('directionSets');
  }
};
