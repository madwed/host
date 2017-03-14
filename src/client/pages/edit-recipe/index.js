import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import { browserHistory } from 'react-router';
import merge from 'lodash.merge';

import Header from './header';
import IngredientList from './ingredient-list';

import UpdateRecipeMutation from '../../mutations/update-recipe-mutation';

import composeFields from '../../utils/compose-fields';

class EditRecipe extends Component {
  componentWillMount() {
    if (!this.props.viewer.recipe) {
      browserHistory.push('/recipes');
    }
  }

  onSave = () => {
    const mutation = composeFields(this.refs);
    this.props.relay.commitUpdate(new UpdateRecipeMutation(mutation));
  }

  render() {
    const { viewer: { recipe } } = this.props;

    if (!recipe) { return <div/>; }

    return (
      <div { ...styles.container }>
        <Header recipe={ recipe } ref="header"/>

        <div { ...styles.details }>
          <IngredientList recipe={ recipe } ref="ingredientList"/>
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
          ${IngredientList.getFragment('recipe')}
          ${UpdateRecipeMutation.getFragment('recipe')}
        }
      }
    `,
  },
});
