import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import {
  fromGlobalId,
  mutationWithClientMutationId,
  toGlobalId,
} from 'graphql-relay';

import Recipe from '../recipe';

import db from '../../models';

const DestroyDirectionSetMutation = mutationWithClientMutationId({
  name: 'DestroyDirectionSet',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    destroyedDirectionSetId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ id }) => toGlobalId('DirectionSet', id),
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

    return db.DirectionSet.findById(id).then((directionSet) => {
      const destroyDirections = db.Direction.destroy({
        where: { directionSetId: directionSet.id },
      });

      return Promise.all([destroyDirections, directionSet]);
    }).then(([_, directionSet]) => {
      return Promise.all([directionSet.destroy(), directionSet.recipeId]);
    }).then(([_, recipeId]) => {
      return { id, recipeId };
    }).catch(e => console.warn(e));
  },
});

export default DestroyDirectionSetMutation;
