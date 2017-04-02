import { GraphQLID, GraphQLInt, GraphQLNonNull } from 'graphql';
import {
  fromGlobalId,
  mutationWithClientMutationId,
  offsetToCursor,
} from 'graphql-relay';

import DirectionSet, { DirectionEdge } from '../direction-set';

import db from '../../models';

const CreateDirectionMutation = mutationWithClientMutationId({
  name: 'CreateDirection',
  inputFields: {
    edgeCount: { type: new GraphQLNonNull(GraphQLInt) },
    directionSetId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    directionEdge: {
      type: DirectionEdge,
      resolve: ({ direction, edgeCount }) => {
        return {
          cursor: offsetToCursor(edgeCount),
          node: direction,
        };
      },
    },
    directionSet: {
      type: DirectionSet,
      resolve: ({ direction }) => {
        return db.DirectionSet.findById(direction.directionSetId);
      },
    },
  },
  mutateAndGetPayload: ({ directionSetId: globalId, edgeCount }) => {
    const { id: directionSetId } = fromGlobalId(globalId);

    return db.Direction.create({ directionSetId }).then((direction) => {
      return { direction, edgeCount };
    }).catch(e => console.warn(e));
  },
});

export default CreateDirectionMutation;
