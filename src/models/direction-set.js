import Sequelize from 'sequelize';

export default (sequelize) => {
  const DirectionSet = sequelize.define('directionSets', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    recipeId: {
      type: Sequelize.UUID,
      references: {
        model: 'recipes',
        key: 'id',
      },
    },
    displayOrder: Sequelize.INTEGER,
    title: Sequelize.TEXT,
  }, {
    classMethods: {
      associate: (models) => {
        models.DirectionSet.hasMany(models.Direction);
        models.DirectionSet.belongsTo(models.Recipe);
      },
    },
    instanceMethods: {
      getClassName: () => 'DirectionSet',
    },
  });
  return DirectionSet;
};

