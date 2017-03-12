import React from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';

function IngredientList ({
  recipe: { activeTime, ingredientSets, servings, totalTime }
}) {
  return (
    <div { ...styles.container }>
      <p>{ activeTime }</p>
      <p>{ totalTime }</p>
      <p>{ servings }</p>
      {
        ingredientSets.edges.map(({ node: setNode }) => (
          <div key={ setNode.id }>
            <div { ...styles.setTitle }>{ setNode.title }</div>
            {
              setNode.ingredients.edges.map(({ node }) => (
                <div
                  { ...styles.ingredient }
                  key={ node.id }
                >
                  { `${node.text}` }
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
}

const styles = {
  container: css({
    width: '33%',
    padding: '1em',
  }),
  ingredient: css({
    padding: '0.25em 0em',
  }),
  setTitle: css({
    fontSize: '1.25em',
    paddingTop: '0.5em',
    paddingBottom: '0.25em',
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
