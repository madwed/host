import {
  GraphQLBoolean,
  GraphQLFloat,
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
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import omitBy from 'lodash.omitby';
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
    quantity: { type: GraphQLFloat },
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
          where: { ingredientSetId: ingredientSet.id },
          order: '"displayOrder"',
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
          where: { directionSetId: directionSet.id },
          order: '"displayOrder"',
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

const UpdateRecipeMutation = mutationWithClientMutationId({
  name: 'UpdateRecipe',
  inputFields: {
    activeTime: { type: GraphQLString },
    description: { type: GraphQLString },
    id: { type: new GraphQLNonNull(GraphQLID) },
    imageUrl: { type: GraphQLString },
    note: { type: GraphQLString },
    originalUrl: { type: GraphQLString },
    servings: { type: GraphQLString },
    source: { type: GraphQLString },
    title: { type: GraphQLString },
    totalTime: { type: GraphQLString },
  },
  outputFields: {
    recipe: {
      type: Recipe,
      resolve: ({ id }) => db.Recipe.findById(id),
    },
  },
  mutateAndGetPayload: ({
    activeTime,
    description,
    id,
    imageUrl,
    note,
    originalUrl,
    servings,
    source,
    title,
    totalTime,
  }) => {
    const potentialValues = {
      activeTime,
      description,
      id,
      imageUrl,
      note,
      originalUrl,
      servings,
      source,
      title,
      totalTime,
    };

    const values = omitBy(potentialValues, (value) => value === null);

    db.Recipe.upsert(values, {
      fields: ['activeTime', 'description', 'imageUrl', 'note', 'originalUrl',
        'servings', 'source', 'title', 'totalTime'],
    });
  }
});

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
      viewer: {
        type: User,
        args: {
          token: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parent, { token }) {
          const decodedToken = jwt.decode(token, process.env.APP_SECRET);
          const { googleId } = decodedToken;
          return db.User.findByGoogleId(googleId);
        }
      }
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      updateRecipe: UpdateRecipeMutation,
    },
  }),
});
