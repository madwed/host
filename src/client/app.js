import 'babel-polyfill';
import 'whatwg-fetch';
import 'normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import { applyRouterMiddleware, browserHistory } from 'react-router';

import useRelay from 'react-router-relay';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './app.css';

import { PRIMARY } from './palette';
import Routes from './routes';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: PRIMARY,
  },
});

const App = () => (
  <MuiThemeProvider muiTheme={ muiTheme }>
    <Routes
      environment={ Relay.Store }
      history={ browserHistory }
      render={ applyRouterMiddleware(useRelay) }
    />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
