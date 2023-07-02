const { AlbumsPayloadSchema } = require('./schema');
const InvariantError = require('../../ErrorHandling/InvariantError');

const AlbumsValidator = {
  validateAlbums: (payload) => {
    const validationResult = AlbumsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AlbumsValidator;
