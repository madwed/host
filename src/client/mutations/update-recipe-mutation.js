import Relay from 'react-relay';

export default class UpdateRecipeMutation extends Relay.Mutation {
  static fragments = {
    recipe: () => Relay.QL`
      fragment on Recipe {
        description
        id
        imageUrl
        note
        originalUrl
        source
        title
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { updateRecipe }`;
  }

  getVariables() {
    const {
      description, id, imageUrl, note, originalUrl, source, title,
    } = this.props.recipe;

    return { id, description, imageUrl, note, originalUrl, source, title };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateRecipePayload {
        recipe
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        recipe: this.props.recipe.id,
      },
    }];
  }
}
