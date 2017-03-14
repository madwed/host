import React from 'react';
import { css } from 'glamor';
import Paper from 'material-ui/Paper';

import { LIGHTEST_PRIMARY } from '../palette';

export default function Section ({ children }) {
  return (
    <Paper style={ styles.paper }>
      <div { ...styles.section }>
        { children }
      </div>
    </Paper>
  );
}

const styles = {
  paper: {
    marginBottom: '1em',
  },
  section: css({
    borderLeft: `2px solid ${LIGHTEST_PRIMARY}`,
    padding: '1em',
  }),
};
