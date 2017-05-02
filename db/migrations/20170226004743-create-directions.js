const dynamodb = require('../');

const params = {
  TableName: 'Directions',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
    { AttributeName: 'directionSetId', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: 'indexDirectionSetId',
      KeySchema: [
        { AttributeName: 'directionSetId', KeyType: 'HASH' },
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
      'Unable to create table `Directions`. Error JSON:',
      JSON.stringify(err, null, 2)
    );
    return;
  }
  console.log('Created table `Directions`');
});
