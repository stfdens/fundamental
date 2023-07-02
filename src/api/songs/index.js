const routes = require('./routes');
const SongsHandler = require('./handler');

exports.plugin = {
  name: 'Songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songsHandler = new SongsHandler(service, validator);
    server.route(routes(songsHandler));
  },
};
