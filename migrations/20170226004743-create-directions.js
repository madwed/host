'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('directions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      directionSetId: {
        type: Sequelize.UUID,
        references: {
          model: 'directionSets',
          key: 'id',
        },
      },
      displayOrder: Sequelize.INTEGER,
      text: Sequelize.TEXT,
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('directions');
  }
};
