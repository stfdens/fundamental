const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const mapDbToModelSongs = require('../../utils/songs');
const NotFoundError = require('../../ErrorHandling/NotFoundError');
const mapDbToModelSongsId = require('../../utils/songsId');
const InvariantError = require('../../ErrorHandling/InvariantError');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSongs(title, year, genre, performer, duration, albumId) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO songs VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Songs gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getSongs() {
    const result = await this._pool.query('SELECT * FROM songs');
    return result.rows.map(mapDbToModelSongs);
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      return new NotFoundError('Songs tidak ditemukan');
    }

    return result.rows.map(mapDbToModelSongsId)[0];
  }

  async editSongsById(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, albumId = $6 WHERE id = $7',
      values: [title, year, genre, performer, duration, albumId, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Songs gagal update, Id tidak ditemukan');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DROP * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Songs gagal dihapus, Id tidak ditemukan');
    }
  }
}

module.exports = SongsService;
