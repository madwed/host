import chokidar from 'chokidar';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import fetch from 'node-fetch';
import jwt from 'jwt-simple';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { clean } from 'require-clean';
import { exec } from 'child_process';
import dotenv from 'dotenv';

import db from './models';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;
const oneHundredDays = 100 * 24 * 60 * 60 * 1000;

let graphQLServer;
let appServer;

function startAppServer(callback) {
  // Serve the Relay app
  const compiler = webpack({
    entry: path.resolve(__dirname, 'client', 'app.js'),
    module: {
      loaders: [
        {
          exclude: /node_modules/,
          loader: 'babel-loader',
          test: /\.js$/,
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
      ]
    },
    output: { filename: '/app.js', path: '/', publicPath: '/client/' },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          GOOGLE_CLIENT_ID: `"${process.env.GOOGLE_CLIENT_ID}"`,
        },
      })
    ],
  });

  appServer = new WebpackDevServer(compiler, {
    contentBase: '/public/',
    setup: (app) => {
      app.get(
        '/auth/google',
        (req, res) => {
          const token = req.headers.authorization;
          const url = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`;

          fetch(url).then((res) => {
            return res.json();
          }).then((body) => {
            const googleId = body.sub;
            if (googleId) {
              return Promise.all([
                db.User.findOrInitialize({ where: { googleId } }),
                body
              ]);
            } else {
              return Promise.reject('No googleId');
            }
          }).then(([[user, _], body]) => {
            return user.update({
              firstName: body.given_name,
              lastName: body.family_name,
              email: body.email_verified === 'true' ? body.email : '',
            }, {
              returning: true
            });
          }).then((user) => {
            const payload = {
              createdAt: user.createdAt,
              expiration: Date.now() + oneHundredDays,
              googleId: user.googleId,
              name: user.name,
            };

            const token = { token: jwt.encode(payload, process.env.APP_SECRET) };

            res.send(JSON.stringify(token));
          }).catch((err) => {
            console.warn(err);
            res.status(400).send(JSON.stringify({ error: 'Error signing in' }));
          });
        }
      );

      const routes = /^(?!.*\.js$|\/graphql.*$)/;
      app.get(routes, (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
      });
    },
    proxy: { '/graphql': `http://localhost:${GRAPHQL_PORT}` },
    publicPath: '/client/',
    stats: { colors: true }
  });

  // Serve static resources
  appServer.use('/', express.static(path.resolve(__dirname, 'public')));
  appServer.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
    if (callback) {
      callback();
    }
  });
}

function startGraphQLServer(callback) {
  // Expose a GraphQL endpoint
  clean('./schema');
  const Schema = require('./schema').default;
  const graphQLApp = express();
  graphQLApp.use('/', graphQLHTTP({
    graphiql: true,
    pretty: true,
    schema: Schema,
  }));
  graphQLServer = graphQLApp.listen(GRAPHQL_PORT, () => {
    console.log(
      `GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`
    );
    if (callback) {
      callback();
    }
  });
}

function startServers(callback) {
  // Shut down the servers
  if (appServer) {
    appServer.listeningApp.close();
  }
  if (graphQLServer) {
    graphQLServer.close();
  }

  // Compile the schema
  exec('npm run update-schema', (error, stdout) => {
    console.log(stdout);
    let doneTasks = 0;
    function handleTaskDone() {
      doneTasks++;
      if (doneTasks === 2 && callback) {
        callback();
      }
    }
    startGraphQLServer(handleTaskDone);
    startAppServer(handleTaskDone);
  });
}
const watcher = chokidar.watch('./data/{database,schema}.js', {
  ignored: /\.(json|graphql)/
});
watcher.on('change', path => {
  console.log(`\`${path}\` changed. Restarting.`);
  startServers(() => {
    console.log('Restart your browser to use the updated schema.');
  });
});
startServers();
