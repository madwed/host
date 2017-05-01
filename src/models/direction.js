import Sequelize from 'sequelize';

export default (sequelize) => {
  const Direction = sequelize.define('directions', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    directionSetId: {
      field: 'direction_set_id',
      type: Sequelize.UUID,
      references: {
        model: 'directionSets',
        key: 'id',
      },
    },
    displayOrder: {
      field: 'display_order',
      type: Sequelize.INTEGER,
    },
    text: Sequelize.TEXT,
  }, {
    classMethods: {
      associate: (models) => {
        models.Direction.belongsTo(models.DirectionSet);
      },
    },
    instanceMethods: {
      getClassName: () => 'Direction',
    },
  });

  return Direction;
};
