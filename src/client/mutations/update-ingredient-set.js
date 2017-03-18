import Relay from 'react-relay';

export default class UpdateIngredientSet extends Relay.Mutation {
  static fragments = {
    ingredientSet: () => Relay.QL`
      fragment on IngredientSet {
        id
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { updateIngredientSet }`;
  }

  getVariables() {
    const { ingredientSet, ...other } = this.props;

    return { id: ingredientSet.id, ...other };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateIngredientSetPayload {
        ingredientSet {
          title
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: { ingredientSet: this.props.ingredientSet.id },
    }];
  }
}
