const queries = {};

queries.updateEventQuery = 'UPDATE public.events SET name=$2, description = COALESCE($3, description) WHERE id=$1;';
module.exports = queries;