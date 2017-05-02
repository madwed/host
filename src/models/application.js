import dynamo from '../../db/';
import camelcase from 'lodash.camelcase';
import mapKeys from 'lodash.mapkeys';

export default class ApplicationModel {
  constructor(data) {
    Object.assign(this, mapKeys(data, (val, key) => camelcase(key)));
  }

  static find(params) {
    if (this.tableName) {
      params.TableName = this.tableName;
    }

    return new Promise((resolve, reject) => {
      dynamodb.getItem(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
