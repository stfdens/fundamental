const rotes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongsByHandler,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongsByHandler,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getSongByIdHandler,
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.updateSongsByIdHandler,
  },
//   {
//     method: 'DELETE',
//     path: '/songs/{id}',
//     handler: handler.deleteSongsByIdHandler,
//   },
];

module.exports = rotes;
