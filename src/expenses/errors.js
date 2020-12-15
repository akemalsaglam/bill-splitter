module.exports.expensesErrorName = {
  expenseIsPassive: 'expenseIsPassive',
  expenseNotFound: 'expenseNotFound',
};

module.exports.expensesErrorType = {
  expenseIsPassive: {
    message: 'can not perform this operation because expense is passive!',
    statusCode: 3331,
  },
  expenseNotFound: {
    message: 'expense not found!',
    statusCode: 3332,
  },
};
