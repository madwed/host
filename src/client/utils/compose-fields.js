import merge from 'lodash.merge';

export default function composeFields (refs) {
  const components = Object.values(this.refs);

  const fields = components.map((component) => {
    return component.refs.component.getFields();
  });

  return merge({}, ...fields);
}
