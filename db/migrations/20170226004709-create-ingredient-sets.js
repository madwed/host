const dynamodb = require('../');

const params = {
  TableName: 'IngredientSets',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
    { AttributeName: 'recipeId', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: 'indexRecipeId',
      KeySchema: [
        { AttributeName: 'recipeId', KeyType: 'HASH' },
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
      'Unable to create table `IngredientSets`. Error JSON:',
      JSON.stringify(err, null, 2)
    );
    return;
  }
  console.log('Created table `IngredientSets`');
});
