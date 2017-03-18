import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import { browserHistory } from 'react-router';

import Header from './header';
import IngredientLists from './ingredient-lists';

class EditRecipe extends Component {
  componentWillMount() {
    if (!this.props.viewer.recipe) {
      browserHistory.push('/recipes');
    }
  }

  render() {
    const { viewer: { recipe } } = this.props;

    if (!recipe) { return <div/>; }

    return (
      <div { ...styles.container }>
        <Header recipe={ recipe } ref="header"/>

        <div { ...styles.details }>
          <IngredientLists recipe={ recipe } ref="ingredientLists"/>
        </div>
      </div>
    );
  }
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    padding: '1em',
  }),
  details: css({
    display: 'flex',
  }),
};

export default Relay.createContainer(EditRecipe, {
  initialVariables: {
    id: null,
  },

  prepareVariables({ id }) {
    return { id };
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        recipe(id: $id) {
          id
          ${Header.getFragment('recipe')}
          ${IngredientLists.getFragment('recipe')}
        }
      }
    `,
  },
});
