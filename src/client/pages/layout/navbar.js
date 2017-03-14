import React from 'react';
import { css } from 'glamor';
import { browserHistory } from 'react-router';

import {
  DARKEST_PRIMARY,
  LIGHTER_PRIMARY,
  PRIMARY,
  WHITE,
} from '../../palette';

const changeToRecipes = () => { browserHistory.push('/recipes'); };

export default function Navbar () {
  return (
    <div>
      <div { ...styles.navbar }>
        <div
          { ...styles.logo }
          onClick={ changeToRecipes }
        >
          Cooks
        </div>
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
    borderTop: `2px solid ${LIGHTER_PRIMARY}`,
    borderBottom: `2px solid ${DARKEST_PRIMARY}`,
    color: WHITE,
    zIndex: 99,
  }),
  navplaceholder: css({
    height: 'calc(4em + 4px)',
  }),
  logo: css({
    fontSize: '2em',
    fontWeight: 500,
    cursor: 'pointer',
  }),
};
