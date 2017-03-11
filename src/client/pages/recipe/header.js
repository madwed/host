import React from 'react';
import { css } from 'glamor';

export default function Header ({
  changeToRecipes,
  servings,
  source,
  title,
}) {
  return (
    <div { ...styles.container }>
      <div onClick={ changeToRecipes }>Back</div>
      <h1 { ...styles.title }>{ title }</h1>
      <p>{ source }</p>
      <p>{ servings }</p>
    </div>
  );
}

const styles = {
  container: css({
    padding: '1em 1em 0em',
  }),
  title: css({
    margin: '0em',
  }),
};
