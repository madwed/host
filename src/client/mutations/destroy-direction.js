import Relay from 'react-relay';

export default class DestroyDirection extends Relay.Mutation {
  static fragments = {
    direction: () => Relay.QL`
      fragment on Direction {
        id
        directionSetId
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { destroyDirection }`;
  }

  getVariables() {
    const { direction: { id, directionSetId } } = this.props;

    return { id, directionSetId };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DestroyDirectionPayload {
        destroyedDirectionId
        directionSet { directions }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'directionSet',
      parentID: this.props.direction.directionSetId,
      connectionName: 'directions',
      deletedIDFieldName: 'destroyedDirectionId',
    }];
  }
}
