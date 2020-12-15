const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');

const userGraphql = require('./users/graphql-schema');
const eventGraphql = require('./events/graphql-schema');
const expenseGraphql = require('./expenses/graphql-schema');
const eventPhotosGraphql = require('./event-photos/graphql-schema');
const eventUsersGraphql = require('./event-users/graphql-schema');

const {errorType} = require('./errors');

const getErrorCode = errorName => {
  return errorType[errorName]
};

const passiveUserError = {
  message: "user is passive"
};

const schema = buildSchema(`
    type Query {
        ${userGraphql.queries},
        ${eventGraphql.queries},
        ${expenseGraphql.queries},
        ${eventPhotosGraphql.queries},
        ${eventUsersGraphql.queries},
    },
    
    type Mutation {
        ${userGraphql.mutations},
        ${eventGraphql.mutations},
        ${expenseGraphql.mutations},
        ${eventPhotosGraphql.mutations},
        ${eventUsersGraphql.mutations},
    },
    
   ${userGraphql.model},
   ${eventGraphql.model},
   ${expenseGraphql.model},
   ${eventPhotosGraphql.model},
   ${eventUsersGraphql.model},
`);

const root = {
  ...userGraphql.root,
  ...eventGraphql.root,
  ...expenseGraphql.root,
  ...eventPhotosGraphql.root,
  ...eventUsersGraphql.root
};

module.exports = expressGraphql.graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
  customFormatErrorFn: (err) => {
    const error = getErrorCode(err.message);
    return ({message: error.message, statusCode: error.statusCode});
  }
});