import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import jwt from 'jwt-simple';

import UpdateRecipeMutation from './update-recipe-mutation';
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
      updateRecipe: UpdateRecipeMutation,
    },
  }),
});
