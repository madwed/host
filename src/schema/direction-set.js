import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
} from 'graphql-relay';

import Direction from './direction';
import { addType, nodeInterface } from './node';
import db from '../models';

const { connectionType: DirectionConnection } = connectionDefinitions({
  name: 'DirectionConnection',
  nodeType: Direction,
});

const DirectionSet = new GraphQLObjectType({
  name: 'DirectionSet',
  fields: {
    id: globalIdField('DirectionSet'),
    directions: {
      type: DirectionConnection,
      args: connectionArgs,
      resolve(directionSet, args) {
        return db.Direction.findAll({
          where: { directionSetId: directionSet.id },
          order: '"displayOrder"',
        }).then((directions) => connectionFromArray(directions, args));
      }
    },
    displayOrder: { type: GraphQLInt },
    recipeId: globalIdField('Recipe'),
    title: { type: GraphQLString },
  },
  interfaces: [nodeInterface],
});

addType({ DirectionSet });

export default DirectionSet;
