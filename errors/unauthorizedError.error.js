const ApplicationError = require('./applicationError.error');

class unauthorizedError extends ApplicationError {
  constructor(message) {
    super(message || 'Unauthorized', 401);
  }
}

module.exports = unauthorizedError;