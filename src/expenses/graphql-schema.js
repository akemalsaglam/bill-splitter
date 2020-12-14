const expenseService = require('./service');

const Expense = `
  type Expense {
    id: Int
    name: String
    amount: Float
    created_user_id: Int
    event_id: Int
    created_date: String
  },
`;

const Queries = `
  getExpenseById(id: Int!): Expense,
  getAllExpenses: [Expense],
  getExpenseByEventId(eventId: Int!): [Expense]
`;

const Mutations = ` 
  deleteExpenseById(id: Int!): Boolean,
  activateExpenseById(id: Int!): Boolean
`;

const root = {
  getExpenseById: expenseService.getById,
  getAllExpenses: expenseService.getAll,
  getExpenseByEventId: expenseService.getExpenseByEventId,
  deleteExpenseById: expenseService.deleteExpenseById,
  activateExpenseById: expenseService.activateExpenseById
};

module.exports.model = Expense;
module.exports.queries = Queries;
module.exports.mutations = Mutations;
module.exports.root = root;
