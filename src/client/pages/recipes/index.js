import React, { Component } from 'react';
import Relay from 'react-relay';
import { browserHistory } from 'react-router';

import ListItem from './list-item';

class Recipes extends Component {
  changeToRecipe = (id) => {
    browserHistory.push(`/recipes/${id}`);
  }

  render() {
    const { viewer: { recipes: { edges = [] } } } = this.props;
    const recipes = edges.map((edge) => edge.node);

    return (
      <div>
        {
          recipes.sort((a, b) => a.title < b.title ? -1 : 1).map((recipe) => (
            <ListItem
              description={ recipe.description || ''}
              id={ recipe.id }
              imageUrl={ recipe.imageUrl }
              key={ recipe.id }
              onClick={ () => this.changeToRecipe(recipe.id) }
              source={ recipe.source || ''}
              title={ recipe.title }
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
              description
              imageUrl
              source
              title
            }
          }
        }
      }
    `,
  },
});
