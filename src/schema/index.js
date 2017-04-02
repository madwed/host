import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import jwt from 'jwt-simple';

import CreateDirectionMutation from './mutations/create-direction';
import CreateIngredientMutation from './mutations/create-ingredient';
import DestroyDirectionMutation from './mutations/destroy-direction';
import DestroyDirectionSetMutation from './mutations/destroy-direction-set';
import DestroyIngredientMutation from './mutations/destroy-ingredient';
import DestroyIngredientSetMutation from './mutations/destroy-ingredient-set';
import UpdateDirectionMutation from './mutations/update-direction';
import UpdateDirectionSetMutation from './mutations/update-direction-set';
import UpdateIngredientMutation from './mutations/update-ingredient';
import UpdateIngredientSetMutation from './mutations/update-ingredient-set';
import UpdateRecipeMutation from './mutations/update-recipe';

import { nodeField } from './node';
import User from './user';

import db from '../models';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
      node: nodeField,
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
      createDirection: CreateDirectionMutation,
      createIngredient: CreateIngredientMutation,
      destroyDirection: DestroyDirectionMutation,
      destroyDirectionSet: DestroyDirectionSetMutation,
      destroyIngredient: DestroyIngredientMutation,
      destroyIngredientSet: DestroyIngredientSetMutation,
      updateDirection: UpdateDirectionMutation,
      updateDirectionSet: UpdateDirectionSetMutation,
      updateIngredient: UpdateIngredientMutation,
      updateIngredientSet: UpdateIngredientSetMutation,
      updateRecipe: UpdateRecipeMutation,
    },
  }),
});
