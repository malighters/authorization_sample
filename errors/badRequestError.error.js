const ApplicationError = require('./applicationError.error');

class badRequestError extends ApplicationError {
  constructor(message) {
    super(message || 'Bad request', 400);
  }
}

module.exports = badRequestError;