import React from 'react';
import { css } from 'glamor';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { DANGER } from '../../palette';

export default function IngredientList ({
  list,
  onDelete,
  onIngredientChange,
  onSetChange,
  setIndex,
}) {
  const { title, ingredients } = list;

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

      <div { ...styles.set }>
        <TextField
          floatingLabelText="Section Title"
          fullWidth={ true }
          onChange={ (e, value) => onSetChange({
            index: setIndex, value, field: 'title',
          }) }
          value={ title }
        />

        {
          ingredients.map(({ id, quantity, text }, index) => (
            <div { ...styles.ingredientContainer } key={ id }>
              <TextField
                floatingLabelText="Quantity"
                onChange={ (e, value) => onIngredientChange({
                  setIndex, index, value, field: 'quantity',
                }) }
                style={ styles.quantityField }
                value={ quantity }
              />
              <TextField
                className={ `${styles.ingredientField}` }
                floatingLabelText="Ingredient"
                onChange={ (e, value) => onIngredientChange({
                  setIndex, index, value, field: 'text',
                }) }
                value={ text }
              />
            </div>
          ))
        }

        <div { ...styles.buttonContainer }>
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

const styles = {
  container: css({
    padding: '1em 0em 1em',
    position: 'relative',
  }),
  buttonContainer: css({
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
  ingredientContainer: css({
    display: 'flex',
  }),
  quantityField: {
    width: '4em',
    marginRight: '1em',
  },
  ingredientField: css({
    flex: 1,
  }),
  set: css({
    padding: '0em 1em',
  }),
  delete: {
    color: DANGER,
  },
};
