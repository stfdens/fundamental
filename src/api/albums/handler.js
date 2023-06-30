class AlbumsHandler {
  constructor(service) {
    this._service = service;

    this.postAlbumsByHandler = this.postAlbumsByHandler.bind(this);
    this.getAlbumsByHandler = this.getAlbumsByHandler.bind(this);
    this.getAlbumsByIdHandler = this.getAlbumsByIdHandler.bind(this);
    this.updateAlbumsByHandler = this.updateAlbumsByHandler.bind(this);
    this.deleteAlbumsByHandler = this.deleteAlbumsByHandler.bind(this);
  }

  postAlbumsByHandler(request, h) {
    try {
        const {name, year} = request.payload;
    } catch (error) {
        
    }
  }
}
