const ClientError = require('../../ErrorHandling/ClientError');

class AlbumsHandler {
  constructor(service) {
    this._service = service;

    this.postAlbumsByHandler = this.postAlbumsByHandler.bind(this);
    this.getAlbumsByHandler = this.getAlbumsByHandler.bind(this);
    this.getAlbumsByIdHandler = this.getAlbumsByIdHandler.bind(this);
    this.updateAlbumsByHandler = this.updateAlbumsByHandler.bind(this);
    this.deleteAlbumsByHandler = this.deleteAlbumsByHandler.bind(this);
  }

  async postAlbumsByHandler(request, h) {
    try {
      const { name, year } = request.payload;

      const album_id = await this._service.AddAlbums({ name, year });

      const response = h.response({
        status: 'success',
        data: {
          albumid: {
            album_id,
          },
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
        message: 'Maaf, Tejadi kesalahan pada server kami',
      });
      response.code(500);
      return response;
    }
  }

  async getAlbumsByHandler() {
    const albums = await this._service.getAlbums();
    return {
      status: 'success',
      data: {
        album: albums,
      },
    };
  }

  async getAlbumsByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const albums = await this._service.getAlbumsById(id);

      const response = h.response({
        status: 'success',
        data: {
          album: albums,
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
        message: 'Maaf, Terjadi kesalahan pada server kami',
      });
      response.code(500);
      return response;
    }
  }

  async updateAlbumsByHandler(request, h) {
    try {
      const { id } = request.params;

      await this._service.editAlbumsById(id, request.payload);

      const response = h.response({
        status: 'success',
        message: 'Album berhasil diperbarui',
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

  async deleteAlbumsByHandler(request, h) {
    try {
      const { id } = request.params;

      await this._service.deleteAlbumsById(id);

      const response = h.response({
        status: 'success',
        message: 'albums berhasil dihapus',
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
    }
  }
}

module.exports = AlbumsHandler;
