import React, { Component } from 'react';
import Relay from 'react-relay';
import { IndexRoute, Route, Router } from 'react-router';
import cookie from 'js-cookie';

import EditRecipe from './pages/edit-recipe';
import Layout from './pages/layout';
import Login from './pages/login';
import Recipe from './pages/recipe';
import Recipes from './pages/recipes';

const viewerQuery = {
  viewer: () => Relay.QL`query { viewer(token: $token) }`,
};

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = { token: cookie.get('cooks-token') };
  }

  clearToken = () => {
    cookie.remove('cooks-token');
    this.setState({ token: null });
  }

  setToken = ({ token }) => {
    cookie.set('cooks-token', token, {
      expires: 99,
      secure: process.env.NODE_ENV === 'production',
    });
    this.setState({ token });
  }

  render() {
    const { environment, history, render } = this.props;
    const { token } = this.state;

    if (!token) {
      return (<Login setToken={ this.setToken }/>);
    }

    return (
      <Router
        environment={ environment }
        history={ history }
        render={ render }
      >
        <Route
          component={ Layout }
          logout={ this.clearToken }
          path="/"
          prepareParams={ () => ({ token }) }
          queries={ viewerQuery }
        >
          <IndexRoute
            component={ Recipes }
            prepareParams={ () => ({ token }) }
            queries={ viewerQuery }
          />

          <Route
            component={ Recipes }
            path="/recipes"
            prepareParams={ () => ({ token }) }
            queries={ viewerQuery }
          />

          <Route
            component={ Recipe }
            path="/recipes/:id"
            prepareParams={ (params, props) => {
              const { id } = params;
              return { id, token };
            } }
            queries={ viewerQuery }
          />

          <Route
            component={ EditRecipe }
            path="/recipes/:id/edit"
            prepareParams={ (params, props) => {
              const { id } = params;
              return { id, token };
            } }
            queries={ viewerQuery }
          />
        </Route>
      </Router>
    );
  }
}
