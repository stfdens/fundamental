const ClientError = require('../../ErrorHandling/ClientError');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validation = validator;

    this.postSongsByHandler = this.postSongsByHandler.bind(this);
    this.getSongsByHandler = this.getSongsByHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.updateSongsByIdHandler = this.updateSongsByIdHandler.bind(this);
    this.deleteSongsByIdHandler = this.deleteSongsByIdHandler.bind(this);
  }

  async postSongsByHandler(request, h) {
    try {
      this._validation.validateSongs(request.payload);
      const {
        title, year, genre, performer, duration, albumId,
      } = request.payload;

      const songsId = await this._service.addSongs(title, year, genre, performer, duration, albumId);

      const response = h.response({
        status: 'success',
        data: {
          songId: songsId,
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

  async getSongsByHandler(request) {
    const { title, performer } = request.query;

    if (title && performer) {
      // Jika kedua parameter title dan performer ada
      const songs = await this._service.getSongsByTitleAndPerformer(title, performer);

      return {
        status: 'success',
        data: {
          songs,
        },
      };
    }

    if (title) {
      // Jika hanya parameter title yang ada
      const songs = await this._service.getSongsByTitle(title);

      return {
        status: 'success',
        data: {
          songs,
        },
      };
    }

    if (performer) {
      // Jika hanya parameter performer yang ada
      const songs = await this._service.getSongsByPerformer(performer);

      return {
        status: 'success',
        data: {
          songs,
        },
      };
    }

    // Jika tidak ada parameter yang diberikan
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
      this._validation.validateSongs(request.payload);
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

  async deleteSongsByIdHandler(request, h) {
    try {
      const { id } = request.params;

      await this._service.deleteSongById(id);

      const response = h.response({
        status: 'success',
        message: 'Songs berhasil dihapus',
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
}

module.exports = SongsHandler;
