// dot env
require('dotenv').config();

// hapi framwork
const Hapi = require('@hapi/hapi');

// notes
const NotesService = require('./service/postgres/NotesService');
const NotesValidator = require('./validator/notes');
const notes = require('./api/notes');

// users
const UserService = require('./service/postgres/userService');
const UsersValidator = require('./validator/users');
const users = require('./api/users');

// authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./service/postgres/authenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

const init = async () => {
  const notesService = new NotesService();
  const userService = new UserService();
  const authenticationsService = new AuthenticationsService();

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
    {
      plugin: authentications,
      options: {
        authenticationsService,
        userService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
  ]);

  await server.start();
  console.log(server.info.uri);
};

init();
