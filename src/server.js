require('dotenv').config();
const Hapi = require('@hapi/hapi');
const NotesService = require('./service/postgres/NotesService');
const NotesValidator = require('./validator/notes');
const notes = require('./api/notes');
const UserService = require('./service/postgres/userService');
const UsersValidator = require('./validator/users');
const users = require('./api/users');

const init = async () => {
  const notesService = new NotesService();
  const userService = new UserService();

  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  await server.register([
    {
      plugin: notes,
      options: {
        service: notesService,
        validator: NotesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: userService,
        validator: UsersValidator,
      },
    },
  ]);

  await server.start();
  console.log(server.info.uri);
};

init();
