const queries = {};

queries.getPhotosByEventIdQuery = 'select * from public.event_photos eu where eu.event_id=$1';
queries.addEventPhotoQuery = 'INSERT INTO public.event_photos(url, event_id) VALUES ($1, $2) RETURNING id;';

module.exports = queries;