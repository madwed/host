import Relay from 'react-relay';

export default class UpdateDirection extends Relay.Mutation {
  static fragments = {
    direction: () => Relay.QL`
      fragment on Direction {
        id
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { updateDirection }`;
  }

  getVariables() {
    const { direction, ...other } = this.props;

    return { id: direction.id, ...other };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateDirectionPayload {
        direction {
          text
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: { direction: this.props.direction.id },
    }];
  }
}
