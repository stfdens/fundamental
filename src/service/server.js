require('dotenv').config();
const Hapi = require('@hapi/hapi');
const notes = require('../api/notes');
const NotesService = require('./inMemory/NotesService');

const init = async () => {
  const notesService = new NotesService();

  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
    },
  });

  await server.start();
  console.log(server.info.uri);
};

init();
