const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const mapDbToModelAlbums = require('../../utils/albums');
const InvariantError = require('../../ErrorHandling/InvariantError');
const NotFoundError = require('../../ErrorHandling/NotFoundError');

class AlbumService {
  constructor() {
    this._pool = new Pool();
  }

  async AddAlbums({ name, year }) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO albums VALUES ($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAlbums() {
    const result = await this._pool.query('SELECT * FROM albums');
    return result.rows.map(mapDbToModelAlbums);
  }

  async getAlbumsById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Albums tidak dapat ditemukan');
    }

    return result.rows.map(mapDbToModelAlbums)[0];
  }

  async editAlbumsById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui albums, id tidak dapat ditemukan');
    }
  }

  async deleteAlbumsById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Albums gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = AlbumService;
