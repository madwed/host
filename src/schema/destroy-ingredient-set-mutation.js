import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import {
  fromGlobalId,
  mutationWithClientMutationId,
  toGlobalId,
} from 'graphql-relay';

import Recipe from './recipe';

import db from '../models';

const DestroyIngredientSetMutation = mutationWithClientMutationId({
  name: 'DestroyIngredientSet',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    destroyedIngredientSetId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ id }) => toGlobalId('IngredientSet', id),
    },
    recipe: {
      type: Recipe,
      resolve: ({ recipeId }) => {
        return db.Recipe.findById(recipeId).catch(e => console.warn(e));
      },
    },
  },
  mutateAndGetPayload: ({ id: globalId }) => {
    const { id } = fromGlobalId(globalId);

    return db.IngredientSet.findById(id).then((ingredientSet) => {
      const destroyIngredients = db.Ingredient.destroy({
        where: { ingredientSetId: ingredientSet.id },
      });

      return Promise.all([destroyIngredients, ingredientSet]);
    }).then(([_, ingredientSet]) => {
      return Promise.all([ingredientSet.destroy(), ingredientSet.recipeId]);
    }).then(([_, recipeId]) => {
      return { id, recipeId };
    }).catch(e => console.warn(e));
  },
});

export default DestroyIngredientSetMutation;
