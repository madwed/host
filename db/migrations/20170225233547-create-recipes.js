const dynamodb = require('../');

const params = {
  TableName: 'Recipes',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
    { AttributeName: 'userId', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: 'indexUserId',
      KeySchema: [
        { AttributeName: 'userId', KeyType: 'HASH' },
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
      'Unable to create table `Recipes`. Error JSON:',
      JSON.stringify(err, null, 2)
    );
    return;
  }
  console.log('Created table `Recipes`');
});
