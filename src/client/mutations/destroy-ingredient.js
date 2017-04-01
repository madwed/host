import Relay from 'react-relay';

export default class DestroyIngredient extends Relay.Mutation {
  static fragments = {
    ingredient: () => Relay.QL`
      fragment on Ingredient {
        id
        ingredientSetId
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { destroyIngredient }`;
  }

  getVariables() {
    const { ingredient: { id, ingredientSetId } } = this.props;

    return { id, ingredientSetId };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DestroyIngredientPayload {
        destroyedIngredientId
        ingredientSet { ingredients }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'ingredientSet',
      parentID: this.props.ingredient.ingredientSetId,
      connectionName: 'ingredients',
      deletedIDFieldName: 'destroyedIngredientId',
    }];
  }
}
