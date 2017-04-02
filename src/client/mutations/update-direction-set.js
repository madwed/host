import Relay from 'react-relay';

export default class UpdateDirectionSet extends Relay.Mutation {
  static fragments = {
    directionSet: () => Relay.QL`
      fragment on DirectionSet {
        id
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { updateDirectionSet }`;
  }

  getVariables() {
    const { directionSet, ...other } = this.props;

    return { id: directionSet.id, ...other };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateDirectionSetPayload {
        directionSet {
          title
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: { directionSet: this.props.directionSet.id },
    }];
  }
}
