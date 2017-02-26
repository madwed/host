'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('directions', {
      id: { type: Sequelize.UUID, primaryKey: true },
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
