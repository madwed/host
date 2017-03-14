import React from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import { browserHistory } from 'react-router';

import { Title } from '../../components/text';
import {
  DARKEST_TERTIARY,
  LIGHTEST_PRIMARY,
  LIGHTEST_TERTIARY,
  WHITE,
} from '../../palette';

const changeToEditRecipe = (id) => {
  browserHistory.push(`/recipes/${id}/edit`);
};
const changeToRecipes = () => { browserHistory.push('/recipes'); };

function Header ({
  recipe: { description, id, imageUrl, note, originalUrl, source, title },
}) {
  return (
    <div { ...styles.container }>
      <div { ...styles.actions }>
        <a
          { ...styles.button }
          onClick={ changeToRecipes }
        >
          Back
        </a>

        <a
          { ...styles.button }
          onClick={ () => changeToEditRecipe(id) }
        >
          Edit
          <div { ...styles.editIcon }>
            <i className="fa fa-pencil"/>
          </div>
        </a>
      </div>

      <div { ...styles.titleContainer }>
        <div { ...styles.title }>
          <Title>{ title }</Title>
          <a href={ originalUrl }>{ source }</a>
          <p>{ description }</p>
          <p>{ note }</p>
        </div>

        { !!imageUrl && <img { ...styles.image } src={ imageUrl }/> }
      </div>
    </div>
  );
}

const styles = {
  container: css({
    padding: '1em 1em 0em',
  }),
  actions: css({
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '1em',
  }),
  button: css({
    fontSize: '1.5em',
    color: DARKEST_TERTIARY,
    cursor: 'pointer',
  }),
  editIcon: css({
    backgroundColor: DARKEST_TERTIARY,
    color: WHITE,
    borderRadius: '100%',
    fontSize: '1em',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.5em',
    height: '1.5em',
    marginLeft: '0.5em',
    ':hover': {
      color: LIGHTEST_TERTIARY,
    },
  }),
  image: css({
    border: `1px solid ${LIGHTEST_PRIMARY}`,
    borderRadius: '2px',
    maxHeight: '16em',
  }),
  titleContainer: css({
    display: 'flex',
    borderLeft: `2px solid ${LIGHTEST_PRIMARY}`,
  }),
  title: css({
    padding: '1em',
    flex: 1,
  }),
};

export default Relay.createContainer(Header, {
  fragments: {
    recipe: () => Relay.QL`
      fragment on Recipe {
        description
        id
        imageUrl
        note
        originalUrl
        source
        title
      }
    `,
  },
});
