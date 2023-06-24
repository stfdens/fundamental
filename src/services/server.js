const Hapi = require('@hapi/hapi');
const notes = require('../api/notes');
const NotesService = require('./inMemory/NotesServices');

const init = async () => {
  const notesService = new NotesService();

  const server = Hapi.server({
    host: 'localhost',
    port: 5000,
  });

  await server.register({
    plugin: notes,
    option: {
      service: notesService,
    },
  });

  await server.start();
  console.log(server.info.uri);
};

init();
