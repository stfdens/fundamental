const InvariantError = require('../../exacptions/InvariantError');
const { UsersSchema } = require('./schema');

const UsersValidator = {
  ValidateUsersPayload: (payload) => {
    const validationResult = UsersSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UsersValidator;
