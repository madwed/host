import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import { fromGlobalId, globalIdField } from 'graphql-relay';

import { addType, nodeInterface } from './node';
import db from '../models';

const Direction = new GraphQLObjectType({
  name: 'Direction',
  fields: {
    id: globalIdField('Direction'),
    directionSetId: globalIdField('DirectionSet'),
    displayOrder: { type: GraphQLInt },
    text: { type: GraphQLString },
  },
  interfaces: [nodeInterface],
});

addType({ Direction });

export default Direction;
