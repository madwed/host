import React, { Component } from 'react';
import Relay from 'react-relay';

import Navbar from './navbar';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { recipeId: '' };
  }

  componentWillMount() {
    if (!this.props.viewer) {
      this.props.route.logout();
    }
  }

  render() {
    if (!this.props.viewer) {
      return <div/>;
    }

    return (
      <div>
        <Navbar/>
        { this.props.children }
      </div>
    );
  }
}

export default Relay.createContainer(Layout, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  },
});
