import Relay from 'react-relay';

export default class UpdateIngredient extends Relay.Mutation {
  static fragments = {
    ingredient: () => Relay.QL`
      fragment on Ingredient {
        id
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { updateIngredient }`;
  }

  getVariables() {
    const { ingredient, ...other } = this.props;

    return { id: ingredient.id, ...other };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateIngredientPayload {
        ingredient {
          quantity
          text
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: { ingredient: this.props.ingredient.id },
    }];
  }
}

