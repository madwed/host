import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';
import TextField from 'material-ui/TextField';

import UpdateRecipeMutation from '../../mutations/update-recipe-mutation';
import Section from '../../components/section';
import { LIGHTEST_PRIMARY } from '../../palette';

class Header extends Component {
  onChange = (update) => {
    const { recipe } = this.props;

    this.props.relay.commitUpdate(new UpdateRecipeMutation({ recipe, ...update }));
  }

  render() {
    const { description, id, imageUrl, note, originalUrl, source, title } = this.props.recipe;

    return (
      <Section>
        <div { ...styles.titleContainer }>
          <div { ...styles.title }>
            <TextField
              className={ `${styles.titleField}` }
              defaultValue={ title }
              floatingLabelText="Title"
              fullWidth={ true }
              onChange={ (e, title) => this.onChange({ title }) }
            />

            <div { ...styles.source }>
              <TextField
                className={ `${styles.sourceField}` }
                defaultValue={ source }
                floatingLabelText="Source"
                onChange={ (e, source) => this.onChange({ source }) }
              />

              <TextField
                className={ `${styles.linkToSourceField}` }
                defaultValue={ originalUrl }
                floatingLabelText="Link To Source"
                onChange={ (e, originalUrl) => this.onChange({ originalUrl }) }
              />
            </div>

            <TextField
              defaultValue={ description }
              floatingLabelText="Description"
              fullWidth={ true }
              multiLine={ true }
              onChange={ (e, description) => this.onChange({ description }) }
              rows={ 2 }
            />

            <TextField
              defaultValue={ note }
              floatingLabelText="Note"
              fullWidth={ true }
              multiLine={ true }
              onChange={ (e, note) => this.onChange({ note }) }
              rows={ 2 }
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
        ${UpdateRecipeMutation.getFragment('recipe')}
      }
    `,
  },
});
