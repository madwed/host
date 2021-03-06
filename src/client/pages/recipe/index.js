import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import { browserHistory } from 'react-router';

import DirectionList from './direction-list';
import Header from './header';
import IngredientList from './ingredient-list';

class Recipe extends Component {
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
        <Header recipe={ recipe }/>

        <div { ...styles.details }>
          <IngredientList recipe={ recipe }/>
          <DirectionList recipe={ recipe }/>
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

export default Relay.createContainer(Recipe, {
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
          ${DirectionList.getFragment('recipe')}
          ${IngredientList.getFragment('recipe')}
        }
      }
    `,
  },
});

