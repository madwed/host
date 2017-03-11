import React from 'react';
import { css } from 'glamor';

import { PRIMARY, WHITE } from '../../palette';

export default function Navbar () {
  return (
    <div>
      <div { ...styles.navbar }>
        <div { ...styles.logo }>Cooks</div>
      </div>
      <div { ...styles.navplaceholder }/>
    </div>
  );
}

const styles = {
  navbar: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'fixed',
    height: '4em',
    width: '100%',
    margin: '0px',
    padding: '0em 1em',
    backgroundColor: PRIMARY,
    color: WHITE,
  }),
  navplaceholder: css({
    height: '4em',
  }),
  logo: css({
    fontSize: '2em',
    fontWeight: 500,
  }),
};
