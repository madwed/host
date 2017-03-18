import Relay from 'react-relay';

export default class DestroyIngredientSet extends Relay.Mutation {
  static fragments = {
    ingredientSet: () => Relay.QL`
      fragment on IngredientSet {
        id
      }
    `,
    recipe: () => Relay.QL`
      fragment on Recipe {
        id
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { destroyIngredientSet }`;
  }

  getVariables() {
    const { ingredientSet } = this.props;

    return { id: ingredientSet.id };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DestroyIngredientSetPayload {
        destroyedIngredientSetId
        recipe { ingredientSets }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'recipe',
      parentID: this.props.recipe.id,
      connectionName: 'ingredientSets',
      deletedIDFieldName: 'destroyedIngredientSetId',
    }];
  }
}
