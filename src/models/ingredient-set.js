import Sequelize from 'sequelize';

export default (sequelize) => {
  const IngredientSet = sequelize.define('ingredientSets', {
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
        models.IngredientSet.hasMany(models.Ingredient);
        models.IngredientSet.belongsTo(models.Recipe);
      },
    },
    instanceMethods: {
      getClassName: () => 'IngredientSet',
    },
  });

  return IngredientSet;
};
