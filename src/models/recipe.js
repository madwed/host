import ApplicationModel from './application';

export default class Recipe extends ApplicationModel {
  static tableName = 'Recipes'
  static timestamps = true

  static find(id) {
    return super.find({ Key: { id } }).then((data) => new Recipe(data));
  }

  static update({ id, ...attributes }) {
    return super.update({
      Key: { id },
      attributes,
    }).then((data) => new Recipe(data));
  }
}
