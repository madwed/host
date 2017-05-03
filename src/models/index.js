require('../../config/aws');

import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();

class DynamoDB {
  constructor(client) {
    this.client = client;
  }

  get(params) {
    return new Promise((resolve, reject) => {
      this.client.get(params, (err, data) => {
        if (err) { reject(err); }
        resolve(data);
      });
    });
  }

  update(params) {
    return new Promise((resolve, reject) => {
      this.client.update(params, (err, data) => {
        if (err) { reject(err); }
        resolve(data);
      });
    });
  }

  query(params) {
    return new Promise((resolve, reject) => {
      this.client.query(params, (err, data) => {
        if (err) { reject(err); }
        resolve(data);
      });
    });
  }
}

export default new DynamoDB(docClient);
