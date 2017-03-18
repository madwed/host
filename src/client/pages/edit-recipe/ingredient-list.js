import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import debounce from 'lodash.debounce';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import UpdateIngredientSet from '../../mutations/update-ingredient-set';
import Ingredient from './ingredient';

import { DANGER } from '../../palette';

class IngredientList extends Component {
  onChange = debounce((update) => {
    const { ingredientSet } = this.props;

    const mutation = new UpdateIngredientSet({ ingredientSet, ...update });

    this.props.relay.commitUpdate(mutation);
  }, 400)

  render() {
    const { ingredientSet: { ingredients, title } } = this.props;

    return (
      <div { ...styles.container }>
        <div { ...styles.closeButtonContainer }>
          <IconButton
            iconStyle={ styles.delete }
            onClick={ () => onDelete(setIndex) }
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

          <div { ...styles.addButtonContainer }>
            <FloatingActionButton
              mini={ true }
              zDepth={ 1 }
            >
              <ContentAdd/>
            </FloatingActionButton>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: css({
    padding: '1em 0em 1em',
    position: 'relative',
  }),
  addButtonContainer: css({
    display: 'flex',
    justifyContent: 'flex-end',
  }),
  closeButtonContainer: css({
    position: 'absolute',
    top: '-0.5em',
    paddingTop: '0.5em',
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  }),
  fields: css({
    padding: '0em 1em',
  }),
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
