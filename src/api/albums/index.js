const routes = require('./routes');
const NotesHandler = require('./handler');

exports.plugin = {
  name: 'album',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const notesHandler = new NotesHandler(service, validator);
    server.route(routes(notesHandler));
  },
};
