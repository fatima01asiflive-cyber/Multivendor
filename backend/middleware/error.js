const Errorhandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error!";

  // Wrong mongoDB id error
  if (err.name === "CastError") {
    const message = `Resource not found with this id. Invalid ${err.path}`;
    err = new Errorhandler(message, 400);
  }

  // Duplicate key Error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    err = new Errorhandler(message, 400);
  }

  // Wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Your Url is invalid! Please try again later.`;
    err = new Errorhandler(message, 400);
  }

  // JWT token expired
  if (err.name === "TokenExpiredError") {
    const message = `Your Url is Expired! Please try again later.`;
    err = new Errorhandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};