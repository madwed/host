import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';

import Direction from '../direction';

import db from '../../models';

const UpdateDirectionMutation = mutationWithClientMutationId({
  name: 'UpdateDirection',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: GraphQLString },
  },
  outputFields: {
    direction: {
      type: Direction,
      resolve: ({ id }) => {
        return db.Direction.findById(id);
      },
    },
  },
  mutateAndGetPayload: ({ id: globalId, ...values }) => {
    const { id } = fromGlobalId(globalId);

    return db.Direction.update(values, {
      where: { id },
      returning: true,
    }).then(([_, rows]) => {
      return rows[0];
    });
  },
});

export default UpdateDirectionMutation;
