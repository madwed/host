import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import { fromGlobalId, globalIdField } from 'graphql-relay';

import { addType, nodeInterface } from './node';
import db from '../models';

const Ingredient = new GraphQLObjectType({
  name: 'Ingredient',
  fields: {
    id: globalIdField('Ingredient'),
    displayOrder: { type: GraphQLInt },
    quantity: { type: GraphQLString },
    text: { type: GraphQLString },
  },
  interfaces: [nodeInterface],
});

addType({ Ingredient });

export default Ingredient;
