import dynamoDB from './';

function expressionAttributeNames(attributes) {
  return Object.keys(attributes).reduce((names, key) => {
    names[`#${key}`] = key;
    return names;
  }, {});
}

function expressionAttributeValues(attributes) {
  return Object.keys(attributes).reduce((values, key) => {
    values[`:${key}`] = attributes[key];
    return values;
  }, {});
}

function keyConditionExpression(attributes) {
  return Object.keys(attributes).map((key) => `#${key}=:${key}`).join(' and ');
}

function updateExpression(attributes) {
  return Object.keys(attributes).map((key) => `${key}=:${key}`).join(', ');
}

export default class ApplicationModel {
  constructor(attributes) {
    Object.assign(this, attributes);
  }

  static find(params) {
    params.TableName = this.tableName;
    return dynamoDB.get(params);
  }

  static update(params) {
    const { attributes } = params;
    delete params.attributes;

    if (this.timestamps) {
      attributes.updatedAt = new Date();
    }

    params.TableName = this.tableName;
    params.UpdateExpression = `set ${updateExpression(attributes)}`;
    params.ExpressionAttributeValues = expressionAttributeValues(attributes);
    params.ReturnValues = 'ALL_NEW';

    return dynamoDB.update(params);
  }

  static where(params) {
    const { attributes } = params;
    delete params.attributes;

    if (this.timestamps) {
      attributes.updatedAt = new Date();
    }

    params.TableName = this.tableName;
    params.KeyConditionExpression = keyConditionExpression(attributes);
    params.ExpressionAttributeNames = expressionAttributeNames(attributes);
    params.ExpressionAttributeValues = expressionAttributeValues(attributes);

    return dynamoDB.query(params);
  }
}
