import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

import jwt from 'jwt-simple';

import db from '../models';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    return db[type].findById(id);
  },
  (obj) => types[obj.getClassName()],
);

const Ingredient = new GraphQLObjectType({
  name: 'Ingredient',
  fields: {
    id: globalIdField('Ingredient'),
    displayOrder: { type: GraphQLInt },
    text: { type: GraphQLString },
  },
  interfaces: [nodeInterface],
});

const Direction = new GraphQLObjectType({
  name: 'Direction',
  fields: {
    id: globalIdField('Direction'),
    displayOrder: { type: GraphQLInt },
    text: { type: GraphQLString },
  },
  interfaces: [nodeInterface],
});

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
          where: { ingredientSetId: ingredientSet.id }
        }).then((ingredients) => connectionFromArray(ingredients, args));
      }
    },
    title: { type: GraphQLString },
  },
  interfaces: [nodeInterface],
});

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
          where: { directionSetId: directionSet.id }
        }).then((directions) => connectionFromArray(directions, args));
      }
    },
    displayOrder: { type: GraphQLInt },
    title: { type: GraphQLString },
  },
  interfaces: [nodeInterface],
});

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
          where: { recipeId: recipe.id }
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
          where: { recipeId: recipe.id }
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

const { connectionType: RecipeConnection } = connectionDefinitions({
  name: 'RecipeConnection',
  nodeType: Recipe,
});
const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    recipes: {
      type: RecipeConnection,
      args: connectionArgs,
      resolve(user, args) {
        return db.Recipe.findAll({
          where: { userId: user.id }
        }).then((recipes) => connectionFromArray(recipes, args));
      }
    },
  },
  interfaces: [nodeInterface],
});

const types = {
  Ingredient,
  Direction,
  IngredientSet,
  DirectionSet,
  Recipe,
  User,
};

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
      node: nodeField,
      recipe: {
        type: Recipe,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID),
          },
        },
        resolve(parent, { id }) {
          return db.Recipe.findById(id);
        }
      },
      users: {
        type: new GraphQLList(User),
        resolve() {
          return db.User.findAll();
        }
      },
      viewer: {
        type: User,
        args: {
          token: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parent, { token }) {
          const decodedToken = jwt.decode(token, process.env.APP_SECRET);
          const { googleId } = decodedToken;
          return db.User.findOne({ where: { googleId } });
        }
      }
    }),
  }),
});
