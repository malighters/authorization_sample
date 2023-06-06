const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if(!bearerToken || !bearerToken.startsWith('Bearer')) {
    throw new Error('Authentication error');
  }

  const token = bearerToken.replace('Bearer ', '');
  
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.app.locals.user = decodedToken;
  }
  catch(err) {
    throw new Error('Authentication error');
  }

  next();
}

module.exports = authMiddleware;