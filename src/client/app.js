import 'babel-polyfill';
import 'whatwg-fetch';
import 'normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import {
  applyRouterMiddleware,
  browserHistory,
  useRouterHistory,
} from 'react-router';

import useRelay from 'react-router-relay';

import './app.css';

import Routes from './routes';

ReactDOM.render(
  <Routes
    environment={ Relay.Store }
    history={ browserHistory }
    render={ applyRouterMiddleware(useRelay) }
  />,
  document.getElementById('root')
);
