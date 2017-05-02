const dynamodb = require('../');

const params = {
  TableName: 'Users',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
    { AttributeName: 'googleId', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: 'indexGoogleId',
      KeySchema: [
        { AttributeName: 'googleId', KeyType: 'HASH' },
      ],
      Projection: {
        ProjectionType: 'KEYS_ONLY',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    }
  ],
};

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error(
      'Unable to create table `Users`. Error JSON:',
      JSON.stringify(err, null, 2)
    );
    return;
  }
  console.log('Created table `Users`');
});
