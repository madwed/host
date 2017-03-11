import React from 'react';
import { css } from 'glamor';

const sort = (list) => list.sort((a, b) => a.displayOrder - b.displayOrder);

export default function DirectionList ({ data }) {
  return (
    <div { ...styles.container }>
      {
        sort(data).map((list) => (
          <div>
            {
              sort(list.directions).map((dir) => (
                <div { ...styles.direction }>{ dir.text }</div>
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
    width: '75%',
    padding: '1em',
  }),
  direction: css({
    padding: '0.5em 0em',
  }),
};
