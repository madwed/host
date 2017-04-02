import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';

import Ingredient from '../ingredient';

import db from '../../models';

const UpdateIngredientMutation = mutationWithClientMutationId({
  name: 'UpdateIngredient',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    quantity: { type: GraphQLString },
    text: { type: GraphQLString },
  },
  outputFields: {
    ingredient: {
      type: Ingredient,
      resolve: ({ id }) => {
        return db.Ingredient.findById(id);
      },
    },
  },
  mutateAndGetPayload: ({ id: globalId, ...values }) => {
    const { id } = fromGlobalId(globalId);

    return db.Ingredient.update(values, {
      where: { id },
      returning: true,
    }).then(([_, rows]) => {
      return rows[0];
    });
  },
});

export default UpdateIngredientMutation;
