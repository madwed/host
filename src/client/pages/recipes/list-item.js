import React from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import { browserHistory } from 'react-router';
import truncate from 'lodash.truncate';

import { LIGHTEST_TERTIARY } from '../../palette';

const changeToRecipe = (id) => {
  browserHistory.push(`/recipes/${id}`);
};

function ListItem ({ recipe: { description, id, imageUrl, source, title } }) {
  return (
    <div { ...styles.container } onClick={ () => changeToRecipe(id) }>
      <div { ...styles.imageContainer }>
        <img { ...styles.image } src={ imageUrl }/>
      </div>

      <div { ...styles.wording }>
        <div { ...styles.title }>
          { title }
          { source && <span { ...styles.source }>({ source })</span> }
        </div>

        {
          description && (
            <div { ...styles.description }>
              { truncate(description, { length: 140 }) }
            </div>
          )
        }
      </div>
    </div>
  );
}

const styles = {
  container: css({
    display: 'flex',
    alignItems: 'center',
    padding: '0.5em 2em 0.25em',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: LIGHTEST_TERTIARY,
    },
  }),
  imageContainer: css({
    width: '4em',
  }),
  image: css({
    height: '3em',
    width: '4em',
    borderRadius: '2px',
  }),
  title: css({
    fontSize: '1.25em',
  }),
  description: css({
    fontSize: '1em',
    fontStyle: 'italic',
    padding: '0.25em 1em',
  }),
  wording: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0em 1em',
  }),
  source: css({
    paddingLeft: '0.5em',
    fontSize: '0.75em',
  }),
};

export default Relay.createContainer(ListItem, {
  fragments: {
    recipe: () => Relay.QL`
      fragment on Recipe  {
        id
        description
        imageUrl
        source
        title
      }
    `,
  },
});
