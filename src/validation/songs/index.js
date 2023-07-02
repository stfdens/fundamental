const { songsPayloadSchema } = require('./schema');
const InvariantError = require('../../ErrorHandling/InvariantError');

const SongsValidator = {
  validateSongs: (payload) => {
    const validationResult = songsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SongsValidator;
