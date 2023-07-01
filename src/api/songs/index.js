const routes = require('./routes');
const SongsHandler = require('./handler');

exports.plugin = {
  name: 'Songs',
  version: '1.0.0',
  register: async (server, { service }) => {
    const songsHandler = new SongsHandler(service);
    server.route(routes(songsHandler));
  },
};
