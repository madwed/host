import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import debounce from 'lodash.debounce';

import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import NavigationClose from 'material-ui/svg-icons/navigation/close';

import DestroyDirection from '../../mutations/destroy-direction';
import UpdateDirection from '../../mutations/update-direction';

import { DANGER } from '../../palette';

class Direction extends Component {
  onChange = debounce((update) => {
    const { direction } = this.props;

    this.props.relay.commitUpdate(new UpdateDirection({ direction, ...update }));
  }, 400)

  onDelete = () => {
    const { direction } = this.props;
    this.props.relay.commitUpdate(new DestroyDirection({ direction }));
  }

  render() {
    const { id, text } = this.props.direction;

    return (
      <div { ...styles.container } key={ id }>
        <IconButton
          iconStyle={ styles.delete }
          onClick={ this.onDelete }
          style={ styles.deleteContainer }
          tooltip="Delete"
        >
          <NavigationClose/>
        </IconButton>

        <TextField
          className={ `${styles.directionField}` }
          defaultValue={ text }
          floatingLabelText="Direction"
          multiLine={ true }
          onChange={ (e, text) => this.onChange({ text }) }
          rows={ 2 }
        />
      </div>
    );
  }
}

const styles = {
  container: css({
    display: 'flex',
    alignItems: 'center',
  }),
  quantityField: {
    width: '8em',
    marginRight: '1em',
  },
  directionField: css({
    flex: 1,
  }),
  delete: {
    color: DANGER,
  },
  deleteContainer: {
    padding: '0px 16px 0px 0px',
    width: undefined,
  },
};

export default Relay.createContainer(Direction, {
  fragments: {
    direction: () => Relay.QL`
      fragment on Direction {
        id
        text
        ${DestroyDirection.getFragment('direction')}
        ${UpdateDirection.getFragment('direction')}
      }
    `,
  },
});
