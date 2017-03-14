import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import TextField from 'material-ui/TextField';

import Section from '../../components/section';
import { LIGHTEST_PRIMARY } from '../../palette';

class Header extends Component {
  state = {
    description: this.props.recipe.description || '',
    imageUrl: this.props.recipe.imageUrl || '',
    note: this.props.recipe.note || '',
    originalUrl: this.props.recipe.originalUr || '',
    source: this.props.recipe.source || '',
    title: this.props.recipe.title || '',
  };

  onChange = ({ field, value }) => {
    this.setState({ [field]: value });
  }

  getFields = () => ({ recipe: this.state })

  render() {
    const {
      description, imageUrl, note, originalUrl, source, title,
    } = this.state;

    return (
      <Section>
        <div { ...styles.titleContainer }>
          <div { ...styles.title }>
            <TextField
              className={ `${styles.titleField}` }
              floatingLabelText="Title"
              fullWidth={ true }
              onChange={ (e, value) => this.onChange({ value, field: 'title' }) }
              value={ title }
            />

            <div { ...styles.source }>
              <TextField
                className={ `${styles.sourceField}` }
                floatingLabelText="Source"
                onChange={
                  (e, value) => this.onChange({ value, field: 'source' })
                }
                value={ source }
              />

              <TextField
                className={ `${styles.linkToSourceField}` }
                floatingLabelText="Link To Source"
                onChange={
                  (e, value) => this.onChange({ value, field: 'originalUrl' })
                }
                value={ originalUrl }
              />
            </div>

            <TextField
              floatingLabelText="Description"
              fullWidth={ true }
              multiLine={ true }
              onChange={
                (e, value) => this.onChange({ value, field: 'description' })
              }
              rows={ 2 }
              value={ description }
            />

            <TextField
              floatingLabelText="Note"
              fullWidth={ true }
              multiLine={ true }
              onChange={ (e, value) => this.onChange({ value, field: 'note' }) }
              rows={ 2 }
              value={ note }
            />
          </div>

          { !!imageUrl && <img { ...styles.image } src={ imageUrl }/> }
        </div>
      </Section>
    );
  }
}

const styles = {
  image: css({
    border: `1px solid ${LIGHTEST_PRIMARY}`,
    borderRadius: '2px',
    maxHeight: '16em',
  }),
  titleContainer: css({
    display: 'flex',
  }),
  title: css({ padding: '1em', flex: 1 }),
  source: css({ display: 'flex', justifyContent: 'space-between' }),
  titleField: css({
    fontSize: '2em !important',
    height: '3em !important',
  }),
  sourceField: css({ flex: 1, marginRight: '0.5em' }),
  linkToSourceField: css({ flex: 1, marginLeft: '0.5em' }),
};

export default Relay.createContainer(Header, {
  fragments: {
    recipe: () => Relay.QL`
      fragment on Recipe {
        description, id, imageUrl, note, originalUrl, source, title,
      }
    `,
  },
});
