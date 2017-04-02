import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import jwt from 'jwt-simple';

import CreateIngredientMutation from './mutations/create-ingredient';
import DestroyIngredientMutation from './mutations/destroy-ingredient';
import DestroyIngredientSetMutation from './mutations/destroy-ingredient-set';
import UpdateIngredientMutation from './mutations/update-ingredient';
import UpdateIngredientSetMutation from './mutations/update-ingredient-set';
import UpdateRecipeMutation from './mutations/update-recipe';

import User from './user';

import db from '../models';

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
      createIngredient: CreateIngredientMutation,
      destroyIngredient: DestroyIngredientMutation,
      destroyIngredientSet: DestroyIngredientSetMutation,
      updateIngredient: UpdateIngredientMutation,
      updateIngredientSet: UpdateIngredientSetMutation,
      updateRecipe: UpdateRecipeMutation,
    },
  }),
});
