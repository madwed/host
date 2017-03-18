import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import debounce from 'lodash.debounce';

import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';

import UpdateRecipe from '../../mutations/update-recipe';
import IngredientList from './ingredient-list';
import Section from '../../components/section';

import {
  LIGHTEST_PRIMARY,
  LIGHTEST_TERTIARY,
} from '../../palette';

class IngredientLists extends Component {
  state = { openSet: 0 }

  onChange = debounce((update) => {
    const { recipe } = this.props;

    this.props.relay.commitUpdate(new UpdateRecipe({ recipe, ...update }));
  }, 400)

  openSet = (openSet) => this.setState({ openSet })

  render() {
    const { recipe } = this.props;
    const { activeTime, ingredientSets, totalTime, servings } = recipe;
    const { openSet } = this.state;

    return (
      <div { ...styles.container }>
        <Section>
          <TextField
            defaultValue={ activeTime }
            floatingLabelText="Active Time"
            fullWidth={ true }
            onChange={ (e, activeTime) => this.onChange({ activeTime }) }
          />
          <TextField
            defaultValue={ totalTime }
            floatingLabelText="Total Time"
            fullWidth={ true }
            onChange={ (e, totalTime) => this.onChange({ totalTime }) }
          />
          <TextField
            defaultValue={ servings }
            floatingLabelText="Servings"
            fullWidth={ true }
            onChange={ (e, servings) => this.onChange({ servings }) }
          />
        </Section>

        <Section style={ styles.setSection }>
          <List>
            {
              ingredientSets.edges.map(({ node: ingredientSet }, index) => {
                if (index !== openSet) {
                  return (
                    <div key={ ingredientSet.id }>
                      { index !== 0 && <Divider/> }
                      <ListItem
                        hoverColor={ LIGHTEST_TERTIARY }
                        onClick={ () => this.openSet(index) }
                        primaryText={ ingredientSet.title }
                        rightIcon={ <ExpandMore/> }
                      />
                    </div>
                  );
                }
                return (
                  <div key={ ingredientSet.id }>
                    { index !== 0 && <Divider/> }
                    <IngredientList
                      ingredientSet={ ingredientSet }
                      recipe={ recipe }
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
        ${IngredientList.getFragment('recipe')}
        ${UpdateRecipe.getFragment('recipe')}
        ingredientSets(first: 100) {
          edges {
            node {
              id
              title
              ${IngredientList.getFragment('ingredientSet')}
            }
          }
        }
      }
    `,
  },
});
