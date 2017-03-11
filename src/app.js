import express from 'express';
import graphqlHTTP from 'express-graphql';

//import passport from 'passport';
//import GoogleAuth from 'passport-google-oauth20';

import db from './models';
import Schema from './schema';

const PORT = 5000;
const app = express();

//passport.use('google', new GoogleAuth.Strategy({
  //clientID: process.env.GOOGLE_CLIENT_ID,
  //clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //callbackURL: '/',
//}, (accessToken, refreshToken, profile, cb) => {
  //db.User.findOrCreate({ googleId: profile.id }).then((user) => {
    //return cb(undefined, user);
  //}).catch((err) => cb(err));
//}));

//app.use(passport.initialize());
//app.use(passport.session());

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: process.env.NODE_ENV !== 'production',
}));

//app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
//app.get(
  //'/auth/google/callback',
  //passport.authenticate('google', { failureRedirect: '/login' }),

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
