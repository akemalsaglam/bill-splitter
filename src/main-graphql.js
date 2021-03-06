const expressGraphql = require('express-graphql');
const { buildSchema, GraphQLError } = require('graphql');

const userGraphql = require('./users/graphql-schema');
const eventGraphql = require('./events/graphql-schema');
const expenseGraphql = require('./expenses/graphql-schema');
const eventPhotosGraphql = require('./event-photos/graphql-schema');
const eventUsersGraphql = require('./event-users/graphql-schema');

const { errorType } = require('./errors');

const getErrorCode = (errorName) => errorType[errorName];

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
  ...eventUsersGraphql.root,
};

module.exports = expressGraphql.graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
  customFormatErrorFn: (err) => {
    if (err instanceof GraphQLError) {
      return ({ message: err.message, statusCode: 500 });
    }
    const error = getErrorCode(err.message);
    return ({ message: error.message, statusCode: error.statusCode });
  },
});
