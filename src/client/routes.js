import React, { Component } from 'react';
import Relay from 'react-relay';
import { IndexRoute, Route, Router } from 'react-router';
import cookie from 'js-cookie';

import Layout from './pages/layout';
import Login from './pages/login';
import Recipes from './pages/recipes';

const viewerQuery = {
  viewer: () => Relay.QL`query { viewer(token: $token) }`,
};

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = { token: cookie.get('cooks-token') };
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
        <Route path="/" component={ Layout }>
          <IndexRoute
            component={ Recipes }
            prepareParams={ () => ({ token }) }
            queries={ viewerQuery }
          />
        </Route>
      </Router>
    );
  }
}
