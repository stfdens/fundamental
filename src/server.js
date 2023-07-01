const Hapi = require('@hapi/hapi');
require('dotenv').config();
const album = require('./api/albums');
const AlbumService = require('./service/albums/AlbumService');

const init = async () => {
  const albumService = new AlbumService();

  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  await server.register({
    plugin: album,
    options: {
      service: albumService,
    },
  });

  await server.start();
  console.log(server.info.uri);
};

init();
