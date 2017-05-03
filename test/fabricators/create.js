import dynamodb from '../../src/models';

export default function createFabricatedRecord({ Class, table, record }) {
  return new Promise((resolve, reject) => {
    dynamodb.client.put({ TableName: table, Item: record }, (err, data) => {
      if (err) {
        console.error(
          `Unable to add record to ${table}. Error JSON:`,
          JSON.stringify(err, null, 2)
        );
        reject(err);
      } else {
        console.log(`Successfully added record to ${table}`);
        resolve(new Class(data));
      }
    });
  });
}
