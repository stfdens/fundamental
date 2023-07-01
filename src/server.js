const Hapi = require('@hapi/hapi');
require('dotenv').config();
const songs = require('./api/songs');
const album = require('./api/albums');
const AlbumService = require('./service/albums/AlbumService');
const SongsService = require('./service/songs/SongService');

const init = async () => {
  const albumService = new AlbumService();
  const songsService = new SongsService();

  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  await server.register([
    {
      plugin: album,
      options: {
        service: albumService,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
      },
    },
  ]);

  await server.start();
  console.log(server.info.uri);
};

init();
