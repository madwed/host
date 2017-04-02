import { GraphQLID, GraphQLNonNull } from 'graphql';
import {
  fromGlobalId,
  mutationWithClientMutationId,
  toGlobalId,
} from 'graphql-relay';

import DirectionSet from '../direction-set';

import db from '../../models';

const DestroyDirectionMutation = mutationWithClientMutationId({
  name: 'DestroyDirection',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    directionSetId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    destroyedDirectionId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ id }) => toGlobalId('Direction', id),
    },
    directionSet: {
      type: DirectionSet,
      resolve: ({ directionSetId }) => {
        return db.DirectionSet.findById(directionSetId);
      },
    },
  },
  mutateAndGetPayload: ({ id: globalId, directionSetId: globalSetId }) => {
    const { id } = fromGlobalId(globalId);
    const { id: directionSetId } = fromGlobalId(globalSetId);

    return db.Direction.destroy({ where: { id } }).then(() => {
      return { id, directionSetId };
    }).catch(e => console.warn(e));
  },
});

export default DestroyDirectionMutation;
