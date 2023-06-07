const errorHandlerMiddleware = (error, req, res, next) => { 
  return res.status(error.status || 500).json({ "Error": error.message || "Something gone wrong. Please try again later" });
}
module.exports = errorHandlerMiddleware;