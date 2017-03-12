import React from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import { browserHistory } from 'react-router';

import { DARKEST_TERTIARY, LIGHTEST_PRIMARY } from '../../palette';

const changeToRecipes = () => { browserHistory.push('/recipes'); };

function Header ({
  recipe: { description, imageUrl, note, originalUrl, source, title },
}) {
  return (
    <div { ...styles.container }>
      <div
        { ...styles.backButton }
        onClick={ changeToRecipes }
      >
        Back
      </div>

      <div { ...styles.titleContainer }>
        <img { ...styles.image } src={ imageUrl }/>

        <div { ...styles.titleText }>
          <h1 { ...styles.title }>{ title }</h1>
          <a href={ originalUrl }>{ source }</a>
          <p>{ description }</p>
          <p>{ note }</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: css({
    padding: '1em 1em 0em',
    width: '100%',
  }),
  backButton: css({
    fontSize: '1.5em',
    color: DARKEST_TERTIARY,
    cursor: 'pointer',
    paddingBottom: '1em',
  }),
  image: css({
    border: `1px solid ${LIGHTEST_PRIMARY}`,
    borderRadius: '2px',
    maxHeight: '16em',
    maxWidth: '25%',
  }),
  title: css({
    margin: '0em',
  }),
  titleContainer: css({
    display: 'flex',
  }),
  titleText: css({
    padding: '1em',
    flex: 1,
    width: 'calc(75% - 1em)',
  }),
};

export default Relay.createContainer(Header, {
  fragments: {
    recipe: () => Relay.QL`
      fragment on Recipe {
        description
        imageUrl
        note
        originalUrl
        source
        title
      }
    `,
  },
});
