const ClientError = require('../../ErrorHandling/ClientError');

class SongsHandler {
  constructor(service) {
    this._service = service;

    this.postSongsByHandler = this.postSongsByHandler.bind(this);
    this.getSongsByHandler = this.getSongsByHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.updateSongsByIdHandler = this.updateSongsByIdHandler.bind(this);
  }

  async postSongsByHandler(request, h) {
    try {
      const {
        title, year, genre, performer, duration, albumId,
      } = request.payload;

      const songsId = await this._service.addSongs(title, year, genre, performer, duration, albumId);

      const response = h.response({
        status: 'success',
        data: {
          songsId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // server error
      const response = h.response({
        status: 'fail',
        message: 'Maaf terjadi kesalahan pada server kami',
      });
      response.code(500);
      return response;
    }
  }

  async getSongsByHandler() {
    const songs = await this._service.getSongs();
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const song = await this._service.getSongById(id);

      const response = h.response({
        status: 'success',
        data: {
          song,
        },
      });
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // server error
      const response = h.response({
        status: 'fail',
        message: 'Maaf terjadi kesalahan pada server kami',
      });
      response.code(500);
      return response;
    }
  }

  async updateSongsByIdHandler(request, h) {
    try {
      const { id } = request.params;

      await this._service.editSongsById(id, request.payload);

      const response = h.response({
        status: 'success',
        message: 'Songs berhasil diperbarui',
      });
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // server  error
      const response = h.response({
        status: 'fail',
        message: 'Maaf terjadi kesalahan pada server kami',
      });
      response.code(500);
      return response;
    }
  }
}

module.exports = SongsHandler;
