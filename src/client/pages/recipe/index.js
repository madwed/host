import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';

import DirectionList from './direction-list';
import Header from './header';
import IngredientList from './ingredient-list';

const sort = (list) => list.sort((a, b) => a.displayOrder - b.displayOrder);

class Recipe extends Component {
  render() {
    const { viewer: { recipe } } = this.props;

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
        recipe(globalId: $id) {
          ${Header.getFragment('recipe')}
          ${DirectionList.getFragment('recipe')}
          ${IngredientList.getFragment('recipe')}
        }
      }
    `,
  },
});

