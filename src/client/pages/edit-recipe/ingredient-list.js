import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import merge from 'lodash.merge';

import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

import Section from '../../components/section';
import { LIGHTEST_PRIMARY } from '../../palette';

class IngredientList extends Component {
  constructor(props) {
    super(props);

    const { recipe: { activeTime, ingredientSets, servings, totalTime } } = props;

    this.state = {
      activeTime,
      ingredientSets: ingredientSets.edges.map(({ node: setNode }) => {
        return {
          id: setNode.id,
          ingredients: setNode.ingredients.edges.map(({ node }) => {
            return {
              id: node.id,
              quantity: node.quantity,
              text: node.text,
            };
          }),
          title: setNode.title,
        };
      }),
      servings,
      totalTime,
    };
  }

  onChange = ({ field, value }) => {
    this.setState({ [field]: value });
  }

  getFields = () => {
    return { recipe: this.state };
  }

  render() {
    const { activeTime, ingredientSets, totalTime, servings } = this.state;
    return (
      <div { ...styles.container }>
        <Section>
          <TextField
            floatingLabelText="Active Time"
            fullWidth={ true }
            onChange={
              (e, value) => this.onChange({ value, field: 'activeTime' })
            }
            value={ activeTime }
          />
          <TextField
            floatingLabelText="Total Time"
            fullWidth={ true }
            onChange={
              (e, value) => this.onChange({ value, field: 'totalTime' })
            }
            value={ totalTime }
          />
          <TextField
            floatingLabelText="Servings"
            fullWidth={ true }
            onChange={
              (e, value) => this.onChange({ value, field: 'servings' })
            }
            value={ servings }
          />
        </Section>

        {
          ingredientSets.map(({ id: setId, ingredients, title }, setIndex) => (
            <Section key={ setId }>
              <TextField
                defaultValue={ title }
                floatingLabelText="Section Title"
                fullWidth={ true }
              />
              {
                ingredients.map(({ id, quantity, text }, index) => (
                  <div { ...styles.ingredientContainer } key={ id }>
                    <TextField
                      defaultValue={ quantity }
                      floatingLabelText="Quantity"
                      style={ styles.quantityField }
                    />
                    <TextField
                      className={ `${styles.ingredientField}` }
                      defaultValue={ text }
                      floatingLabelText="Ingredient"
                    />
                  </div>
                ))
              }
            </Section>
          ))
        }
      </div>
    );
  }
}

const styles = {
  container: css({
    width: '33%',
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
};

export default Relay.createContainer(IngredientList, {
  fragments: {
    recipe: () => Relay.QL`
      fragment on Recipe {
        activeTime
        servings
        totalTime
        ingredientSets(first: 100) {
          edges {
            node {
              id
              title
              ingredients(first: 100) {
                edges {
                  node {
                    id
                    quantity
                    text
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
});
