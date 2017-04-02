import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';

import DirectionSet from '../direction-set';

import db from '../../models';

const UpdateDirectionSetMutation = mutationWithClientMutationId({
  name: 'UpdateDirectionSet',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
  },
  outputFields: {
    directionSet: {
      type: DirectionSet,
      resolve: ({ id }) => {
        return db.DirectionSet.findById(id);
      },
    },
  },
  mutateAndGetPayload: ({ id: globalId, ...values }) => {
    const { id } = fromGlobalId(globalId);

    return db.DirectionSet.update(values, {
      where: { id },
      returning: true,
    }).then(([_, rows]) => {
      return rows[0];
    });
  },
});

export default UpdateDirectionSetMutation;
