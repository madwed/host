const dotenv = require('dotenv');
const AWS = require('aws-sdk');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  endpoint: 'http://localhost:8000',
  region: 'us-east-1',
});

const dynamodb = new AWS.DynamoDB();

module.exports = dynamodb;
