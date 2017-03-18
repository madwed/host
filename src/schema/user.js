import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
} from 'graphql-relay';

import Recipe from './recipe';
import { addType, nodeInterface } from './node';

import db from '../models';

const { connectionType: RecipeConnection } = connectionDefinitions({
  name: 'RecipeConnection',
  nodeType: Recipe,
});

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    recipe: {
      type: Recipe,
      args: {
        id: { type: GraphQLString },
      },
      resolve(user, { id: globalId }) {
        const { type, id } = fromGlobalId(globalId);
        return db.Recipe.findOne({ where: { userId: user.id, id } });
      }
    },
    recipes: {
      type: RecipeConnection,
      args: connectionArgs,
      resolve(user, args) {
        return db.Recipe.findAll({
          where: { userId: user.id },
          order: '"title"',
        }).then((recipes) => connectionFromArray(recipes, args));
      }
    },
  },
  interfaces: [nodeInterface],
});

addType({ User });

export default User;
