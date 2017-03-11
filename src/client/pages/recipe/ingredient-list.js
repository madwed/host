import React from 'react';
import { css } from 'glamor';

const sort = (list) => list.sort((a, b) => a.displayOrder - b.displayOrder);

export default function IngredientList ({ data }) {
  return (
    <div { ...styles.container }>
      {
        sort(data).map((list) => (
          <div>
            {
              sort(list.ingredients).map((ing) => (
                <div { ...styles.ingredient }>
                  { `${ing.quantity} ${ing.text}` }
                </div>
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
    width: '25%',
    padding: '1em',
  }),
  ingredient: css({
    padding: '0.25em 0em',
  }),
};
