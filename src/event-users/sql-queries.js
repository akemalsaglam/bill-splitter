const queries = {};

queries.getUsersByEventIdQuery = 'select * from public.event_users eu where eu.event_id=$1 and is_active=true;';

module.exports = queries;