import Sequelize from 'sequelize';

export default (sequelize) => {
  const Direction = sequelize.define('directions', {
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
  }, {
    classMethods: {
      associate: (models) => {
        models.Direction.belongsTo(models.DirectionSet);
      },
    },
  });

  return Direction;
};
