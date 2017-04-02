import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
import {
  fromGlobalId,
  mutationWithClientMutationId,
  offsetToCursor,
} from 'graphql-relay';

import IngredientSet, { IngredientEdge } from '../ingredient-set';

import db from '../../models';

const CreateIngredientMutation = mutationWithClientMutationId({
  name: 'CreateIngredient',
  inputFields: {
    edgeCount: { type: new GraphQLNonNull(GraphQLInt) },
    ingredientSetId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    ingredientEdge: {
      type: IngredientEdge,
      resolve: ({ ingredient, edgeCount }) => {
        return {
          cursor: offsetToCursor(edgeCount),
          node: ingredient,
        };
      },
    },
    ingredientSet: {
      type: IngredientSet,
      resolve: ({ ingredient }) => {
        return db.IngredientSet.findById(ingredient.ingredientSetId);
      },
    },
  },
  mutateAndGetPayload: ({ ingredientSetId: globalId, edgeCount }) => {
    const { id: ingredientSetId } = fromGlobalId(globalId);

    return db.Ingredient.create({ ingredientSetId }).then((ingredient) => {
      return { ingredient, edgeCount };
    }).catch(e => console.warn(e));
  },
});

export default CreateIngredientMutation;
