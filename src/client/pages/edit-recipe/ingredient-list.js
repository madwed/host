import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import debounce from 'lodash.debounce';

import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import CreateIngredient from '../../mutations/create-ingredient';
import DestroyIngredientSet from '../../mutations/destroy-ingredient-set';
import UpdateIngredientSet from '../../mutations/update-ingredient-set';
import Ingredient from './ingredient';

import { DANGER, LIGHTER_PRIMARY } from '../../palette';

class IngredientList extends Component {
  onChange = debounce((update) => {
    const { ingredientSet } = this.props;

    const mutation = new UpdateIngredientSet({ ingredientSet, ...update });

    this.props.relay.commitUpdate(mutation);
  }, 400)

  onDelete = () => {
    const { ingredientSet } = this.props;
    const mutation = new DestroyIngredientSet({ ingredientSet });
    this.props.relay.commitUpdate(mutation);
  }

  onAdd = () => {
    const { ingredientSet } = this.props;
    this.props.relay.commitUpdate(new CreateIngredient({ ingredientSet }));
  }

  render() {
    const { ingredientSet: { ingredients, title } } = this.props;

    return (
      <div>
        <div { ...styles.buttonContainer } { ...styles.destroyContainer }>
          <IconButton
            iconStyle={ styles.delete }
            onClick={ this.onDelete }
            tooltip="Delete Section"
          >
            <NavigationClose/>
          </IconButton>
        </div>

        <div { ...styles.fields }>
          <TextField
            defaultValue={ title }
            floatingLabelText="Section Title"
            fullWidth={ true }
            onChange={ (e, title) => this.onChange({ title }) }
          />

          {
            ingredients.edges.map(({ node: ingredient }, index) => (
              <Ingredient ingredient={ ingredient } key={ ingredient.id }/>
            ))
          }
        </div>

        <div { ...styles.buttonContainer }>
          <IconButton
            iconStyle={ styles.add }
            onClick={ this.onAdd }
            tooltip="Add Ingredient"
          >
            <ContentAdd/>
          </IconButton>
        </div>
      </div>
    );
  }
}

const styles = {
  destroyContainer: css({
    height: '1em',
  }),
  buttonContainer: css({
    display: 'flex',
    justifyContent: 'flex-end',
  }),
  fields: css({
    padding: '0em 1em',
  }),
  add: {
    color: LIGHTER_PRIMARY,
  },
  delete: {
    color: DANGER,
  },
};

export default Relay.createContainer(IngredientList, {
  fragments: {
    ingredientSet: () => Relay.QL`
      fragment on IngredientSet {
        id
        title
        ${CreateIngredient.getFragment('ingredientSet')}
        ${DestroyIngredientSet.getFragment('ingredientSet')}
        ${UpdateIngredientSet.getFragment('ingredientSet')}
        ingredients(first: 100) {
          edges {
            node {
              id
              ${Ingredient.getFragment('ingredient')}
            }
          }
        }
      }
    `,
  },
});
