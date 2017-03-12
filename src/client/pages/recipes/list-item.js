import React from 'react';
import { css } from 'glamor';

import { DARKER_TERTIARY, LIGHTEST_TERTIARY } from '../../palette';

export default function ListItem ({
  description,
  imageUrl,
  onClick,
  source,
  title,
}) {
  return (
    <div { ...styles.container } onClick={ onClick }>
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
              { `${description.slice(0, 140).trim()}...`}
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
    border: `3px solid ${DARKER_TERTIARY}`,
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