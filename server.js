const express = require('express');

const app = express();

const graphqlConfig = require('./src/main-graphql');
const authRouter = require('./src/users/routes');

app.use('/graphql', graphqlConfig);
app.use('/auth', authRouter);

app.listen(4000, '0.0.0.0', () => console.log(
  'Express GraphQL Server Now Running On localhost:4000/graphql',
));
