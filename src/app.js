import express from 'express';
import graphqlHTTP from 'express-graphql';

import Schema from './schema';

const PORT = 3000;
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
