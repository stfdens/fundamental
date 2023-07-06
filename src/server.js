// dot env
require('dotenv').config();

// hapi framwork
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// notes
const NotesService = require('./service/postgres/NotesService');
const NotesValidator = require('./validator/notes');
const notes = require('./api/notes');

// users
const UsersService = require('./service/postgres/userService');
const UsersValidator = require('./validator/users');
const users = require('./api/users');

// authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./service/postgres/authenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

const init = async () => {
  const notesService = new NotesService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();

  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  // registrasi plugin eksternal
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  // server jwt strategy
  server.auth.strategy('notesapp_jwt_auth', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
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
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
  ]);

  await server.start();
  console.log(server.info.uri);
};

init();
