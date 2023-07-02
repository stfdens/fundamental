const Hapi = require('@hapi/hapi');
require('dotenv').config();
const songs = require('./api/songs');
const album = require('./api/albums');
const AlbumService = require('./service/albums/AlbumService');
const SongsService = require('./service/songs/SongService');
const AlbumsValidator = require('./validation/albums');
const SongsValidator = require('./validation/songs');

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
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
  ]);

  await server.start();
  console.log(server.info.uri);
};

init();
