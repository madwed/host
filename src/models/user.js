import ApplicationModel from './application';
import Recipe from './recipe';

export default class User extends ApplicationModel {
  static tableName = 'Users'
  static timestamps = true

  static findByGoogleId(googleId) {
    return super.find({ Key: { googleId } }).then((data) => new User(data));
  }

  recipes() {
    return Recipe.where({ userId: this.id });
  }
}
