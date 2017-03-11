import React, { Component } from 'react';
import Relay from 'react-relay';

import Navbar from './navbar';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { recipeId: '' };
  }

  openRecipe = () => {
  }

  render() {
    return (
      <div>
        <Navbar/>
        { this.props.children }
      </div>
    );
  }
}

export default Relay.createContainer(Layout, { fragments: {} });
