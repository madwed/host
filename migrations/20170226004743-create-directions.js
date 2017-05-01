'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('directions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      direction_set_id: {
        type: Sequelize.UUID,
        references: {
          model: 'directionSets',
          key: 'id',
        },
      },
      display_order: Sequelize.INTEGER,
      text: Sequelize.TEXT,
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('directions');
  }
};
