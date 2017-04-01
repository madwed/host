import { GraphQLID, GraphQLNonNull } from 'graphql';
import {
  fromGlobalId,
  mutationWithClientMutationId,
  toGlobalId,
} from 'graphql-relay';

import IngredientSet from './ingredient-set';

import db from '../models';

const DestroyIngredientMutation = mutationWithClientMutationId({
  name: 'DestroyIngredient',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    ingredientSetId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    destroyedIngredientId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ id }) => toGlobalId('Ingredient', id),
    },
    ingredientSet: {
      type: IngredientSet,
      resolve: ({ ingredientSetId }) => {
        return db.IngredientSet.findById(ingredientSetId);
      },
    },
  },
  mutateAndGetPayload: ({ id: globalId, ingredientSetId: globalSetId }) => {
    const { id } = fromGlobalId(globalId);
    const { id: ingredientSetId } = fromGlobalId(globalSetId);

    return db.Ingredient.destroy({ where: { id } }).then(() => {
      return { id, ingredientSetId };
    }).catch(e => console.warn(e));
  },
});

export default DestroyIngredientMutation;
