import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import debounce from 'lodash.debounce';

import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import NavigationClose from 'material-ui/svg-icons/navigation/close';

import DestroyIngredient from '../../mutations/destroy-ingredient';
import UpdateIngredient from '../../mutations/update-ingredient';

import { DANGER } from '../../palette';

class Ingredient extends Component {
  onChange = debounce((update) => {
    const { ingredient } = this.props;

    this.props.relay.commitUpdate(new UpdateIngredient({ ingredient, ...update }));
  }, 400)

  onDelete = () => {
    const { ingredient } = this.props;
    this.props.relay.commitUpdate(new DestroyIngredient({ ingredient }));
  }

  render() {
    const { id, quantity, text } = this.props.ingredient;

    return (
      <div { ...styles.container } key={ id }>
        <IconButton
          iconStyle={ styles.delete }
          onClick={ this.onDelete }
          tooltip="Delete"
        >
          <NavigationClose/>
        </IconButton>

        <TextField
          defaultValue={ quantity }
          floatingLabelText="Quantity"
          onChange={ (e, quantity) => this.onChange({ quantity }) }
          style={ styles.quantityField }
        />
        <TextField
          className={ `${styles.ingredientField}` }
          defaultValue={ text }
          floatingLabelText="Ingredient"
          onChange={ (e, text) => this.onChange({ text }) }
        />
      </div>
    );
  }
}

const styles = {
  container: css({
    display: 'flex',
  }),
  quantityField: {
    width: '4em',
    marginRight: '1em',
  },
  ingredientField: css({
    flex: 1,
  }),
  delete: {
    color: DANGER,
  },
};

export default Relay.createContainer(Ingredient, {
  fragments: {
    ingredient: () => Relay.QL`
      fragment on Ingredient {
        id
        quantity
        text
        ${DestroyIngredient.getFragment('ingredient')}
        ${UpdateIngredient.getFragment('ingredient')}
      }
    `,
  },
});
