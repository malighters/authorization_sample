const errorHandlerMiddleware = (err, req, res, next) => { 
  const error = {
    statusCode: err.statusCode || 400,
    message: err.message || "Something wrong happened, try again later",
  }

  return res.status(error.statusCode).json({"Error": error.message});
}
module.exports = errorHandlerMiddleware;