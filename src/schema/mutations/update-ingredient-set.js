import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';

import IngredientSet from '../ingredient-set';

import db from '../../models';

const UpdateIngredientSetMutation = mutationWithClientMutationId({
  name: 'UpdateIngredientSet',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
  },
  outputFields: {
    ingredientSet: {
      type: IngredientSet,
      resolve: ({ id }) => {
        return db.IngredientSet.findById(id);
      },
    },
  },
  mutateAndGetPayload: ({ id: globalId, ...values }) => {
    const { id } = fromGlobalId(globalId);

    return db.IngredientSet.update(values, {
      where: { id },
      returning: true,
    }).then(([_, rows]) => {
      return rows[0];
    });
  },
});

export default UpdateIngredientSetMutation;
