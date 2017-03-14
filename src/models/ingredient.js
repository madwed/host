import Sequelize from 'sequelize';

export default (sequelize) => {
  const Ingredient = sequelize.define('ingredients', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    ingredientSetId: {
      type: Sequelize.UUID,
      references: {
        model: 'ingredientSets',
        key: 'id',
      },
    },
    displayOrder: Sequelize.INTEGER,
    quantity: Sequelize.FLOAT,
    text: Sequelize.TEXT,
  }, {
    classMethods: {
      associate: (models) => {
        models.Ingredient.belongsTo(models.IngredientSet);
      },
    },
    instanceMethods: {
      getClassName: () => 'Ingredient',
    },
  });

  return Ingredient;
};
