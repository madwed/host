import Relay from 'react-relay';

export default class CreateDirection extends Relay.Mutation {
  static fragments = {
    directionSet: () => Relay.QL`
      fragment on DirectionSet {
        id
        directions(first: 100) {
          edges
        }
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { createDirection }`;
  }

  getVariables() {
    const { directionSet: { id, directions: { edges } } } = this.props;

    return { directionSetId: id, edgeCount: edges.length };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateDirectionPayload {
        directionEdge
        directionSet {
          directions(first: 100) {
            edges
          }
        }
      }
    `;
  }

  getOptimisticResponse() {
    const { directionSet: { directions: { edges } } } = this.props;
    const node = {
      displayOrder: edges.length,
      text: '',
    };

    return {
      directionEdge: { node },
      directionSet: {
        directions: {
          edges: edges.concat({ node }),
        }
      },
    }
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'directionSet',
      parentID: this.props.directionSet.id,
      connectionName: 'directions',
      edgeName: 'directionEdge',
      rangeBehaviors: {
        '': 'append',
        'first()': 'append',
      },
    }];
  }
}
