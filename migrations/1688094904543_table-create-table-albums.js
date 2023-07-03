/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('albums', {
    id: {
      type: 'varchar',
      primaryKey: true,
    },
    name: {
      type: 'varchar',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    songs: {
      type: 'varchar',
    },
  });
  pgm.createTable('songs', {
    id: {
      type: 'varchar',
      primaryKey: true,
    },
    title: {
      type: 'varchar',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    genre: {
      type: 'varchar',
      notNull: true,
    },
    performer: {
      type: 'varchar',
      notNull: true,
    },
    duration: {
      type: 'integer',
      notNull: true,
    },
    albumId: {
      type: 'varchar',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('albums');
  pgm.dropTable('songs');
};
