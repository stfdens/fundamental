const Hapi = require('@hapi/hapi');
const notes = require('../api/notes')
const NotesService = require('../services/inMemory/NotesService');
const NotesValidator = require('../validator/notes/index')


const init = async () => {
    const notesService = new NotesService();

    const server = Hapi.server({
        host: 'localhost',
        port: 5000,
    });

    await server.register({
        plugin: notes,
        options: {
            service: notesService,
            validator: NotesValidator,
        },
    });

    await server.start();
    console.log(server.info.uri);
};

init();