import Relay from 'react-relay';

export default class CreateIngredientSet extends Relay.Mutation {
  static fragments = {
    recipe: () => Relay.QL`
      fragment on Recipe {
        id
        ingredientSets(first: 100) {
          edges
        }
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { createIngredientSet }`;
  }

  getVariables() {
    const { recipe: { id, ingredientSets: { edges } } } = this.props;

    return { recipeId: id, edgeCount: edges.length };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateIngredientSetPayload {
        ingredientSetEdge
        recipe {
          ingredientSets(first: 100) {
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


