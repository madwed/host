'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('ingredients', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      ingredientSetId: {
        type: Sequelize.UUID,
        references: {
          model: 'ingredientSets',
          key: 'id',
        },
      },
      displayOrder: Sequelize.INTEGER,
      quantity: Sequelize.TEXT,
      text: Sequelize.TEXT,
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('ingredients');
  }
};
