import Relay from 'react-relay';

export default class CreateIngredient extends Relay.Mutation {
  static fragments = {
    ingredientSet: () => Relay.QL`
      fragment on IngredientSet {
        id
        ingredients(first: 100) {
          edges
        }
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { createIngredient }`;
  }

  getVariables() {
    const { ingredientSet: { id, ingredients: { edges } } } = this.props;

    return { ingredientSetId: id, edgeCount: edges.length };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateIngredientPayload {
        ingredientEdge
        ingredientSet {
          ingredients(first: 100) {
            edges
          }
        }
      }
    `;
  }

  getOptimisticResponse() {
    const { ingredientSet: { ingredients: { edges } } } = this.props;
    const node = {
      displayOrder: edges.length,
      quantity: '',
      text: '',
    };

    return {
      ingredientEdge: { node },
      ingredientSet: {
        ingredients: {
          edges: edges.concat({ node }),
        }
      },
    }
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'ingredientSet',
      parentID: this.props.ingredientSet.id,
      connectionName: 'ingredients',
      edgeName: 'ingredientEdge',
      rangeBehaviors: {
        '': 'append',
        'first()': 'append',
      },
    }];
  }
}

