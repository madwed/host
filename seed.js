import db from './src/models';
import times from 'lodash.times';
import random from 'lodash.random';

import RecipeFabricator from './test/fabricators/recipe-fabricator';
import DirectionFabricator from './test/fabricators/direction-fabricator';
import DirectionSetFabricator from './test/fabricators/direction-set-fabricator';
import IngredientFabricator from './test/fabricators/ingredient-fabricator';
import IngredientSetFabricator from './test/fabricators/ingredient-set-fabricator';
import UserFabricator from './test/fabricators/user-fabricator';

new UserFabricator().then(() => {
  return db.User.findOne();
}).then((user) => {
  return Promise.all(times(15, () => new RecipeFabricator({ userId: user.id })))
}).then(() => {
  return db.Recipe.findAll();
}).then((recipes) => {
  return Promise.all(recipes.map((recipe) => {
    const ingredientSets = times(random(1, 3), (displayOrder) => {
      return new IngredientSetFabricator({ recipeId: recipe.id, displayOrder });
    });

    const directionSets = times(random(1, 3), (displayOrder) => {
      return new DirectionSetFabricator({ recipeId: recipe.id, displayOrder });
    });

    return Promise.all(ingredientSets.concat(directionSets));
  }));
}).then(() => {
  return Promise.all([db.DirectionSet.findAll(), db.IngredientSet.findAll()]);
}).then(([directionSets, ingredientSets]) => {
  const directions = directionSets.map((set) => {
    return Promise.all(times(random(1, 9), (displayOrder) => {
      return new DirectionFabricator({ directionSetId: set.id, displayOrder });
    }));
  });

  const ingredients = ingredientSets.map((set) => {
    return Promise.all(times(random(1, 9), (displayOrder) => {
      return new IngredientFabricator({ ingredientSetId: set.id, displayOrder });
    }));
  });

  return directions.concat(ingredients);
}).then(() => {
  console.log('Successfully seeded recipes');
}).catch((e) => {
  console.warn(e);
});
