require('../config/aws');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB();

module.exports = dynamodb;
