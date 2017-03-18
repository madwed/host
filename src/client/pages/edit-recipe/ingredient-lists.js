import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';

import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';

import IngredientList from './ingredient-list';
import Section from '../../components/section';

import {
  LIGHTEST_PRIMARY,
  LIGHTEST_TERTIARY,
} from '../../palette';

class IngredientLists extends Component {
  constructor(props) {
    super(props);

    const { recipe: { activeTime, ingredientSets, servings, totalTime } } = props;

    this.state = {
      activeTime,
      ingredientSets: ingredientSets.edges.map(({ node: setNode }, index) => {
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
      openSet: 0,
      servings,
      totalTime,
    };
  }

  onChange = ({ field, value }) => {
    this.setState({ [field]: value });
  }

  onSetChange = ({ index, field, value }) => {
    const { ingredientSets } = this.state;

    const set = merge({}, ingredientSets[index], { [field]: value });
    ingredientSets.splice(index, 1, set);

    this.setState({ ingredientSets });
  }

  onIngredientChange = ({ setIndex, index, field, value }) => {
    const { ingredientSets } = this.state;

    const set = ingredientSets[setIndex];
    const ingredient = merge({}, set.ingredients[index], { [field]: value });
    set.ingredients.splice(index, 1, ingredient);

    this.setState({ ingredientSets });
  }

  onDelete = (setIndex) => {
    const { ingredientSets } = this.state;
    ingredientSets.splice(setIndex, 1);
    this.setState({ ingredientSets });
  }

  openSet = (openSet) => this.setState({ openSet })

  getFields = () => ({ recipe: this.state })

  render() {
    const { activeTime, ingredientSets, openSet, totalTime, servings } = this.state;

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

        <Section style={ styles.setSection }>
          <List>
            {
              ingredientSets.map((set, index) => {
                if (index !== openSet) {
                  return (
                    <div key={ set.id }>
                      { index !== 0 && <Divider/> }
                      <ListItem
                        hoverColor={ LIGHTEST_TERTIARY }
                        onClick={ () => this.openSet(index) }
                        primaryText={ set.title }
                        rightIcon={ <ExpandMore/> }
                      />
                    </div>
                  );
                }
                return (
                  <div key={ set.id }>
                    { index !== 0 && <Divider/> }
                    <IngredientList
                      list={ set }
                      onDelete={ this.onDelete }
                      onIngredientChange={ this.onIngredientChange }
                      onSetChange={ this.onSetChange }
                      setIndex={ index }
                    />
                  </div>
                );
              })
            }
          </List>
          <Divider/>
          <div { ...styles.sectionButton }>
            <RaisedButton label="Add Section" primary={ true }/>
          </div>
        </Section>
      </div>
    );
  }
}

const styles = {
  container: css({
    width: '33%',
  }),
  setSection: css({
    padding: '0em',
  }),
  sectionButton: css({
    padding: '0.5em 1em 1em',
    display: 'flex',
    justifyContent: 'center',
  }),
};

export default Relay.createContainer(IngredientLists, {
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
