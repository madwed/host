import Sequelize from 'sequelize';

export default (sequelize) => {
  const DirectionSet = sequelize.define('directionSets', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    recipeId: {
      field: 'recipe_id',
      type: Sequelize.UUID,
      references: {
        model: 'recipes',
        key: 'id',
      },
    },
    displayOrder: {
      field: 'display_order',
      type: Sequelize.INTEGER,
    },
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

    return queryInterface.createTable('directionSets', {
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
