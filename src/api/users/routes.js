const routes = (handler) => ([
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUsersByHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUsersByIdHandler,
  },
]);

module.exports = routes;
