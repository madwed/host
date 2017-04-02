import Relay from 'react-relay';

export default class DestroyDirectionSet extends Relay.Mutation {
  static fragments = {
    directionSet: () => Relay.QL`
      fragment on DirectionSet {
        id
        recipeId
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { destroyDirectionSet }`;
  }

  getVariables() {
    const { directionSet } = this.props;

    return { id: directionSet.id };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DestroyDirectionSetPayload {
        destroyedDirectionSetId
        recipe { directionSets }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'recipe',
      parentID: this.props.directionSet.recipeId,
      connectionName: 'directionSets',
      deletedIDFieldName: 'destroyedDirectionSetId',
    }];
  }
}
