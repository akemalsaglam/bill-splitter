const queries = {};

queries.getExpenseByEventIdQuery = 'select * from public.expenses e where e.event_id=$1';

module.exports = queries;