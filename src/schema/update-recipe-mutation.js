import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';

import Recipe from './recipe';

import db from '../models';

const UpdateRecipeMutation = mutationWithClientMutationId({
  name: 'UpdateRecipe',
  inputFields: {
    activeTime: { type: GraphQLString },
    description: { type: GraphQLString },
    id: { type: new GraphQLNonNull(GraphQLID) },
    imageUrl: { type: GraphQLString },
    note: { type: GraphQLString },
    originalUrl: { type: GraphQLString },
    servings: { type: GraphQLString },
    source: { type: GraphQLString },
    title: { type: GraphQLString },
    totalTime: { type: GraphQLString },
  },
  outputFields: {
    recipe: {
      type: Recipe,
      resolve: ({ id }) => {
        return db.Recipe.findById(id);
      },
    },
  },
  mutateAndGetPayload: ({ id: globalId, ...values }) => {
    const { id } = fromGlobalId(globalId);

    return db.Recipe.update(values, {
      where: { id },
      returning: true,
    }).then(([_, rows]) => {
      return rows[0];
    });
  },
});

export default UpdateRecipeMutation;
