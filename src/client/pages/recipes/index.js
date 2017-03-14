import React, { Component } from 'react';
import Relay from 'react-relay';

import ListItem from './list-item';

class Recipes extends Component {
  render() {
    const { viewer: { recipes } } = this.props;

    return (
      <div>
        {
          recipes.edges.map(({ node }) => (
            <ListItem
              key={ node.id }
              recipe={ node }
            />
          ))
        }
      </div>
    );
  }
}

export default Relay.createContainer(Recipes, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        recipes(first: 10) {
          edges {
            node {
              id
              ${ListItem.getFragment('recipe')}
            }
          }
        }
      }
    `,
  },
});
