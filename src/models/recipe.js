import Sequelize from 'sequelize';

export default (sequelize) => {
  const Recipe = sequelize.define('recipes', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    activeTime: Sequelize.TEXT,
    description: Sequelize.TEXT,
    favorite: Sequelize.BOOLEAN,
    imageUrl: Sequelize.TEXT,
    note: Sequelize.TEXT,
    originalUrl: Sequelize.TEXT,
    servings: Sequelize.TEXT,
    source: Sequelize.TEXT,
    title: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    totalTime: Sequelize.TEXT,
  }, {
    classMethods: {
      associate: (models) => {
        models.Recipe.hasMany(models.DirectionSet);
        models.Recipe.hasMany(models.IngredientSet);
      },
    },
  });

  return Recipe;
};
