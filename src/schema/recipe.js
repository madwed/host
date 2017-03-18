import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
} from 'graphql-relay';

import DirectionSet from './direction-set';
import IngredientSet from './ingredient-set';
import { addType, nodeInterface } from './node';

import db from '../models';

const { connectionType: DirectionSetConnection } = connectionDefinitions({
  name: 'DirectionSetConnection',
  nodeType: DirectionSet,
});

const { connectionType: IngredientSetConnection } = connectionDefinitions({
  name: 'IngredientSetConnection',
  nodeType: IngredientSet,
});

const Recipe = new GraphQLObjectType({
  name: 'Recipe',
  fields: {
    id: globalIdField('Recipe'),
    activeTime: { type: GraphQLString },
    description: { type: GraphQLString },
    directionSets: {
      type: DirectionSetConnection,
      args: connectionArgs,
      resolve(recipe, args) {
        return db.DirectionSet.findAll({
          where: { recipeId: recipe.id },
          order: '"displayOrder"',
        }).then((directionSets) => connectionFromArray(directionSets, args));
      }
    },
    favorite: { type: GraphQLBoolean },
    imageUrl: { type: GraphQLString },
    ingredientSets: {
      type: IngredientSetConnection,
      args: connectionArgs,
      resolve(recipe, args) {
        return db.IngredientSet.findAll({
          where: { recipeId: recipe.id },
          order: '"displayOrder"',
        }).then((ingredientSets) => connectionFromArray(ingredientSets, args));
      }
    },
    note: { type: GraphQLString },
    originalUrl: { type: GraphQLString },
    servings: { type: GraphQLString },
    source: { type: GraphQLString },
    title: { type: GraphQLString },
    totalTime: { type: GraphQLString },
  },
  interfaces: [nodeInterface],
});

addType({ Recipe });

export default Recipe;
