import Relay from 'react-relay';

export default class UpdateRecipeMutation extends Relay.Mutation {
  static fragments = {
    recipe: () => Relay.QL`
      fragment on Recipe {
        activeTime
        description
        id
        imageUrl
        note
        originalUrl
        servings
        source
        title
        totalTime
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { updateRecipe }`;
  }

  getVariables() {
    const { recipe } = this.props;
    const { activeTime, description, id, imageUrl, note } = recipe;
    const { originalUrl, servings, source, title, totalTime } = recipe;

    return {
      activeTime,
      description,
      id,
      imageUrl,
      note,
      originalUrl,
      servings,
      source,
      title,
      totalTime,
    };
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
      fieldIDs: { recipe: this.props.recipe.id },
    }];
  }
}
