import React, { Component } from 'react';
import Relay from 'react-relay';
import sortBy from 'lodash.sortby';

import ListItem from './list-item';

const sortByTitle = (edges) => {
  return sortBy(edges, ({ node }) => node.title.toLowerCase());
};

class Recipes extends Component {
  render() {
    const { viewer: { recipes } } = this.props;

    return (
      <div>
        {
          sortByTitle(recipes.edges).map(({ node }) => (
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
        recipes(first: 100) {
          edges {
            node {
              id
              title
              ${ListItem.getFragment('recipe')}
            }
          }
        }
      }
    `,
  },
});
