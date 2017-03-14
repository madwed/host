import React from 'react';
import { css } from 'glamor';

export function Title ({ children }) {
  return (<h1 { ...styles.title }>{ children }</h1>);
}

const styles = {
  title: css({
    margin: 0,
  }),
};
