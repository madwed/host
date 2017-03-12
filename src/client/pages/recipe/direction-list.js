import React from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';

function DirectionList ({ recipe: { directionSets } }) {
  return (
    <div { ...styles.container }>
      {
        directionSets.edges.map(({ node: setNode }) => (
          <div key={ setNode.id }>
            <div { ...styles.setTitle }>{ setNode.title }</div>
            {
              setNode.directions.edges.map(({ node }) => (
                <div
                  key={ node.id }
                  { ...styles.direction }
                >
                  { node.text }
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
    width: '66%',
    padding: '1em',
  }),
  direction: css({
    padding: '0.5em 0em',
  }),
  setTitle: css({
    fontSize: '1.25em',
    paddingTop: '0.5em',
  }),
};

export default Relay.createContainer(DirectionList, {
  fragments: {
    recipe: () => Relay.QL`
      fragment on Recipe {
        directionSets(first: 100) {
          edges {
            node {
              id
              title
              directions(first: 100) {
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
