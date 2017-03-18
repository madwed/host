import Relay from 'react-relay';

export default class UpdateRecipe extends Relay.Mutation {
  static fragments = {
    recipe: () => Relay.QL`
      fragment on Recipe {
        id
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { updateRecipe }`;
  }

  getVariables() {
    const { recipe, ...other } = this.props;

    return { id: recipe.id, ...other };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateRecipePayload {
        recipe {
          activeTime
          description
          imageUrl
          note
          originalUrl
          servings
          source
          title
          totalTime
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: { recipe: this.props.recipe.id },
    }];
  }
}
