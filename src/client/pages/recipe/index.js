import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import DirectionList from './direction-list';
import Header from './header';
import IngredientList from './ingredient-list';

import changeToRecipes from '../../actions/change-to-recipes';

const sort = (list) => list.sort((a, b) => a.displayOrder - b.displayOrder);

class Recipe extends Component {
  render() {
    const { recipe } = this.props;

    if (!recipe) { return <div/>; }

    return (
      <div { ...styles.container }>
        <Header
          changeToRecipes={ this.props.changeToRecipes }
          servings={ recipe.yield }
          source={ recipe.source }
          title={ recipe.title }
        />

        <div { ...styles.details }>
          <IngredientList data={ recipe.ingredientLists }/>
          <DirectionList data={ recipe.directionLists }/>
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

const mapState = () => {};

const mapActions = {
  changeToRecipes,
};

export default connect(mapState, mapActions)(Recipe);
