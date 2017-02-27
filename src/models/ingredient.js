import Sequelize from 'sequelize';

export default (sequelize) => {
  const Ingredient = sequelize.define('ingredients', {
    id: { type: Sequelize.UUID, primaryKey: true },
    ingredientSetId: {
      type: Sequelize.UUID
      references: {
        model: 'ingredientSets',
        key: 'id',
      },
    },
    displayOrder: Sequelize.INTEGER,
    text: Sequelize.TEXT,
  }, {
    classMethods: {
      associate: (models) => {
        models.Ingredient.belongsTo(models.IngredientSet);
      },
    },
  });

  return Ingredient;
};
