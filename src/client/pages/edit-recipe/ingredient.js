import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import debounce from 'lodash.debounce';

import TextField from 'material-ui/TextField';

import UpdateIngredient from '../../mutations/update-ingredient';

class Ingredient extends Component {
  onChange = debounce((update) => {
    const { ingredient } = this.props;

    this.props.relay.commitUpdate(new UpdateIngredient({ ingredient, ...update }));
  }, 400)

  render() {
    const { id, quantity, text } = this.props.ingredient;

    return (
      <div { ...styles.container } key={ id }>
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
};

export default Relay.createContainer(Ingredient, {
  fragments: {
    ingredient: () => Relay.QL`
      fragment on Ingredient {
        id
        quantity
        text
        ${UpdateIngredient.getFragment('ingredient')}
      }
    `,
  },
});
