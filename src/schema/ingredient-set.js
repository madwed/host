import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
} from 'graphql-relay';

import Ingredient from './ingredient';
import { addType, nodeInterface } from './node';
import db from '../models';

const { connectionType: IngredientConnection } = connectionDefinitions({
  name: 'IngredientConnection',
  nodeType: Ingredient,
});

const IngredientSet = new GraphQLObjectType({
  name: 'IngredientSet',
  fields: {
    id: globalIdField('IngredientSet'),
    displayOrder: { type: GraphQLInt },
    ingredients: {
      type: IngredientConnection,
      args: connectionArgs,
      resolve(ingredientSet, args) {
        return db.Ingredient.findAll({
          where: { ingredientSetId: ingredientSet.id },
          order: '"displayOrder"',
        }).then((ingredients) => connectionFromArray(ingredients, args));
      }
    },
    title: { type: GraphQLString },
  },
  interfaces: [nodeInterface],
});

addType({ IngredientSet });

export default IngredientSet;
