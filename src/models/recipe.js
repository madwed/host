import ApplicationModel from './application';

export default class Recipe extends ApplicationModel {
  tableName = 'Recipes'

  static find(id) {
    return super.find({ Key: { id } }).then((data) => new Recipe(data));
  }

  static update(attributes) {
    return super.update()
  }
}
