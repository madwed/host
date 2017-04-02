import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import debounce from 'lodash.debounce';

import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import CreateDirection from '../../mutations/create-direction';
import DestroyDirectionSet from '../../mutations/destroy-direction-set';
import UpdateDirectionSet from '../../mutations/update-direction-set';
import Direction from './direction';

import { DANGER, LIGHTER_PRIMARY } from '../../palette';

class DirectionList extends Component {
  onChange = debounce((update) => {
    const { directionSet } = this.props;

    const mutation = new UpdateDirectionSet({ directionSet, ...update });

    this.props.relay.commitUpdate(mutation);
  }, 400)

  onDelete = () => {
    const { directionSet } = this.props;
    this.props.relay.commitUpdate(new DestroyDirectionSet({ directionSet }));
  }

  onAdd = () => {
    const { directionSet } = this.props;
    this.props.relay.commitUpdate(new CreateDirection({ directionSet }));
  }

  render() {
    const { directionSet: { directions, title } } = this.props;

    return (
      <div>
        <div { ...styles.buttonContainer } { ...styles.destroyContainer }>
          <IconButton
            iconStyle={ styles.delete }
            onClick={ this.onDelete }
            tooltip="Delete Section"
          >
            <NavigationClose/>
          </IconButton>
        </div>

        <div { ...styles.fields }>
          <TextField
            defaultValue={ title }
            floatingLabelText="Section Title"
            fullWidth={ true }
            onChange={ (e, title) => this.onChange({ title }) }
          />

          {
            directions.edges.map(({ node: direction }, index) => (
              <Direction direction={ direction } key={ direction.id }/>
            ))
          }
        </div>

        <div { ...styles.buttonContainer }>
          <IconButton
            iconStyle={ styles.add }
            onClick={ this.onAdd }
            tooltip="Add Direction"
          >
            <ContentAdd/>
          </IconButton>
        </div>
      </div>
    );
  }
}

const styles = {
  destroyContainer: css({
    height: '1em',
  }),
  buttonContainer: css({
    display: 'flex',
    justifyContent: 'flex-end',
  }),
  fields: css({
    padding: '0em 1em',
  }),
  add: {
    color: LIGHTER_PRIMARY,
  },
  delete: {
    color: DANGER,
  },
};

export default Relay.createContainer(DirectionList, {
  fragments: {
    directionSet: () => Relay.QL`
      fragment on DirectionSet {
        id
        title
        ${CreateDirection.getFragment('directionSet')}
        ${DestroyDirectionSet.getFragment('directionSet')}
        ${UpdateDirectionSet.getFragment('directionSet')}
        directions(first: 100) {
          edges {
            node {
              id
              ${Direction.getFragment('direction')}
            }
          }
        }
      }
    `,
  },
});
