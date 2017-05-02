import Sequelize from 'sequelize';

export default (sequelize) => {
  const Ingredient = sequelize.define('ingredients', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    ingredientSetId: {
      field: 'ingredient_set_id',
      type: Sequelize.UUID,
      references: {
        model: 'ingredientSets',
        key: 'id',
      },
    },
    displayOrder: {
      field: 'display_order',
      type: Sequelize.INTEGER,
    },
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
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      ingredientSetId: {
        type: Sequelize.UUID,
        references: {
          model: 'ingredientSets',
          key: 'id',
        },
      },
      displayOrder: Sequelize.INTEGER,
      quantity: Sequelize.TEXT,
      text: Sequelize.TEXT,
