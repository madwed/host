import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import debounce from 'lodash.debounce';

import TextField from 'material-ui/TextField';

class Ingredient extends Component {
  render() {
    const { id, quantity, text } = this.props.ingredient;

    return (
      <div { ...styles.container } key={ id }>
        <TextField
          defaultValue={ quantity }
          floatingLabelText="Quantity"
          onChange={ (e, quantity) => onChange({ quantity }) }
          style={ styles.quantityField }
        />
        <TextField
          className={ `${styles.ingredientField}` }
          defaultValue={ text }
          floatingLabelText="Ingredient"
          onChange={ (e, text) => onIngredientChange({ text }) }
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
};

export default Relay.createContainer(Ingredient, {
  fragments: {
    ingredient: () => Relay.QL`
      fragment on Ingredient {
        id
        quantity
        text
      }
    `,
  },
});
