'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('ingredients', {
      id: { type: Sequelize.UUID, primaryKey: true },
      ingredientSetId: {
        type: Sequelize.UUID
        references: {
          model: 'ingredientSets',
          key: 'id',
        },
      },
      displayOrder: Sequelize.INTEGER,
      text: Sequelize.TEXT,
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('ingredients');
  }
};
