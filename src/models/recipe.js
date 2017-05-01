import Sequelize from 'sequelize';

export default (sequelize) => {
  const Recipe = sequelize.define('recipes', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    activeTime: {
      field: 'active_time',
      type: Sequelize.TEXT,
    },
    description: Sequelize.TEXT,
    favorite: Sequelize.BOOLEAN,
    imageUrl: {
      field: 'image_url',
      type: Sequelize.TEXT,
    },
    note: Sequelize.TEXT,
    originalUrl: {
      field: 'original_url',
      type: Sequelize.TEXT,
    },
    servings: Sequelize.TEXT,
    source: Sequelize.TEXT,
    title: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    totalTime: {
      field: 'total_time',
      type: Sequelize.TEXT,
    },
  }, {
    classMethods: {
      associate: (models) => {
        models.Recipe.belongsTo(models.User);
        models.Recipe.hasMany(models.DirectionSet);
        models.Recipe.hasMany(models.IngredientSet);
      },
    },
    instanceMethods: {
      getClassName: () => 'Recipe',
    },
  });

  return Recipe;
};
