const jwt = require('jsonwebtoken');
const badRequestError = require('../errors/badRequestError.error');
const unauthorizedError = require('../errors/unauthorizedError.error');

const authMiddleware = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if(!bearerToken || !bearerToken.startsWith('Bearer')) {
    throw new badRequestError('Authentication error');
  }

  const token = bearerToken.replace('Bearer ', '');
  
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.app.locals.user = decodedToken;
  }
  catch(err) {
    throw new unauthorizedError('Authentication error');
  }

  next();
}

module.exports = authMiddleware;